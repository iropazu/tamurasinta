import React, { useEffect, useState } from 'react'
import './MainHeader.css'
import Button from '../Button/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import noImg from '../../assets/image/noImg.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { logout } from '../../services/authService'

const MainHeader = () => {

  const [imageProfile, setImageProfile] = useState(null)
  const [headerBool, setHeaderBool] = useState(false)
  const [loginBool, setLoginBool] = useState(false)
  const navigate=useNavigate()

  useEffect(() => {

    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setHeaderBool(true)
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        setImageProfile(snap.exists() && snap.data()?.profileImage || user.photoURL || noImg);
      } else {
        setImageProfile(noImg);
        setHeaderBool(false)
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, []);

  const toggleLogin = () => {
    setLoginBool(!loginBool)
  }

  const handleLogout=()=>{
    logout()
    setLoginBool(!loginBool)
    navigate('/')
  }

  return (
    <header className="main-header-container">
      {loginBool && (
          <Button className='logout-button' onClick={handleLogout}>ログアウト</Button>
      )}
      {headerBool ? (
        <div className="right-contents">
          <div className="action-button">
            <FavoriteIcon className="action-icon" style={{ fontSize: 32 }} />
            <MessageIcon className="action-icon" style={{ fontSize: 32 }} />
            <NotificationsIcon className="action-icon" style={{ fontSize: 32 }} />
          </div>
          <img onClick={toggleLogin} src={imageProfile} alt="profile" className="profile-image" />
          <Link to={'/create-listing'}>
            <Button className="listing-button">出品</Button>
          </Link>
        </div>
      ) : (
        <div className="right-contents">
          <div className="auth-button">
            <Link to={'/register'}>
              <button>新規登録</button>
            </Link>
            <Link to={'/login'}>
              <button>ログイン</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default MainHeader