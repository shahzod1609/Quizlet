import React, { useContext, useEffect, useState } from 'react';
import Test1 from './test-components/Test1';
import Test2 from './test-components/Test2';
import Test3 from './test-components/Test3';
import Test4 from './test-components/Test4';
import Loading from '../shared/components/FormElements/Loading'
import Button from '@mui/material/Button';
import './Quiz.css';
import { AuthContext } from '../shared/context/auth-context';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const params = useParams()
    const moduleId = params.moduleid
    let saveData
    const [testFirst, setTestFirst] = useState([])
    const [testSecond, setTestSecond] = useState([])
    const [testThird, setTestThird] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [testFour, setTestFour] = useState([])
    const [dataCard, setDataCard] = useState('')
    const [thBut, setThBut] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [resultTest, setResultTest] = useState(false)

    const next = () => {
        setDataCard('')
        setResultTest(false)
        setRefresh(refresh => !refresh)
        // setTestFirst()
        // setTestSecond()
        // setTestThird()
        // setTestFour()

    }
    useEffect(() => {
        const fetchedCard = async () => {
            let data = await fetch(`http://${auth.url}/admin/quiz/${moduleId}`, {
                method: 'GET',
                headers: {
                    'userId': auth.userId,
                    'Content-Type': 'application/json',
                }
            })
            data = await data.json()
            setThBut(data.cards[0].test1.map((e, i) => {
                return { ["bool"]: '' }
            }))

            //1
            setTestFirst(data.cards[0].test1.map((e, i) => {
                return { ["id"]: e.id, ["term"]: e.term, ["definition"]: e.definition, ["boolAnswer"]: null }
            }))
            //2
            setTestSecond(data.cards[0].test3.map((e, i) => {
                return { ["id"]: e.id, ["term"]: '', ["definition"]: e.definition }
            }))

            //3
            setTestThird(data.cards[0].test2.map((e, i) => {
                return { ["id"]: e.id, ["term"]: e.term, ["definition"]: e.definition, ["answer"]: null, }
            }))

            //4
            setTestFour(data.cards[0].test4.map((e, i) => {
                return { ["id"]: e.id, ["term"]: e.term, ["definition"]: e.definition }
            }))

            setDataCard(data.cards[0])
        }
        fetchedCard()
    }, [refresh])
    const testBool = (id, boolAnswer, term, definition, ind) => {
        setTestFirst(testFirst.map((e, i) => {
            if (e.id === id) {
                return { ...e, ["boolAnswer"]: boolAnswer }
            } else {
                return e
            }
        }))

        setThBut(thBut.map((e, i) => {
            if (i === ind) {
                return { ...e, ["bool"]: boolAnswer }
            } else {
                return e
            }
        }))
    }
    const testChoose = (term, definition, index) => {
        setTestSecond(testSecond.map((e, i) => {
            if (i === index) {
                return { ...e, ["term"]: term, ["definition"]: definition }
            } else {
                return e
            }
        }))

    }


    const deleteTestChoose = (locationN) => {
        saveData = []
        for (let i = 0; i < testSecond.length; i++)
            if (testSecond[i].location !== locationN)
                saveData.push(testSecond[i])
        setTestSecond(saveData)
    }


    const testABCD = (id, num, ind) => {
        setTestThird(testThird.map((e, i) => {
            if (i === ind) {
                return { ...e, ["id"]: id, ["answer"]: num }
            } else {
                return e
            }
        }))
    }
    const testInput = (e, index) => {

        setTestFour(testFour.map((element, i) => {
            if (i === index) {
                return { ...element, ["definition"]: e }
            } else {
                return element
            }
        }))
    }
    const submit = async () => {
        setIsLoading(true)
        const allData = [
            {
                testFirst,
                testSecond,
                testThird,
                testFour
            }
        ]
        let datas = null
        try {
            datas = await fetch(`http://${auth.url}/admin/quiz-result/${moduleId}`, {
                method: 'POST',
                body: JSON.stringify(allData),
                headers: {
                    'userId': auth.userId,
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${auth.token}`
                }
            })
            datas = await datas.json()
            setResultTest(datas.data)
        } catch (err) {
            console.log(err)
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(1000);

        setIsLoading(false)

        window.scrollTo(0, 0)

    }
    return (

        <div>
            {isLoading &&
                <Loading />}
            <div className="test_for_flashcards">
                <div className="header-of-test-of-flashcard">
                    <div className="name-of-test-module"></div>
                    <div className="cross-of-test-module"></div>
                </div>
                {
                    dataCard &&
                    <div className="area-for-everything-of-test-module">
                        {dataCard.test1.length > 0 && <Test1
                            data={dataCard.test1}
                            resultTest={resultTest.test1}
                            testBool={testBool}
                            thBut={thBut}
                        />}
                        {dataCard.test2.length > 0 && <Test2
                            data={dataCard.test3}
                            resultTest={resultTest.test2}
                            testChoose={testChoose}
                            quantity={dataCard.test1.length}
                            deleteTestChoose={deleteTestChoose}
                        />}
                        {dataCard.test3.length > 0 && <Test3
                            data={dataCard.test2}
                            resultTest={resultTest.test3}
                            quantity={1 + dataCard.test1.length + dataCard.test2.length}
                            testABCD={testABCD}
                            testThird={testThird}
                        />}
                        {dataCard.test4.length > 0 && <Test4
                            resultTest={resultTest.test4}
                            data={dataCard.test4}
                            quantity={dataCard.test4.length}
                            testInput={testInput}
                            inputVal={testFour}
                        />}
                        {
                            !resultTest ?
                                <Button onClick={submit} className="button-for-test4" variant="contained">Barlaň</Button>
                                :
                                <div className="flex-in-barla-test">
                                    <Link to={`/module-in/${moduleId}`} >
                                        <Button variant="contained">
                                            Esasy sahypa
                                        </Button>
                                    </Link>
                                    <div onClick={next}>
                                        <Button variant="outlined">
                                        Yzyny dowam et
                                        </Button>
                                    </div>
                                </div>
                        }
                    </div>
                }

            </div>
        </div>
    );
}

export default Quiz;
