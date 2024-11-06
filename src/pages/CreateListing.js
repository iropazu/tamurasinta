import React, { useRef, useState } from 'react'
import style from '../styles/CreateListing.module.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { logout } from '../services/authService'
import Button from '../components/Button/Button'
import { bookUpload } from '../services/bookUpload'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

const CreateListing = () => {
  const [images, setImages] = useState('')
  const [itemName, setItemName] = useState('')
  const [subject, setSubject] = useState('')
  const [itemCondition, setItemCondition] = useState('')
  const [descript, setDescript] = useState('')
  const [price, setPrice] = useState('')
  const [bigImage, setBigImage] = useState(null)
  const [check, setCheck] = useState({
    imagesCheck: '',
    itemNameCheck: '',
    subjectCheck: '',
    priceCheck: '',
  })
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  const data = {
    itemName,
    subject,
    itemCondition,
    descript,
    price,
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropFiles = e.dataTransfer.files
    const mapDropFiles = Array.from(dropFiles)
    setImages((images) => [...images, ...mapDropFiles])
  }

  const handleImageSelect = (e) => {
    const selectFiles = e.target.files
    const mapSelectFiles = Array.from(selectFiles)
    setImages((prevImages) => [...prevImages, ...mapSelectFiles])
  }

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleInputPush = () => {
    inputRef.current.click()
  }

  const handleTextarea = (e) => {
    const textarea = textareaRef.current
    textarea.style.height = ''
    textarea.style.height = textarea.scrollHeight + 'px'
    setDescript(e.target.value)
  }

  const handleBookUpload = async () => {
    const newCheck = {}

    if (images.length === 0) newCheck.imagesCheck = '※画像を選択してください'
    if (!itemName) newCheck.itemNameCheck = '※商品名を入力してください'
    if (!subject) newCheck.subjectCheck = '※授業名を入力してください'
    if (!price) newCheck.priceCheck = '※価格を入力してください'

    setCheck(newCheck)

    if (Object.keys(newCheck).length > 0) return

    if (!auth.currentUser) {
      navigate('/register')
    } else {
      await bookUpload(images, data)
      console.log(images.length)
      navigate('/')
    }
  }

  return (
    <div className={style.main}>
      {bigImage && (
        <div
          className={style.bigImageContainer}
          onClick={() => {
            setBigImage('')
          }}
        >
          <img src={bigImage} />
        </div>
      )}
      <h1>商品の出品</h1>
      <div className={style.info_container}>
        <div className={style.info_field}>
          <h2>出品画像</h2>
          <div className={style.imageWrap}>
            {images &&
              images.map((image, index) => (
                <div className={style.containerImg}>
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    onClick={() => {
                      setBigImage(URL.createObjectURL(image))
                    }}
                  />
                  <button
                    onClick={() => {
                      handleImageRemove(index)
                    }}
                  >
                    ✖
                  </button>
                </div>
              ))}
          </div>
          <div
            className={style.image_field}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
            }}
          >
            <CameraAltIcon className={style.camera} />
            <p>ドラッグ＆ドロップ</p>
            <p>または</p>
            <button onClick={handleInputPush}>画像を選択</button>
            <input
              onChange={handleImageSelect}
              accept="image/*"
              type="file"
              multiple
              style={{ display: 'none' }}
              ref={inputRef}
            />
          </div>
          {images.length === 0 && (
            <p className={style.errorP}>{check.imagesCheck}</p>
          )}
        </div>
        <div className={style.info_field}>
          <h2>商品名</h2>
          <input
            type="text"
            onChange={(e) => {
              setItemName(e.target.value)
            }}
          />
          {!itemName && <p className={style.errorP}>{check.itemNameCheck}</p>}
        </div>
        <div className={style.info_field}>
          <h2>商品の詳細</h2>
          <p>授業名</p>
          <input
            type="text"
            onChange={(e) => {
              setSubject(e.target.value)
            }}
          />
          {!subject && <p className={style.errorP}>{check.subjectCheck}</p>}
          <p>商品の状態</p>
          <select
            htmlFor="prefecture"
            onChange={(e) => {
              setItemCondition(e.target.value)
            }}
          >
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
          <h2>販売価格</h2>
          <p>販売価格</p>
          <input
            type="number"
            min="1"
            onChange={(e) => {
              setPrice(e.target.value)
            }}
          />
          {!price && <p className={style.errorP}>{check.priceCheck}</p>}
        </div>
      </div>
      <Button onClick={handleBookUpload} className={style.Button}>
        出品する
      </Button>
    </div>
  )
}

export default CreateListing
