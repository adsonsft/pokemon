import styles from "./tag.module.css"

function Tags({ children, type }) {
  return (
    <li className={styles.type} style={{backgroundColor: `var(--bg-${type})`}}>
      <span style={{color: `var(--color-${type})`}}>{children}</span>
    </li>
  )
}

export default Tags