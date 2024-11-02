import React from 'react'
import styles from '../../styles/Transaction.module.css'
import sample1 from '../../assets/image/sample1.jpeg'

const MessageList = ({ messages }) => {
  return (

      <div className={styles.user_message}>
        {/* {messages.map((message) => (
          // <div key={message.id}>
          //   <strong>{message.senderId}:</strong> {message.text}
          // </div>
          <div className={styles.message} key={message.id}>
            <img src={message.img} alt="sample1" />
            <div className={styles.user_title}>
              <p>{message.name}</p>
              <span>{message.text}</span>
            </div>
          </div>
        ))} */}
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

  )
}

export default MessageList
