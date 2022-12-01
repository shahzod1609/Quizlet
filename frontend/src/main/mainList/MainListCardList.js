import React from 'react';
import MainCard from './MainCard';
import './mainListCardList.css'
 

function MainListCardList({words,result}) {
    return (
        <div className="card-list">

            { words.length>0 ? words.map((word,index) =>{
                return <MainCard result={result[index]} word={word.module} cards={word.cards} openId={word.id} key={index} />
            })
            :
            <h1>Modul yok</h1>
        }
        </div>
    );
}

export default MainListCardList;