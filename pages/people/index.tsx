import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'

export default function PeoplePage({ allPeople, allDepartments }) {
  return (
    <>
      <Nav />
      <main className={style.container}>
        <br />
        <h1 className={style.pageHeader}>HashiCorp Humans</h1>
        <h6 className={style.pageSubheader}>Find a HashiCorp Human</h6>

        {/* <pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre>
        <pre className={style.myData}>
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
