import {ChangeEvent, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

import {CircleLoader, CircleTypes} from "../loaders";
import {IDepartment} from "../../types/departments.types";
import styles from './departments.module.scss';
import {CookiesEnum} from "../../enums/cookies.enum";
import {Select, Span, SpanSizeEnum} from "../htmlTags";
import {ALink} from "../aLink";
import {useDepartmentsOptions} from "../../hooks/useDepartmentsOptions";

export const Departments = (): JSX.Element => {
  const [currentDepartment, setCurrentDepartment] = useState<string>("")
  const [departmentFromCookies, setDepartmentFromCookies] = useState<string>()
  const {options, data, isLoading} = useDepartmentsOptions()
  const router = useRouter()

  useEffect(() => {
    setDepartmentFromCookies(Cookies.get(CookiesEnum.department))
    if (departmentFromCookies) {
      const department: IDepartment = JSON.parse(departmentFromCookies)
      if (department.id) {
        setCurrentDepartment(department.id);
      }
    }
  }, [departmentFromCookies])

  if (isLoading) {
    return <CircleLoader type={CircleTypes.dark}/>
  }

  const selectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const department: IDepartment = data!.items.find((dep: IDepartment) => dep.id === value)!;
    Cookies.set(CookiesEnum.department, JSON.stringify(department), { expires: 365 })
    router.push('/')
  };

  const returnToMainBtn = <ALink href="/" className={styles.backToMainLink}>Вернуться на главную</ALink>

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
              value={currentDepartment}
              onChange={selectChange}
              defaultOptionText="Выберите департамент"
            >{options}</Select>
          }
        </div>
        {currentDepartment && returnToMainBtn}
      </div>
    </div>
  )
}
