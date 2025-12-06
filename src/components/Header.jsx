import styles from "./header.module.css"
import logo from "../assets/pokemon-logo.svg"

function Header() {
    return <header className={styles.header}>
        <div className={`container ${styles.container}`}>
            <img src={logo} alt="pokemon logo" className={styles.logo}/>
            <div className={styles.description}>
                <span>Study Case - <strong>Adsonsft</strong></span>
            </div>
        </div>
    </header>
}

export default Header