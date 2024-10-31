import React from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom'

const Register = () => {
  return (
  <div>
    <Link to='/Register'><ArrowBackIosNewIcon style={{fontSize: 25,opacity:0.5}} className={style.back}></ArrowBackIosNewIcon></Link>
    <h1 className={style.title}>会員登録</h1>
    <form action="/" className={style.form}>
      <div className="send_input">
        <label className={style.label}>メールアドレス</label>
        <input type="text" className={style.input}/>
      </div>
      <div className="send_input">
        <label className={style.label}>パスワード</label>
        <input type="password" className={style.input}/>
      </div>
    </form>
    <Button className={style.button}>次へ</Button>
  </div>
  )
}

export default Register
