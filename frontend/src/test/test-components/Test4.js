import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './Test.css';

const Test4 = ({ data, testInput, inputVal, resultTest }) => {
    const auth = useContext(AuthContext)
    return (
        <div>
            <div className="opisaniya-testow-in-quiz"><div className="text-opisaniya">Ýazmak</div><div className="horizontal-line-in-test-for-opisaniya"></div></div>
            {
                data.map((e, index) => {
                    return (
                        <div className="test-area-module-things" key={index}>
                            <div className="index-area-of-test-flashcard">
                                <div className="index-area-of-area">{index}</div>
                            </div>
                            <div className="main-area-for-all-mini-testing">
                                <div className="area-for-testing-things">
                                    <div className="first-area-of-testing-or-term">{e.term}</div>
                                    <div className="line-for-area-breaker"></div>
                                    <div className="image-input">
                                        {
                                            e.image &&
                                            <img src={`http://${auth.url}/${e.image}`} />
                                        }
                                    </div>
                                </div>
                                <div className="horizontal-line">{e.definition}</div>
                                <div className="area-for-answers-4">
                                    <input className={`input-in-test-just-use 
                                    ${resultTest && `active-${resultTest[index].messageBool}`}`}
                                        value={resultTest ? resultTest[index].messageBool === 'omitted' ? '' : inputVal[index].definition : inputVal[index].definition} placeholder={resultTest && inputVal[index].definition.length < 1 ? 'Yazylmady' : ''} onChange={(e) => { testInput(e.target.value, index) }} />
                                    {
                                        resultTest && !resultTest[index].trueAnswer &&
                                        <div className="answers-of-4-test">
                                            <div className="true-answer-text">True answer</div>
                                            <div className="result-after-true-answer-text" >{resultTest[index].trueDef}</div>
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }



        </div>
    );
}

export default Test4;