import {IDepartment} from "../types/departments.types";
import {useGetDepartmentsQuery} from "../store/departments/departments.api";
import {IPaginateParams} from "../types/pagination.types";

export const useDepartmentsOptions = (queryOptions: IPaginateParams = {page: 1, limit: 1000}) => {
  const {data, ...props} = useGetDepartmentsQuery(queryOptions)

  const options: JSX.Element[] | undefined = data && data.items.map((department: IDepartment): JSX.Element => {
      const value = `${department.name} - ${department.description}`
      return <option key={department.id} value={department.id}>{value}</option>
    }
  )

  return {options, data, ...props}
}
