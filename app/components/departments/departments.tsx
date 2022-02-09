import {ChangeEvent, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

import {useGetDepartmentsQuery} from "../../store/departments/departments.api";
import {CircleLoader, CircleTypes} from "../loaders";
import {IDepartment} from "../../types/departments.types";
import styles from './departments.module.scss';
import {CookiesEnum} from "../../enums/cookies.enum";
import {Select, Span, SpanSizeEnum} from "../htmlTags";

export const Departments = (): JSX.Element => {
  const [currentDepartment, setCurrentDepartment] = useState<string>('default')
  const [departmentFromCookies, setDepartmentFromCookies] = useState<string>()
  const {data, isLoading} = useGetDepartmentsQuery({page: 1, limit: 1000})
  const router = useRouter()

  useEffect(() => {
    setDepartmentFromCookies(Cookies.get(CookiesEnum.department))
    if (departmentFromCookies) {
      const department: IDepartment = JSON.parse(departmentFromCookies)
      setCurrentDepartment(department.id);
    }
  }, [departmentFromCookies])

  if (isLoading) {
    return <CircleLoader type={CircleTypes.dark}/>
  }

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const department: IDepartment = data!.items.find((dep: IDepartment) => dep.id === value)!;
    Cookies.set(CookiesEnum.department, JSON.stringify(department))
    router.push('/')
  };

  const options: JSX.Element[] | undefined = data && data.items.map((department: IDepartment): JSX.Element => {
      const value = `${department.name} - ${department.description}`
      return <option key={department.id} value={department.id}>{value}</option>
    }
  )

  return (
    <div className={styles.layout}>
      <div className={styles.header}/>
      <div className={styles.container}>
        <Span
          className={styles.title}
          size={SpanSizeEnum.large}
        >Выберите департамент, чтобы посмотреть устройства из вашего офиса</Span>
        <div className={styles.selectContainer}>
          {
            options && <Select
              defaultValue={currentDepartment}
              onChange={selectChange}
              defaultOptionText="Выберите департамент"
            >{options}</Select>
          }
        </div>
      </div>
    </div>
  )
}
