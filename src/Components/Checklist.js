import React from 'react'
import CheckListItem from '../SubComponents/CheckListItem'
import '../Styles/components.css'

const Checklist = ({setTotal, items}) => {

    const addToTotal = (item) => {
        let hold = items
        for(let index in hold){
            if(hold[index].indx === item.indx){
                hold[index] = item
                break
            }
        }
        setTotal(p => ({...p, items: hold}))
    }

  return (
    <div className='check-list'>
        <div className='headings'>
            <label>No.</label>
            <label>Item</label>
            <label>Count</label>
            <label>Price</label>
            <label></label>
        </div>
        {items.map((item, indx) => <CheckListItem key={item.indx}
            indx={indx} 
            item={item}
            addToTotal={addToTotal}
        />)}
    </div>
  )
}

export default Checklist