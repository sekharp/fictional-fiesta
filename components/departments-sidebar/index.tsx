import style from './style.module.css'
import { map, isEmpty, filter } from 'lodash'
import { arrangeDepartments } from './../utils/arrange-departments'

const DepartmentsSidebar = ({ departments, onClick, departmentFilter }) => {
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
