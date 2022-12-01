import React from 'react';
import Module from './Module';
import './ModuleList.css'

 

function        ModuleList({words}) {
    return (
        <div className="module-list">
            { words.length>0 ?  words.map(word =>{
                return <Module word={word.module} key={word.module.id} />
            })
            :
            <h1 className="no-modules-in-papka">Bagyslaň siziň bu bukjaňyzda modul ýok! Ýone siz bukja moduly goşup ýa-da döredip bilersiňiz!</h1>
            }
        </div>
    );
}

export default ModuleList;