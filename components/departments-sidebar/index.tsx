import style from './style.module.css'
import { map, isEmpty, filter } from 'lodash'

const DepartmentsSidebar = ({ departments, onClick, departmentFilter }) => {
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
  console.log(departmentFilter)
  const renderDepartmentListItems = (departmentsGroup) => {
    return (
      <ul>
        {map(departmentsGroup, (d) => {
          return (
            <li>
              <span
                className={d.name === departmentFilter ? style.active : ''}
                onClick={onClick}
              >
                {d.name}
              </span>
              {!isEmpty(d?.children) && renderDepartmentListItems(d.children)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      id="departments-sidebar"
      className={style.departmentsSidebar}
      onClick={onClick}
    >
      {renderDepartmentListItems(arrangeDepartments(departments))}
    </div>
  )
}

export default DepartmentsSidebar
