import React, { useEffect, useState } from 'react';
import './Test.css';

const Test2 = ({ data }) => {

    const settingData = () => {
        
    }


    const dataQuiz = data
    let dataWords = []
    for (let i = 0; i < dataQuiz.length; i++) {
        dataWords.push({ term: '-',wId: null })
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
                    return { ...item, ["term"]: data[index].term,["wId"]:index };
                }
                return item;
            }))

            setSwapData2(swapData2.map((item, i) => {
                if (i === index) {
                    return { ...item, ["term"]: '-' };
                }
                return item
            }))
            // index
        }

    }
    const deleteCard = (index) => {
        console.log(index,'index')
        console.log(swapData)


        setSwapData2(swapData2.map((item,i)=>{
            
            if(i===swapData[index].wId) {
                return {...item,["term"]:data[i].term}
            } 
            return item
         }))

        setSwapData(swapData.map((item,i)=>{
            if(index===i){
                return {...item , ["term"]:'-',["wId"]:null}
            }
            return item;
        }))
        
    }
    useEffect(() => {
        let stuk = 0, index = swap
        if(index<0)
            index = 1
            console.log(swapData, '00')
        while (swapData[index].term !== '-') {
            index++;
            console.log(index, swapData.length - 1)
            if (index > swapData.length - 1)
                index = 0;
            stuk++;
            console.log(stuk, 'stuk')
            if (stuk === swapData.length) {
                index = -1
                break;
            }
        }
        setSwap(index)
    }, [swapData])
    return (
        <div className="test-area-module-things">
            <div className="index-area-of-test-flashcard">
                <div className="index-area-of-area">2</div>
            </div>
            <div className="main-area-for-all-mini-testing">
                <div className="area-for-testing-things">
                    <div className="group1-test-podbor">
                        {
                            swapData.map((e, index) => {
                                return (
                                    <div>
                                        <div key={index}
                                            className={`tests-8-fragments ${index === swap ? ' blue_line' : ''} `}
                                            onClick={() => { mark(index) }}
                                        >
                                            {e.term}

                                        </div>
                                        {
                                            e.term !== '-' &&
                                            <div className="close"
                                                onClick={() => {deleteCard(index)}}
                                            ></div>

                                        }
                                     </div>
                                )
                            })
                        }

                    </div>
                    <div className="line-for-area-breaker"></div>
                    <div className="group2-test-podbor">
                        <div className="tests-8-fragments">1.1</div>
                        <div className="tests-8-fragments">2.1</div>
                        <div className="tests-8-fragments">3.1</div>
                        <div className="tests-8-fragments">4.1</div>
                    </div>
                </div>
                <div className="horizontal-line"></div>
                <div className="area-for-answers-1">
                    {
                        swapData2.map((e, index) => {
                            return (
                                <div
                                    key={index}
                                    className="div-for-test-podbor"
                                    onClick={() => { choose(index, e.term) }}
                                >{e.term}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Test2;