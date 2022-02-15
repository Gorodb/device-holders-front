import cn from "classnames";
import {AdminSelectProps} from "./adminSelect.props";
import styles from './adminSelect.module.scss';

export const AdminSelect = ({
  children,
  onClear,
  label,
  defaultOptionText,
  className,
  isRequired,
  requiredText,
  ...props
}: AdminSelectProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label} htmlFor="adminSelect">{label}</label>}
      <div className={styles.selectContainer}>
        <select
          name="adminSelect"
          value={props.value ? props.value : ""}
          className={cn(styles.select, className)}
          {...props}
        >
          {defaultOptionText && <option disabled value="">{defaultOptionText}</option>}
          {children}
        </select>
        {isRequired && !props.value && <span className={styles.requiredInfo}>{requiredText || "Обязательное поле"}</span>}
        {onClear && props.value && <i className={styles.icon} onClick={onClear} />}
      </div>
    </div>
  )
}
