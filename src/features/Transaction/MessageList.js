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
        // <div key={message.id}>
        //   <strong>{message.senderId}:</strong> {message.text}
        // </div>
        <div className={styles.message} key={message.id}>
          {/* <img src={message.img} alt="sample1" /> */}
          <div className={styles.user_title}>
            {/* <p>{message.name}</p> */}
            <span>{message.messageText}</span>
            <span>{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
