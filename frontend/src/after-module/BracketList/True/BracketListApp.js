import React from 'react';
import BracketList from './BracketList';




const TBracketListApp = ({data}) => {
    return (
      <div>
        <h1 className="know-word">Doly öwrenilen sözler!!({data.length})<div className="opsisaniya-slow">Siz bu sözleri doly öwrendiňiz, sonuň ücin öwrenmedik sözlerinizi öwrenip bilersiniz!!</div></h1>
      <BracketList words={data} />
      </div>
    );
  };



 

export default TBracketListApp;