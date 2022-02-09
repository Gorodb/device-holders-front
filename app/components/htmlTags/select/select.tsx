import cn from "classnames";
import {SelectProps} from "./select.props";
import styles from './select.module.scss';

export const Select = ({label, children, defaultOptionText, className, ...props}: SelectProps): JSX.Element => {

  return (
    <>
    {label && <label className={styles.label} htmlFor="select">{label}</label>}
      <select name="select" className={cn(styles.select, className)} {...props}>
      <option disabled value='default'>{defaultOptionText}</option>
      {children}
    </select>
    </>
  )
}
