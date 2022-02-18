import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from './header.module.scss'
import {HeaderProps} from "./header.props";
import {useAuthorisation} from "../../../hooks/useAuthorisation";
import {useDepartmentJson} from "../../../hooks/useDepartmentJson";
import NoSsr from "../../admin/NoSsr/noSsr";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useRouter} from "next/router";
import {AvatarDropdown} from "../../avatarDropdown";
import {useOutside} from "../../../hooks/useOutside";
import {useRef} from "react";

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL

export const Header = ({className, isAdmin, ...props}: HeaderProps): JSX.Element => {
  const containerRef = useRef(null)
  const {ref, isShow, setIsShow} = useOutside([containerRef]);
  const [isAuth, deleteAccessToken] = useAuthorisation();
  const department = useDepartmentJson();
  const user = useTypedSelector(state => state.auth.user);
  const router = useRouter()

  const dropElements = !router.pathname.includes("/lk")
    ? [
      {onClick: () => router.push("/lk"), name: "Личный кабинет"},
      {onClick: deleteAccessToken, name: "Выход"},
    ] : [
      {onClick: () => router.push("/"), name: "К списку устройств"},
      {onClick: deleteAccessToken, name: "Выход"},
    ]

  const avatarMenuItem = (
    <div ref={ref} className={styles.avatarMenuItem} onClick={() => setIsShow(!isShow)}>
      <div className={styles.userAvatar}>
        {
          user.logo
            ? <Image width={40} height={40} src={imgPrefix + user.logo.url} alt={user.name}/>
            : <i className={styles.avatarIcon}/>
        }
      </div>
      {
        isShow && <AvatarDropdown
          refEl={containerRef}
          elements={dropElements}/>
      }
    </div>
  )

  const authLink = (<Link href={"/auth"}>
    <a className={styles.menuItem} onClick={() => router.push("/auth")}>Авторизация</a>
  </Link>)

  return (
    <header {...props} className={cn(className, styles.header)}>
      <NoSsr>
        <div className={styles.linksContainer}>
          {
            department
              ? <Link href='/changeDepartment'>
                <a className={cn(styles.menuItem, styles.departmentLink)}>{department.name}</a>
              </Link>
              : <Link href='/changeDepartment'>
                <a className={styles.menuItem}>Сменить подразделение</a>
              </Link>
          }
          <Link href='/'><a className={styles.menuItem}>Все устройства</a></Link>
          {isAdmin && <Link href='/admin'><a className={styles.menuItem}>Инструменты администрирования</a></Link>}
        </div>
        <div className={styles.linksContainer}>
          {!isAuth && authLink}
          {isAuth && user && avatarMenuItem}
        </div>
      </NoSsr>
    </header>
  )
}
