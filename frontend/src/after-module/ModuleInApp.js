import React, { useContext, useEffect, useState } from 'react';
import './UserModule.css'
import CardNafigation from './CardNavigation/CardNafigation';
import FlashApp from './FlashCard/FlashApp';
import TBracketListApp from './BracketList/True/BracketListApp';
import UBracketListApp from './BracketList/Unknown/BracketListApp';
import EBracketListApp from './BracketList/Equal/BracketListApp';
import { Link, useQuery, useParams, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import AllListApp from './BracketList/All/BracketListApp';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Loading from '../shared/components/FormElements/Loading';


const ModuleInApp = () => {
  const auth = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [query] = useSearchParams()
  let searchBool = false
  const justTest = query.get('search')
  if (justTest)
    searchBool = true
  const params = useParams()
  const moduleId = params.moduleid
  const [score, setScore] = useState()
  const [dataCard, setDataCard] = useState()
  const [user, setUser] = useState([])
  const [scoreResult, setScoreResult] = useState(false)
  const [warning, setWarning] = useState(false)
  useEffect(() => {
    const fetchedCard = async () => {
      let card = await fetch(`http://${auth.url}/admin/cards/` + moduleId, {
        method: 'GET',
        headers: {
          'userId': auth.userId,
          'search': searchBool,
          'Content-Type': 'application/json'
        }
      })
      card = await card.json()
      console.log(card)
      let userIdOld = await card.userId

      setDataCard(card)
      const totalNotLearning = await card.cards.filter(item => item.learn === null)
      const totalPartLearning = await card.cards.filter(item => item.learn === 1 || (item.learn === true && item.learn !== 2) || item.learn === 0)
      const totalFullLearning = await card.cards.filter(item => item.learn === 2)
      if (totalFullLearning.length === card.cards.length) {
        setWarning(true)
      }
      setScore({
        totalFullLearning: totalFullLearning,
        totalNotLearning: totalNotLearning,
        totalPartLearning: totalPartLearning
      })

      setUser(card.module.user)
      let boolA = false
      // if( (totalFullLearning.length>0 || totalPartLearning.length>0  ) && auth.userId === card.module.user.id )
      if (auth.userId === userIdOld && (totalFullLearning.length > 0 || totalPartLearning.length > 0))
        boolA = true
      setScoreResult(boolA)
      setLoading(false)
    }
    fetchedCard()

  }, [])


  return (

    <div>
      {
        loading &&
        <Loading />
      }
      <div className="mainest">
        <div className="flash-card-div2">
          {
            dataCard &&
            <h1 className="h1-name-folder">{dataCard.module.title}</h1>
          }
          <CardNafigation warning={warning} searchBool={searchBool} moduleId={moduleId} />
          {
            dataCard && <FlashApp data={dataCard.cards} />
          }

        </div>

        {
          user &&
          <div className="users-div">
            <a href="/#username">
              <div className="user-avatar-in-afterModule">
                <Avatar
                  src={user.image ? `http://${auth.url}/${user.image}` : ''}
                />
              </div>
            </a>
            <div>
              <div className="avtor">Awtor</div>
              <a href="/#username">

                <div className="user-name-brackets">{user.name}</div>
              </a>
            </div>
          </div>
        }

        <div className="brackets-list-1">
          {
            dataCard && <AllListApp data={dataCard.cards} />
          }
        </div>
        {scoreResult &&
          <main>
            <div className="brackets-list-1"><TBracketListApp data={score.totalFullLearning} /></div>
            <div className="brackets-list-2"><EBracketListApp data={score.totalPartLearning} /></div>
            <div className="brackets-list-3"><UBracketListApp data={score.totalNotLearning} /></div>
          </main>
        }
        {
          dataCard && dataCard.module.userId === auth.userId &&
          <Link to={`/add-module/?edit=true&id=${moduleId}`} ><Button className="btn-for-module-in-app" variant="contained">Module üýtget</Button> </Link>
        }
        <div className="div-for-module-btn"></div>
      </div>

    </div>


  );
};

export default ModuleInApp;
