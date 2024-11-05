import React from 'react'
import style from '../styles/Login.module.css'

const Login = () => {
  return <div className={style.main}><body className={style.body}>ログイン</body>
  
    <div><p className={style.p}>メールアドレス</p>
    <input type = "text" style={{width: 500, height: 30}}></input></div>
  
    
    
    <div><p className={style.p}>パスワード</p>
    <input type = "text" style={{width: 500, height: 30}}></input> </div>
    
    

    <div><p className={style.mataha}>または</p></div>

    
    
    <button className={style.button}>
      <img src="https://developers.google.com/identity/images/g-logo.png" className={style.picture}/>
      <p className={style.pic}>Googleで登録</p>
    </button>

    
    
    <button body className={style.button01}>ログイン</button>
  </div>
}

export default Login
