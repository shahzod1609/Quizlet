import React, { useState } from 'react';
import './Test.css';

const Test1 = ({ data, testBool, thBut, resultTest }) => {
    return (
        <div>
            <div className="opisaniya-testow-in-quiz"><div className="text-opisaniya">Dogry we Ýalňyş</div><div className="horizontal-line-in-test-for-opisaniya"></div></div>
            {
                data.map((e, index) => {
                    return (
                        <div className="test-area-module-things" key={index}>
                            <div className="index-area-of-test-flashcard">
                                <div className="index-area-of-area">{index + 1}</div>
                            </div>
                            <div className="main-area-for-all-mini-testing">
                                <div className="area-for-testing-things">
                                    <div className="first-area-of-testing-or-term">{e.term}</div>
                                    <div className="line-for-area-breaker"></div>
                                    <div className="second-word-of-testing-or-def">{e.definition}</div>
                                </div>
                                <div className="horizontal-line"></div>
                                <div className="area-for-answers-3">
                                    <div className="flex-for-trueAnswer">
                                        <div className="flex-for-answers">
                                            <div
                                                className={`test-tru-false-tut` +
                                                    ` ${!resultTest ?
                                                        (thBut[index].bool === true ? 'active' : '')
                                                        :
                                                        resultTest[index].trueAnswer === true ? `active-${resultTest[index].messageBool}`
                                                            : ''
                                                    }`
                                                }
                                                onClick={() => {
                                                    !resultTest && testBool(e.id, true, e.term, e.definition, index)
                                                }}
                                            >Dogry</div>

                                            <div
                                                className={`test-tru-false-tut` +
                                                    ` ${!resultTest ?
                                                        (thBut[index].bool === false ? 'active' : '')
                                                        :
                                                        resultTest[index].trueAnswer === false ? `active-${resultTest[index].messageBool}`
                                                            : ''
                                                    }`
                                                }
                                                onClick={() => {
                                                    !resultTest && testBool(e.id, false, e.term, e.definition, index)
                                                }}
                                            >Yalnysh</div>
                                        </div>
                                        {
                                            resultTest && resultTest[index].trueDef.length > 0 &&
                                            <div className={'trueAnswer'}>
                                                {resultTest[index].trueDef}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Test1;