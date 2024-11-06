import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/RegisterUser.module.css'
import Button from '../components/Button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Link, useNavigate } from 'react-router-dom'
import { addData } from '../services/authService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const RegisterUser = () => {
  const [name, setName] = useState('')
  const [number, setnumber] = useState('')
  const [major, setmajor] = useState('')
  const [grade, setGrade] = useState('')
  const [profileImage,setProfileImage]=useState(null)
  const inputRef=useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [auth, navigate])

  const handleUserInfo = async () => {
    const data = {
      name: name,
      studentId: number,
      major: major,
      grade: grade,
      profileImage:profileImage
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
        <div className="profileImage">
          <button onClick={()=>{inputRef.current.click()}}></button>
          <input type="file" onChange={(e)=>{setProfileImage(e.target.files[0])}} style={{display:'none'}}/>
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
