import React from 'react'
import Input1 from '../SubComponents/Input1'

const ListDetail = ({list, change }) => {
  return (
    <div className='list-details'>
        <span>
            <label>Title</label>
            <Input1 ph={"Random Name"} name="title" change={change} value={list.title} />
        </span>
        <span>
            <label>Budget</label>
            <Input1 ph="Roughly" name="budget" change={change} value={list.budget} />
        </span>
    </div>
  )
}

export default ListDetail