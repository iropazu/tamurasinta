import React, { useEffect, useState } from 'react'
import styles from '../../styles/Transaction.module.css'
import { realtimeDb } from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { useParams } from 'react-router-dom'

const MessageList = () => {
  const { itemId } = useParams()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getmessageRef = ref(realtimeDb, `rooms/${itemId}/messages`)

    const unsubscribe = onValue(getmessageRef, (snapshot) => {
      const data = snapshot.val()
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

  const formatDate = (timestamp) => {
    if (!timestamp) return '未設定'
    const date = new Date(timestamp)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${y}/${m}/${d} ${h}:${min}`
  }

  return (
    <div className={styles.user_message}>
      {messages.map((message) => (
        <div className={styles.messages} key={message.id}>
          <img src={message.img} alt="icon" />
          <div className={styles.user_title}>
            <p>{message.senderName}</p>
            <div className={styles.message}>
              <span>{message.messageText}</span>
              <p>{message.formattedTimestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
