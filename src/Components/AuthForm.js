import React, { useState } from 'react'
import '../Styles/components.css'
import Input1 from '../SubComponents/Input1'
import Button1 from '../SubComponents/Button1'
import Spinner from '../SubComponents/Spinner'
import { bareApi } from '../Hooks/useRequest'
import useUser from '../Hooks/useUser'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
    const [details, setDetails] = useState({
        userName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [login, setLogin] = useState(false)
    const [spin, setSpin] = useState(false)
    const { storeToken } = useUser()
    const navigate = useNavigate()

    const authenticate = async() => {
        if(!login)if(details.password !== details.confirmPassword)return alert("Passwords don't match!")
        setSpin(true)
        let path = `/${login ? "login": "signup"}`

        await bareApi.post(path, details)
        .then(({data})=>{
            storeToken(data.token)
            setSpin(false)
            navigate('/')
        })
        .catch(({message, response})=>{{
            if(response){
                setSpin(false)
                return alert(response.data.message)
            }
            setSpin(false)
            alert(message)
        }})
    }


  return (
    <form className='auth-form' onSubmit={e => e.preventDefault()}>
        {spin && <Spinner />}
        <h1>{login ? "Login" : "Signup"}</h1>
        <Input1 ph="Username" 
            value={details.userName} name="userName"
            change={setDetails} 
            required
        />

        {!login && <Input1 ph="Phone" 
            value={details.phone} name="phone"
            change={setDetails}
        />}
        <Input1 ph="Password" 
            value={details.password} name="password"
            change={setDetails}
        />
        {!login && <Input1 ph="Confirm Password" 
            value={details.confirmPassword} name="confirmPassword"
            change={setDetails}
        />}
        <Button1 text={login ? "Login" : "SignUp"}  
            action={authenticate}
        />
        <Button1 text={login ? "Signup Instead" : "Login Instead"} 
            action={()=>setLogin(!login)} 
        />
    </form>
  )
}

export default AuthForm