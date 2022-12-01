import React from 'react';
import { Link } from 'react-router-dom';
import './Module.css'

function Module({word}) {
    
    return (
        <Link to={`/module-in/${word.id}`} >
            <div className="module-papka-in-5">
            {/* Modulun name */}
            <div className="modul-papka-in-name">{word.title}</div>
            {/* id nace sanak bolsa */}
            <div className="id-papka-in-number">{word.totalCards} termin</div>
            </div>
        </Link>
    );
}

export default Module;