import React from 'react';
import Test1 from './test-components/Test1';
import Test2 from './test-components/Test2';
import Test3 from './test-components/Test3';
import Test4 from './test-components/Test4';
import './Quiz.css';

const data = [
    {id:1 , term:"word" , def:"soz"},
    {id:2 , term:"go" , def:"gitmek"},
    {id:3 , term:"phone", def:"telefon"},
    {id:4 , term:"cat", def:"pisik"}
]

const Quiz = () => {
    return (
        <div className="test_for_flashcards">
            <div className="header-of-test-of-flashcard">
                <div className="name-of-test-module"></div>
                <div className="cross-of-test-module"></div>
            </div>
            <div className="area-for-everything-of-test-module">
                <Test1 />
                <Test2 data={data}/>
                <Test3 />
                <Test4 />
            </div>
        </div>
    );
}

export default Quiz;
