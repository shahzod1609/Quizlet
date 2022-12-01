import React from 'react';
import Bracket from './Bracket';
import './BracketList.css'
 

function BracketList({words}) {
    return (
        <div className="bracket-list">
            { words ? words.map(word =>{
                return <Bracket word={word} key={word.id} />
            })
            :
            ''
        }
        </div>
    );
}

export default BracketList;