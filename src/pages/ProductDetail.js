import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import styles from '../styles/ProductDetail.module.css'
import Loading from '../components/Loading/Loading'
import Button from '../components/Button/Button'
import { onAuthStateChanged } from 'firebase/auth'
import noImg from '../assets/image/noImg.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';

const ProductDetail = () => {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [buyerId, setBuyerId] = useState('unknown')
  const [currentUser, setCurrentUser] = useState(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isSold, setIsSold] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setBuyerId(user.uid)
        setCurrentUser(user.uid)
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDocRef = doc(db, 'books', itemId)
        const productDocSnap = await getDoc(productDocRef)

        const statusDocRef = doc(db, 'books', itemId, 'buyerInfo', itemId)
        const statusDocRefSnap = await getDoc(statusDocRef)

        if (statusDocRefSnap.exists()) {
          const buyerData = statusDocRefSnap.data()
          setIsSold(true)

          if (buyerData.buyerId === currentUser) {
            setIsBuyer(true)
          }
        }

        if (productDocSnap.exists()) {
          const data = productDocSnap.data()
          setProductData(data)

          if (
            Array.isArray(data.bookImageUrl) &&
            data.bookImageUrl.length > 0
          ) {
            setSelectedImage(data.bookImageUrl[0])
          }

          if (data.userId === currentUser) {
            setIsOwner(true)
            console.log('出品者です')
          }

          if (data.userId) {
            const userDocRef = doc(db, 'users', data.userId)
            const userDocSnap = await getDoc(userDocRef)

            if (userDocSnap.exists()) {
              setUserData(userDocSnap.data())
            }
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    if (itemId) {
      fetchData()
    }
  }, [itemId, currentUser])

  if (isLoading) {
    return <Loading />
  }

  if (!productData) {
    return <div>商品情報が見つかりません</div>
  }

  const thumbnails = productData.bookImageUrl.map((url, index) => ({
    id: index + 1,
    src: url,
    alt: `商品画像${index + 1}`,
  }))

  // 購入手続きボタンを押したときの処理
  const handleBuyButton = async () => {
    try {
      const buyerInfoRef = doc(db, 'books', itemId, 'buyerInfo', itemId)
      const buyerData = {
        buyerId: buyerId,
        timestamp: serverTimestamp(),
      }
      await setDoc(buyerInfoRef, buyerData)
    } catch (error) {
      console.error('Error adding household info:', error)
    }
    navigate(`/transaction/${itemId}`)
  }

  const getButtonProps = () => {
    // 購入済み状態かつ現在のログインユーザーが購入者の場合
    if (isSold && isBuyer) {
      return {
        text: '取引画面を表示する',
        style: styles.purchaseButton,
        onClick: () => navigate(`/transaction/${itemId}`),
        disabled: false,
      }
    }
    // 出品者の場合
    else if (isOwner) {
      return {
        text: '取引画面を表示する',
        style: styles.ownerButton,
        onClick: () => navigate(`/transaction/${itemId}`),
        disabled: false,
      }
    }
    // 商品は売れているが、現在のユーザーは購入者ではない
    else if (isSold) {
      return {
        text: 'SOLD OUT',
        style: styles.soldButton,
        disabled: true,
      }
    }
    // 未購入状態
    else {
      return {
        text: '購入手続きへ',
        style: styles.purchaseButton,
        onClick: handleBuyButton,
        disabled: false,
      }
    }
  }

  const buttonProps = getButtonProps()

  return (
    <div className={styles.imageAndInfoContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.thumbnailContainer}>
          {thumbnails.map((thumb) => (
            <img
              key={thumb.id}
              src={thumb.src}
              alt={thumb.alt}
              className={styles.thumbnail}
              onClick={() => setSelectedImage(thumb.src)}
            />
          ))}
        </div>

        <div className={styles.mainImgContainer}>
          <img
            src={selectedImage || noImg}
            alt="選択された商品画像"
            className={styles.mainImage}
          />
        </div>

        <div className={styles.information}>
          <h1>{productData.itemName}</h1>
          <p className={styles.yenP}>￥ {productData.price}</p>
          <div className={styles.buttonContainer}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}><FavoriteBorderIcon/>いいね</button>
              <button className={styles.actionButton}><ChatIcon/>メッセージ</button>
            </div>
            <Button
              className={buttonProps.style}
              onClick={buttonProps.onClick}
              disabled={buttonProps.disabled}
            >
              {buttonProps.text}
            </Button>
          </div>
          <h2>商品の詳細</h2>
          <h3>商品の説明</h3>
          <p>{productData.descript}</p>
          <h3>商品の状態</h3>
          <p>{productData?.itemCondition || '不明'}</p>
          <h3>出品者</h3>
          <div className={styles.user_information}>
            <img src={userData?.profileImage || noImg} alt="ユーザー画像" />
            <p>{userData?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
