import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Link, useNavigate } from 'react-router-dom'
import { addData } from '../services/authService'
import defaultAvatar from '../assets/image/default-avatar.png'
import { addImage } from '../services/bookUpload'

const RegisterUser = () => {
  const [name, setName] = useState('')
  const [number, setnumber] = useState('')
  const [major, setmajor] = useState('')
  const [grade, setGrade] = useState('')
  const [profileImage,setProfileImage]=useState('')
  const inputRef=useRef()
  const navigate = useNavigate()

  const handleUserInfo = async () => {
    const profileImageUrl = await addImage(profileImage)
    const data = {
      name: name,
      studentId: number,
      major: major,
      grade: grade,
      profileImage:profileImageUrl
    }
    await addData(data)
    navigate('/')
  }

  return (
    <div>
      <Link to="/Register">
        <ArrowBackIosNewIcon
          style={{ fontSize: 25, opacity: 0.5 }}
          className={style.back}
        ></ArrowBackIosNewIcon>
      </Link>
      <form action="/" className={style.form}>
        <div className={style.profileImage}>
          <button type='button' onClick={()=>{inputRef.current.click()}}>
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage[0])}/>
            ):
            (
              <img src={defaultAvatar} />
            )}
          </button>
          <input type="file" ref={inputRef} onChange={(e)=>{setProfileImage(e.target.files)}} style={{display:'none'}}/>
        </div>
        <div className="send_input">
          <label className={style.label}>名前</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value)
            }}
            className={style.input}
          />
        </div>
        <div className="send_input">
          <label className={style.label}>学籍番号</label>
          <input
            type="text"
            onChange={(e) => {
              setnumber(e.target.value)
            }}
            className={style.input}
          />
        </div>
        <div className="send_input">
          <label className={style.label}>学部学科</label>
          <input
            type="text"
            onChange={(e) => {
              setmajor(e.target.value)
            }}
            className={style.input}
          />
        </div>
        <div className="send_input">
          <label className={style.label}>学年</label>
          <input
            type="text"
            onChange={(e) => {
              setGrade(e.target.value)
            }}
            className={style.input}
          />
        </div>
      </form>
      <Button onClick={handleUserInfo} className={style.button}>
        完了
      </Button>
    </div>
  )
}

export default RegisterUser
