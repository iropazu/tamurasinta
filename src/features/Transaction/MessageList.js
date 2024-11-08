import React, { useEffect, useState, useRef } from 'react'
import styles from '../../styles/Transaction.module.css'
import { realtimeDb } from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { useParams } from 'react-router-dom'
import noImg from '../../assets/image/noImg.jpg'
import formatDate from '../../utils/formatDate'

const MessageList = () => {
  const { itemId } = useParams()
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const getmessageRef = ref(realtimeDb, `rooms/${itemId}/messages`)

    const unsubscribe = onValue(getmessageRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data)
      if (data) {
        const messageArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          formattedTimestamp: formatDate(data[key].timestamp),
        }))
        setMessages(messageArray)
      }
    })

    return () => unsubscribe()
  }, [itemId])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  console.log(messages)

  return (
    <div className={styles.user_message}>
      {messages.length === 0 ? (
        <p className={styles.greeting}>
          まだメッセージはありません。取引の詳細について話し合いましょう！
        </p>
      ) : (
        messages.map((message) => (
          <div className={styles.messages} key={message.id}>
            <img src={message.profileImage || noImg} alt="user_icon" />
            <div className={styles.user_title}>
              <p>{message.name || 'unknown'}</p>
              <div className={styles.message}>
                <span>{message.messageText}</span>
                <p>{message.formattedTimestamp}</p>
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
