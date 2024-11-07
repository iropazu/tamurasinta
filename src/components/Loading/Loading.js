import React from 'react'
import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div class={styles.mikepad_loading}>
      <div class={styles.binding}></div>
      <div class={styles.pad}>
        <div class={styles.line_line1}></div>
        <div class={styles.line_line2}></div>
        <div class={styles.line_line3}></div>
      </div>
      <div class={styles.text}>mikepad is loading...</div>
    </div>
  )
}

export default Loading
