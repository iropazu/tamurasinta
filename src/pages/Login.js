import React, { useEffect, useState } from 'react'
import style from '../styles/Login.module.css'
import { GoogleAuth } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { auth } from '../firebase/firebase'

const Login = () => {

  const [mailaddress,setMailaddress]=useState('')
  const [password,setPassword]=useState('')
  const [addoresserror,setAddoresserror]=useState('')
  const [passworderror,setPassworderror]=useState('')


  const navigate=useNavigate()

  const handleGoogleLogin=async()=>{
    await GoogleAuth()
    navigate('/')
  }

  useEffect(()=>{
    if(auth.currentUser){
      navigate('/')
    }
  },[])

  const handleLogin=async()=>{
    const regix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regix.test(addoresserror)) {
      setAddoresserror('メールアドレスの形式が正しくないよ')
      return
    }

    if (password.length<6){
      setPassworderror("パスワードは６文字以上入力してください")
      return 
    }
    console.log('正常')
    await login(mailaddress,password)
    navigate('/')
  }

  return <div className={style.main}><h1 className={style.body}>ログイン</h1>
  
    <div><p className={style.p}>メールアドレス</p>
    <input onChange={(e)=>{setMailaddress(e.target.value)}} type = "text" ></input></div>
  
    {addoresserror && <p>{addoresserror}</p>}
    
    <div><p className={style.p}>パスワード</p>
    <input onChange={(e)=>{setPassword(e.target.value)}} type = "passward" ></input> </div>
    
    {passworderror && <p>{passworderror}</p>}

    

    <div><p className={style.mataha}>または</p></div>

    
    
    <button onClick={handleGoogleLogin} className={style.button}>
      <img src="https://developers.google.com/identity/images/g-logo.png" className={style.picture}/>
      <p className={style.pic}>Googleで登録</p>
    </button>

    <button onClick={handleLogin} className={style.button01}>ログイン</button>
  </div>
}

export default Login
