import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import QuizInput from './quiz-input/quizInput';
import QuizSimple from './quiz-simple/Quiz-simple';
import TestingQuiz from './testing/Testing'
let mountLearn = 0, lengthD = 0

const Test = () => {

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const params = useParams()
    const moduleId = params.moduleid
    const test = {
        question: "",
        answer: [],
        cardId: null,
        index: null,
        questionIndex: null,
        type: null,
        image: null
    }
    const val = {
        trueId: null,
        falseId: null,
        val: false
    }
    const moduleData = {
        id: null,
        title: null,
    }
    const [testing, setTesting] = useState(false)
    const [end, setEnd] = useState(false)
    const [oldData, setOldData] = useState()
    const [oldData1, setOldData1] = useState()
    const [wait, setWait] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [dataModule, setDataModule] = useState(moduleData)
    const [stop, setStop] = useState(false)
    const [generateQuestion, setGenerateQuestion] = useState(false)
    const [dataTest, setDataTest] = useState(test)
    const [dataCard, setDataCard] = useState()
    const [validation, setValidation] = useState(val)
    const [value, setValue] = useState('')
    const barla = () => {
        setRefresh(refresh => !refresh)
        setValidation(val);
        setDataTest(test)
        setDataModule(moduleData)
        setStop(false)
        setWait(false)
        setValue('')
    }
    useEffect(() => {
        const fetchedCard = async () => {
            let card1 = await fetch(`http://${auth.url}/admin/cards/` + moduleId, {
                method: 'GET',
                headers: {
                    'userId': auth.userId,
                    'Content-Type': 'application/json',
                    'test': true,
                }
            })
            card1 = await card1.json()
            let card = card1.data
            let newData = []
            console.log(card1)
            setEnd(card1.lastOne)
            for (let i = 0; i < card.cards.length; i++) {
                if (card.cards[i].learn !== 2) {
                    newData.push(card.cards[i])
                }
            }
            setOldData1(newData)
            setDataCard(card.cards)
            setDataModule({
                id: card.module.id,
                title: card.module.title
            })
            setTesting(false)
        }
        fetchedCard()
        setGenerateQuestion(true)
    }, [refresh])

    console.log(dataCard, end)
    useEffect(() => {
        if (dataCard !== undefined && generateQuestion && !testing) {
            let questionIndex
            while (true) {
                questionIndex = Math.floor(Math.random() * dataCard.length)
                if (dataCard[questionIndex].learn <= 1)
                    break
            }
            let array = [];
            let firstAnswerIndex, secondAnswerIndex, thirdAnswerIndex, index;

            index = Math.floor(Math.random() * 4) + 1
            array[index] = dataCard[questionIndex].term
            while (true) {
                firstAnswerIndex = Math.floor(Math.random() * dataCard.length)
                if (firstAnswerIndex !== questionIndex)
                    break
            }
            while (true) {
                secondAnswerIndex = Math.floor(Math.random() * dataCard.length)
                if (secondAnswerIndex !== questionIndex && secondAnswerIndex !== firstAnswerIndex)
                    break
            }
            while (true) {
                thirdAnswerIndex = Math.floor(Math.random() * dataCard.length)
                if (thirdAnswerIndex !== questionIndex && thirdAnswerIndex !== secondAnswerIndex && thirdAnswerIndex !== firstAnswerIndex)
                    break
            }
            array[0] = dataCard[questionIndex].term
            array[1] = dataCard[firstAnswerIndex].definition
            array[2] = dataCard[secondAnswerIndex].definition
            array[3] = dataCard[thirdAnswerIndex].definition
            array[4] = dataCard[questionIndex].definition
            let swap
            swap = array[4]; array[4] = array[index]; array[index] = swap
            let type = 1;

            if (dataCard[questionIndex].learn === 1)
                type = 2

            setGenerateQuestion(false)
            return setDataTest({
                ...dataTest,
                question: array[0],
                image: dataCard[questionIndex].image,
                answer: [...array],
                cardId: dataCard[questionIndex].id,
                index: index,
                questionIndex: questionIndex,
                type: type
            })
        }
    })


    const inputOnChange = (e) => {
        setValue(e.target.value)
    }

    const Testing = (id) => {
        let body
        if (dataTest.type === 1) {
            body = dataTest.answer[id]
        } else {
            body = value
        }

        const fetchedTesting = async () => {
            let answerBase = { suceess: false }
            try {
                answerBase = await fetch(`http://${auth.url}/admin/test/` + dataTest.cardId, {
                    method: 'POST',
                    body: JSON.stringify({
                        answer: body
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'userId': auth.userId,
                        'authorization': `Bearer ${auth.token}`
                    }
                })
                answerBase = await answerBase.json()
            } catch (err) {
                console.log(err)
                alert('Somewhere went wrong , do you learn another time? ')
            }
            console.log(answerBase)

            //waiting for true answer 
            let valfalseid = null
            if ( (dataTest.answer[dataTest.index].trim().toUpperCase() !== body.trim().toUpperCase() && dataTest.type===1) || (dataTest.type===2 && !answerBase.success) ) {
                setStop(true)
                if (dataTest.type === 1) {
                    valfalseid = id
                } else {
                    valfalseid = dataCard[dataTest.questionIndex].definition
                }

            } else {
                dataCard[dataTest.questionIndex].learn++;
                if (dataCard[dataTest.questionIndex].learn > 1) {
                    mountLearn++;
                }
                if (dataTest.type === 1) {
                    setWait(true)
                } else {
                    //nothing here
                }
            }
            if (dataTest.type === 1) {
                setValidation({ trueId: dataTest.index, falseId: valfalseid })
            } else {
                let bool = true
                if (valfalseid)
                    bool = false
                setValidation({ trueId: bool, falseId: valfalseid, val: true })
            }


            let testEnd = true
            for (let i = 0; i < dataCard.length; i++)
                if (dataCard[i].learn !== 2)
                    testEnd = false

            if (testEnd) {
                setOldData(oldData1)
                setTesting(true)
                // navigate(`/module-in/${moduleId}`)
            }
        }
        if (!stop && !wait)
            fetchedTesting()
    }

    const nextButton = () => {
        setGenerateQuestion(true)
        setValidation(val)
        setStop(false)
        setValue('')
    }

    useEffect(() => {
        if (wait) {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            async function demo() {
                await sleep(1000);
                setValidation(val)
                setGenerateQuestion(true)
                setWait(false)
                console.log('Two second later');
            }
            demo();
        }
    }, [wait])



    return (
        <div>
            {
                !testing ?
                    <div>
                        {
                            dataTest.type === 1 ?
                                <QuizSimple dataModule={dataModule} validation={validation} nextButton={nextButton} Testing={Testing} quiz={dataTest} />
                                :
                                <QuizInput dataModule={dataModule} Testing={Testing} validation={validation} value={value} nextButton={nextButton} inputOnChange={inputOnChange} quiz={dataTest} />
                        }
                    </div>
                    :
                    <div>
                        <TestingQuiz end={end} oldData={oldData} barla={barla} moduleId={moduleId} />
                    </div>

            }

        </div>
    );

}

export default Test;