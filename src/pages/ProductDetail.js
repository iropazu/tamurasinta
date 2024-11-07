import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import styles from '../styles/ProductDetail.module.css'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { itemId } = useParams()
  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log('id:', itemId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 商品データの取得
        const productDocRef = doc(db, 'books', itemId)
        const productDocSnap = await getDoc(productDocRef)

        if (productDocSnap.exists()) {
          const data = productDocSnap.data()
          setProductData(data)

          // 初期画像の設定
          if (
            Array.isArray(data.bookImageUrl) &&
            data.bookImageUrl.length > 0
          ) {
            setSelectedImage(data.bookImageUrl[0])
          }

          // ユーザーデータの取得
          if (data.userId) {
            const userDocRef = doc(db, 'users', data.userId)
            const userDocSnap = await getDoc(userDocRef)

            if (userDocSnap.exists()) {
              setUserData(userDocSnap.data())
            }
          }
        }
        setIsLoading(false) // データ取得が完了したらローディング解除
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
    return <div>Loading...</div>
  }

  // productDataが取得されなかった場合のエラーメッセージ
  if (!productData) {
    return <div>商品情報が見つかりません</div>
  }

  const thumbnails = productData.bookImageUrl.map((url, index) => ({
    id: index + 1,
    src: url,
    alt: `商品画像${index + 1}`,
  }))

  return (
    <div className={styles.imageAndInfoContainer}>
      <div className={styles.imageContainer}>
        {/* 左側のサムネイル列 */}
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

        {/* メイン画像表示エリア */}
        <img
          src={selectedImage}
          alt="選択された商品画像"
          className={styles.mainImage}
        />
        <div className={styles.information}>
          <h1>{productData.name}</h1>
          <p>¥{productData.price}</p>
          <div className={styles.buttonContainer}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>💙いいね</button>
              <button className={styles.actionButton}>💬メッセージ</button>
            </div>
            <button
              className={styles.purchaseButton}
              onClick={() => navigate('/transaction')}
            >
              購入手続きへ
            </button>
          </div>
          <h3>商品の説明</h3>
          <p>{productData.descript}</p>
          <h3>商品の状態</h3>
          <p>{productData?.itemCondition || '不明'}</p>
          <h3>出品者</h3>
          <div className={styles.user_information}>
            <img
              src={userData?.profileImage || thumbnails[0].src}
              alt="ユーザー画像"
            />
            <p>{userData?.name || 'Unknown User'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
