import React, { useState } from 'react';
import { Modal } from './Modal';
import './Modal.css'

import Button from '@mui/material/Button';
function MaodalApp() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () =>{
        setShowModal(prev => !prev)
    }
    return (
        <div className="modal-list-app-23">
           
            <Button  variant="contained" className="btn-modal-2" onClick={openModal}>Bukja Gos</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            
        </div>
    );
}

export default MaodalApp;