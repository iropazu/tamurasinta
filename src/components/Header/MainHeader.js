import React, { useEffect, useState } from 'react'
import './MainHeader.css'
import Button from '../Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import noImg from '../../assets/image/noImg.jpg'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { collection, doc, onSnapshot } from 'firebase/firestore'

const MainHeader = () => {

  const [imageProfile,setImageProfile]=useState(null)

  useEffect(()=>{
    let snapUnsubscribe
    const authUnsubscribe=onAuthStateChanged(auth,(user)=>{
      if (user){
        const docRef=doc(collection(db,'users'),user.uid)
        snapUnsubscribe=onSnapshot(docRef,(snap)=>{
          if(snap.data().profileImage){
            setImageProfile(snap.data().profileImage)
          } else if (user.photoURL){
            setImageProfile(user.photoURL)
          } else{
            setImageProfile(noImg)
          }
        })
      } else {
        setImageProfile(noImg)
      }
    })
    return ()=>{
      if(authUnsubscribe) authUnsubscribe()
      if(snapUnsubscribe) snapUnsubscribe()
      }
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
