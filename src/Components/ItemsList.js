import React, { useEffect, useState } from 'react'
import WriteItem from './WriteItem'
import DefaultWriteValue from '../Utils/DefaultWriteValue'
import '../Styles/components.css'
import { genId } from '../Utils/genId'

const ItemsList = ({items, setItems}) => {

  // duplicate default_ other exists above this component
  // const default_ = {indx: 0, item: "", count: "", price: 0}
  // const [items, setItems_] = useState([default_])


  const add = (newItem) => {
    // check if newitem is valid
    let invalids = [undefined, 'undefined', null, 'null', NaN]
    if(Object.keys(newItem).length < 4) return
    if(!invalids.includes(newItem)){
      let exists = false, index = 0;
      for(let i = 0; i < items.length; i++){
        if(items[i].indx === newItem.indx) {
          exists = true;
          index = i
          break
        }
      }
      let hold = items
      if(exists){
        hold[index] = newItem
      }else{
        hold.push(newItem)
      }
      if(hold.at(-1).indx === newItem.indx) hold.push(new DefaultWriteValue())
      setItems(p => (hold))
      return true
    }
  }

  const del = (indx) => {
    // special case for indx 0 - its edited not removed
    try {
      let hold = items.filter(item => item.indx !== indx)
      if(hold.length < 1) hold.push(new DefaultWriteValue())
      setItems(p=>([...new Set(hold)]))
    } catch (error) {
      
    }
    
  }

  return (
    <div className='items-list'>
      {items.map((item, index)=><WriteItem key={item.indx} 
        savedItem={item}
        index={index}
        indx={item.indx}
        add={add}
        del={del}
      />)}
    </div>
  )
}

export default ItemsList