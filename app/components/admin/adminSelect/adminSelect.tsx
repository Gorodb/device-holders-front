import cn from "classnames";
import {AdminSelectProps} from "./adminSelect.props";
import styles from './adminSelect.module.scss';
import {FaTimes} from "react-icons/fa";

export const AdminSelect = ({options, selectedValue, onClear, label, defaultOptionText, className, ...props}: AdminSelectProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label} htmlFor="adminSelect">{label}</label>}
      <div className={styles.selectContainer}>
        <select name="adminSelect" value={options? selectedValue : 'default'} className={cn(styles.select, className)} {...props}>
          <option value='default'>{defaultOptionText}</option>
          {options}
        </select>
        {onClear && selectedValue && <FaTimes className={styles.icon} onClick={onClear}/>}
      </div>
    </div>
  )
}
