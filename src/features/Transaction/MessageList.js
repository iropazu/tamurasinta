import React, { useEffect, useState } from 'react'
import styles from '../../styles/Transaction.module.css'
import { realtimeDb } from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'

const MessageList = () => {
  const roomId = 'm73319947785'
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getmessageRef = ref(realtimeDb, `rooms/${roomId}/messages`)

    const unsubscribe = onValue(getmessageRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messageArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setMessages(messageArray)
      }
    })

    return () => unsubscribe()
  }, [roomId])

  console.log(messages)

  return (
    <div className={styles.user_message}>
      {messages.map((message) => (
        <div className={styles.messages} key={message.id}>
          <div className={styles.user_title}>
            <span>{message.messageText}</span>
            <p>{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
