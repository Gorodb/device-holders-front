import cn from "classnames";
import {SelectProps} from "./select.props";
import styles from './select.module.scss';

export const Select = ({
 label,
 onClear,
 children,
 defaultOptionText,
 isRequired,
 requiredText,
 className,
 ...props
}: SelectProps): JSX.Element => {
  return (
    <>
      {label && <label className={styles.label} htmlFor="select">{label}</label>}
      <div className={styles.selectContainer}>
        <select name="select" className={cn(styles.select, className, {[styles.defaultText]: !props.value})} {...props}>
          <option value=''>{defaultOptionText}</option>
          {children}
        </select>
        {onClear && props.value && <i className={styles.icon} onClick={onClear}/>}
        {isRequired && !props.value && <span className={styles.requiredInfo}>{requiredText || "Обязательное поле"}</span>}
      </div>
    </>
  )
}
