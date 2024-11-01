import React from 'react'
import sample1 from '../assets/image/sample1.jpeg'
import styles from '../styles/Transaction.module.css'
import SendIcon from '@mui/icons-material/Send'

const Transaction = () => {
  // チャットのメッセージを送信する関数
  const sendMessage = () => {
    console.log('メッセージを送信しました')
  }

  return (
    <div className={styles.transaction_container}>
      <div className={styles.trading_information}>
        <h5>取引情報</h5>
        <div className={styles.item_title}>
          <img src={sample1} alt="sample1"></img>
          <p>タイトル</p>
        </div>
        <div className={styles.item_detail}>
          <div className={styles.inf}>
            商品代金<p>￥1000</p>
          </div>
          <div className={styles.inf}>
            購入日時<p>2024年10月23日 17:51</p>
          </div>
          <div className={styles.inf}>
            商品ID<p>m73319947785</p>
          </div>
        </div>
      </div>
      <div className={styles.trading_screen}>
        <h2>取引画面</h2>
        <h5>出品者情報</h5>
        <div className={styles.user_information}>
          <img src={sample1} alt="sample1"></img>
          <p>name</p>
        </div>
        <div>
          <h5>メッセージ</h5>
          <div className={styles.user_message}>
            <div className={styles.message}>
              <img src={sample1} alt="sample1" />
              <div className={styles.user_title}>
                <p>Mayu</p>
                <span>hogehogehoge</span>
              </div>
            </div>
            <div className={styles.message}>
              <img src={sample1} alt="sample1" />
              <div className={styles.user_title}>
                <p>Mayu</p>
                <span>hogehogehoge</span>
              </div>
            </div>
            <div className={styles.message}>
              <img src={sample1} alt="sample1" />
              <div className={styles.user_title}>
                <p>Mayu</p>
                <span>hogehogehoge</span>
              </div>
            </div>
            <div className={styles.message}>
              <img src={sample1} alt="sample1" />
              <div className={styles.user_title}>
                <p>Mayu</p>
                <span>hogehogehoge</span>
              </div>
            </div>
          </div>
          <div className={styles.send_container}>
            <input className={styles.send} />
            <button>
              <SendIcon className={styles.bt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
