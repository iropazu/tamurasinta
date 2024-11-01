import React from 'react'
import style from '../styles/Login.module.css'

const Login = () => {
  return <div><body className={style.body}>ログイン</body>
    
    <div>メールアドレス</div>
    <input type = "text"></input>
    
    <div>パスワード</div>
    
    <input type = "text"></input>
    <div>または</div>
    <input type = "text"placeholder="Googleで登録" ></input>
    
    <button>ログイン</button>
  </div>
}

export default Login
