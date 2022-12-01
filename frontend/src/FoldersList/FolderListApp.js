import React, { useContext, useEffect, useState } from 'react';
import MaodalApp from '../modal/MaodalApp';
import { AuthContext } from '../shared/context/auth-context';
import FolderCardList from './FolderCardList';



const FolderListApp = () => {
  const [folders, setFolders] = useState([])
  const auth = useContext(AuthContext)
  useEffect(() => {
    const fetchedFolders = async() => {
      let data = await fetch(`http://${auth.url}/admin/folder`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'userId':auth.userId
        }
      }) 
      data = await data.json()
      setFolders(data)
    }
    fetchedFolders()
  },[])  
  

  return (
      <div> 
        <div className="flex-for-btn-add">
          <h1 className="folder-ned">Sizde { folders ?folders.length : 0} bukja{folders.length>1&&''} bar</h1>
          <div className="Modal-app-modal-flexing">
            <div className="flexed-2-times"><MaodalApp /></div>
          </div>
        </div>
        { folders &&
          <FolderCardList words={folders} />
        }
      </div>
    );
  };



 

export default FolderListApp;