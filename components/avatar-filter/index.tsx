import style from './style.module.css'

const AvatarFilter = ({ onClick }) => {
  return (
    <div id="avatar-filter" className={style.avatarFilter}>
      <input
        id="avatar-filter"
        type="checkbox"
        name="avatar-filter"
        onClick={onClick}
      />
      <label htmlFor="avatar-filter">Hide people missing a profile image</label>
    </div>
  )
}

export default AvatarFilter
