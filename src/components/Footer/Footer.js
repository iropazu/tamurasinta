import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <Link>お問い合わせ</Link>
      <p>@Smartphone apps project</p>
    </div>
  )
}

export default Footer
