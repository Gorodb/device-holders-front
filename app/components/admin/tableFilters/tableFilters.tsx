import styles from './tableFilters.module.scss';
import {Button, ButtonTypes} from "../../htmlTags";
import {TableFiltersProps} from "./tableFilters.props";

export const TableFilters = ({children, onClearHandler, onClickHandler, newItemButtonText}: TableFiltersProps): JSX.Element => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersBlock}>
        <div className={styles.filters}>
            {children}
        </div>
        {onClearHandler && <div className={styles.rotateIconBlock}>
          <i className={styles.rotate} onClick={onClearHandler}/>
        </div>}
      </div>
      <div className={styles.filterButtons}>
        <Button buttonType={ButtonTypes.white} onClick={onClickHandler}>{newItemButtonText}</Button>
      </div>
    </div>
  )
}
