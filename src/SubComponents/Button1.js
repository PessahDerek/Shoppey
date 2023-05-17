import React from 'react'
import '../Styles/subComp.css'

const Button1 = ({text, icon, action}) => {
  return (
      <button className='button-1' onClick={action}>
          {text}{icon}
      </button>
  )
}

export default Button1