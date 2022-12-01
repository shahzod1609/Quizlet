import React, { useContext, useEffect, useState } from 'react';
import SearchCardList from './SearchCardList';
import { AuthContext } from '../shared/context/auth-context';
import { useLocation } from 'react-router-dom';



const SearchListApp = () => {

  const DATA = {};
  const [data,setData] = useState(DATA)
  const [userData,setUserData] = useState()
  
  const auth = useContext(AuthContext)
  let {search} = useLocation()
  const query = new URLSearchParams(search)
  let ModuleName = query.get('search')
  
  const [moduleName , setModuleName] = useState(ModuleName)
  if(ModuleName!==moduleName)
    setModuleName(ModuleName)
  useEffect(()=>{
      const fetchedSearch = async() => {
          let data1 = await fetch(`http://${auth.url}/admin/search?module=${moduleName}`,{
              method:'GET',
              headers:{
                  'userId':auth.userId,
                  'Content-Type':'application/json'
              }
          })
          data1 = await data1.json()
          setData(data1.searchData)
          setUserData(data1.userData)
      }
      fetchedSearch()
  },[moduleName])

  return (
      // <div className="centrick-etmek-ucin-div"><h1 className="search-ned">Gözlegiň netijesi: ({data!==undefined ? data.length : 0})</h1>
      <div><h1 className="search-ned">Gözlegiň netijesi:</h1>
        {
          data!==undefined && userData!==undefined &&
          <SearchCardList userId={auth.userId} userData={userData}  data={data} />
        }
      </div>
    );
  };

export default SearchListApp;