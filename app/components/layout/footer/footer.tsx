import { format } from "date-fns";

import {FooterProps} from "./footer.props";
import styles from './footer.module.scss';
import cn from 'classnames';

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>Device Holders © 2021 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href="#" target="_blank">Сменить регион</a>
    </footer>
  );
};
