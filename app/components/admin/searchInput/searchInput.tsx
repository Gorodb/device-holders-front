import cn from "classnames";
import {SearchInputProps} from "./searchInput.props";
import styles from './searchInput.module.scss'

export const SearchInput = ({inputRef, value, onClear, label, ...props}: SearchInputProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input ref={inputRef} value={value} {...props} className={cn(styles.input, props.className)} />
        {onClear && value && <i className={styles.icon} onClick={onClear}/>}
      </div>
    </div>
  )
}
