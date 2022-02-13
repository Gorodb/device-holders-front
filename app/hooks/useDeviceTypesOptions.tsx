import {IDepartment} from "../types/departments.types";
import {useGetDepartmentsQuery} from "../store/departments/departments.api";
import {IPaginateParams} from "../types/pagination.types";
import {useGetDeviceTypesQuery} from "../store/deviceTypes/deviceTypes.api";
import {IDeviceType} from "../types/deviceTypes.types";

export const useDeviceTypesOptions = (queryOptions: IPaginateParams = {page: 1, limit: 1000}) => {
  const {data, ...props} = useGetDeviceTypesQuery(queryOptions)

  const options: JSX.Element[] | undefined = data && data.items.map((deviceType: IDeviceType): JSX.Element => {
      const value = `${deviceType.title} - ${deviceType.description}`
      return <option key={deviceType.id} value={deviceType.id}>{value}</option>
    }
  )

  return {options, data, ...props}
}
