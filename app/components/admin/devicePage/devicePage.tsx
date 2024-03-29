import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

import {DevicePageProps} from "./devicePage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {
  useCreateDeviceMutation,
  useLazyGetDeviceQuery,
  useUpdateDeviceMutation,
} from "../../../store/devices/device.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import {Button, ButtonTypes, Input, Textarea} from "../../htmlTags";
import {ICreateDevice, IDevice} from "../../../types/device.types";
import AdminSelect from "../adminSelect";
import styles from './devicePage.module.scss';
import {AlertsTypesEnum} from "../../../store/alerts/alerts.slice";
import {useAlerts} from "../../../hooks/useAlerts";
import {useDepartmentsOptions} from "../../../hooks/useDepartmentsOptions";
import {useDeviceTypesOptions} from "../../../hooks/useDeviceTypesOptions";
import {AutosuggestInput} from "../autosuggestInput";
import {useUsersAutosuggestList} from "../../../hooks/useUsers";

const emptyDevice: IDevice = {
  id: "",
  name: "",
  osName: "",
  inventoryNumber: "",
  defaultLocation: "",
  currentLocation: "",
  charge: "",
  department: undefined,
  deviceType: undefined,
  owner: undefined,
};

export const DevicePage = ({id}: DevicePageProps): JSX.Element => {
  const [getDevice, {data, isSuccess, isLoading, error}] = useLazyGetDeviceQuery()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [device, setDevice] = useState<IDevice>(emptyDevice)
  const [deviceToUpdate, setDeviceToUpdate] = useState<ICreateDevice>({
    ...emptyDevice,
    department: "",
    deviceType: "",
    owner: null,
  })
  const {users, searchUsers, selectedUser} = useUsersAutosuggestList(deviceToUpdate.owner || "")
  const {setBreadcrumbs} = useActions()
  const setAlert = useAlerts()
  const [updateDevice, {
    isSuccess: isDeviceUpdated,
    isError: isErrorDeviceUpdate,
  }] = useUpdateDeviceMutation()
  const [createDevice, {
    data: createdDevice,
    isSuccess: isDeviceCreated,
    isError: isErrorDeviceCreate,
    error: createDeviceError,
  }] = useCreateDeviceMutation()
  const {
    options: departmentsOptions,
    data: departments,
    isSuccess: isDepartmentsSuccess
  } = useDepartmentsOptions({page: 1, limit: 1000})
  const {
    options: deviceTypesOptions,
  } = useDeviceTypesOptions({page: 1, limit: 1000})
  const router = useRouter()

  useEffect(() => {
    if (selectedUser) {
      setDeviceToUpdate({...deviceToUpdate, owner: selectedUser.id})
    }
  }, [selectedUser])

  useEffect(() => {
    if (id && id !== 'create') {
      getDevice(id)
    } else if (isDepartmentsSuccess && departments && departments.items[0].id) {
      setDeviceToUpdate({
        ...device,
        department: departments.items[0].id,
        deviceType: "",
        owner: null,
      })
    }
  }, [setDeviceToUpdate, departments, getDevice, id, isDepartmentsSuccess])

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      setDevice(data)
      setDeviceToUpdate({
        ...device,
        department: data.department ? data.department.id : "",
        deviceType: data.deviceType ? data.deviceType.id : "",
        owner: data.owner ? data.owner.id : null,
      })
    }
  }, [isSuccess, data, isLoading, device])

  useEffect(() => {
    if (isDeviceUpdated) {
      setAlert({text: 'Устройство обновлено', type: AlertsTypesEnum.success}, 3000)
    } else if (isErrorDeviceUpdate) {
      setAlert({text: `Не удалось обновить устройство: ${id}`, type: AlertsTypesEnum.error}, 3000)
    } else if (isDeviceCreated) {
      setAlert({text: 'Устройство создано', type: AlertsTypesEnum.success}, 3000)
      router.push(`/admin/devices/${createdDevice.id}`)
    } else if (isErrorDeviceCreate && createDeviceError) {
      // @ts-ignore
      const text = typeof createDeviceError.data.message === 'string'
        // @ts-ignore
        ? createDeviceError.data.message
        // @ts-ignore
        : createDeviceError.data.message.map((error: string, inx: number) => <div key={inx}>{error}</div>)
      setAlert({text, type: AlertsTypesEnum.error}, 10000)
    }
  }, [isDeviceCreated, createDeviceError, isErrorDeviceCreate, isErrorDeviceUpdate, isDeviceUpdated])

  useEffect(() => {
    if (
      !deviceToUpdate.department
      || !deviceToUpdate.name
      || !deviceToUpdate.deviceType
      || !deviceToUpdate.osName
      || !deviceToUpdate.inventoryNumber
      || !deviceToUpdate.defaultLocation
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [data, deviceToUpdate])

  useEffect(() => {
    const lastBreadcrumb = id === 'create'
      ? {route: '/admin/devices/create', pathName: 'Создание устройства', isLast: true}
      : {route: `/admin/devices/${id}`, pathName: `Редактирование устройства ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/devices', pathName: 'Устройства'},
    ]
    setBreadcrumbs([...breadcrumbs, lastBreadcrumb]);
  }, [id, setBreadcrumbs])

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setDeviceToUpdate({...deviceToUpdate, [event.target.name]: event.target.value})
  }

  const onDepartmentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setDeviceToUpdate({...deviceToUpdate, department: event.target.value})
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDeviceToUpdate({...deviceToUpdate, [event.target.name]: event.target.value})
  }

  const onChangeNullableInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.target.value === ""
      ? setDeviceToUpdate({...deviceToUpdate, [event.target.name]: null})
      : setDeviceToUpdate({...deviceToUpdate, [event.target.name]: event.target.value})
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setDeviceToUpdate({...deviceToUpdate, [event.target.name]: event.target.value})
  }


  const onChangeAutosuggestInput = (event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    searchUsers(data)

    setDeviceToUpdate({...deviceToUpdate, owner: event.target.value})
  }

  if (isLoading) {
    return <CircleLoader type={CircleTypes.dark}/>
  }

  if (error) {
    return <div>Что-то пошло не так...</div>
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.block}>
          <Input
            name="name"
            onClear={() => setDeviceToUpdate({...deviceToUpdate, name: ""})}
            onChange={onChangeInput}
            label='Название устройства'
            type="text"
            value={deviceToUpdate.name || ""}
            placeholder="Укажите название устройства"
            isRequired={true}
          />
          <Input
            name="inventoryNumber"
            onClear={() => setDeviceToUpdate({...deviceToUpdate, inventoryNumber: ""})}
            onChange={onChangeInput}
            label='Инвентаризационный номер'
            type="text"
            value={deviceToUpdate.inventoryNumber || ""}
            placeholder="Укажите инвентаризационный номер"
            isRequired={true}
          />
          <Textarea
            name="defaultLocation"
            onChange={onChangeTextArea}
            label='Место хранения устройства по умолчанию'
            value={deviceToUpdate.defaultLocation || ""}
            placeholder="Укажите место хранения устройства по умолчанию"
            isRequired={true}
          />
          <Textarea
            name="currentLocation"
            onChange={onChangeTextArea}
            label='Текущее местоположение устройства'
            value={deviceToUpdate.currentLocation || ""}
            placeholder="Укажите текущее место хранения устройства"
          />
        </div>
        <div className={styles.rightColumn}>
          <form autoComplete="off" className={styles.form}>
            <Input
              name="osName"
              onClear={() => setDeviceToUpdate({...deviceToUpdate, osName: ""})}
              onChange={onChangeInput}
              label='Операционная система'
              type="text"
              value={deviceToUpdate.osName || ""}
              placeholder="Укажите название ОС"
              isRequired={true}
            />
            <AutosuggestInput
              name="owner"
              onClear={() => setDeviceToUpdate({...deviceToUpdate, owner: null})}
              onChange={onChangeAutosuggestInput}
              label='Id владельца устройства'
              type="text"
              value={deviceToUpdate.owner || ""}
              placeholder="Укажите id владельца устройства">{users}</AutosuggestInput>
            {deviceTypesOptions && <AdminSelect
              name="deviceType"
              label="Тип устройства"
              className={styles.select}
              value={deviceToUpdate.deviceType || ""}
              onChange={onChangeSelect}
              defaultOptionText="Выберите тип устройства"
              isRequired={true}
            >{deviceTypesOptions}</AdminSelect>}
            {departmentsOptions && <AdminSelect
              label="Подразделение"
              value={deviceToUpdate.department}
              onChange={onDepartmentSelect}
              isRequired={true}
            >{departmentsOptions}</AdminSelect>}
          </form>
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <Button buttonType={ButtonTypes.black} isDisabled={isDisabled} onClick={() => {
          if (id !== 'create') {
            updateDevice(deviceToUpdate)
          } else {
            createDevice(deviceToUpdate)
          }
        }}>Сохранить</Button>
        <Button buttonType={ButtonTypes.white} onClick={() => router.push("/admin/devices")}>Отмена</Button>
      </div>
    </div>
  )
}

