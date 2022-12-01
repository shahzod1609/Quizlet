import React from 'react';
import BracketList from './BracketList';




const EBracketListApp = ({data}) => {
  
    return (
      <div>
        <h1 className="eq-word-2">Doly öwrenilmedik sözler!!({data.length})<div className="opsisaniya-slow">Siz bu sözleri doly özleşdirmediňiz şonun ücin özleşdirmäge dowam!!</div></h1>
      <BracketList words={data} />
      </div>
    );
  };



 

export default EBracketListApp;