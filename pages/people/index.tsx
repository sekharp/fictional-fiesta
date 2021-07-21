import React, { useCallback, useState } from 'react'
import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'
import {
  isEmpty,
  filter,
  debounce,
  includes,
  lowerCase,
  map,
  split,
} from 'lodash'
import SearchBar from '../../components/searchbar/index'
import AvatarFilter from '../../components/avatar-filter/index'
import PeopleCards from '../../components/people-cards/index'
import DepartmentsSidebar from '../../components/departments-sidebar/index'

export default function PeoplePage({ allPeople, allDepartments }) {
  const [searchInput, useSearchInput] = useState('')
  const [isFilteredByAvatar, useFilterByAvatar] = useState(false)
  const [departmentFilter, useFilterByDepartment] = useState(null)
  const [expandedDepartments, useExpandedDepartments] = useState([])

  const handleSearch = ({ target }) => {
    const searchInput = target.value
    debounceSearch(searchInput)
  }

  const handleFilterByAvatar = () => {
    useFilterByAvatar(!isFilteredByAvatar)
  }

  const handleFilterByDepartment = ({ target }) => {
    const clickedDepartment = target.innerText
    useFilterByDepartment(clickedDepartment)
  }

  const handleDepartmentExpansion = ({ target }) => {
    const clickedDepartment = target.innerText
    if (includes(expandedDepartments, clickedDepartment))
      useExpandedDepartments(
        filter(
          expandedDepartments,
          (department) => department !== clickedDepartment
        )
      )
    else useExpandedDepartments([...expandedDepartments, clickedDepartment])
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
  if (departmentFilter && departmentFilter?.length < 20) {
    filteredPeople = filter(
      filteredPeople,
      (p) => p.department.name === departmentFilter
    )
  }

  return (
    <>
      <Nav />
      <main className={style.main}>
        <br />
        <h1 className={style.pageHeader}>HashiCorp Humans</h1>
        <h6 className={style.pageSubheader}>Find a HashiCorp Human</h6>

        <SearchBar id="searchbar" onChange={handleSearch} />

        <AvatarFilter onClick={handleFilterByAvatar} />

        <div className={style.container}>
          <DepartmentsSidebar
            departments={allDepartments}
            onClick={handleFilterByDepartment}
            departmentFilter={departmentFilter}
            handleDepartmentItemExpansion={handleDepartmentExpansion}
            expandedDepartments={expandedDepartments}
          />

          <PeopleCards people={filteredPeople} />
        </div>

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
