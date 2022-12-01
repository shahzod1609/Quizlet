import React from 'react';
import './shared/components/FormElements/Input.css'
const Input1 = (props) =>{
    const element = 
        props.element === 'input'?
        (
            <input type={props.type}/>
        ) :
        (
            <textarea type={props.type}/>
        )
    return(
        <div className="form-control">
            <label>{props.title}</label>
            {element}
        </div>
    )

}

export default Input1
