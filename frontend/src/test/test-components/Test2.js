import React, { useEffect, useState } from 'react';
import './Test.css';

const Test2 = ({ data, testChoose, quantity, deleteTestChoose, resultTest }) => {

    const dataQuiz = data
    let dataWords = []
    for (let i = 0; i < dataQuiz.length; i++) {
        dataWords.push({ term: '-', wId: null })
    }

    const [swap, setSwap] = useState(0)
    const [swapData2, setSwapData2] = useState(dataQuiz)
    const [swapData, setSwapData] = useState(dataWords)

    const mark = (index) => {
        setSwap(index)
    }

    const choose = (index, dataTerm) => {
        if (swapData2[index].term !== '-') {
            setSwapData(swapData.map((item, i) => {
                if (swap === i) {
                    return { ...item, ["term"]: data[index].term, ["wId"]: index };
                }
                return item;
            }))

            setSwapData2(swapData2.map((item, i) => {

                if (i === index) {
                    testChoose(data[i].term, data[i].definition, swap)
                    return { ...item, ["term"]: '-' };
                }
                return item
            }))
            // index
        }

    }
    const deleteCard = (index) => {

        deleteTestChoose(index + quantity + 1)
        setSwapData2(swapData2.map((item, i) => {

            if (i === swapData[index].wId) {
                return { ...item, ["term"]: data[i].term }
            }
            return item
        }))

        setSwapData(swapData.map((item, i) => {
            if (index === i) {
                return { ...item, ["term"]: '-', ["wId"]: null }
            }
            return item;
        }))

    }
    useEffect(() => {
        let stuk = 0, index = swap
        if (index < 0)
            index = 1

        while (swapData[index].term !== '-') {
            index++;

            if (index > swapData.length - 1)
                index = 0;
            stuk++;

            if (stuk === swapData.length) {
                index = -1
                break;
            }
        }
        setSwap(index)
    }, [swapData])

    return (
        <div>
            <div className="opisaniya-testow-in-quiz"><div className="text-opisaniya">Dogrysyny saýlamak</div><div className="horizontal-line-in-test-for-opisaniya"></div></div>
            <div className="test-area-module-things">
                <div className="index-area-of-test-flashcard">
                    <div className="index-area-of-area"></div>
                </div>
                <div className="main-area-for-all-mini-testing">
                    <div className="area-for-testing-things">
                        <div className="group1-test-podbor">
                            {
                                swapData.map((e, index) => {
                                    return (
                                        <div key={index} className="padbor-div-to-flex">
                                            <div
                                                className={`tests-8-fragments ${!resultTest ?
                                                    index === swap ? ' blue_line' : ''
                                                    : `active-${resultTest[index].messageBool}`} `}
                                                onClick={() => { mark(index) }}
                                            >
                                                <p className={`l2 ${resultTest && !resultTest[index].trueAnswer ? 'l3' : ''}`}>{e.term}</p>{resultTest ? !resultTest[index].trueAnswer ? <p className={`aralygyny-yap`}>{resultTest[index].trueTerm}</p> : '' : ''}
                                            </div>
                                            {
                                                e.term !== '-' && !resultTest &&
                                                <div className="close"
                                                    onClick={() => { deleteCard(index) }}
                                                ></div>

                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="line-for-area-breaker"></div>
                        <div className="group2-test-podbor">
                            {
                                swapData2.map((e, index) => {
                                    return (
                                        <div
                                            className={`tests-8-fragments ${resultTest && !resultTest[index].trueAnswer ? 'l1' : ''}`}
                                            key={index}
                                        >
                                            {e.definition}
                                        </div>
                                    )

                                })
                            }

                        </div>
                    </div>
                    {
                        !resultTest &&
                        <div className="flex-for-podbor-11">
                            <div className="horizontal-line"></div>
                            <div className="area-for-answers-1">
                                {
                                    swapData2.map((e, index) => {
                                        return (
                                            <div
                                                className="div-for-test-podbor"
                                                onClick={() => { choose(index, e.term) }}
                                                key={index}
                                            >{e.term}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Test2;