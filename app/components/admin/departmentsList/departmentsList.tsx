import {ChangeEvent, useEffect, useState} from "react";
import {queryTypes, useQueryState} from 'next-usequerystate'
import {useRouter} from "next/router";

import styles from './departmentsList.module.scss';
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useActions} from "../../../hooks/useActions";
import {useDeleteDepartmentMutation, useGetDepartmentsQuery} from "../../../store/departments/departments.api";
import {ITableData, ITableDataHead, Table} from "../table";
import {emptyModal} from "../../../store/modal/modal.slice";
import SearchInput from "../searchInput";
import {IPagination} from "../../../types/pagination.types";
import {Pagination} from "../../pagination";
import {CircleLoader, CircleTypes} from "../../loaders";
import {clearObject} from "../../../utils/jsonCleaner";
import {ALink} from "../../aLink";
import {IDepartment} from "../../../types/departments.types";
import {TableFilters} from "../tableFilters";

export const DepartmentsList = (): JSX.Element => {
  const router = useRouter();
  const [page, setPage] = useQueryState('page', queryTypes.integer.withDefault(1));
  const [limit] = useQueryState('limit', queryTypes.integer.withDefault(10));
  const [search, setSearch] = useQueryState('search', queryTypes.string.withDefault(""));
  const [pagination, setPagination] = useState<IPagination>()
  const [departmentsData, setDepartmentsData] = useState<ITableData>()
  const {setBreadcrumbs, setModalIsOpen, setModal} = useActions()
  const [deleteDepartment] = useDeleteDepartmentMutation()
  const {data, isLoading, error, } = useGetDepartmentsQuery(clearObject({page, limit, search}), {
    refetchOnReconnect: true,
  })

  useEffect(() => {
    data && setPagination(data.pagination)
    const head: ITableDataHead[] = [
      {name: "id", title: "id"},
      {name: "name", title: "Название"},
      {name: "description", title: "Описание"}
    ]
    const columns = ["id", "name", "description"]
    const tableData = data && data.items.map((dep: IDepartment) => {
      const id = (
        <ALink href={`/admin/departments/${dep.id}`}>
          <div className={styles.idColumnData}>{dep.id}</div>
        </ALink>
      )
      const name = dep.name ? (
        <ALink href={`/admin/departments/${dep.id}`}>
          <div>{dep.name}</div>
        </ALink>
      ) : ''
      const description = dep.description ? (
        <ALink href={`/admin/departments/${dep.id}`}>
          <div>{dep.description}</div>
        </ALink>
      ) : ''
      return {id, name, description, rowId: dep.id}
    });

    setDepartmentsData({columns, head, tableData})
  }, [data])

  useEffect(() => {
    if (pagination && pagination?.page > pagination?.totalPages) {
      setPage(1)
    }
  }, [pagination, setPage])

  useEffect(() => {
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/departmentsList', pathName: 'Список подразделений', isLast: true},
    ]
    setBreadcrumbs(breadcrumbs);
  }, [setBreadcrumbs])

  const onSearchHandler = async ({target}: ChangeEvent<HTMLInputElement>) => {
    await setSearch(target.value)
    await setPage(1)
  }

  const handlePageChange = async (event: {selected: number}) => {
    await setPage(event.selected + 1)
  };

  const onDelete = (id: string) => {
    setModal({
      title: "Удаление подразделения",
      subtitle: <div>Подтвердите удаление подразделения с id: <span className={styles.bold}>{id}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        setModal(emptyModal);
        setModalIsOpen(false);
        deleteDepartment(id)
      }
    })
    setModalIsOpen(true);
  };

  const onDeleteMany = (ids: string[]) => {
    setModal({
      title: "Удаление подразделений",
      subtitle: <div>Подтвердите удаление подразделений с id: <span className={styles.bold}>{ids.join(', ')}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        for (let id of ids) {
          deleteDepartment(id)
        }
        setModal(emptyModal);
        setModalIsOpen(false);
      }
    })
    setModalIsOpen(true);
  };

  const onEdit = async (id: string) => {
    await router.push(`/admin/departments/${id}`)
  };

  if (!page) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  if (error) return <div>Что-то пошло не так</div>

  return (
    <div className={styles.listContainer}>
      <TableFilters
        onClickHandler={() => router.push(`/admin/departments/create`)}
        newItemButtonText="Добавить подразделение"
      >
        <SearchInput
          name="search"
          type="text"
          onChange={onSearchHandler}
          label="Поиск подразделений"
          placeholder="Введите название или описание"
          value={search || ""}
          onClear={async () => {
            await setPage(1)
            await setSearch("")
          }}
        />
      </TableFilters>
      <Table
        onDelete={onDelete}
        onDeleteMany={onDeleteMany}
        onEdit={onEdit}
        tableData={departmentsData!}
        showSpinner={isLoading}
      />
      {pagination && pagination.totalPages > 1 && <Pagination
        onPageChange={handlePageChange}
        forcePage={page > 0 ? page - 1 : 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        pageCount={pagination.totalPages}
      />}
    </div>
  )
}
