import React, { useEffect, useState } from 'react'
import Input1 from './Input1'
import { GiCheckMark } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import '../Styles/subComp.css'

const CheckListItem = ({indx, item, addToTotal}) => {
    const [item_, setItem] = useState(item)
    const [done, setDone] = useState(false)

    useEffect(()=>{
        let item_hold = item_
        item_hold.price = Number(item_hold.price)
        item_hold.count = Number(item_hold.count)
        addToTotal(item_hold)
    }, [item_])

    const handleClick = () => setDone(!done)

    let smallIconPlus = <button onClick={handleClick} >
        {done ? <RxCross2 color='red' /> : <GiCheckMark />}
    </button>

    return (
    <div className='checklist-item'>
        <label>{++indx}.</label>
        <label>{item_.item}</label>
        <Input1 ph='Count' disab={done} value={item_.count} change={setItem} type='number' name='count' />
        <Input1 ph='Price' disab={done} type='number' value={item_.price} name="price" change={setItem} />
        {smallIconPlus}
    </div>
    )
}

export default CheckListItem