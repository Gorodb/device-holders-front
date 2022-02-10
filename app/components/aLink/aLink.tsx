import Link from 'next/link';
import cn from 'classnames';
import {ALinkProps} from "./aLink.props";
import styles from './aLink.module.scss';

export const ALink = ({ href, exact = false, children, className, ...props }: ALinkProps): JSX.Element => {
  return (
    <Link href={href} {...props}>
      <a className={cn(styles.link, className)}>
        {children}
      </a>
    </Link>
  );
}
