import styles from "../styles/spinner.module.css"

export default function Spinner() {
  return (
    <div className={styles.spinnerDualRing}>
      <div className={styles.spinnerDualRingInner}>
        <div></div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
