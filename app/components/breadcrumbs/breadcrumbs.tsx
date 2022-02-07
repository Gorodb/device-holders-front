import Link from 'next/link'
import cn from 'classnames';
import {BreadcrumbsProps} from './breadcrumbs.props'
import {IBreadcrumbs} from "../../types/breadcrumbs.types";
import styles from './breadcrumbs.module.scss'

export const Breadcrumbs = ({className, path, ...props}: BreadcrumbsProps): JSX.Element => {
  return (
    <div {...props} className={cn(className, styles.container)}>
      {
        path.map((p: IBreadcrumbs, inx) => {
          const link = (
            <Link key={inx} href={p.route!}>
              <a className={styles.breadcrumb}>{p.pathName}</a>
            </Link>
          )
          const lastPath = <span key={inx} className={styles.last}>{p.pathName}</span>
          return p.isLast ? lastPath : link
        })
      }
    </div>
  )
}
