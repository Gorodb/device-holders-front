import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from './header.module.scss'
import {HeaderProps} from "./header.props";
import {useEffect, useMemo, useState} from "react";
import {useAuthorisation} from "../../../hooks/useAuthorisation";
import {useDepartmentJson} from "../../../hooks/useDepartmentJson";
import NoSsr from "../../admin/NoSsr/noSsr";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useRouter} from "next/router";

interface IAuthData {
  href: string;
  text: string;
  onClick?: any
}

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL

export const Header = ({className, isAdmin, ...props}: HeaderProps): JSX.Element => {
  const initialAuthData: IAuthData = useMemo(() => ({href: '/auth', text: 'Авторизация'}), [])
  const [authData, setAuthData] = useState<IAuthData>(initialAuthData);
  const [isAuth, deleteAccessToken] = useAuthorisation();
  const department = useDepartmentJson();
  const user = useTypedSelector(state => state.auth.user);
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      setAuthData({
        href: '/', text: 'Выход', onClick: deleteAccessToken
      })
    } else {
      setAuthData(initialAuthData)
    }
  }, [deleteAccessToken, initialAuthData, isAuth])

  const avatar = user.logo
    ? <Image width={40} height={40} src={imgPrefix + user.logo.url} alt={user.name} />
    : <i className={styles.avatarIcon} />

  return (
    <header {...props} className={cn(className, styles.header)}>
      <NoSsr>
        <div className={styles.linksContainer}>
          {
            department
              ? <Link href='/changeDepartment'><a className={cn(styles.menuItem, styles.departmentLink)}>{department.name}</a></Link>
              : <Link href='/changeDepartment'><a className={styles.menuItem}>Сменить подразделение</a></Link>
          }
          <Link href='/'><a className={styles.menuItem}>Все устройства</a></Link>
          {isAdmin && <Link href='/admin'><a className={styles.menuItem}>Инструменты администрирования</a></Link>}
        </div>
        <div className={styles.linksContainer}>
          <Link href={authData.href}>
            <a className={styles.menuItem} onClick={authData.onClick}>{authData.text}</a>
          </Link>
          {isAuth && <div className={styles.userAvatar} onClick={() => router.push("/lk")}>{avatar}</div>}
        </div>
      </NoSsr>
    </header>
  )
}
