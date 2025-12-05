import { useEffect, useState } from "react"
import styles from "./stats-bar.module.css"

function StatsBar({ name, baseValue }) {
    const [base, setBase] = useState("")
    const LABELS = {
        "hp": "HP",
        "attack": "Attack",
        "defense": "Defense",
        "special-attack": "Sp. Attack",
        "special-defense": "Sp. Defense",
        "speed": "Speed"
    }

    useEffect(() => {
        const calc = (baseValue / 255) * 100
        const value = Math.ceil(calc)
        setBase(`${value}%`)
    }, [])

  return (
    <li className={styles.stat}>
      <span>{LABELS[name]}</span>
      <div className={styles.bar}>
        <ul className={styles.spaces}>
            <li style={{left: "20%"}} className={styles.space}></li>
            <li style={{left: "40%"}} className={styles.space}></li>
            <li style={{left: "60%"}} className={styles.space}></li>
            <li style={{left: "80%"}} className={styles.space}></li>
        </ul>
        <div style={{width: base}} className={styles.value}></div>
      </div>
    </li>
  )
}

export default StatsBar
