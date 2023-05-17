import React from 'react'
import Page from '../Components/Page'
import HomeScreenButton from '../SubComponents/HomeScreenButton'
import bag from '../Images/Group 2.png'
import StyledName from '../SubComponents/StyledName'
import '../Styles/pages.css'
import { BsFillPencilFill } from 'react-icons/bs'
import { GoTasklist } from 'react-icons/go'
import { RiAccountCircleFill } from 'react-icons/ri'

const Home = () => {
  return (
    <Page id='home'>
        <div className='title'>
          <img src={bag} alt="" />
          <StyledName />
        </div>
        <div className='btn-menu'>
            <HomeScreenButton icon={<BsFillPencilFill />} text="Write" path="/write" />
            <HomeScreenButton icon={<GoTasklist />} text="Lists" path="/lists" />
            {/* <HomeScreenButton text="Shop" path="/shopmenu" /> */}
            <HomeScreenButton icon={<RiAccountCircleFill />} text="Profile" path='/profile'/>
        </div>
    </Page>
  )
}

export default Home