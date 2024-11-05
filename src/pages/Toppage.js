import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Toppage.css'
import sample1 from '../assets/image/sample1.jpeg'
import sample2 from '../assets/image/sample2.jpeg'
import sample3 from '../assets/image/sample3.jpeg'
import sample4 from '../assets/image/sample4.jpeg'
import sample5 from '../assets/image/sample5.jpeg'
import { db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const Toppage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const itemsRef = collection(db, 'books')

    const fetchItems = async () => {
      try {
        const itemSnapshot = await getDocs(itemsRef)
        const itemsArray = itemSnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (item) =>
              Array.isArray(item.bookImageUrl) && item.bookImageUrl.length > 0
          )
          .map((item) => item.bookImageUrl[0])
        setItems(itemsArray)
      } catch (error) {
        alert('Error fetching items:', error)
      }
    }
    fetchItems()
  }, [])

  console.log('items', items)

  return (
    <div className="toppage-container">
      <div className="in_transaction">
        <h5>取引中の商品</h5>
        <div className="img-container">
          {items.map((item, index) => (
            <img src={item} alt={`sample${index}`} className="sample-image" />
          ))}
        </div>
      </div>
      <div className="subjects">
        <h5>科目</h5>
        <div className="img-container">
          <img src={sample1} alt="sample1" className="sample-image" />
          <img src={sample2} alt="sample2" className="sample-image" />
          <img src={sample3} alt="sample3" className="sample-image" />
          <img src={sample4} alt="sample4" className="sample-image" />
          <img src={sample5} alt="sample5" className="sample-image" />
        </div>
      </div>
    </div>
  )
}

export default Toppage
