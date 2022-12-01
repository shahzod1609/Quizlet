import React, { useContext, useState } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import EnhancedTable from '../components/Table'
import './profile.css'

const Profile = () => {
    const [rows,setRows] = useState(false)
    const auth = useContext(AuthContext)
    React.useEffect(() => {
        let data
        const fetchedData = async () => {
            data = await fetch(`http://${auth.url}/admin/module`, {
                method: 'GET',
                headers: {
                    'userId': auth.userId,
                    'Content-Type': 'application/json'
                }
            })
            
            data = await data.json()
            await setRows(
                data.usermodule.map((e, i) => {
                    return {
                        ["name"]: e.module.title,
                        ["totalCards"]: e.module.totalCards,
                        ["Result"]: `${data.results[i].fullLearn}%`,
                        ["Username"]: e.module.user.name,
                        ["Date"]: formatDate(e.module.createdAt)
                    }
                })
            )
        }
        fetchedData()
    }, [])

    function formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) 
          month = '0' + month;
        if (day.length < 2) 
          day = '0' + day;
  
        return [year, month, day].join('-');
      }
    return (
        <div className="profile">
            <div className="avatar">

            </div>
            <div className="table">
            <EnhancedTable rowsData={rows} />
            </div>
        </div>
    )
}

export default Profile;
