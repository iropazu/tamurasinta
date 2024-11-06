import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import styles from '../styles/Toppage.module.css'

const Toppage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const itemsRef = collection(db, 'books')

    const fetchItems = async () => {
      try {
        const itemSnapshot = await getDocs(itemsRef)
        const itemsArray = itemSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            imageUrl:
              Array.isArray(data.bookImageUrl) && data.bookImageUrl.length > 0
                ? data.bookImageUrl[0]
                : null,
          }
        })
        setItems(itemsArray)
      } catch (error) {
        alert('Error fetching items:', error)
      }
    }
    fetchItems()
  }, [])

  console.log('items', items)

  return (
    <div className={styles.toppage_container}>
      <div className={styles.in_transaction}>
        <h5>商品</h5>
        <div className={styles.img_container}>
          {items.map((item, index) => (
            <Link to={`/product-detail/${item.id}`} key={item.id}>
              <img
                src={item.imageUrl}
                alt={`sample${index}`}
                className={styles.sample_image}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="subjects">
        <h5>科目</h5>
        <div className="img-container">
          <img src={sample1} alt="sample1" className="sample-image" />
          <img src={sample2} alt="sample2" className="sample-image" />
          <img src={sample3} alt="sample3" className="sample-image" />
          <img src={sample4} alt="sample4" className="sample-image" />
          <img src={sample5} alt="sample5" className="sample-image" />
        </div>
      </div> */}
    </div>
  )
}

export default Toppage
