import React  ,{useReducer,useEffect} from 'react';
import './Input.css'
import {validate} from '../../util/validators'



const Input = (props) =>{
    

    const element = 
        props.element === 'input' ? 
            (<input 
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                /> )
            :
            (<textarea 
                id={props.id}
                rows={props.rows || 3}
            />
            )
        
    return (
        <div className={`form-control`}  >
            <label htmlFor={props.id}>{props.title}</label>
            {element}
            {/* {!inputState.isValid  && <p>{props.errorText}</p>} */}
        </div>
    )
}


export default Input