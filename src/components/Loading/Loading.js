import React from 'react'
import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.mikepad_loading}>
      <div className={styles.binding}></div>
      <div className={styles.pad}>
        <div className={styles.line_line1}></div>
        <div className={styles.line_line2}></div>
        <div className={styles.line_line3}></div>
      </div>
      <div className={styles.text}>mikepad is loading...</div>
    </div>
  )
}

export default Loading
