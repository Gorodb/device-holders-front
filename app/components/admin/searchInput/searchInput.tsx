import {FaTimes} from "react-icons/fa";
import {SearchInputProps} from "./searchInput.props";
import styles from './searchInput.module.scss'

export const SearchInput = ({inputRef, value, onClear, label, onChange, ...props}: SearchInputProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input ref={inputRef} onChange={onChange} value={value} {...props}  className={styles.input} />
        {onClear && value && <FaTimes className={styles.icon} onClick={onClear}/>}
      </div>
    </div>
  )
}
