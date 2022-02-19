import {AutosuggestInputProps} from "./autosuggestInput.props";
import {SearchInput} from "../searchInput/searchInput";
import styles from "./autosuggestInput.module.scss"
import {useOutside} from "../../../hooks/useOutside";

export const AutosuggestInput = ({children, ...props}: AutosuggestInputProps): JSX.Element => {
  const {ref, isShow, setIsShow} = useOutside();

  return (
    <div className={styles.container}>
      <SearchInput {...props} onClick={() => {setIsShow(true)}} />
      {
        isShow && <div className={styles.dropdown} onClick={() => setIsShow(false)} ref={ref}>
          {children}
        </div>
      }
    </div>
  )
}
