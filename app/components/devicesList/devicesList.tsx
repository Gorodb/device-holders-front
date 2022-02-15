import {useGetDevicesQuery, useLazyGetDevicesOnUserQuery} from "../../store/devices/device.api";
import {IDevice} from "../../types/device.types";
import {useDepartment} from "../../hooks/useDepartment";
import {Device} from "./components/device";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect} from "react";

export const DevicesList = (): JSX.Element => {
  const isAuth = useTypedSelector(state => state.auth.isAuth)
  const department = useDepartment()
  const {data, isLoading, error} = useGetDevicesQuery({limit: 10, page: 1, department})
  const [getDevicesOnMe, {data: myDevices, isSuccess: isMyDevicesSuccess}] = useLazyGetDevicesOnUserQuery()

  useEffect(() => {
    if (isAuth) {
      getDevicesOnMe("")
    }
  }, [getDevicesOnMe, isAuth])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }

  const devicesOnMe = (
    <div>
      Взятые мной устройства:
      {
        isMyDevicesSuccess
        && myDevices
        && myDevices.items.map((device: IDevice): JSX.Element => <Device device={device} key={device.id}/>)
      }
    </div>
  )

  const allDevices = (
    <div>
      Все устройства
      {data && data.items.map((device: IDevice): JSX.Element => <Device device={device} key={device.id}/>)}
    </div>
  )

  return (
    <div>
      {isAuth && devicesOnMe}
      {allDevices}
    </div>
  )
}
