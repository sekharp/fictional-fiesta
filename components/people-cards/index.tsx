import style from './style.module.css'
import { map, isEmpty } from 'lodash'
import avatarDefault from './avatar-default.png'

const PeopleCards = ({ people }) => {
  return (
    <div id="people-container">
      {isEmpty(people) && <p>No results found.</p>}
      {map(people, (p) => {
        return (
          <div className={style.personCard}>
            <img
              className={style.avatar}
              src={p.avatar?.url || avatarDefault}
              alt={p.avatar?.alt}
            />
            <div className={style.personCardBody}>
              <span>
                <strong>{p.name}</strong>
              </span>
              <br />
              <span>{p.title}</span>
              <br />
              <span className={style.departmentName}>{p.department.name}</span>
              <br />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PeopleCards
