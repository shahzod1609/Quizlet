import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import './CardNafigation.css'
import BasicModal from './BasicModal'

const CardNafigation = ({ moduleId, searchBool, warning }) => {
    const auth = useContext(AuthContext)
    const [isOpen , setIsOpen] = useState(false)
    const navigate = useNavigate()
    let data
    const postModule = async (id) => {
        
        if (searchBool) {
            data = await fetch(`http://${auth.url}/admin/add-module-id/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': auth.userId
                }
            })
            data = data.json()

        }
        setIsOpen(false)
        navigate(`/learn/${moduleId}`)

    }
    const openModal = (open) => {
        setIsOpen(open)
    }   
    return (
        <div>
            <BasicModal setIsOpen={setIsOpen} isOpen={isOpen} postModule={postModule} moduleId={moduleId} />
            <div className="learn">{/* <h1 className="izuc">Öwrenmek</h1> */}
                <Link to={`/cards/${moduleId}`}>
                    <div className="div-nav-1">
                        <div className="icon-1"></div>
                        <div className="block-outline">
                            <div className="text-1">Kartlar</div>
                            <h5>Gaýtalamak üçin ulanyň</h5>
                        </div>
                    </div>
                </Link>
                <div onClick={ async () => { !warning ? await postModule(moduleId)  : openModal(true)}} >
                    <div className="div-nav-2">
                        <div className="icon-2"></div>
                        <div className="block-outline">
                            <div className="text-2">Öwrenmek</div>
                            <h5>Öwrenmek üçin ulanyň</h5>
                        </div>
                    </div>
                </div>
                <Link to={`/test/${moduleId}`}>
                    <div className="div-nav-3">
                        <div className="icon-3"></div>
                        <div className="block-outline">
                            <div className="text-3">Test</div>
                            <h5>Özini barlamak üçin ulan</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CardNafigation;