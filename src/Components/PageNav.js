import React from 'react'
import '../Styles/components.css'
import { useNavigate } from 'react-router-dom'

const PageNav = ({title, menuBtn}) => {
  const navigate = useNavigate()
  return (
    <nav className='page-nav'>
        <span onClick={()=>navigate('/')}>
            {/* TODO: icon */}
            <h1>{title}</h1>  
        </span>
        
        {menuBtn}
    </nav>
  )
}

export default PageNav