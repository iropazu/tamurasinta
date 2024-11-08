import React from 'react'
import { useState, useRef, useEffect } from 'react'
import noImg from '../assets/image/noImg.jpg'
import styles from '../styles/Transaction.module.css'
import MessageList from '../features/Transaction/MessageList'
import SendIcon from '@mui/icons-material/Send'
import { realtimeDb } from '../firebase/firebase'
import { push, ref } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
import formatDate from '../utils/formatDate'

const Transaction = () => {
  const [senderId, setSenderId] = useState(null)
  const [senderName, setSenderName] = useState(null)
  const [senderImg, setSenderImg] = useState(null)
  const [itemDetail, setItemDetail] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSenderId(user.uid)
        setSenderName(user.displayName)
        setSenderImg(user.photoURL)
      } else {
        setSenderId('unknown')
        setSenderName('unknown')
      }
    })
    return unsubscribe
  }, [])

  const { itemId } = useParams()
  const inputRef = useRef(null)

  const sendMessage = () => {
    const message = inputRef.current.value
    if (message.trim() === '') {
      alert('メッセージを入力してください')
      return
    }

    const sendmessagesRef = ref(realtimeDb, `rooms/${itemId}/messages`)
    push(sendmessagesRef, {
      senderId: senderId,
      senderName: senderName,
      img: senderImg,
      messageText: message,
      timestamp: new Date().getTime(),
    })
      .then(() => {
        inputRef.current.value = ''
      })
      .catch((error) => {
        alert('もう一度お試しください', error)
      })
  }

  console.log()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      sendMessage()
    }
  }

  const [userDetail, setUserDetail] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const itemDetailRef = doc(db, 'books', itemId)
      const buyDateRef = doc(db, 'books', itemId, 'buyerInfo', itemId)

      try {
        const [itemSnapshot, buyDateSnap] = await Promise.all([
          getDoc(itemDetailRef),
          getDoc(buyDateRef),
        ])

        if (itemSnapshot.exists()) {
          const itemDetailData = itemSnapshot.data()
          setItemDetail(itemDetailData)

          if (itemDetailData.userId) {
            const userRef = doc(db, 'users', itemDetailData.userId)
            const userSnapshot = await getDoc(userRef)

            if (userSnapshot.exists()) {
              setUserDetail(userSnapshot.data())
            }
          }
        }

        if (buyDateSnap.exists()) {
          const buyDateData = buyDateSnap.data()
          setBuyDate(formatDate(buyDateData.timestamp))
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      }
    }

    fetchData()
  }, [itemId])

  const [buyDate, setBuyDate] = useState(null)

  return (
    <div className={styles.transaction_container}>
      <div className={styles.trading_information}>
        <h5>取引情報</h5>

        <div className={styles.item_title}>
          <img src={itemDetail.bookImageUrl} alt="sample1" />
          <p>{itemDetail.itemName}</p>
        </div>

        <div className={styles.item_detail}>
          <div className={styles.inf}>
            商品代金<p>￥{itemDetail.price}</p>
          </div>
          <div className={styles.inf}>
            購入日時
            <p>{buyDate}</p>
          </div>
          <div className={styles.inf}>
            商品ID<p>{itemId}</p>
          </div>
        </div>
      </div>
      <div className={styles.trading_screen}>
        <h2>取引画面</h2>
        <h5>出品者情報</h5>
        <div className={styles.user_information}>
          <img src={userDetail.profileImage || noImg} alt="sample1"></img>
          <p>{userDetail.name}</p>
        </div>
        <div>
          <h5>メッセージ</h5>
          <MessageList />
          <div className={styles.send_container}>
            <textarea
              className={styles.send}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder={`メッセージを入力`}
            />
            <button onClick={sendMessage}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
