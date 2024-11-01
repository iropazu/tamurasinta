import React from 'react'
import style from '../styles/Login.module.css'

const Login = () => {
  return <div><body className={style.body}>ログイン</body>
  
    <div><body className={style.body}>メールアドレス</body></div>
    <input type = "text"></input>
    
    <div><body className={style.body}>パスワード</body></div>
    
    <input type = "text"></input>
    <div>または</div>
    <input type = "text"placeholder="Googleで登録"  ></input>
    <img src="https://developers.google.com/identity/images/g-logo.png" alt={style.body}></img>
    
    <button body className={style.body}>ログイン</button>
  </div>
}

export default Login
