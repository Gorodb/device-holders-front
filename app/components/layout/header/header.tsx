import Link from "next/link";
import cn from "classnames";

import styles from './header.module.scss'
import {HeaderProps} from "./header.props";
import {useEffect, useMemo, useState} from "react";
import {useAuthorisation} from "../../../hooks/useAuthorisation";
import {useDepartmentJson} from "../../../hooks/useDepartmentJson";
import NoSsr from "../../admin/NoSsr/noSsr";

interface IAuthData {
  href: string;
  text: string;
  onClick?: any
}

export const Header = ({className, isAdmin, ...props}: HeaderProps): JSX.Element => {
  const initialAuthData: IAuthData = useMemo(() => ({href: '/auth', text: 'Авторизация'}), [])
  const [authData, setAuthData] = useState<IAuthData>(initialAuthData);
  const [isAuth, deleteAccessToken] = useAuthorisation();
  const department = useDepartmentJson()

  useEffect(() => {
    if (isAuth) {
      setAuthData({
        href: '/', text: 'Выход', onClick: deleteAccessToken
      })
    } else {
      setAuthData(initialAuthData)
    }
  }, [deleteAccessToken, initialAuthData, isAuth])

  return (
    <header {...props} className={cn(className, styles.header)}>
      <NoSsr>
        <div>
          {
            department
              ? <Link href='/changeDepartment'><a className={cn(styles.menuItem, styles.departmentLink)}>{department.name}</a></Link>
              : <Link href='/changeDepartment'><a className={styles.menuItem}>Сменить подразделение</a></Link>
          }
          <Link href='/'><a className={styles.menuItem}>Все устройства</a></Link>
        </div>
        <div>
          {isAdmin && <Link href='/admin'><a className={styles.menuItem}>Инструменты администрирования</a></Link>}
          <Link href={authData.href}>
            <a className={styles.menuItem} onClick={authData.onClick}>{authData.text}</a>
          </Link>
        </div>
      </NoSsr>
    </header>
  )
}
