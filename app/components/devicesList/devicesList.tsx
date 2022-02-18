import {ChangeEvent, useEffect, useState} from "react";

import {useGetDevicesQuery, useLazyGetDevicesOnUserQuery, useLazyGetDevicesQuery} from "../../store/devices/device.api";
import {IDevice} from "../../types/device.types";
import {useDepartment} from "../../hooks/useDepartment";
import {Device} from "./components/device";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from "./devicesList.module.scss";
import {useActions} from "../../hooks/useActions";
import {EventsEnum} from "../../types/events.types";
import {Input, Select} from "../htmlTags";
import {useDeviceTypesOptions} from "../../hooks/useDeviceTypesOptions";
import {useDebounce} from "use-debounce";

export const DevicesList = (): JSX.Element => {
  const [deviceType, setDeviceType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 500);
  const [eventListener, setEventListener] = useState<EventSource | null>(null);
  const isAuth = useTypedSelector(state => state.auth.isAuth)
  const department = useDepartment()
  const {data, isLoading, error} = useGetDevicesQuery({limit: 1000, page: 1, department, search: value, type: deviceType}, {
    refetchOnReconnect: true,
  })
  const [getDevicesOnMe, {data: myDevices, isSuccess: isMyDevicesSuccess}] = useLazyGetDevicesOnUserQuery()
  const currentUser = useTypedSelector(state => state.auth.user)
  const devices = useTypedSelector(state => state.devices.devices)
  const {options} = useDeviceTypesOptions()
  const devicesOnMe = useTypedSelector(state => state.devices.devicesOnMe)
  const {
    setDevices,
    setDevicesOnMe,
    updateDeviceInDevices,
    addDeviceIntoDevicesOnMe,
    removeDeviceFromDevicesOnMe,
  } = useActions()

  useEffect(() => {
    if (isAuth) {
      getDevicesOnMe("")
    }
  }, [getDevicesOnMe, isAuth])

  useEffect(() => {
    if (data) {
      setDevices(data.items)
    }
  }, [data, setDevices])

  useEffect(() => {
    if (myDevices) {
      setDevicesOnMe(myDevices.items)
    }
  }, [myDevices, setDevicesOnMe])

  useEffect(() => {
    let eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/device/sse`)
    setEventListener(eventSource)
    return () => {
      eventSource.close()
      setEventListener(null)
    }
  }, [])

  if (eventListener) {
    eventListener.onmessage = ({data}) => {
      try {
        const {event, device}: { event: EventsEnum, device: IDevice } = JSON.parse(data)
        if (event === EventsEnum.take) {
          updateDeviceInDevices(device);
          device.heldByUser?.id === currentUser.id
            ? addDeviceIntoDevicesOnMe(device)
            : removeDeviceFromDevicesOnMe(device)
        }
        if (event === EventsEnum.return) {
          updateDeviceInDevices(device);
          removeDeviceFromDevicesOnMe(device)
        }
        if (event === EventsEnum.returnToPrevious) {
          updateDeviceInDevices(device);
          device.heldByUser?.id === currentUser.id
            ? addDeviceIntoDevicesOnMe(device)
            : removeDeviceFromDevicesOnMe(device)
        }
      } catch {
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error...</div>
  }

  const onChooseOption = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setDeviceType(event.target.value || "")
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.target.value || "")
  }

  const filter = (
    <div className={styles.filtersBlock}>
      <div>
        <Input
          type="text"
          value={search}
          onChange={onChangeInput}
          placeholder="Поиск устройств по названию или ОС"
          className={styles.searchInput}
          onClear={() => setSearch("")}
        />
      </div>
      <div>
        <Select
          className={styles.select}
          value={deviceType}
          defaultOptionText="Выберите тип устройства"
          onChange={onChooseOption}
          onClear={() => setDeviceType("")}
        >
          {options}
        </Select>
      </div>
    </div>
  )

  const devicesOnMeComponent = (
    <div>
      <h3 className={styles.title}>Взятые мной устройства</h3>
      {
        isMyDevicesSuccess
        && devicesOnMe.map((device: IDevice): JSX.Element => <Device device={device} key={device.id}/>)
      }
    </div>
  )

  const allDevices = (
    <div className={styles.allDevicesTitle}>
      <h3 className={styles.title}>Все устройства</h3>
      {filter}
      {devices && devices.map((device: IDevice): JSX.Element => <Device device={device} key={device.id}/>)}
    </div>
  )

  return (
    <div>
      {isAuth && devicesOnMe && devicesOnMe.length > 0 && devicesOnMeComponent}
      {allDevices}
    </div>
  )
}
