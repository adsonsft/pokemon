import styles from "./tag.module.css"
import Bag from "../assets/bag.svg?react"

function Tag({ children, color }) {
    return (
        <div className={`${styles.tag} ${color === "blue" ? styles.blue : styles.red}`}>
            <div className={styles.wrapper}>
                <Bag />
            </div>
            <span className={styles.text}>{children}</span>
        </div>
    )
}

export default Tag