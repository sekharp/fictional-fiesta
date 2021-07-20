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
import DepartmentsSidebar from '../../components/departments-sidebar/index'

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

  const findSubdepartments = (departmentsList, parentDepartmentId) => {
    let subdepartments = []
    map(departmentsList, (department) => {
      if (department?.parent?.id === parentDepartmentId) {
        const matchingSubdepartments = findSubdepartments(
          departmentsList,
          department.id
        )

        if (!isEmpty(matchingSubdepartments)) {
          department.children = matchingSubdepartments
        }
        subdepartments.push(department)
      }
    })
    return subdepartments
  }

  const arrangeDepartments = (departmentsList) => {
    const parentDepartments = filter(departmentsList, (d) => !d.parent)
    const organizedDepartments = map(parentDepartments, (parentDepartment) => {
      const subDepartments = findSubdepartments(
        departmentsList,
        parentDepartment.id
      )
      return { ...parentDepartment, children: subDepartments }
    })

    return organizedDepartments
  }

  console.log(arrangeDepartments(allDepartments))

  return (
    <>
      <Nav />
      <main className={`${style.main} g-container`}>
        <br />
        <h1 className={style.pageHeader}>HashiCorp Humans</h1>
        <h6 className={style.pageSubheader}>Find a HashiCorp Human</h6>

        <SearchBar id="searchbar" onChange={handleSearch} />

        <AvatarFilter onClick={handleFilterByAvatar} />

        <div className={style.container}>
          <DepartmentsSidebar departments={allDepartments} />

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
