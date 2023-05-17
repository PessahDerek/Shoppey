import React from 'react'
import '../Styles/subComp.css'
import { useNavigate } from 'react-router-dom'

const HomeScreenButton = ({text, icon, path}) => {
    const navigate = useNavigate()

    const goto = () => navigate(path)

  return (
    <button className='home-screen-button' onClick={goto}>
        {icon}<p>{text}</p>
    </button>
    )
}

export default HomeScreenButton