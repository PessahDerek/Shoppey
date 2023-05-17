import { useEffect, useState } from "react";
import axios from "axios";
import { bareApi } from "./useRequest";


export default function useUser(){

    const storeToken = (token) => {
        localStorage.setItem('shoppeyToken', token);
        setToken(p => (token))
    }
    const getTokenFrmStorage = () => localStorage.getItem('shoppeyToken')

    const [token, setToken] = useState(getTokenFrmStorage())
    const [user, setUser] = useState(null)

    const verifyToken = async() => {
        let {data:{verified}} = await bareApi.get("/verifytoken")
        if(!verified) return localStorage.removeItem('shoppeyToken')
        // save last verified date
        localStorage.setItem('shoppeyValid', JSON.stringify(new Date(Date.now())))
    }

    const getUser = async() => {
        await bareApi.get('/user')
        .then(({data:{user}})=>setUser(user))
        .then(()=>console.log("user is set"))
        .catch(({message, response})=>{
            if(response)return alert(response.data.message)
            alert(message)
        })
    }

    useEffect(()=>{
        try {
            let lastVerified = JSON.parse(localStorage.getItem('shoppeyValid'))
            let dateToday = new Date(Date.now())
            
            let timeDiff = Math.abs(dateToday.getTime() - lastVerified.getTime())
            let diff = Math.ceil(timeDiff / (1000 * 3600 * 24))
            if(diff >= 7){
                verifyToken()
            } 
            getUser()
        } catch (error) {
            
        }
        
    }, [])

    return { storeToken, token, user }
}