import React, { useContext, useState } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import './FlashApp.css';

function FlashCard({flashcard}) {
    const auth = useContext(AuthContext)
    const [flip, setFlip] = useState(false)
    return (
        <div
        className={`card12-cardsIn  ${flip ? 'flip-cardsIn' : ''}`} 
        onClick={() => setFlip(!flip)}>
            <div className="front-cardsIn">
                {flashcard.term}
                {
                    flashcard.image !== null ?

                        <div>
                            <img className="image-for-inModule-get-to-the-cardsIn" src={`http://${auth.url}/${flashcard.image}`} />
                        </div>
                        :
                        ''
                    }
            </div>
            <div className="back-cardsIn">
                {flashcard.definition}
            </div>
        </div>
    );
}

export default FlashCard;