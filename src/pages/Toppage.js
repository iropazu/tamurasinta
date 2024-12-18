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
        const itemsArray = await Promise.all(
          itemSnapshot.docs.map(async (doc) => {
            const data = doc.data()

            const subCollectionRef = collection(doc.ref, 'buyerInfo')
            const subCollectionSnapshot = await getDocs(subCollectionRef)
            const isSold = !subCollectionSnapshot.empty

            return {
              id: doc.id,
              imageUrl:
                Array.isArray(data.bookImageUrl) && data.bookImageUrl.length > 0
                  ? data.bookImageUrl[0]
                  : null,
              isSold: isSold,
            }
          })
        )
        setItems(itemsArray)
      } catch (error) {
        alert('Error fetching items:', error)
      }
    }
    fetchItems()
  }, [])

  return (
    <div className={styles.toppage_container}>
      <div className={styles.in_transaction}>
        <h5>商品</h5>
        <div className={styles.img_container}>
          {items.map((item, index) => (
            <Link to={`/product-detail/${item.id}`} key={item.id}>
              <div className={styles.image_wrapper}>
                <img
                  src={item.imageUrl}
                  alt={`sample${index}`}
                  className={styles.sample_image}
                />
                {item.isSold && <span className={styles.sold_label}>SOLD</span>}
              </div>
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
