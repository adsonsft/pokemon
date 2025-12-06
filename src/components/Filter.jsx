import { useEffect, useState } from "react"
import styles from "./filter.module.css"

function Filter({
  getPokemons,
  filterPokemons,
  scrollToPokemons,
  filter,
  setFilter,
  mobile,
  setSent
}) {
  const [selectFilter, setSelectFilter] = useState(0)
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
    if (filter === 1) {
      getPokemons()
    } else {
      if (filter > 1) filterPokemons(TYPES[filter - 1].toLowerCase(), filter)
    }
    setSent({})
  }, [filter])

  if (mobile) {
    return (
      <select className={styles.typeSelector} value={filter} onChange={(e) => setFilter(Number(e.target.value))}>
        <option value="0">Select one type</option>
        {TYPES.map((t, i) => {
          return (
            <option
              key={t.toLowerCase()}
              value={i + 1}>
              {t}
            </option>
          )
        })}
      </select>
    )
  } else {
    return (
      <ul className={styles.types}>
        {TYPES &&
          TYPES.map((t, i) => {
            return (
              <li
                key={t}
                className={`${styles.type} ${filter === i + 1 ? styles.active : ""}`}
                onSelect={() => {
                  setFilter(i + 1)
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
                    color: `var(--color-${t === "All" ? "blue-500" : t.toLowerCase()
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
}
export default Filter
