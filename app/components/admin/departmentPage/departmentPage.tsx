import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

import {DepartmentPageProps} from "./departmentPage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {
  useCreateDepartmentMutation,
  useLazyGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../../store/departments/departments.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import {Button, ButtonTypes, Input, Textarea} from "../../htmlTags";
import {IDepartment} from "../../../types/departments.types";
import styles from './departmentPage.module.scss';
import {AlertsTypesEnum} from "../../../store/alerts/alerts.slice";
import {useAlerts} from "../../../hooks/useAlerts";

const emptyDepartment: IDepartment = {
  id: "",
  name: "",
  description: "",
};

export const DepartmentPage = ({id}: DepartmentPageProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [department, setDepartment] = useState<IDepartment>(emptyDepartment)
  const {setBreadcrumbs} = useActions()
  const setAlert = useAlerts()
  const [getDepartment, {data, isSuccess, isLoading, error}] = useLazyGetDepartmentQuery()
  const [updateDepartment, {
    isSuccess: isDepartmentUpdated,
    isError: isErrorDepartmentUpdate,
  }] = useUpdateDepartmentMutation()
  const [createDepartment, {
    data: createdDepartment,
    isSuccess: isDepartmentCreated,
    isError: isErrorDepartmentCreate,
    error: createDepartmentError,
  }] = useCreateDepartmentMutation()
  const router = useRouter()

  useEffect(() => {
    if (id && id !== 'create') {
      getDepartment(id)
    } else {
      setDepartment(emptyDepartment)
    }
  }, [getDepartment, id])

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      setDepartment(data)
    }
  }, [data, isLoading, isSuccess])

  useEffect(() => {
    if (isDepartmentUpdated) {
      setAlert({text: 'Подразделение обновлено', type: AlertsTypesEnum.success}, 3000)
    }
    if (isErrorDepartmentUpdate) {
      setAlert({text: `Не удалось обновить подразделение: ${id}`, type: AlertsTypesEnum.error}, 3000)
    }
    if (isDepartmentCreated) {
      setAlert({text: 'Подразделение создано', type: AlertsTypesEnum.success}, 3000)
      router.push(`/admin/departments/${createdDepartment.id}`)
    }
    if (isErrorDepartmentCreate && createDepartmentError) {
      // @ts-ignore
      const text = typeof createDepartmentError.data.message === 'string'
        // @ts-ignore
        ? createDepartmentError.data.message
        // @ts-ignore
        : createDepartmentError.data.message.map((error: string, inx: number) => <div key={inx}>{error}</div>)
      setAlert({text, type: AlertsTypesEnum.error}, 10000)
    }
  }, [isDepartmentCreated, createDepartmentError, isErrorDepartmentCreate, isErrorDepartmentUpdate, isDepartmentUpdated])

  useEffect(() => {
    if (!department.name || !department.description) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [department])

  useEffect(() => {
    const lastBreadcrumb = id === 'create'
      ? {route: '/admin/departments/create', pathName: 'Создание подразделения', isLast: true}
      : {route: `/admin/departments/${id}`, pathName: `Редактирование подразделения ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/departments', pathName: 'Подразделения'},
    ]
    setBreadcrumbs([...breadcrumbs, lastBreadcrumb]);
  }, [id, setBreadcrumbs])

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDepartment({...department, [event.target.name]: event.target.value})
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setDepartment({...department, [event.target.name]: event.target.value})
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
            onClear={() => setDepartment({...department, name: ""})}
            onChange={onChangeInput}
            label='Подразделение'
            type="text"
            value={department.name || ""}
            placeholder="Укажите подразделение"
          />
          <Textarea
            name="description"
            onChange={onChangeTextArea}
            label='Описание подразделения'
            value={department.description || ""}
            placeholder="Укажите описание подразделения"
          />
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <Button buttonType={ButtonTypes.black} isDisabled={isDisabled} onClick={() => {
          if (id !== 'create') {
            updateDepartment(department)
          } else {
            createDepartment(department)
          }
        }}>Сохранить</Button>
        <Button buttonType={ButtonTypes.white} onClick={() => router.push("/admin/departments")}>Отмена</Button>
      </div>
    </div>
  )
}

