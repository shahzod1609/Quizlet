import React, { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import SearchCard from './SearchCard';
import './SearchCardList.css'


function SearchCardList({ data, userId, userData }) {
    const auth = useContext(AuthContext)
    const postModule = async (id) => {
        await fetch(`http://${auth.url}/admin/add-module-id/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': userId,
                'authorization': `Bearer ${auth.token}`
            }
        })
    }
    

    return (
        <div className="search-card-list">
            { data.length > 0 ? data.map((word, i) => {
                return  < SearchCard
                    userData={userData}
                    word={word.module}
                    moduleId={word.moduleId}
                    postModule={postModule}
                    key={word.id}

                />
            })
                :
                <h1>Modul tapylmady ): </h1>
            }
        </div>
    );
}

export default SearchCardList;