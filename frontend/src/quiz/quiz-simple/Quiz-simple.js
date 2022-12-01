import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import './QuizSimple.css';

const QuizSimple = ({quiz,dataModule,Testing,validation,nextButton}) => {
    const auth = useContext(AuthContext)
    return (
        <div className="quiz-simple">
            <div className="navbar-quiz-simple">{dataModule.title}<Link to={`/module-in/${dataModule.id}`} className="cross-icon-quiz"><Button variant='outlined'>X</Button></Link></div>
            <div className="card-in-quiz-simple">
                <div className="term-in-quiz">Termin</div>
                <div className="question-and-image">
                    <div className="question-quiz">{quiz.question}</div>
                    {
                    quiz.image !== null ?

                        <div>
                            <img className="image-for-inModule-get-to-the-quiz" src={`http://${auth.url}/${quiz.image}`} />
                        </div>
                        :
                        ''
                    }
                </div>
                <div className="choose-true-answer">Dogrysyny saýlaň</div>
                <div className="answers-quize">
                    
                    <div className="first-answers">
                        <div 
                        onClick={()=>{Testing(1)}} 
                        className={`ans-1 ${  
                            validation.falseId===1 ? 'false' : ``
                        }${
                            validation.trueId===1 ? 'true' : ''
                        }`}>
                            {quiz.answer[1]}
                        </div>
                        <div 
                        onClick={()=>{Testing(2)}} 
                        className={`ans-2 ${  
                            validation.falseId===2 ? 'false' : ``
                        }${
                            validation.trueId===2 ? 'true' : ''
                        }`}>
                            {quiz.answer[2]}
                        </div>
                    </div>
                    
                    <div className="second-answers">
                        <div 
                        onClick={()=>{Testing(3)}} 
                        className={`ans-3 ${  
                            validation.falseId===3 ? 'false' : ``
                        }${
                            validation.trueId===3 ? 'true' : ''
                        }`}>
                            {quiz.answer[3]}
                        </div>
                        
                        <div 
                        onClick={()=>{Testing(4)}} 
                        className={`ans-4 ${  
                            validation.falseId===4 ? 'false' : ``
                        }${
                            validation.trueId===4 ? 'true' : ''
                        }`}>
                            {quiz.answer[4]}
                        </div>
                    </div>
                </div>
            </div>
            {
                validation.falseId && 
                <div className="bottom-bar-quiz-simple"  ><div className='centrik-etmek-ucin'><div className="footer-lll"> Dowam etmek üçin basyň</div> <Button variant='outlined' className="button_next" onClick={()=>{nextButton()}}>Dowam et</Button></div></div>
            }
            
        </div>
    );
}

export default QuizSimple;