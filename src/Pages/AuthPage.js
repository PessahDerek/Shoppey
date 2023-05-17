import React from 'react'
import Page from '../Components/Page'
import StyledName from '../SubComponents/StyledName'
import logo from '../Images/Group 4.png'
import cart from '../Images/cart3dimg.png'
import '../Styles/pages.css'
import AuthForm from '../Components/AuthForm'

const AuthPage = () => {
  return (
    <Page id='auth-page' >
        <div className='title'>
            <span>
                <img src={logo} alt='logo' />
                <img id='cart-img' src={cart} alt='cart' />
            </span>
            <StyledName />
        </div>
        <AuthForm />
    </Page>
  )
}

export default AuthPage