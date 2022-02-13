import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

import {DeviceTypePageProps} from "./deviceTypePage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {
  useCreateDeviceTypeMutation,
  useLazyGetDeviceTypeQuery,
  useUpdateDeviceTypeMutation,
} from "../../../store/deviceTypes/deviceTypes.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import {Button, ButtonTypes, Input, Textarea} from "../../htmlTags";
import {IDeviceType} from "../../../types/deviceTypes.types";
import styles from './deviceTypePage.module.scss';
import {AlertsTypesEnum} from "../../../store/alerts/alerts.slice";
import {useAlerts} from "../../../hooks/useAlerts";

const emptyDeviceType: IDeviceType = {
  id: "",
  deviceType: "",
  title: "",
  description: "",
};

export const DeviceTypePage = ({id}: DeviceTypePageProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [deviceType, setDeviceType] = useState<IDeviceType>(emptyDeviceType)
  const {setBreadcrumbs} = useActions()
  const setAlert = useAlerts()
  const [getDeviceType, {data, isSuccess, isLoading, error}] = useLazyGetDeviceTypeQuery()
  const [updateDeviceType, {
    isSuccess: isDeviceTypeUpdated,
    isError: isErrorDeviceTypeUpdate,
  }] = useUpdateDeviceTypeMutation()
  const [createDeviceType, {
    data: createdDeviceType,
    isSuccess: isDeviceCreatedType,
    isError: isErrorDeviceTypeCreate,
    error: createDeviceTypeError,
  }] = useCreateDeviceTypeMutation()
  const router = useRouter()

  useEffect(() => {
    if (id && id !== 'create') {
      getDeviceType(id)
    } else {
      setDeviceType(emptyDeviceType)
    }
  }, [getDeviceType, id])

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      setDeviceType(data)
    }
  }, [data, isLoading, isSuccess])

  useEffect(() => {
    if (isDeviceTypeUpdated) {
      setAlert({text: 'Тип устройства обновлен', type: AlertsTypesEnum.success}, 3000)
    }
    if (isErrorDeviceTypeUpdate) {
      setAlert({text: `Не удалось обновить тип устройства: ${id}`, type: AlertsTypesEnum.error}, 3000)
    }
    if (isDeviceCreatedType) {
      setAlert({text: 'Тип устройства создан', type: AlertsTypesEnum.success}, 3000)
      router.push(`/admin/deviceTypes/${createdDeviceType.id}`)
    }
    if (isErrorDeviceTypeCreate && createDeviceTypeError) {
      // @ts-ignore
      const text = typeof createDeviceTypeError.data.message === 'string'
        // @ts-ignore
        ? createDeviceTypeError.data.message
        // @ts-ignore
        : createDeviceTypeError.data.message.map((error: string, inx: number) => <div key={inx}>{error}</div>)
      setAlert({text, type: AlertsTypesEnum.error}, 10000)
    }
  }, [isDeviceCreatedType, createDeviceTypeError, isErrorDeviceTypeCreate, isErrorDeviceTypeUpdate, isDeviceTypeUpdated])

  useEffect(() => {
    if (!deviceType.deviceType || !deviceType.title || !deviceType.description) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [deviceType])

  useEffect(() => {
    const lastBreadcrumb = id === 'create'
      ? {route: '/admin/deviceTypes/create', pathName: 'Создание типа устройства', isLast: true}
      : {route: `/admin/deviceTypes/${id}`, pathName: `Редактирование типа устройства ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/deviceTypes', pathName: 'Типы устройств'},
    ]
    setBreadcrumbs([...breadcrumbs, lastBreadcrumb]);
  }, [id, setBreadcrumbs])

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDeviceType({...deviceType, [event.target.name]: event.target.value})
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setDeviceType({...deviceType, [event.target.name]: event.target.value})
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
            name="deviceType"
            onClear={() => setDeviceType({...deviceType, deviceType: ""})}
            onChange={onChangeInput}
            label='Тип устройства'
            type="text"
            value={deviceType.deviceType || ""}
            placeholder="Укажите тип устройства"
          />
          <Input
            name="title"
            onClear={() => setDeviceType({...deviceType, title: ""})}
            onChange={onChangeInput}
            label='Имя типа устройства'
            type="text"
            value={deviceType.title || ""}
            placeholder="Укажите имя типа устройства"
          />
        </div>
        <div className={styles.rightColumn}>
            <Textarea
              name="description"
              onChange={onChangeTextArea}
              label='Описание типа устройства'
              value={deviceType.description || ""}
              placeholder="Укажите описание типа устройства"
            />
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <Button buttonType={ButtonTypes.black} isDisabled={isDisabled} onClick={() => {
          if (id !== 'create') {
            updateDeviceType(deviceType)
          } else {
            createDeviceType(deviceType)
          }
        }}>Сохранить</Button>
        <Button buttonType={ButtonTypes.white} onClick={() => router.push("/admin/deviceTypes")}>Отмена</Button>
      </div>
    </div>
  )
}

