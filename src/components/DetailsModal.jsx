import { useEffect, useState } from "react"
import { Captalize } from "./helpers/Strings"
import styles from "./details-modal.module.css"

// images
import close from "../assets/close.svg"
import Tags from "./Tags"
import StatsBar from "./StatsBar"

function DetailsModal({ details, options, setOptions, getType, typesList }) {
    const [pokemon, setPokemon] = useState(details.pokemons[options.current])
    const [weaknesses, setWeaknesses] = useState(null)
    const [stats, setStats] = useState(null)
    
    async function getWeaknesses() {
        let temp = []
        for (const t of pokemon.types) {
            let type = t.type.name
            let typeData = typesList[type]
    
            if (!typeData) {
                typeData = await getType(t.type.name)
            }
    
            let weaknessesList = typeData.damage_relations.double_damage_from
            
            weaknessesList.forEach((w) => {
                if(!temp.includes(w.name)) temp.push(w.name)
            });
        }
        
        const visible = temp.slice(0, 4)
        const remaining = temp.slice(4)

        setWeaknesses({
            visible: visible,
            remaining: remaining
        })
    }

    function getStats() {
        const temp = []

        pokemon.stats.forEach((s) => {
            const statBaseValue = s.base_stat
            const statName = s.stat.name

            const stat = {
                stat_name: statName,
                stat_base_value: statBaseValue
            }

            temp.push(stat)
        })

        setStats(temp)
    }
    
    useEffect(() => {
        getWeaknesses()
        getStats()
    }, [])
    
    function closeModal(e) {
        if (e.target === e.currentTarget) {
            setOptions((previous) => ({...previous, active: false}))
        }
    }

    return (
        <div className={styles.wrapper} onClick={(e) => closeModal(e)}>
            <div className={styles.modal}>
                <div className={styles.close} onClick={() => setOptions((previous) => ({...previous, active: false}))}>
                    <img src={close} alt="close modal" />
                </div>

                {pokemon && <div className={styles.pokemon}>
                    <img className={styles.pokemonImage} src={pokemon.sprites.other.dream_world.front_default} alt={`pokemon ${pokemon.name} image`} />
                    <img src={`/types/backgrounds/${pokemon.types[0].type.name}.svg`} alt={`background of type ${pokemon.types[0].type.name} pokemons`} />
                </div>}

                <div className={styles.details}>
                    <h2 className={styles.name}>{Captalize(pokemon.name)} <span>#{options.current}</span></h2>

                    <ul className={styles.types}>
                        {pokemon.types.map((t) => {
                            const type = t.type.name
                            return (
                                <Tags key={type} type={type}>{type}</Tags>
                            )
                        })}
                    </ul>

                    <div className={styles.measures}>
                        <span>Height<strong>{pokemon.height/10}m</strong></span>
                        <span>Weight<strong>{pokemon.weight/10}kg</strong></span>
                        <span>Ability<strong>{Captalize(pokemon.abilities[0].ability.name)}</strong></span>
                    </div>

                    {weaknesses && <div>
                        <h3 className={styles.title}>Weaknesses</h3>
                        <ul className={styles.weaknesses}>
                            {weaknesses.visible.map((w) => {
                                return(
                                    <Tags key={w} type={w}>{w}</Tags>
                                )
                            })}
                            {weaknesses.remaining.length > 0 && <span className={styles.remaining}>+{weaknesses.remaining.length}</span>}
                        </ul>
                    </div>}

                    {stats && <div>
                        <h3 className={styles.title}>Stats</h3>
                        <ul>
                            {stats.map((s, index) => {
                                return (
                                    <StatsBar key={index + s.stat_base_value + s.stat_name} name={s.stat_name} baseValue={s.stat_base_value} />
                                )
                            })}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default DetailsModal