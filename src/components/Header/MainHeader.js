import React, { useEffect, useState } from 'react'
import './MainHeader.css'
import Button from '../Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import noImg from '../../assets/image/noImg.jpg'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const MainHeader = () => {

  const [imageProfile,setImageProfile]=useState(null)

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if (user){
        setImageProfile(user?.photoURL)
      } else {
        setImageProfile(noImg)
      }
    })
    return ()=>unsubscribe();
  },[])

  return (
    <header className="main-header-container">
      <div className="right-contents">
        <div className="action-button">
          <FavoriteIcon className="action-icon" style={{ fontSize: 32 }} />
          <MessageIcon className="action-icon" style={{ fontSize: 32 }} />
          <NotificationsIcon className="action-icon" style={{ fontSize: 32 }} />
        </div>
        <img src={imageProfile} alt="profile" className="profile-image" />
        <Link to={'/create-listing'}>
          <Button className="listing-button">出品</Button>
        </Link>
      </div>
    </header>
  )
}

export default MainHeader
