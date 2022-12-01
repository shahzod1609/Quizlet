import React, { useContext, useEffect, useState } from 'react';
import ModuleListApp from './mainList/ModuleListApp';
import './PapkaIn.css'
import { Modal } from './papkaInModal/Modal';
import './papkaInModal/Modal.css'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
let idForUpdate = null
function PapkaIn() {
    
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    
    const   folderId = query.get('folderid') ;
    
    const auth = useContext(AuthContext)
    const [foldermodule , setFolderModule] = useState([])
    const [allmodule , setAllModule] = useState([])
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [update,setUpdate] = useState(0)
    useEffect(()=>{    
        const fetchProducts = async() => {
        let modules = await fetch(`http://${auth.url}/admin/folder/${folderId}`,{
          method:'GET',
          headers:{
            'userId':auth.userId,
            'Content-Type':'application-json'
          }
        })
        modules = await modules.json()
        if(modules.foldermodule){
            setFolderModule(modules.foldermodule.usermodules)
        }else{
            setFolderModule({})
        }
        if(modules.folder){
            setTitle(modules.folder.title)
            setDescription(modules.folder.description)
        }
        if(modules.allmodule)
            setAllModule(modules.allmodule.usermodules)
      }
        fetchProducts()
    },[])

    const [showModal, setShowModal] = useState(false)
    const openModal = () =>{
        setShowModal(prev => !prev)
    }
    useEffect(()=>{    
        const fetchProducts = async() => {
        let modules = await fetch(`http://${auth.url}/admin/folder/${folderId}`,{
          method:'GET',
          headers:{
            'userId':auth.userId,
            'Content-Type':'application-json'
          }
        })
        modules = await modules.json()
        if(modules.foldermodule)
            setFolderModule(modules.foldermodule.usermodules)
        else
            setFolderModule({})
        
        if(modules.allmodule)
            setAllModule(modules.allmodule.usermodules)
        else
            setAllModule({})
        
        setTitle(modules.folder.title)
        setDescription(modules.folder.description)    
        
    }
        fetchProducts()
    },[showModal,update])

    if(folderId !== idForUpdate){
        idForUpdate = folderId
        setUpdate(update+1)
    }

    return (
        <div className="papka-in-area">
            <div className="for-block-info">
            <div className="folder-information">
                <div className="folder-icon-module"></div>
                <div classnaem="folder-info-5">
                    <h3 className="h3-folder-name">{title}</h3>
                    <h3 className="h3-folder-description">{description}</h3>
                </div>
            </div>
            
            <a className="add-papka-module-2" onClick={openModal}>
                <div className="papka-in-icon-1"></div>
                <h1 className="add-module-h1">Modul goş!!</h1>
            </a>
            <Link to={`/add-module?folderid=${folderId}`}>
                <div className="add-papka-module">
                    <div className="papka-in-icon"></div>
                    <h1 className="add-module-h1">Modul döret!!</h1>
                </div>
            </Link>
            </div>
            <Modal setUpdate={setUpdate} folderId={folderId} words={allmodule} showModal={showModal} setShowModal={setShowModal} />
            <div className="papka-in-list">
                <ModuleListApp data={foldermodule}/>
            </div>
        </div>
    );
}

export default PapkaIn;