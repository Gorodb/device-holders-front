import cn from 'classnames';
import {CheckboxProps} from "./checkbox.props";
import styles from './checkbox.module.scss'

export const Checkbox = ({className, onClick, id, isChecked, ...props}: CheckboxProps): JSX.Element => {
  return (
    <span className={cn(className, styles.checkboxContainer)}>
      <input type="checkbox" id={id} name={id} onClick={onClick} className={styles.hideInput} {...props} />
      <label htmlFor={id} className={cn(styles.checkbox, {
        [styles.checked]: isChecked,
        [styles.unchecked]: !isChecked
      })} />
    </span>
  )
}
