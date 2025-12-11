import Button from "../components/Button"
import Cards from "../components/cards/Cards"
import DetailsModal from "../components/DetailsModal"
import Filter from "../components/Filter"
import SearchBar from "../components/SearchBar"
import styles from "./home.module.css"
import useFetch from "../components/hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import 'swiper/css/pagination';

// images
import lighting from "../assets/lighting.svg"
import redPokeball from "../assets/red-pokeball.png"
import bluePokeball from "../assets/blue-pokeball.png"
import bag from "../assets/bag.svg"
import arrowDown from "../assets/arrow-down-white.svg"

function Home() {
  const [mobile, setMobile] = useState(null)
  const API = "https://pokeapi.co/api/v2/"
  const DEFAULT_CARDS = `${API}pokemon?limit=${window.matchMedia("(max-width: 991px)").matches ? 6 : 9}&offset=0"`
  const [pokemonsList, setPokemonsList] = useState(null)
  const [pokemonsVisible, setPokemonsVisible] = useState(0)
  const [pokemonsCount, setPokemonsCount] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [filter, setFilter] = useState(1)
  const { data, err, loading, request } = useFetch()
  const pokemonSectionRef = useRef(null)
  const [detailsModal, setDetailsModal] = useState(null)
  const [details, setDetails] = useState({})
  const [typesList, setTypesList] = useState({})
  const [search, setSearch] = useState("")
  const [sent, setSent] = useState(false)

  // getPokemons will fetch the url and store
  // the response content into react states
  async function getPokemons(url) {
    const {responseJSON} = await request(url ? url : DEFAULT_CARDS)

    setPokemonsCount(responseJSON.count)
    setPokemonsList(responseJSON.results)
    setNextPage(responseJSON.next)
  }

  // getPokemon will fetch a single pokemon
  // using the url
  async function getPokemon(url) {
    const {response, responseJSON} = await request(url)

    if (!response.ok) {
      setPokemonsCount(0)
      setPokemonsList(null)
      return null
    }

    const img = responseJSON.sprites.other.dream_world.front_default
    const code = String(responseJSON.id).padStart(4, "0")
    const type = responseJSON.types[0].type.name

    setDetails((previous) => ({
      ...previous,
      pokemons: {
        ...previous.pokemons,
        [code]: responseJSON
      }
    }))

    return {
      img,
      code,
      type
    }
  }

  // searchPokemon will fetch a single pokemon
  // and store the response in the list
  async function searchPokemon(e, name) {
    e.preventDefault()

    if (!name || sent.name === name) return null
    
    setFilter(0)
    setPokemonsCount(1)
    setPokemonsList([{
      name: name,
      url: `${API}pokemon/${name}`
    }])
    setSent({name: name})
  }

  // filterPokemon will get only pokemons
  // that corresponding to the filter
  async function filterPokemons(type, index) {
    const { responseJSON } = await request(`${API}/type/${type}`)

    let temp = []
    responseJSON.pokemon.forEach((p) => {
      temp.push(p.pokemon)
    })

    setPokemonsList(temp)
    setPokemonsCount(responseJSON.pokemon.length)
    setPokemonsVisible(mobile ? 6 : 9)

    if (!filter) setFilter(index)
    
    scrollToPokemons()
  }

  // Get the type of the pokemon
  async function getType(type) {
    const {response, responseJSON} = await request(`${API}/type/${type}`)

    if (response.ok) setTypesList((previous) => ({...previous, [type]: responseJSON}))
    
    return responseJSON
  }

  // loadMore will get more pokemons and
  // add to the pokemonsList
  async function loadMore() {
    if (!filter) {
      return
    } else if (filter === 1) {
      const {responseJSON} = await request(nextPage)

      setPokemonsList((previous) => [...previous, ...responseJSON.results])
      setNextPage(responseJSON.next)
    } else {
      setPokemonsVisible((previous) => previous + (mobile ? 6 : 9))
    }
  }

  // scrollToPokemons will scroll
  // the pokemon section to the top.
  // timeout to grant that entire
  // page is loaded
  function scrollToPokemons() {
    setTimeout(() => {
      pokemonSectionRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    }, [50])
  }

  useEffect(() => {
    // Check if is mobile
    const { matches } = window.matchMedia("(max-width: 991px)")
    setMobile(matches)

    // fetch pokemons for initial page
    getPokemons()
  }, [])

  // prevent scroll while modal is active
  useEffect(() => {
    if(detailsModal) detailsModal.active ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "unset"
  }, [detailsModal])

  return (
    <>
      <section className={styles.hero}>
        <Swiper pagination={true} modules={[Pagination, EffectFade]} effect="fade" className={`${styles.slideWrapper} slide-pokeballs`}>
          <SwiperSlide className={`${styles.slide} ${styles.red}`}>
            <div className={`${styles.container} container`}>
              <div className={styles.text}>
                <div className={styles.tag}>
                  <div className={styles.iconWrapper}>
                    <img src={bag} alt="a bag"/>
                  </div>
                  <span>pokedex</span>
                </div>

                <h1>Who is that Pokémon?</h1>
                <p>The perfect guide for those who want to hunt Pokémons around the world</p>
              </div>

              <div className={styles.imgs}>
                <img src={lighting} alt="lights" className={styles.lighting} />
                <img src={redPokeball} alt="a red pokeball" className={styles.pokeball} />
              </div>
              
              <div className={styles.explore} onClick={scrollToPokemons}>
                <span>Explore</span>
                <div className={styles.iconWrapper}>
                  <img src={arrowDown} alt="explore pokemons" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={`${styles.slide} ${styles.blue}`}>
            <div className={`${styles.container} container`}>
              <div className={styles.text}>
                <div className={styles.tag}>
                  <div className={styles.iconWrapper}>
                    <img src={bag} alt="a bag"/>
                  </div>
                  <span>pokedex</span>
                </div>
                <h1>Catch them all!</h1>
                <p>The perfect guide for those who want to hunt Pokémons around the world</p>
              </div>

              <div className={styles.imgs}>
                <img src={lighting} alt="lights" className={styles.lighting} />
                <img src={bluePokeball} alt="a red pokeball" className={styles.pokeball} />
              </div>

              <div className={styles.explore} onClick={scrollToPokemons}>
                <span>Explore</span>
                <div className={styles.iconWrapper}>
                  <img src={arrowDown} alt="explore pokemons" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <div className={styles.search}>
        <div className={`container ${styles.container}`}>
          <h2>Select your pokémon</h2>
          <SearchBar searchPokemon={searchPokemon} filter={filter} search={search} setSearch={setSearch} />
        </div>
      </div>

      <div ref={pokemonSectionRef} className={styles.pokemons}>
        <div className={`container ${styles.container}`}>
          <Filter
            getPokemons={getPokemons}
            filterPokemons={filterPokemons}
            scrollToPokemons={scrollToPokemons}
            setFilter={setFilter}
            filter={filter}
            mobile={mobile}
            setSent={setSent}
          />

          <div className={styles.content}>
            <h2 className={styles.title}>
              {loading ? "Searching" : pokemonsCount === 0 ? "0 Pokémons" : pokemonsCount > 1 ? pokemonsCount + " Pokémons" : pokemonsCount + " Pokémon"}
            </h2>
            {pokemonsList && <Cards pokemons={filter === 1 || filter === 0 ? pokemonsList : pokemonsList.slice(0, pokemonsVisible)} getPokemon={getPokemon} detailsModal={setDetailsModal} />}
            {pokemonsCount > 1 &&
              (loading ? (
                <Button disabled>Carregando...</Button>
              ) : (
                <Button onClick={() => loadMore(data.next)}>
                  Load More Pokémons
                </Button>
              ))}
              {err && <p>{err}</p>}
          </div>
        </div>
      </div>

      {(detailsModal && detailsModal.active) && <DetailsModal details={details} options={detailsModal} setOptions={setDetailsModal} typesList={typesList} getType={getType} mobile={mobile} />}
    </>
  )
}

export default Home
