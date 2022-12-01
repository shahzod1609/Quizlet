import React from 'react';
import FlashCard from './FlashCard';

function FlashCardList({flashcards}) {    
    return (
        <div className="card-grid">
            { flashcards && flashcards.map(flashcard =>{
                return <FlashCard flashcard={flashcard}  />
            })
            }
        </div>
    );
}

export default FlashCardList;