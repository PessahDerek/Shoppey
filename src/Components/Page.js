import React from 'react'
import PageNav from './PageNav'
import TopCurvyBar from '../SubComponents/TopCurvyBar'


const Page = ({children, id, title, }) => {
  return (
    <div className='page' id={id} data-aos="zoom-in">
      <TopCurvyBar />
      {title && <PageNav title={title} />}
      <div className='container'>
        {children}
      </div>
    </div>
  )
}

export default Page