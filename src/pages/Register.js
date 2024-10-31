import React, { useState } from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useNavigate } from 'react-router-dom'
import { GoogleSignUp, signUp } from '../services/authService';

const Register = () => {

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()


  const handleSignUp = async () => {
    try {
      await signUp(mail, password)
      navigate('/RegisterUser')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('既に登録済みのメールアドレスだよ')
      } else if (error.code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくないよ')
      } else if (error.code === 'auth/weak-password') {
        setError('パスワード6文字以上で入力してよ')
      } else if (error.code === 'auth/missing-password') {
        setError('パスワード入力されてないよ')
      } else {
        setError('なんかエラー起きたよ')
        console.log(error)
      }

    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignUp()
      navigate('/RegisterUser')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Link to='/'><ArrowBackIosNewIcon style={{ fontSize: 25, opacity: 0.5 }} className={style.back}></ArrowBackIosNewIcon></Link>
      <h1 className={style.title}>会員登録</h1>
      <div className={style.form}>
        <div className="send_input">
          <label className={style.label}>メールアドレス</label>
          <input type="text" className={style.input} onChange={(e) => { setMail(e.target.value) }} />
        </div>
        <div className="send_input">
          <label className={style.label}>パスワード</label>
          <input type="password" className={style.input} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        {error && (
          <p className={style.error}>※{error}</p>
        )}
        <p>または</p>
          <button onClick={handleGoogleSignUp} className={style.googleButton}>
            <img src="https://developers.google.com/identity/images/g-logo.png" className={style.googleLogo} />
            <p className={style.googleP}>Googleでサインイン</p>
          </button>

      </div>
      <Button onClick={handleSignUp} className={style.button}>次へ</Button>
    </div>
  )
}

export default Register
