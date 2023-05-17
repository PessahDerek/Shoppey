import React from 'react'
import '../Styles/components.css'
import holder from '../Images/Artboard – 1.png'
import Button1 from '../SubComponents/Button1'
import { useNavigate } from 'react-router-dom'
import IconBtnSm from '../SubComponents/IconBtnSm'
import { MdDelete } from 'react-icons/md'
import { BsCart4 } from 'react-icons/bs'
import useList from '../Hooks/useList'

const ListWidget = ({list}) => {
    const navigate = useNavigate()
    const { deleteList } = useList()

    // navigate to go shop
    const goto = () => navigate('/shop', {state: {list: list}})

    const deleteList_ = async() => await deleteList(list._id)

  return (
    <div className='list-widget' data-aos="fade-up">
        <div className='image-div'>
            <img src={holder} alt="holder" />
        </div>
        <div className='details'>
            <h3>{list.title}</h3>
            <div className='p'>
                {list.items.map(item => <p key={item.indx}>{item.item}</p>)}
            </div>
            
            <span className='btns'>
                {/* <Button1 text={"Shop"} action={goto} />
                <Button1 text={"Share"} /> */}
                <IconBtnSm icon={<BsCart4 />} action={goto} />
                <IconBtnSm icon={<MdDelete />} action={deleteList_} />
            </span>
        </div>
    </div>
  )
}

export default ListWidget