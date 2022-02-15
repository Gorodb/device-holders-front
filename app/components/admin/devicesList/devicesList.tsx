import {ChangeEvent, useEffect, useState} from "react";
import {queryTypes, useQueryState} from 'next-usequerystate'
import {useRouter} from "next/router";

import styles from './devicesList.module.scss';
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useActions} from "../../../hooks/useActions";
import {useDeleteDeviceMutation, useGetDevicesQuery} from "../../../store/devices/device.api";
import {ITableData, ITableDataHead, Table} from "../table";
import {IDevice} from "../../../types/device.types";
import {emptyModal} from "../../../store/modal/modal.slice";
import SearchInput from "../searchInput";
import {useDepartmentsOptions} from "../../../hooks/useDepartmentsOptions";
import AdminSelect from "../adminSelect";
import {IPagination} from "../../../types/pagination.types";
import {Pagination} from "../../pagination";
import {CircleLoader, CircleTypes} from "../../loaders";
import {clearObject} from "../../../utils/jsonCleaner";
import {ALink} from "../../aLink";
import {TableFilters} from "../tableFilters";

export const DevicesList = (): JSX.Element => {
  const router = useRouter();
  const {options} = useDepartmentsOptions({page: 1, limit: 1000})
  const [page, setPage] = useQueryState('page', queryTypes.integer.withDefault(1));
  const [limit] = useQueryState('limit', queryTypes.integer.withDefault(10));
  const [department, setDepartment] = useQueryState('department', queryTypes.string.withDefault(""));
  const [search, setSearch] = useQueryState('search', queryTypes.string.withDefault(""));
  const [pagination, setPagination] = useState<IPagination>()
  const [usersData, setUsersData] = useState<ITableData>()
  const {setBreadcrumbs, setModalIsOpen, setModal} = useActions()
  const [deleteDevice] = useDeleteDeviceMutation()
  const {data, isLoading, error, } = useGetDevicesQuery(clearObject({page, limit, department, search}), {
    refetchOnReconnect: true,
  })

  useEffect(() => {
    data && setPagination(data.pagination)
    const head: ITableDataHead[] = [
      {name: "id", title: "id"},
      {name: "name", title: "Название"},
      {name: "osName", title: "ОС"},
      {name: "defaultLocation", title: "Место хранения"},
      {name: "inventoryNumber", title: "Инвентаризационный номер"}
    ]
    const columns = ["id", "name", "osName", "defaultLocation", "inventoryNumber"]
    const tableData = data && data.items.map((device: IDevice) => {
      const id = (
        <ALink href={`/admin/devices/${device.id}`}>
          <div className={styles.idColumnData}>{device.id}</div>
        </ALink>
      )
      const name = device.name ? (
        <ALink href={`/admin/devices/${device.id}`}>
            <div>{device.name}</div>
        </ALink>
      ) : ''
      const osName = device.osName ? (
        <ALink href={`/admin/devices/${device.id}`}>
          <span>{device.osName}</span>
        </ALink>
      ) : ''
      const defaultLocation = device.defaultLocation ? (
        <ALink href={`/admin/devices/${device.id}`}>
          <div>{device.defaultLocation}</div>
        </ALink>
      ) : ''
      const inventoryNumber = device.inventoryNumber ? (
        <ALink href={`/admin/devices/${device.id}`}>
          <div>{device.inventoryNumber}</div>
        </ALink>
      ) : ''
      return {id, name, osName, defaultLocation, inventoryNumber, rowId: device.id}
    });

    setUsersData({columns, head, tableData})
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
      {route: '/admin/devicesList', pathName: 'Список устройств', isLast: true},
    ]
    setBreadcrumbs(breadcrumbs);
  }, [setBreadcrumbs])

  const onSearchHandler = async ({target}: ChangeEvent<HTMLInputElement>) => {
    await setSearch(target.value)
    await setPage(1)
  }

  const onSelectDepartment = async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    await setDepartment(event.target.value)
    await setPage(1)
  }

  const handlePageChange = async (event: {selected: number}) => {
    await setPage(event.selected + 1)
  };

  const onDelete = (id: string) => {
    setModal({
      title: "Удаление устройства",
      subtitle: <div>Подтвердите удаление устройства с id: <span className={styles.bold}>{id}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        setModal(emptyModal);
        setModalIsOpen(false);
        deleteDevice(id)
      }
    })
    setModalIsOpen(true);
  };

  const onDeleteMany = (ids: string[]) => {
    setModal({
      title: "Удаление устройств",
      subtitle: <div>Подтвердите удаление устройств с id: <span className={styles.bold}>{ids.join(', ')}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        for (let id of ids) {
          deleteDevice(id)
        }
        setModal(emptyModal);
        setModalIsOpen(false);
      }
    })
    setModalIsOpen(true);
  };

  const onEdit = async (id: string) => {
    await router.push(`/admin/devices/${id}`)
  };

  if (error) return <div>Что-то пошло не так...</div>

  if (!page) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  const filters = (
    <TableFilters
      onClickHandler={() => router.push(`/admin/devices/create`)}
      onClearHandler={async () => {
        await setPage(1)
        await setSearch("")
        await setDepartment("")
      }}
      newItemButtonText="Добавить устройство"
    >
      <SearchInput
        name="search"
        type="text"
        onChange={onSearchHandler}
        label="Поиск устройств"
        placeholder="Введите название или операционную систему"
        value={search || ""}
        onClear={async () => {
          await setPage(1)
          await setSearch("")
        }}
      />
      {options && <AdminSelect
        label="Выберите подразделение"
        value={department}
        onClear={async () => {
          await setPage(1)
          await setDepartment("")
        }}
        onChange={onSelectDepartment}
        defaultOptionText={"Все"}
      >{options}</AdminSelect>}
    </TableFilters>
  )

  return (
    <div className={styles.listContainer}>
      {filters}
      <Table
        onDelete={onDelete}
        onDeleteMany={onDeleteMany}
        onEdit={onEdit}
        tableData={usersData!}
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
