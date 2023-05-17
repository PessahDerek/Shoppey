import React, { useEffect, useRef } from 'react'
import '../Styles/subComp.css'

const Input1 = ({ph, required, focus, type, name, value, change, disab}) => {
  const loadCount = useRef(0)
  const thisInput = useRef(null)

  useEffect(()=>{
    if(focus){
      if(loadCount.current < 1){
        thisInput.current.focus()
      }
    }
  }, [])

  return (
    <input ref={thisInput} required={required}  type={type ? type : "text"} disabled={disab} className='input-1' placeholder={ph} value={value} onChange={({target:{value}})=>change(p=>({...p, [name]: value}))}  />
  )
}

export default Input1