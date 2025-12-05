import { useEffect, useRef } from "react"
import styles from "./search-bar.module.css"
import SearchSVG from "../assets/icon-search.svg?react"

function SearchBar({ searchPokemon, filter, search, setSearch }) {
    const inputRef = useRef(null)

    function handleClick() {
        inputRef.current.focus()
    }

    useEffect(() => {
        if (filter) {
            setSearch("")
        }
    }, [filter])

    return (
        <div className={styles.search} onClick={handleClick}>
            <form className={styles.form} onSubmit={(e) => searchPokemon(e, search)}>
                <input
                    ref={inputRef}
                    className={styles.input}
                    type="text"
                    value={search}
                    onChange={({ target }) => setSearch(target.value)}
                    placeholder="Search by name or code"
                />
                <button className={styles.button}>
                    <SearchSVG className={styles.img} />
                </button>
            </form>
        </div>
    )
}

export default SearchBar
