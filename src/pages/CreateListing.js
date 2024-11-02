import React, { useRef, useState } from 'react'
import style from '../styles/CreateListing.module.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { logout } from '../services/authService';
import Button from '../components/Button/Button';

const CreateListing = () => {

  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [state, setState] = useState('')
  const [descript, setDescript] = useState('')
  const [price, setPrice] = useState('')
  const inputRef = useRef(null)

  const data = {
    image,
    name,
    subject,
    state,
    descript,
    price
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setImage(file)
    console.log(file)
  }

  const handleImageUp = () => {
    inputRef.current.click()
  }


  return (
    <div>
      {/* <button onClick={logout}>ログアウト</button> */}
      <h1 className={style.title}>商品の出品</h1>
      <div className={style.inputContainer}>
        <div className={style.inputWrap}>
          <h2 className={style.h2}>出品画像</h2>
          <div className={style.drop} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault() }}>
            {image ? (
              <img src={URL.createObjectURL(image)} className={style.img} />
            ):
            (<div className={style.firstContainer}>
              <CameraAltIcon className={style.cameraAltIcon} style={{fontSize:'70px',color:'#85b6ff'}}/>
              <p className={style.dragP}>ドラッグ＆ドロップ</p>
              <p className={style.andP}>または</p>
              <button className={style.button} onClick={handleImageUp}>画像を選択</button>
              <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" style={{ display: 'none' }} ref={inputRef} />
            </div>)}
          </div>
        </div>
        <div className={style.inputWrap}>
          <h2 className={style.h2}>商品名</h2>
          <input type="text" className={style.input} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className={style.inputWrap}>
          <h2 className={style.h2} >商品の詳細</h2>
          <p className={style.p}>授業名</p>
          <input type="text" className={style.input} onChange={(e) => { setSubject(e.target.value) }} />
          <p className={style.p}>商品の状態</p>
          <input type="text" className={style.input} onChange={(e) => { setState(e.target.value) }} />
          <p className={style.p}>商品の詳細</p>
          <input type="text" className={style.input} onChange={(e) => { setDescript(e.target.value) }} />
        </div>
        <div className={style.inputWrap}>
          <h2 className={style.h2}>販売価格</h2>
          <p className={style.p}>販売価格</p>
          <input type="text" className={style.input} onChange={(e) => { setPrice(e.target.value) }} />
        </div>
      </div>
      <Button className={style.Button}>出品する</Button>
    </div>
  )
}

export default CreateListing
