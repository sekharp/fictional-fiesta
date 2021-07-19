import React, { useCallback, useState } from 'react'
import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'
import { isEmpty, filter, debounce, includes, lowerCase, map } from 'lodash'
import SearchBar from '../../components/searchbar/index'
import AvatarFilter from '../../components/avatar-filter/index'
import PeopleCards from '../../components/people-cards/index'

export default function PeoplePage({ allPeople, allDepartments }) {
  const [searchInput, useSearchInput] = useState('')
  const [isFilteredByAvatar, useFilterByAvatar] = useState(false)

  const handleSearch = ({ target }) => {
    debounceSearch(target.value)
  }

  const handleFilterByAvatar = () => {
    useFilterByAvatar(!isFilteredByAvatar)
  }

  const debounceSearch = useCallback(
    debounce((searchValue: string) => {
      useSearchInput(searchValue)
    }, 1000),
    []
  )

  let filteredPeople = allPeople
  if (!isEmpty(searchInput)) {
    filteredPeople = filter(filteredPeople, (p) =>
      includes(lowerCase(p.name), lowerCase(searchInput))
    )
  }
  if (isFilteredByAvatar) {
    filteredPeople = filter(filteredPeople, (p) => !isEmpty(p.avatar?.url))
  }

  const parentDepartments = filter(allDepartments, (d) => d.parent === null)
  const childDepartments = filter(allDepartments, (d) => d.parent !== null)
  const defineChildDepartments = (parentDept, allChildDepts) => {
    map(allChildDepts, (c) => {
      if (parentDept.id === c.parent.id) {
        parentDept?.children?.push(c)
      }
      return c
    })
    map(parentDept.children, (c) => {
      defineChildDepartments(c, allChildDepts)
    })
    return parentDept
  }
  const departmentsList = map(parentDepartments, (p) => {
    p = { ...p, children: [] }
    defineChildDepartments(p, childDepartments)
    return p
  })

  console.log(departmentsList)

  return (
    <>
      <Nav />
      <main className={`${style.container} g-container`}>
        <br />
        <h1 className={style.pageHeader}>HashiCorp Humans</h1>
        <h6 className={style.pageSubheader}>Find a HashiCorp Human</h6>

        <SearchBar id="searchbar" onChange={handleSearch} />

        <AvatarFilter onClick={handleFilterByAvatar} />

        <PeopleCards people={filteredPeople} />
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
