import React from 'react';
import BracketList from './BracketList';



const UBracketListApp = ({data}) => {
    return (
      <div>
        <h1 className="unknow-word">Öwrenilmane başlanylmadyk sözler!!({data.length})<div className="opsisaniya-slow">Siz intäk bu sözleri öwrenmediňiz, şonuň ücin şu wagt başlap bilersiniz!!</div></h1>
      <BracketList words={data} />
      </div>
    );
  };

export default UBracketListApp;