import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import './Modal.css'


export const Modal = ({showModal, setShowModal}) => {
    const auth = useContext(AuthContext)
    
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        let data = {
            title:e.target[0].value,
            description:e.target[1].value
        }
        fetch(`http://${auth.url}/admin/folder`,{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'userId':auth.userId,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${auth.token}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            const id = result.id
            setShowModal (prev => !prev)
            navigate(`/papka-in?folderid=${id}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return(
        <div>
            {showModal ? (

            <div className="bg-modal-div">
                <div className="moadal-div">
                    <h1 className="h1-modal">Bukja döret!!</h1>
                    <form onSubmit={onSubmit}>
                        <div className="inputs-div">
                            <div className="folder-name"><input className="folder-name-input" type="text"  placeholder="Bukjaň ady" /></div>
                            <div className="folder-description"><input className="folder-description-input" type="text" placeholder="Bukjaň düşündirilişi" /></div>
                        </div>
                        <button className="save-button-modal" type="submit">Ýatda sakla</button>
                        {/* <div type="submit" className="save-button-modal">Save</div> */}
                    </form>
                    <div className="cross-btn-modal" onClick={()=>setShowModal (prev => !prev)}></div>
                </div>


            </div>

            ) : null} 
        </div>
    )
}