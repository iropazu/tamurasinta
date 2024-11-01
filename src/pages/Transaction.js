import React from 'react'
import sample1 from '../assets/image/sample1.jpeg'
import styles from '../styles/Transaction.module.css'
import SendIcon from '@mui/icons-material/Send'

const Transaction = () => {
  return (
    <div className={styles.transactionContainer}>
      <div className={styles.transactionDetails}>
        <h5>取引情報</h5>
        <div className={styles.itemInfo}>
          <img src={sample1} alt="sample1"></img>
          <p>タイトル</p>
        </div>
        <div className={styles.itemDetails}>
          <div className={styles.infoRow}>
            商品代金<p>￥1000</p>
          </div>
          <div className={styles.infoRow}>
            購入日時<p>2024年10月23日 17:51</p>
          </div>
          <div className={styles.infoRow}>
            商品ID<p>m73319947785</p>
          </div>
        </div>
      </div>
      <div className={styles.transactionScreen}>
        <h2>取引画面</h2>
        <h5>出品者情報</h5>
        <div className={styles.sellerInfo}>
          <img src={sample1} alt="sample1"></img>
          <p>name</p>
        </div>
        <div>
          <h5>メッセージ</h5>
          <div className={styles.messageContainer}>
            <div className={styles.message}>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
              <img src={sample1} alt="sample1"></img>
              <span>hogehogehoge</span>
            </div>
          </div>
          <div className={styles.messageInputContainer}>
            <input className={styles.messageInput} />
            <button>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
