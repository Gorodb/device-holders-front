import {useGetDevicesQuery} from "../../store/devices/device.api";
import {IDevice} from "../../types/device.types";
import {useDepartment} from "../../hooks/useDepartment";
import {Device} from "./components/device";

export const DevicesList = (): JSX.Element => {
  const department = useDepartment()
  const {data, isLoading, error} = useGetDevicesQuery({limit: 10, page: 1, department})

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  return (
    <div>
      {data && data.items.map((device: IDevice): JSX.Element => <Device device={device} key={device.id} />)}
    </div>
  )
}
