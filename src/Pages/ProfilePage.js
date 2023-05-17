import React, { useEffect, useState } from 'react'
import Page from '../Components/Page'
import useUser from '../Hooks/useUser'
import Input1 from '../SubComponents/Input1'
import { useNavigate } from 'react-router-dom'
import Button1 from '../SubComponents/Button1'
import '../Styles/pages.css'
import { bareApi } from '../Hooks/useRequest'

const ProfilePage = () => {
  const { user } = useUser()
  const [user_, setUser_] = useState({
    completed: "",
    total: "",
    userName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(user)
    if(!user){
      alert("You need to sign in first ")
      navigate('/auth')
    } 
  }, [])

  const saveEdit = async() => {
    if(edit === true){
      if(user_.password && (user_.password === user_.confirmPassword)){
        await bareApi.post('/update')
        .then(res => alert(res.data.saved))
        .catch(({message, response}) => alert(response ? response.message : message))
      }
      return setEdit(false)
    }
    setEdit(true)
  }

  return (
    <Page title={"Profile"} id="profile-page">
      <div className='profile-form' data-aos="fade-in" >
        <h1>Personal Info</h1>
        <Input1 disab={!edit} value={user_.userName} name="userName" change={setUser_} />
        <Input1 disab={!edit} value={user_.phone} name='phone' change={setUser_} />
        {edit && <>
          <h3>Change Password</h3>
          <Input1 disab={!edit} data-aos="fade-in" value={user_.password} name='password' change={setUser_} />
          <Input1 disab={!edit} data-aos="fade-in" value={user_.confirmPassword} name='confirmPassword' change={setUser_} />
        </>}
        <Button1 text={edit ? "Save" : "Edit"} action={saveEdit} />
         
      </div>
    </Page>
  )
}

export default ProfilePage