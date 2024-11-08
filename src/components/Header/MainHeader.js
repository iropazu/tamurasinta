import React, { useEffect, useState } from 'react'
import styles from './MainHeader.module.css'
import Button from '../Button/Button'
import MessageIcon from '@mui/icons-material/Message'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import noImg from '../../assets/image/noImg.jpg'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { logout } from '../../services/authService'

const MainHeader = () => {
  const [imageProfile, setImageProfile] = useState(null)
  const [headerBool, setHeaderBool] = useState(false)
  const [loginBool, setLoginBool] = useState(false)

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setHeaderBool(true)
        const docRef = doc(db, 'users', user.uid)
        const snap = await getDoc(docRef)
        setImageProfile(
          (snap.exists() && snap.data()?.profileImage) || user.photoURL || noImg
        )
      } else {
        setImageProfile(noImg)
        setHeaderBool(false)
      }
    })
    return () => {
      authUnsubscribe()
    }
  }, [])

  const toggleLogin = () => {
    setLoginBool(!loginBool)
  }

  const handleLogout = () => {
    logout()
    setLoginBool(!loginBool)
  }

  return (
    <header className={styles.main_header_container}>
      {loginBool && (
        <Button className={styles.logout_button} onClick={handleLogout}>
          ログアウト
        </Button>
      )}
      {headerBool ? (
        <div className={styles.right_contents}>
          <div className={styles.action_button}>
            <FavoriteBorderIcon
              className={styles.action_icon}
              style={{ fontSize: 28 }}
            />
            <MessageIcon
              className={styles.action_icon}
              style={{ fontSize: 28 }}
            />
            <NotificationsNoneIcon
              className={styles.action_icon}
              style={{ fontSize: 28 }}
            />
          </div>
          <img
            onClick={toggleLogin}
            src={imageProfile}
            alt="profile"
            className={styles.profile_image}
          />
          <Link to={'/create-listing'}>
            <Button className={styles.listing_button}>出品</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.right_contents}>
          <div className={styles.auth_button}>
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
