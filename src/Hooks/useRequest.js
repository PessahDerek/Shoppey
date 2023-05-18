import axios from "axios"
import { useNavigate } from "react-router-dom"
import useUser from "./useUser"


// let path = "http://localhost:5000/api/v1"
let path = "https://shoppey.onrender.com/api/v1"

export default function useRequest(){
    const navigate = useNavigate()
    let { token } = useUser()
    
    let api_ = (offline) => {
        if(token === null){
            let signup = window.confirm("Would you like to sign up/Login? This will give you cloud storage across devices and more functions")
            if(signup) return navigate('/auth')  
            offline()
        } 
        return axios.create({
            headers: {
                Accept: "application/json",
                token: token
            },
            baseURL: path
        }) 
    } 
    
    return { api_ }
}


export const bareApi = axios.create({
        headers: {
            Accept: "application/json",
            token: localStorage.getItem('shoppeyToken')
        },
        baseURL: path
})