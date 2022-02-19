import cn from "classnames";
import {SelectWithDropdownProps} from "./selectWithDropdown.props";
import styles from './selectWithDropdown.module.scss';
import {useState} from "react";
import {useOutside} from "../../../hooks/useOutside";

export const SelectWithDropdown = ({
  label,
  onClear,
  className,
  defaultText,
  filtered,
  filterItems,
  filterFunction,
}: SelectWithDropdownProps): JSX.Element => {
  const [filter, setFilter] = useState<string | null>(null)
  const { ref, isShow, setIsShow } = useOutside();

  const onFilterArrowClick = () => {
    setIsShow(!isShow)
  }

  const onFilterClearClick = () => {
    if (onClear) {
      onClear()
    }
    setIsShow(false)
    setFilter(null)
  }

  const dropdown = (
    <div
      className={`${styles.dropdown} ${isShow ? styles.hidden : null}`}
    >
      {filterItems.map((value: string, index: number) => {
        return (
          <div key={index} className={styles['drop-item']} onClick={() => {
            onFilterArrowClick()
            setFilter(value)
            filterFunction(value)
          }}>{value}</div>
        )
      })}
    </div>
  )

  return (
    <div className={styles['filter-container']} ref={ref}>
      <div className={styles['filter-block']}>
        <div className={styles.filter}>
          <span onClick={onFilterArrowClick} className={styles['filter-title']}>{filter ? filter : defaultText}</span>
          <div className={styles['buttons-block']}>
            <div
              className={`${styles['button-container']} ${!filtered ? styles.hidden : null}`}
              onClick={onFilterClearClick}>
              <span className={`${styles.close}`}/>
            </div>
            <div className={styles['button-container']} onClick={onFilterArrowClick}>
              <span className={`${styles.arrow} ${isShow ? styles['arrow-down'] : styles['arrow-up']}`}/>
            </div>
          </div>
        </div>
        {dropdown}
      </div>
    </div>
  )
}
