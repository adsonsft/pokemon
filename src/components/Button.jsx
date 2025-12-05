import styles from "./button.module.css"

function Button({children, onClick, ...props}) {
    return <button {...props} onClick={onClick} className={styles.button}>{children}</button>
}

export default Button