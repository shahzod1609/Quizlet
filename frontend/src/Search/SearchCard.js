import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import './SearchCard.css'

function SearchCard({ word, postModule, moduleId, userData }) {
    const [button, setButton] = useState(true)
    const auth = useContext(AuthContext)
    useEffect(() => {

        for (let index = 0; index < userData.length; index++) {
            const element = userData[index];
            if (element.moduleId === moduleId) {
                setButton(false)
            }
        }
    }, [])
    if (button)
        return (
            <div className="div-shahzod">
                {/* { button && */}
                < div className="search-card-12" >
                    <Link to={`/module-in/${word.id}?search=true`} >

                        {/* Modulun name */}
                        <div className="search-modul-name">{word.title}</div>
                        {/* id nace sanak bolsa */}
                        <div className="search-id-number">{word.totalCards}Termin</div>
                        {/* user name */}
                        <div className="username-div">
                            <Link to='/profile' className="username">
                                <Avatar style={{ width: '30px', height: '30px' }} src={auth.image ? `http://${auth.url}/${auth.image}` : ''} />
                                <div className="user-name-word-in-search-bar">{word.user.name}</div>
                            </Link>
                            {/* <Link to="#username" >
                                <img src={`http://${auth.url}/${word.user.image}`} className="sircle-icon-users-2" />
                                {word.user.name}
                            </Link> */}
                        </div>
                    </Link>
                    <div>
                        <button className="gosmak-icon-search"
                            onClick={
                                () => {
                                    postModule(word.id)
                                    setButton(false)
                                }
                            } >
                            Özüňe goşmak
                            </button>
                    </div>

                </div >
                {/* } */}
            </div>
        );
}

export default SearchCard;