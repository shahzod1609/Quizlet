import React, { useEffect, useState } from 'react';
import FlashCardList from './FlashCardList';

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
    
    return (<div>
              {
                data && <FlashCardList flashcards={flashcards} />
              }
              
              <Pagination   setPaginate={setPaginate} postsPerPage={postsPerPage} totalPosts={data ? data.length : 0 } />
            </div>
      
    );
  };



 

export default FlashApp;