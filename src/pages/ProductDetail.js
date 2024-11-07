import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import styles from '../styles/ProductDetail.module.css'
import Loading from '../components/Loading/Loading'
import Button from '../components/Button/Button'
import { onAuthStateChanged } from 'firebase/auth'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [buyerId, setBuyerId] = useState('unknown')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setBuyerId(user.uid)
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDocRef = doc(db, 'books', itemId)
        const productDocSnap = await getDoc(productDocRef)

        if (productDocSnap.exists()) {
          const data = productDocSnap.data()
          setProductData(data)

          if (
            Array.isArray(data.bookImageUrl) &&
            data.bookImageUrl.length > 0
          ) {
            setSelectedImage(data.bookImageUrl[0])
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
  }, [itemId])

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
  const handlebuyButton = async () => {
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

        <img
          src={selectedImage}
          alt="選択された商品画像"
          className={styles.mainImage}
        />

        <div className={styles.information}>
          <h1>{productData.itemName}</h1>
          <p>¥{productData.price}</p>
          <div className={styles.buttonContainer}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>💙いいね</button>
              <button className={styles.actionButton}>💬メッセージ</button>
            </div>
            <Button className={styles.purchaseButton} onClick={handlebuyButton}>
              購入手続きへ
            </Button>
          </div>
          <h3>商品の説明</h3>
          <p>{productData.descript}</p>
          <h3>商品の状態</h3>
          <p>{productData?.itemCondition || '不明'}</p>
          <h3>出品者</h3>
          <div className={styles.user_information}>
            <img src={userData.profileImage} alt="ユーザー画像" />
            <p>{userData?.name || 'Unknown User'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
