import React from 'react'
import '../Styles/subComp.css'

const IconBtnSm = ({icon, action}) => {
  return (
    <button className='icon-btn-small' onClick={action} >
        {icon}
    </button>
  )
}

export default IconBtnSm