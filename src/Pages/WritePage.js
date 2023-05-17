import React, { useEffect, useRef, useState } from 'react'
import Page from '../Components/Page'
import Input1 from '../SubComponents/Input1'
import '../Styles/pages.css'
import ItemsList from '../Components/ItemsList'
import Button1 from '../SubComponents/Button1'
import useList from '../Hooks/useList'
import DefaultWriteValue from '../Utils/DefaultWriteValue'
import ListDetail from '../Components/ListDetail'

const WritePage = () => {
    const { saveList } = useList()

    const [newList, setNewList] = useState({
        title: "", // user generated / auto based on month
        shoppey: "", // will be set in db
        budget: "", // user generated
        items: [], // user generated
        notes: "", // user generated
        shopped: false, // auto
        cost: "", // user generated later
        
      })

    const object = useRef(null)

    const [items, setItems] = useState([new DefaultWriteValue()])



    useEffect(()=>{
      setNewList(p => ({...p, items: items}))
      object.current = newList
      console.log('guilty')
      // sessionStorage.setItem('shoppeyList', JSON.stringify(newList))
    }, [items])
    

    // save all data 
    window.addEventListener('beforeunload', e=>{
      if(object.current.items.length < items.length){
        object.current.items = items
        localStorage.setItem('shoppeyList', JSON.stringify(object.current))
        e.returnValue = false
      }
      e.returnValue = true
    })

    useEffect(()=>{
      var intervID = setInterval(() => {
      localStorage.setItem('shoppeyList', JSON.stringify(object.current))
    }, 2000);

      try {
        if(newList.items.length < 2){
          let fromStorage = JSON.parse(localStorage.getItem('shoppeyList'))
          if(fromStorage.items.length > 1){
            let add = true
            for(let i of fromStorage.items){
              if(typeof(i) !== 'object' || i === null || i === undefined){
                add = add * false
              }
            }
            if(add){
              setNewList(p => (fromStorage))
              setItems(p=>(fromStorage.items.filter(itm =>( itm !== (null || undefined)) && typeof(itm) === 'object')))
            }
          }
        } 
      } catch (error) {
      }
      return(()=>clearInterval(intervID))
    }, [newList])

    const purge = () => {
      localStorage.removeItem('shoppeyList')
      object.current = newList
      setItems(p => ([new DefaultWriteValue()]))
      setNewList(p=>({...p, items: [], title: "", budget: ""}))
    }

  return (
    <Page id='write-page' title="New List">
        <div className='list-details'>
          <h3>Details</h3>
          <ListDetail list={newList} change={setNewList} />
          <h3>Items</h3>
          <ItemsList items={items.filter(p => p !== undefined && typeof(p) !== 'string' && p !== null)} setItems={setItems} />

          <h3>Notes</h3>
          <textarea value={newList.notes} 
            placeholder='Any notes/instructions'
            onChange={e=>setNewList(p => ({...p, notes: e.target.value}))} />
          
          <span className='btns'>
            <Button1 text="Save" action={()=>saveList(newList)} />
            <Button1 text="Share" />
            <Button1 text="Cancel" action={purge} />
          </span>
        </div>
    </Page>
  )
}

export default WritePage