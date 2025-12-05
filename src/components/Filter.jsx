import { useEffect, useState } from "react"
import styles from "./filter.module.css"

function Filter({ getPokemons, filterPokemons, scrollToPokemons, filter }) {
  const [active, setActive] = useState(0)

  const TYPES = [
    "All",
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
  ]

  useEffect(() => {
    if (active === 0) {
      getPokemons()
    } else {
      filterPokemons(TYPES[active].toLowerCase())
    }
  }, [active])

  return (
    <ul className={styles.types}>
      {TYPES &&
        TYPES.map((t, i) => {
          return (
            <li
              key={t}
              className={`${styles.type} ${active === i ? styles.active : ""}`}
              onClick={
                () => {
                  setActive(i)
                  scrollToPokemons()
                }}>
              <div className={styles.icon}>
                <img
                  src={`/types/icons/${t.toLowerCase()}.svg`}
                  alt={`${t} ${t === "All" ? "types" : "type"}`}
                />
              </div>
              <span
                style={{
                  color: `var(--color-${
                    t === "All" ? "blue-500" : t.toLowerCase()
                  })`,
                }}
                className={styles.text}>
                {t}
              </span>
            </li>
          )
        })}
    </ul>
  )
}
export default Filter
