import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import MainListCardList from './MainListCardList';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import BasicModal from './BasicModal'
import Loading from '../../shared/components/FormElements/Loading'

const MainListApp = () => {
  const auth = useContext(AuthContext)
  const [data, setData] = useState(false)
  const [result, setResult] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProducts = async () => {
      let modules = await fetch(`http://${auth.url}/admin/module`, {
        method: 'GET',
        headers: {
          'userId': auth.userId,
          'Content-Type': 'application/json'
        }
      })
      modules = await modules.json()
      setData(modules.usermodule)
      setResult(modules.results)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const openModal = (open) => {
    setIsOpen(open)
  }




  return (<div>
    {
      loading && <Loading />
    }
    <h2 className="ned">Modullar <BasicModal setIsOpen={setIsOpen} isOpen={isOpen} />
      <HelpCenterOutlinedIcon onClick={() => { openModal(true) }} color="primary" fontSize="large" />
    </h2>
    {
      result && data &&
      <MainListCardList result={result} words={data} />}
  </div>
  );
};





export default MainListApp;