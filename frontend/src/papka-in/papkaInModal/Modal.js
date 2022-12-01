import { Button } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './Modal.css'
import ModalModuleCard from './ModalModuleCard';


export const Modal = ({ setUpdate, showModal, setShowModal, folderId, words }) => {

    const auth = useContext(AuthContext)
    const onSubmit = async (e) => {
        e.preventDefault()
        const module = []
        for (let i = 0; i < words.length; i++) {
            if (e.target[i].checked) {
                module.push({ id: words[i].moduleId })
            }
        }
        try {
            await fetch(`http://${auth.url}/admin/folder/addmodule/${folderId}`, {
                method: 'POST',
                body: JSON.stringify({ module: module }),
                headers: {
                    'Content-Type': 'application/json',
                    'userId': auth.userId,
                    'authorization': `Bearer ${auth.token}`
               }
            })
            await setShowModal(prev => !prev)
            await setUpdate(oldValue => oldValue + 1)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {showModal && (
                <div className="bg-modal-div">
                    <div className="module-modal-div">
                        <div className="flex-for-cross">
                            <h1 className="h1-module-modal">Bukja modul goş</h1>
                            <Button variant="outlined" className="cross-module-btn-modal" onClick={() => setShowModal(prev => !prev)}>X</Button>
                        </div>
                        <div className="display-at-modal-papka-in">
                            <form onSubmit={onSubmit}>
                                <div className="scroll-module-in-modal">
                                    {/* ----------------------------- */}
                                    {words.length > 0 ? words.map(word => {
                                        return (
                                            <ModalModuleCard word={word.module} key={word.id} />
                                        )
                                    })
                                        :
                                        <h1>Bagyşlaň sizde modul ýok!!</h1>
                                    }
                                    {/* --------------------------- */}
                                </div>
                                <Button variant="outlined" type="submit" className="save-button-module-modal">Ýatda sakla!!</Button>
                            </form>


                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}