import {ChangeEvent, useEffect, useState} from "react";
import {FaPen, FaTrashAlt} from 'react-icons/fa'
import cn from 'classnames';

import styles from './table.module.scss';
import {ITableDataHead, TableProps} from "./table.props";
import {CircleLoader, CircleTypes} from "../../loaders";
import {ButtonTypes, Button, Checkbox} from "../../htmlTags";

export const Table = ({children, showSpinner, onEdit, onDelete, onDeleteMany, tableData, ...props}: TableProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [allIds, setAllIds] = useState<string[]>([])
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  useEffect(() => {
    const getAllIds = tableData && tableData.tableData && tableData.tableData.reduce((acc: [], data: any) => [...acc, data.rowId], [])
    setAllIds(getAllIds)
  }, [tableData])

  const onCheck = (event: ChangeEvent) => {
    const id = event.target.id
    setAllChecked(false)
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((idInList: string) => idInList !== id))
    } else {
      setCheckedIds([...checkedIds, id])
    }
  }

  const onAllCheck = () => {
    setAllChecked(!allChecked)
    !allChecked ? setCheckedIds(allIds) : setCheckedIds([])
  }

  const tableHead = tableData && tableData.head.map((head: ITableDataHead, inx) =>
    (<th key={inx}>{head.title}</th>))

  const tableBody = tableData && tableData.tableData && tableData.tableData.map((data: any, inx: number) => {
    return (
      <tr className={cn({[styles.row]: inx % 2 === 0, [styles.rowSecondary]: inx % 2 !== 0})} key={inx}>
        <td>
          <Checkbox onClick={onCheck} id={data.rowId} isChecked={checkedIds.includes(data.rowId)} />
        </td>
        {tableData.columns.map((column, inx) => <td key={inx}>{data[column]}</td>)}
        <td className={styles.iconsCell}>
          <div className={styles.iconsCellContainer}>
            <FaTrashAlt className={styles.icon} onClick={() => {onDelete(data.rowId)}} />
            <FaPen className={styles.icon} onClick={() => {onEdit(data.rowId)}}/>
          </div>
        </td>
      </tr>
    )
  })

  const onCancelClick = () => {
    setCheckedIds([]);
    setAllChecked(false);
  }

  const onDeleteManyHandler = () => {
    onDeleteMany(checkedIds)
    setCheckedIds([])
    setAllChecked(false)
  }

  if (showSpinner) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  return (
    <div className={styles.tableContainer}>
      <table {...props} className={styles.table}>
        <thead className={styles.thead}>
        <tr>
          <th>
            <Checkbox onClick={onAllCheck} id="all" isChecked={allChecked} />
          </th>
          {tableHead}
          <th></th>
        </tr>
        </thead>
        <tbody>
        {tableBody}
        </tbody>
      </table>

      {checkedIds.length > 0 && <div className={styles.bottomButtons}>
        <Button buttonType={ButtonTypes.black} onClick={onDeleteManyHandler}>Удалить выбранное</Button>
        <Button className={styles.bottomButton} buttonType={ButtonTypes.transparent} onClick={onCancelClick}>Снять выделения</Button>
      </div>}
    </div>
  )
}
