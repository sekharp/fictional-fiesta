import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'
import SearchBar from '../../components/searchbar/index'
import { map } from 'lodash'
import avatarDefault from './avatar-default.png'

export default function PeoplePage({ allPeople, allDepartments }) {
  return (
    <>
      <Nav />
      <main className={style.container}>
        <br />
        <h1 className={style.pageHeader}>HashiCorp Humans</h1>
        <h6 className={style.pageSubheader}>Find a HashiCorp Human</h6>

        <SearchBar id="searchbar" />

        <div id="people-container">
          {map(allPeople, (p) => {
            return (
              <div className={style.personCard}>
                <img
                  className={style.avatar}
                  src={p.avatar?.url || avatarDefault}
                  alt={p.avatar?.alt}
                />
                <div className={style.personCardContainer}>
                  <span>
                    <strong>{p.name}</strong>
                  </span>
                  <br />
                  <span>{p.title}</span>
                  <br />
                  <span>{p.department.name}</span>
                  <br />
                </div>
              </div>
            )
          })}
        </div>
        {/* <pre className={style.myData}>
          {JSON.stringify(allDepartments, null, 2)}
        </pre> */}
        <br />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const data = await rivetQuery({ query })
  return { props: data }
}
