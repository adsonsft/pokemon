import styles from "./footer.module.css"

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
          <div>
            <strong>React</strong>
            <p className={styles.pokeapi}>Consumindo e exibindo dados da <a href="https://pokeapi.co" target="_blank">pokéapi</a>.</p>
          </div>
          <a href="https://adson.dev"><strong>Adson</strong>.dev</a>
      </div>
    </footer>
  )
}

export default Footer
