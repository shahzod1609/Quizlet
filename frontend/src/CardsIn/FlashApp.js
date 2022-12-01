import React, { useEffect, useState } from 'react';
import FlashCardList from './FlashCardList';
// import data from './MOCK_DATA.json';
import Pagination from './Pagination';

let postsPerPage = 1

const FlashApp = ({data}) => {
  
  const [flashcards,setFlascards] = useState(data)
    const [paginate,setPaginate] = useState(1)
    
    useEffect(()=>{
      let q=[]
      if(data){
      for(let i = (paginate-1)*postsPerPage+1;i<=paginate*postsPerPage;i++ ){
        if(data[i-1]){
          q.push(data[i-1])
        }
      }
      setFlascards(q)
      }

  },[paginate])
    
  
    return (
      <div className="flashApp-cardsIn">
        {
          data && 
          <FlashCardList  flashcards={flashcards} />
        }
        <Pagination  setPaginate={setPaginate} paginate={paginate} postsPerPage={postsPerPage} totalPosts={data.length} />
      </div>
      
    );
  };



 

export default FlashApp;