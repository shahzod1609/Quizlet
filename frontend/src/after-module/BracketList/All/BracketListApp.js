import React from 'react';
import BracketList from './BracketList';



const AllListApp = ({data}) => {
  
    return (
      <div>
        <h1 className="eq-word">Hemme sözler!!({data ? data.length : 0})<div className="opsisaniya-slow">Siziň hemme sözlerişňiz!!</div></h1>
      <BracketList words={data} />
      </div>
    );
  };



 

export default AllListApp;