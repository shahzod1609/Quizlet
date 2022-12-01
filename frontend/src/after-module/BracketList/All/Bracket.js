import React, { useContext } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import './Bracket.css'
// import Speech from 'react-speech'
import { useSpeechSynthesis } from 'react-speech-kit'
function Bracket({ word }) {
    const { speak, speaking, voices } = useSpeechSynthesis();
    const text = `${word.term}   ${word.definition}`
    const auth = useContext(AuthContext)
    return (
        <div className="words-bracket-1">
            {/* Modulun name */}
            <div className="word1-bracket-name-1 leps"><h3 className="brackets-h3-1">{word.term}</h3></div>
            <div className="line-bracket"></div>

            {/* user name */}
            <div className="word1-bracket-name-2"><h3 className="brackets-h3-2">{word.definition}</h3></div>
            {
                word.image !== null ?

                    <div>
                        <img className="image-for-inModule-get" src={`http://${auth.url}/${word.image}`} />
                    </div>
                    :
                    <div className="imga-derek-goylan-bosluk-1"></div>
            }
            <div className="width-sazlasyk">
                <div className="speech-button-at-in-module " onClick={() => { !speaking && speak({ text: text, voice: voices[7] }) }}></div>
                {/* <div className="speech-real-bot">
                    <Speech
                        text={text}
                        pitch="1"
                        rate="1"
                        play={true}
                        volume="10"
                        voice="Google UK English Male" 
                        />
                </div> */}
            </div>

        </div>
    );
}

export default Bracket;