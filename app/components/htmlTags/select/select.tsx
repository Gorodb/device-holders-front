import cn from "classnames";
import {SelectProps} from "./select.props";
import styles from './select.module.scss';

export const Select = ({options, defaultOptionText, className, ...props}: SelectProps): JSX.Element => {

  return (
    <select className={cn(styles.select, className)} {...props}>
      <option disabled value='default'>{defaultOptionText}</option>
      {options}
    </select>
  )
}
