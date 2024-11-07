import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sample1 from '../assets/image/sample1.jpeg'
import sample2 from '../assets/image/sample2.jpeg'
import styles from '../styles/ProjectDetail.module.css'

const ProjectDetail = () => {

  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(sample1)
  
  
  const thumbnails = [
    { id: 1, src: sample1, alt: "商品画像1" },
    { id: 2, src: sample2, alt: "商品画像2" }
  ]

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
          <h1>タイトル</h1>
          <p>¥1000</p>
          <div className={styles.buttonContainer}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>💙いいね</button>
              <button className={styles.actionButton}>💬メッセージ</button>
            </div>
            <button className={styles.purchaseButton} onClick={() => navigate('/transaction')}>
              購入手続きへ
            </button>
          </div>
          <h3>商品の説明</h3>
          <p>これはテストです。</p>
          <h3>商品の状態</h3>
          <p>新品</p>
          <h3>出品者</h3>
          <div className={styles.user_information}>
            <img src={sample1} alt="sample1"></img>
            <p>name</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
