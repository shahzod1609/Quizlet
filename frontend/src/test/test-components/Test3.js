import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './Test.css';

const Test3 = ({ data, testABCD, testThird, resultTest }) => {
    const auth = useContext(AuthContext)
    return (
        <div>
            <div className="opisaniya-testow-in-quiz"><div className="text-opisaniya">Quize</div><div className="horizontal-line-in-test-for-opisaniya"></div></div>

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
                                    <div className="amg-woo">
                                        {
                                            e.image !== null &&
                                            <img src={`http://${auth.url}/${e.image}`} />
                                        }
                                    </div>
                                </div>
                                <div className="horizontal-line"></div>
                                <div className="area-for-answers-2">
                                    <div className="div-for-display-block">

                                        <div
                                            className={`test-abc-random-fix  
                                        ${!resultTest ?
                                                    testThird[index].answer === 0 ? 'active' : ''
                                                    :
                                                    resultTest[index].trueAnswer === 'omitted' && resultTest[index].trueDef === e.definition[0] ? 'active-omitted'
                                                        :
                                                        resultTest[index].trueDef === e.definition[0] ? 'active-true'
                                                            :
                                                            !resultTest[index].trueAnswer && testThird[index].answer === 0 ? 'active-false' : ''
                                                }`} onClick={() => {
                                                    testABCD(e.id, 0, index)
                                                }}
                                        >{e.definition[0]}</div>
                                        <div
                                            className={`test-abc-random-fix  
                                        ${!resultTest ?
                                                    testThird[index].answer === 1 ? 'active' : ''
                                                    :
                                                    resultTest[index].trueAnswer === 'omitted' && resultTest[index].trueDef === e.definition[1] ? 'active-omitted'
                                                        :
                                                        resultTest[index].trueDef === e.definition[1] ? 'active-true'
                                                            :
                                                            !resultTest[index].trueAnswer && testThird[index].answer === 1 ? 'active-false' : ''
                                                }`}
                                            onClick={() => {
                                                testABCD(e.id, 1, index)
                                            }}
                                        >{e.definition[1]}</div>

                                    </div>
                                    <div className="div-for-display-block">

                                        <div
                                            className={`test-abc-random-fix  
                                        ${!resultTest ?
                                                    testThird[index].answer === 2 ? 'active' : ''
                                                    :
                                                    resultTest[index].trueAnswer === 'omitted' && resultTest[index].trueDef === e.definition[2] ? 'active-omitted'
                                                        :
                                                        resultTest[index].trueDef === e.definition[2] ? 'active-true'
                                                            :
                                                            !resultTest[index].trueAnswer && testThird[index].answer === 2 ? 'active-false' : ''
                                                }`}
                                            onClick={() => {
                                                testABCD(e.id, 2, index)
                                            }}
                                        >{e.definition[2]}</div>
                                        <div
                                            className={`test-abc-random-fix  
                                        ${!resultTest ?
                                                    testThird[index].answer === 3 ? 'active' : ''
                                                    :
                                                    resultTest[index].trueAnswer === 'omitted' && resultTest[index].trueDef === e.definition[3] ? 'active-omitted'
                                                        :
                                                        resultTest[index].trueDef === e.definition[3] ? 'active-true'
                                                            :
                                                            !resultTest[index].trueAnswer && testThird[index].answer === 3 ? 'active-false' : ''
                                                }`} onClick={() => {
                                                    testABCD(e.id, 3, index)
                                                }}
                                        >{e.definition[3]}</div>

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

export default Test3;