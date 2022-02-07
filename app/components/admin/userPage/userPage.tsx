import cn from 'classnames';
import {UserPageProps} from "./userPage.props";
import styles from './userPage.module.scss'

export const UserPage = ({children, className, ...props}: UserPageProps): JSX.Element => {
  return (
    <span>
      Страница пользователя
    </span>
  )
}
