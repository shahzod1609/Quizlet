import React from 'react';
import FolderCard from './FolderCard';
import './FolderCardList.css'
 

function FolderCardList({words}) {
    return (
        <div className="folder-card-list">
            {words.map(word =>{
                return <FolderCard word={word} key={word.id} />
            })}
        </div>
    );
}

export default FolderCardList;