import style from './style.module.css'
import searchIcon from './search-icon.png'

export default function SearchBar({ id }) {
  return (
    <>
      <input
        style={{ backgroundImage: `url(${searchIcon})` }}
        className={style.searchbar}
        placeholder="Search people by name"
      />
    </>
  )
}
