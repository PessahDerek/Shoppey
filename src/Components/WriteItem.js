import React, { useEffect, useRef, useState } from 'react'
import Input1 from '../SubComponents/Input1'
import '../Styles/components.css'
import { GiCheckMark } from 'react-icons/gi'
import { MdAddShoppingCart, MdDelete } from 'react-icons/md'

const WriteItem = ({indx, index, savedItem, add, del}) => {
    const loadCount = useRef(0)
    const thisInp = useRef(null)

    const [item, setItem] = useState({
        indx: indx,
        item: "",
        count: "",
        price: "", // generated at shopping,
    })
    const [timer, setTimer] = useState(null)
    const [saved, setSaved] = useState(false)

    // load data from cache 
    useEffect(()=>{
        if(savedItem){
            if(loadCount.current < 1){
                if(savedItem !== null && typeof(savedItem)==='object')setItem(p=>(savedItem))
                if(savedItem.item || item.item)setSaved(true)
            }
        }
    }, [savedItem])

    const handleClick = () => {
        if(saved){
            return setSaved(false)
        }
        if(item.item)setSaved(add(item))
    }

    let smallIconPlus = <button onClick={handleClick}
        onTouchStart={()=>setTimer(setTimeout(()=>del(indx - 1), 2000))}
        onTouchEnd={()=>{
            clearTimeout(timer)
            setTimer(null)
        }}
    >
        {saved ? <GiCheckMark /> : <MdAddShoppingCart />}
    </button>
    let smallIconMin = <button disabled={!saved} onClick={()=>del(indx)}>
        <MdDelete />
    </button>
        
    return (
    <div className='write-item' data-aos="zoom-in">
        <b>{++index}</b>
        <Input1 focus disab={saved} ph='Item' value={item.item} change={setItem} name="item" />
        <Input1 disab={saved} ph='Count' value={item.count} change={setItem} type="number" name="count" />
        {smallIconPlus}
        {window.innerWidth > 600 && smallIconMin}
    </div>
  )
}

export default WriteItem