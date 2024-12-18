import React, { useEffect, useState } from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuth, signUp } from '../services/authService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const Register = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [auth, navigate])

  const validatePassword = () => {
    if (password === '') {
      setError('パスワード入力されてないよ')
      return false
    } else if (password.length < 6) {
      setError('パスワードは6文字以上で入力してよ')
      return false
    }
    return true
  }

  const validateEmail = () => {
    const regix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regix.test(mail)) {
      setError('メールアドレスの形式が正しくないよ')
      return false
    }
    return true
  }

  const handleSignUp = async () => {
    try {
      if (!validatePassword() || !validateEmail()) {
        return
      }
      await signUp(mail, password)
      navigate('/register-user')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('既に登録済みのメールアドレスだよ')
      } else {
        setError('なんかエラー起きたよ')
        console.log(error)
      }
    }
  }

  const handleGoogleAuth = async () => {
    try {
      await GoogleAuth()
      navigate('/register-user')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Link to="/">
        <ArrowBackIosNewIcon
          style={{ fontSize: 25, opacity: 0.5 }}
          className={style.back}
        ></ArrowBackIosNewIcon>
      </Link>
      <h1 className={style.title}>新規登録</h1>
      <div className={style.form}>
        <div className="send_input">
          <label className={style.label}>メールアドレス</label>
          <input
            type="text"
            className={style.input}
            onChange={(e) => {
              setMail(e.target.value)
            }}
          />
        </div>
        <div className="send_input">
          <label className={style.label}>パスワード</label>
          <input
            type="password"
            className={style.input}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {error && <p className={style.error}>※{error}</p>}
        <p>または</p>
        <button onClick={handleGoogleAuth} className={style.googleButton}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            className={style.googleLogo}
          />
          <p className={style.googleP}>Googleでサインイン</p>
        </button>
      </div>
      <Button onClick={handleSignUp} className={style.button}>
        次へ
      </Button>
    </div>
  )
}

export default Register
