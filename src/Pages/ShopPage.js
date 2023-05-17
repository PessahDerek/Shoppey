import React, { useEffect, useState } from 'react'
import Page from '../Components/Page'
import { Route, Routes, useLocation } from 'react-router-dom'
import AllListsPage from './AllListsPage'
import Spinner from '../SubComponents/Spinner'
import ListDetail from '../Components/ListDetail'
import Input1 from '../SubComponents/Input1'
import '../Styles/pages.css'
import Checklist from '../Components/Checklist'

const ShopPage = () => {
  const [list, setList] = useState(null)
  const [total, setTotal] = useState(0)

  const location = useLocation()
  
  useEffect(()=>{
    try {
      let fixObj = location.state.list
      for(let i in fixObj.items){
        let hold = fixObj.items[i]
        hold.price = isNaN(Number(hold.price)) ? 0 : Number(hold.price)
        hold.count = (isNaN(Number(hold.count)) || hold.count.length < 1) ? 1 : Number(hold.count)
        fixObj.items[i] = hold
        if(!hold.item)fixObj.items.splice(i, 1)
      }
      setList(fixObj)
    } catch (error) {
      
    }
    return (()=>{
      setList(null)
    })
  }, [])

  const getTotal = () => {
    console.log("shit")
    try {
      let y = list.items.reduce((acc, x) => Number(acc) + (Number(x.price) * (x.count === '' ? 1 : Number(x.count))), 0)
      if(isNaN(y)) return setTotal(0)
      setTotal(y)
    } catch (error) {
      console.log('y shit: ')
      setTotal(0)
    }
  }

  useEffect(()=>{
    console.log('change...', list)
    getTotal()
  }, [list])


  return (
    <Page title={"Shop"} id="shop-page">
      {list === null && <Spinner /> }
      {list !== null && 
      <>
        <div className='details'>
          <span>
            <label>List Name</label><Input1 value={list.title} disab />
          </span>
          <span>
            <label>Budget</label><Input1 value={list.budget} name="budget" change={setList} />
          </span>
          <span>
            <label>Total</label>
            <Input1 ph="Total" value={total} disab />
          </span>
        </div>
        <Checklist setTotal={setList} items={list.items} />
      </>
      }
    </Page>
  )
}

export default ShopPage