import cn from "classnames";

import styles from './adminSidebar.module.scss'
import {AdminSidebarProps} from "./adminSidebar.props";
import {NavLink} from "../../navLink";

export const AdminSidebar = ({className, ...props}: AdminSidebarProps): JSX.Element => {
  return (
    <nav {...props} className={cn(className, styles.sidebar)}>
      <div className={styles.adminHead}>
        Админка
      </div>
      <div className={styles.menu}>
        <NavLink href='/admin' className={styles.menuItem}>Главная</NavLink>
        <NavLink href='/admin/users' className={styles.menuItem}>Пользователи</NavLink>
        <NavLink href='/admin/devices' className={styles.menuItem}>Устройства</NavLink>
        <NavLink href='/admin/departments' className={styles.menuItem}>Подразделения</NavLink>
      </div>
    </nav>
  )
}
