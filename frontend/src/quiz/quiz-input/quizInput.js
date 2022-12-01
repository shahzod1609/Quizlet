import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import '../quiz-simple/QuizSimple.css';

const QuizInput = ({Testing,validation,dataModule,quiz,inputOnChange,value,nextButton}) =>{
    let classData = null
    const auth = useContext(AuthContext)
    if(validation.val){
        classData = 'true'
        if(validation.falseId)
            classData = 'false'
    }
    return (
        
        <div className="quiz-simple">
            <div className="navbar-quiz-simple">{dataModule.title}<Link to={`/module-in/${dataModule.id}`} className="cross-icon-quiz"><Button variant='outlined'>X</Button></Link></div>
            <div className="card-in-quiz-simple">
                <div className="term-in-quiz">Term</div>
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
                <div className="choose-true-answer">Dogry jogaby ýazyň</div>
                <div className="answers-quize">
                    <input 
                    onChange={inputOnChange} 
                    value={value} 
                    className="input-quiz-1"
                    type="text" 
                    placeholder="Düsündirilişini ýaz..." 
                    className={`input-quiz-1 ${classData}`}
                    />  
                </div>
           
            {
                validation.val ?
                <div>
                {
                    validation.falseId &&
                    <div>
                        <div className="true-answer-of-input">Dogry jogap</div>
                    <div className="input-quiz-2" >{validation.falseId}</div></div>
                }
                <div className="bottom-bar-quiz-simple"  ><div className='centrik-etmek-ucin'><div className="footer-lll"> Dowam etmek üçin basyň</div> <Button variant='outlined' className="button_next" onClick={()=>{nextButton()}}>Dowam et</Button></div></div>
                </div>
                :
                
                <button className="jogaby-send" onClick={Testing} >Dogry jogap</button>
            }
             </div>
        
        </div>
    );
}

export default QuizInput;



