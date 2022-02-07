import Link from "next/link";
import cn from "classnames";

import styles from './adminHeader.module.scss'
import {AdminHeaderProps} from "./adminHeader.props";

export const AdminHeader = ({className, children, ...props}: AdminHeaderProps): JSX.Element => {

  return (
    <header {...props} className={cn(className, styles.header)}>
      <div className={styles.children}>
        {children}
      </div>
      <div className={styles.links}>
        <Link href='/'><a className={styles.menuItem}>Выйти из админки</a></Link>
      </div>
    </header>
  )
}
