import React, { useContext, useEffect, useState } from 'react';
import FlashApp from './FlashApp';
import './CardsIn.css'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import { Button } from '@mui/material';

const CardsIn = () => {
  const moduleData = {
    title: null,
    id: null
  }
  const auth = useContext(AuthContext)
  const params = useParams()
  const moduleId = params.moduleid
  const [dataCard, setDataCard] = useState()
  const [dataModule, setModule] = useState(moduleData)
  useEffect(() => {
    const fetchedCard = async () => {
      let card = await fetch(`http://${auth.url}/admin/cards/` + moduleId, {
        method: 'GET',
        headers: {
          'userId': auth.userId,
          'Content-Type': 'application/json'
        }
      })
      card = await card.json()
      setModule({
        title: card.module.title,
        id: card.module.id
      })
      setDataCard(card.cards)

    }
    fetchedCard()
  }, [])


  return (
    <div>
      {
        dataModule && dataCard ?
          <div>
            <div className="nawbar-cardsIn">{dataModule.title}<Link to={`/module-in/${dataModule.id}`} className="cross-nav-cardsIn">
              <Button variant='outlined'>X</Button>
            </Link></div>
            <div className="cards-in-joke">

              <FlashApp data={dataCard} />

            </div>
          </div>
          :
          ''
      }
    </div>

  );
}

export default CardsIn;