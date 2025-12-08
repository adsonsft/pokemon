import { useEffect, useRef, useState } from "react"
import styles from "./card.module.css"
import { Captalize } from "../helpers/Strings"
import Icons from "../Icons"

function Card({ name, url, getPokemon, detailsModal }) {
  const [img, setImg] = useState("")
  const [code, setCode] = useState("")
  const [type, setType] = useState("")
  const circleRef = useRef(null)

  async function getCardData() {
    const data = await getPokemon(url)

    if (data) {
      setImg(data.img)
      setCode(data.code)
      setType(data.type)
    }
  }
  
  useEffect(() => {
    getCardData()
  }, [])

  if (img) {
    return (
      <li className={styles.card} onClick={() => detailsModal((previous) => ({...previous, active: true, current: code}))}>
        <div className={styles.img}>
          <div ref={circleRef} className={styles.circle} style={{backgroundColor: `var(--bg-${type})`}} ></div>
          <img src={img} alt={`pokemon ${name ? name : single.name} image`} />
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <span>{`#${code}`}</span>
            <h3>{name ? Captalize(name) : Captalize(single.name)}</h3>
          </div>
          <div className={styles.icon}>
            <Icons icon={Captalize(type)} />
          </div>
        </div>
      </li>
    )
  } else return null
}

export default Card
