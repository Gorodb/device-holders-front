import { format } from "date-fns";

import {FooterProps} from "./footer.props";
import styles from './footer.module.scss';
import cn from 'classnames';
import {ALink} from "../../aLink";

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>Device Holders © 2021 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <ALink href="/changeDepartment">Сменить подразделение</ALink>
    </footer>
  );
};
