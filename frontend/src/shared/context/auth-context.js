import {createContext} from 'react'

export const AuthContext= createContext({
    isLoggedIn:false,
    token:false,
    userId:null,
    image:'',
    url:'localhost:8080',
    login:()=>{},
    logout:()=>{}
})