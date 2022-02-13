import cn from "classnames";
import {AdminSelectProps} from "./adminSelect.props";
import styles from './adminSelect.module.scss';

export const AdminSelect = ({children, selectedValue, onClear, label, defaultOptionText, className, ...props}: AdminSelectProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label} htmlFor="adminSelect">{label}</label>}
      <div className={styles.selectContainer}>
        <select
          name="adminSelect"
          value={selectedValue ? selectedValue : 'default'}
          className={cn(styles.select, className)}
          {...props}
        >
          {defaultOptionText && <option value='default'>{defaultOptionText}</option>}
          {children}
        </select>
        {onClear && selectedValue && <i className={styles.icon} onClick={onClear} />}
      </div>
    </div>
  )
}
