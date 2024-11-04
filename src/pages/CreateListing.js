import React, { useRef, useState } from 'react'
import style from '../styles/CreateListing.module.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { logout } from '../services/authService';
import Button from '../components/Button/Button';

const CreateListing = () => {

  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [state, setState] = useState('')
  const [descript, setDescript] = useState('')
  const [price, setPrice] = useState('')
  const [bigImage, setBigImage] = useState(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  const data = {
    images,
    name,
    subject,
    state,
    descript,
    price
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files
    const mapFile = Array.from(file)
    setImages((images) => [...images, ...mapFile])
  }

  const handleInput = (e) => {
    const file = e.target.files
    const mapFile = Array.from(file)
    setImages((images) => [...images, ...mapFile])
  }

  const handleRemove = (index) => {
    setImages((image => (image.filter((_, i) => (i !== index)))))
    console.log(index)
  }

  const handleImageUp = () => {
    inputRef.current.click()
  }

  const handleTextarea = (e) => {
    const textarea = textareaRef.current
    textarea.style.height = ''
    textarea.style.height = textarea.scrollHeight + 'px'
    setDescript(e.target.value)
  }

  const handleImageClick = (URL) => {
    setBigImage(URL)
  }

  const handleImageClose = () => {
    setBigImage('')
  }


  return (
    <div className={style.main}>
      {bigImage && (
        <div className={style.bigImageContainer} onClick={handleImageClose}>
          <img src={bigImage} />
        </div>
      )}
      <h1>商品の出品</h1>
      <div className={style.info_container}>
        <div className={style.info_field}>
          <h2 >出品画像</h2>
          <div className={style.imageWrap}>
            {images && (
              images.map((image, index) => (
                <div className={style.containerImg}>
                  <img key={index} src={URL.createObjectURL(image)} onClick={() => { handleImageClick(URL.createObjectURL(image)) }} />
                  <button onClick={() => { handleRemove(index) }}>✖</button>
                </div>
              ))
            )}
          </div>
          <div className={style.image_field} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault() }}>
            <CameraAltIcon className={style.camera} />
            <p>ドラッグ＆ドロップ</p>
            <p>または</p>
            <button onClick={handleImageUp}>画像を選択</button>
            <input onChange={handleInput} accept="image/*" type="file" multiple style={{ display: 'none' }} ref={inputRef} />
          </div>
        </div>
        <div className={style.info_field}>
          <h2>商品名</h2>
          <input type="text" onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className={style.info_field}>
          <h2>商品の詳細</h2>
          <p>授業名</p>
          <input type="text" onChange={(e) => { setSubject(e.target.value) }} />
          <p>商品の状態</p>
          <select for='prefecture' onChange={(e) => { setState(e.target.value) }}>
            <option value=""></option>
            <option value="かなり良い">かなり良い</option>
            <option value="良い">良い</option>
            <option value="普通">普通</option>
            <option value="悪い">悪い</option>
            <option value="かなり悪い">かなり悪い</option>
          </select>
          <p>商品の詳細</p>
          <textarea ref={textareaRef} onInput={handleTextarea}></textarea>
        </div>
        <div className={style.info_field}>
          <h2 >販売価格</h2>
          <p>販売価格</p>
          <input type="text" onChange={(e) => { setPrice(e.target.value) }} />
        </div>
      </div>
      <Button className={style.Button}>出品する</Button>
    </div>
  )
}

export default CreateListing
