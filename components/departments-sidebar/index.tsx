import style from './style.module.css'
import { map, isEmpty, filter, includes } from 'lodash'
import { arrangeDepartments } from './../utils/arrange-departments'

const DepartmentsSidebar = ({
  departments,
  onClick,
  departmentFilter,
  handleDepartmentItemExpansion,
  expandedDepartments,
}) => {
  const isExpanded = (department) =>
    includes(expandedDepartments, department.name)

  const renderDepartmentListItems = (departmentsGroup) => {
    return (
      <ul>
        {map(departmentsGroup, (d) => {
          const isExpandedWithChildren = d?.children?.length && isExpanded(d)
          return (
            <li
              key={d.id}
              onClick={handleDepartmentItemExpansion}
              aria-expanded={isExpanded(d)}
              className={`${isExpandedWithChildren && style.active} ${
                style.expands
              }`}
            >
              <span
                className={d.name === departmentFilter ? style.active : ''}
                onClick={onClick}
                key={d.id}
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
      <h5>Filter by Department</h5>
      {renderDepartmentListItems(arrangeDepartments(departments))}
    </div>
  )
}

export default DepartmentsSidebar
