import style from './style.module.css'
import { map, isEmpty, filter } from 'lodash'

const DepartmentsSidebar = ({ departments }) => {
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

  console.log(arrangeDepartments(departments))

  return (
    <div id="departments-sidebar" className={style.departmentsSidebar}>
      <ul>
        {map(departments, (d) => {
          return <li>{d.name}</li>
        })}
      </ul>
    </div>
  )
}

export default DepartmentsSidebar
