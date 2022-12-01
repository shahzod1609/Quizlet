import React, { useState } from 'react';
import './ModalModuleCard.css'



function ModalModuleCard({word}) {
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
      };
    return (
        <div to="#module" className="modal-module">
             <input 
            className="check-input"
            type="checkbox" 
            id={isChecked ? `${word.id}` : ''}
            checked={isChecked}
            onChange={handleOnChange}
            />
        <div>
            {/* Modulun name */}
            <div className="modal-modul-name">{word.title} </div>
            {/* id nace sanak bolsa */}
            <div className="modal-id-number">{word.totalCards} termin </div></div>
            
           
        </div>
    );
}

export default ModalModuleCard;