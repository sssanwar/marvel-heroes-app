import { useEffect } from "react"
import { useDebounce } from "../lib/hooks/debounce.hook"
import { searchCharacters } from "../api"
import Spinner from "./spinner"
import styles from "../styles/searchbox.module.css"

export default function SearchBox() {
  const inputRef = React.useRef(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [searchResults, setSearchResults] = React.useState(undefined)
  const [searchLoading, setSearchLoading] = React.useState(true)
  const [searchFocused, setSearchFocused] = React.useState(false)
  const handleChange = e => setSearchTerm(event.target.value)
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchLoading(true)
      searchCharacters(debouncedSearchTerm).then(result => {
        setSearchResults(result)
        setSearchLoading(false)
      })
    } else {
      setSearchResults(undefined)
      setSearchLoading(false)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const focusInListener = inputRef.current.addEventListener("focusin", () => setSearchFocused(true))
    const focusOutListener = inputRef.current.addEventListener("focusout", () =>
      window.setTimeout(() => setSearchFocused(false), 500)
    )
    return () => {
      inputRef.current.removeEventListener("focusin", focusInListener)
      inputRef.current.removeEventListener("focusout", focusOutListener)
    }
  })

  const getDetailUrl = urls => {
    const detailUrls = urls && urls.length > 0 ? urls.filter(u => u.type === "detail") : undefined
    return detailUrls && detailUrls.length > 0 ? detailUrls[0].url : "#"
  }

  return (
    <>
      <input
        ref={inputRef}
        type='text'
        onChange={e => handleChange(e)}
        className={styles.searchbox}
        placeholder="Type in hero's name here..."
      />
      {searchLoading && (
        <div className={styles.searchboxSpinner}>
          <Spinner />
        </div>
      )}

      <div className={styles.searchResults}>
        {searchFocused && searchResults && searchResults.length === 0 && (
          <p className={styles.searchNoResults}>No results found.</p>
        )}
        {searchFocused && searchResults && searchResults.length > 0 && (
          <ul className={styles.searchResultsList}>
            {searchResults.map((r, i) => (
              <li key={`search-result-${i}`}>
                <a href={getDetailUrl(r.urls)} target='_blank' rel='noopener noreferrer'>
                  <figure>
                    <img src={r.thumbnail} />
                  </figure>
                  <div className={styles.figureDetails}>
                    <p>
                      <strong>{r.name}</strong>
                    </p>
                    <p>{r.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
