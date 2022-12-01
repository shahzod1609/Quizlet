import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import './mainCard.css'

function MainCard({ word, cards, result }) {
    const auth = useContext(AuthContext)
    const [url, setUrl] = useState(null)
    useEffect(() => {
        for (let index = 0; index < cards.length; index++) {
            const element = cards[index];
            if (element.image !== null)
                setUrl(element.image)
        }
    }, [])
    if (word === null)
        return
    return (
        <Link to={`/module-in/${word.id}`} className="card-1">
            <div className="div-dlya-flex">
                <div className="hatar-ucin-div">
                    <div>
                        {/* Modulun name */}
                        <div className="modul-name">{word.title}</div>
                        {/* id nace sanak bolsa */}
                        <div className="id-number">{word.totalCards} termin</div>
                    </div>

                    {/* user name */}
                    <div className="username-div">
                        <Link to='/profile' className="username">
                            <Avatar style={{ width: '30px', height: '30px' }} src={auth.image ? `http://${auth.url}/${auth.image}` : ''} />
                            <div className="user-name-word-in-search-bar">{word.user.name}</div>
                        </Link>
                    </div>
                </div>
                <div>
                    {
                        url !== null &&
                        <div className="photo">
                            <img src={`http://${auth.url}/${url}`} className="sircle-icon-users" />
                        </div>
                    }
                </div>
            </div>
            <div className="statistic-for-main">
                {
                    result.notLearn>0 &&
                    <div className="gray-area" style={{ width: `${result.notLearn}%` }}> {result.notLearn}% </div>
                }
                {
                    result.notLearn>0 && result.partLearn>0 &&
                    <div className="gradient-yellow"></div>
                }
                {
                    result.partLearn>0 &&
                        <div className="yellow-area" style={{ width: `${result.partLearn}%` }}>{result.partLearn}%</div>
                
                }
                {
                    result.partLearn>0 && result.fullLearn>0 &&
                    <div className="gradient-green"></div>
                }
                {

                    result.fullLearn > 0 &&
                        <div className="green-area" style={{ width: `${result.fullLearn}%` }}>{result.fullLearn}%</div>
                }
            </div>
        </Link>
    );
}

export default MainCard;