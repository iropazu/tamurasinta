import React from 'react'
import './MainHeader.css'
import Button from '../Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import noImg from '../../assets/image/noImg.jpg'

const MainHeader = () => {
  return (
    <div className="main-header-container">
      <div className="right-contents">
        <div className="action-button">
          <FavoriteIcon className="action-icon" style={{ fontSize: 32 }} />
          <MessageIcon className="action-icon" style={{ fontSize: 32 }} />
          <NotificationsIcon className="action-icon" style={{ fontSize: 32 }} />
        </div>
        <img src={noImg} alt="profile" className="profile-image" />
        <Button className="listing-button">出品</Button>
      </div>
    </div>
  )
}

export default MainHeader
