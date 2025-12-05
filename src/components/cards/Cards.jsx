import Card from "./Card"
import styles from "./cards.module.css"

function Cards({ pokemons, getPokemon, detailsModal }) {
  return (
    <ul className={styles.cards}>
      {pokemons &&
        pokemons.map((p) => {
          return <Card key={p.name} name={p.name} url={p.url} getPokemon={getPokemon} detailsModal={detailsModal} />
        })}
    </ul>
  )
}

export default Cards
