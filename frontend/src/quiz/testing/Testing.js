import React from 'react';
import './Testing.css';

import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
const Testing = ({ end, oldData, barla, moduleId }) => {
    const navigate = useNavigate()
    return (
        <div className="list-for-passing-learning">
            <div className="congratulation-after-5-elem">
                <h3 className="h3-na-break-time">Gutlayan!!!</h3>
            </div>
            <div className="list-of-break-slide">
                {
                    oldData.map((data, index) => {
                        return (
                            <div key={data.id}>
                                {   data.learn !== 3 &&
                                    <div className="mini-list-of-break-time" >
                                        <div className="text-of-break-test-1">{data.term}</div>
                                        <div className="vertical-line-of-break-time"></div>
                                        <div className="text-of-break-test-2">{data.definition}</div>
                                    </div>
                                }
                            </div>

                        )

                    })
                }


            </div>
            <div className="buttons-for-break-time-slide">
                <Button variant="contained" onClick={()=>{navigate(`/module-in/${moduleId}`)}} >Esasy sahypa</Button>
                {
                    !end ?
                        <Button variant="outlined" onClick={barla}>Yzyny dowam et</Button>
                    :   
                        <Button variant="outlined"  onClick={barla}>Tazeden gaýtalamak</Button>
                    
                }

            </div>
        </div>
    );
}

export default Testing;