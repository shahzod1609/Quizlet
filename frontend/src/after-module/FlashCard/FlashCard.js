import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './FlashApp.css';


function FlashCard({ flashcard }) {
    const [flip, setFlip] = useState(false)
    const auth = useContext(AuthContext)
    return (
        <div
            className={`card12  ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}>
            <div className="front">
                {flashcard.term}
                {
                    flashcard.image !== null ?

                        <div>
                            <img className="image-for-inModule-get-to-the-flashcard" src={`http://${auth.url}/${flashcard.image}`} />
                        </div>
                        :
                        ''
                }
            </div>
            <div className="back">
                {flashcard.definition}
            </div>
        </div>
    );
}

export default FlashCard;