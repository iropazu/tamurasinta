import React from 'react'
import style from '../styles/Login.module.css'

const Login = () => {
  return <div><body className={style.body}>ログイン</body>
  
    <div><body className={style.p}>メールアドレス</body></div>
    <body className={style.text}><input type = "text" style={{width: 700, height: 30}}></input></body>
  
    <div>&nbsp;</div>
    
    <div><body className={style.p}>パスワード</body></div>
    <body className={style.text}><input type = "text" style={{width: 700, height: 30}}></input></body>  
    
    <div>&nbsp;</div>

    <div><body className={style.mataha}>または</body></div>
    
    <button className={style.button}>
      <img src="https://developers.google.com/identity/images/g-logo.png" className={style.picture}/>
      <p className={style.pic}>Googleで登録</p>
    </button>
    
    <button body className={style.button01}>ログイン</button>
  </div>
}

export default Login
