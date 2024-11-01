import React from 'react'
import style from '../styles/Login.module.css'

const Login = () => {
  return <div><body className={style.body}>ログイン</body>
  
    <div><body className={style.p}>メールアドレス</body></div>
    <input type = "text"></input>
    
    <div><body className={style.p}>パスワード</body></div>
    
    <input type = "text"></input>
    <div>または</div>
    
    <button className={style.button}><img src="https://developers.google.com/identity/images/g-logo.png" className={style.picture}/></button>
    
    <button body className={style.body}>ログイン</button>
  </div>
}

export default Login
