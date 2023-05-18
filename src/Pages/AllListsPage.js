import React, { useEffect } from 'react'
import Page from '../Components/Page'
import ListWidget from '../Components/ListWidget'
import useList from '../Hooks/useList'
import '../Styles/pages.css'

const AllListsPage = () => {
  const { lists } = useList()

  return (
    <Page title={"Lists"} id='all-lists-page'>
      {lists.length < 1 ? <h1>You have no pending list...</h1> : 
      lists.map(list => <ListWidget key={list._id} list={list} />)}
    </Page>
  )
}

export default AllListsPage