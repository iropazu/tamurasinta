import React from 'react'
import { useState, useRef, useEffect } from 'react'
import noImg from '../assets/image/noImg.jpg'
import styles from '../styles/Transaction.module.css'
import MessageList from '../features/Transaction/MessageList'
import SendIcon from '@mui/icons-material/Send'
import { realtimeDb } from '../firebase/firebase'
import { push, ref, serverTimestamp } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'

const Transaction = () => {
  const [senderId, setSenderId] = useState(null)
  const [senderName, setSenderName] = useState(null)
  const [senderImg, setSenderImg] = useState(null)
  const [itemDetail, setItemDetail] = useState([])
  const { productData } = useContext(ProductContext)
  const { userData } = useContext(UserContext)

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
      timestamp: serverTimestamp(),
    })
      .then(() => {
        inputRef.current.value = ''
      })
      .catch((error) => {
        alert('もう一度お試しください', error)
      })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    const itemDetailRef = doc(db, 'books', itemId)

    const fetchItems = async () => {
      try {
        const itemSnapshot = await getDoc(itemDetailRef)
        if (itemSnapshot.exists()) {
          setItemDetail(itemSnapshot.data())
        } else {
        }
      } catch (error) {
        window.location.reload()
      }
    }

    fetchItems()
  }, [itemId])

  console.log(userData)
  console.log(productData)

  return (
    <div className={styles.transaction_container}>
      <div className={styles.trading_information}>
        <h5>取引情報</h5>

        <div className={styles.item_title}>
          <img src={itemDetail.bookImageUrl} alt="sample1" />
          <p>{productData.descript}</p>
        </div>

        <div className={styles.item_detail}>
          <div className={styles.inf}>
            商品代金<p>￥{productData.price}</p>
          </div>
          <div className={styles.inf}>
            購入日時<p>2024年10月23日 17:51</p>
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
          <img
            src={userData.profileImage?.profileImage || noImg}
            alt="sample1"
          ></img>
          <p>{userData.name}</p>
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
