import React from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';

const RegisterUser = () => {
  return (
  <div>
    <Link to='/Register'><ArrowBackIosNewIcon style={{fontSize: 25,opacity:0.5}} className={style.back}></ArrowBackIosNewIcon></Link>
    <form action="/" className={style.form}>
      <div className="send_input">
        <label className={style.label}>名前</label>
        <input type="text" className={style.input}/>
      </div>
      <div className="send_input">
        <label className={style.label}>学籍番号</label>
        <input type="text" className={style.input}/>
      </div>
      <div className="send_input">
        <label className={style.label}>学部学科</label>
        <input type="text" className={style.input}/>
      </div>
      <div className="send_input">
        <label className={style.label}>学年</label>
        <input type="text" className={style.input}/>
      </div>
    </form>
    <Button className={style.button}>完了</Button>
  </div>
  )
}

export default RegisterUser
