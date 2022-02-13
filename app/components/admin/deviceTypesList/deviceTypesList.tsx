import {ChangeEvent, useEffect, useState} from "react";
import {queryTypes, useQueryState} from 'next-usequerystate'
import {useRouter} from "next/router";
import {GrRotateRight} from "react-icons/gr";

import styles from './deviceTypesList.module.scss';
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useActions} from "../../../hooks/useActions";
import {useDeleteDeviceTypeMutation, useGetDeviceTypesQuery} from "../../../store/deviceTypes/deviceTypes.api";
import {ITableData, ITableDataHead, Table} from "../table";
import {IDeviceType} from "../../../types/deviceTypes.types";
import {emptyModal} from "../../../store/modal/modal.slice";
import SearchInput from "../searchInput";
import AdminSelect from "../adminSelect";
import {IPagination} from "../../../types/pagination.types";
import {Pagination} from "../../pagination";
import {CircleLoader, CircleTypes} from "../../loaders";
import {clearObject} from "../../../utils/jsonCleaner";
import {ALink} from "../../aLink";
import {Button, ButtonTypes} from "../../htmlTags";

export const DeviceTypesList = (): JSX.Element => {
  const router = useRouter();
  const [page, setPage] = useQueryState('page', queryTypes.integer.withDefault(1));
  const [limit] = useQueryState('limit', queryTypes.integer.withDefault(10));
  const [search, setSearch] = useQueryState('search', queryTypes.string.withDefault(""));
  const [pagination, setPagination] = useState<IPagination>()
  const [usersData, setUsersData] = useState<ITableData>()
  const {setBreadcrumbs, setModalIsOpen, setModal} = useActions()
  const [deleteDeviceType] = useDeleteDeviceTypeMutation()
  const {data, isLoading, error, } = useGetDeviceTypesQuery(clearObject({page, limit, search}), {
    refetchOnReconnect: true,
  })

  useEffect(() => {
    data && setPagination(data.pagination)
    const head: ITableDataHead[] = [
      {name: "id", title: "id"},
      {name: "title", title: "Название"},
      {name: "deviceType", title: "Тип устройства"},
      {name: "description", title: "Описание"},
    ]
    const columns = ["id", "title", "deviceType", "description"]
    const tableData = data && data.items.map((deviceTypeItem: IDeviceType) => {
      const id = (
        <ALink href={`/admin/deviceTypes/${deviceTypeItem.id}`}>
          <div className={styles.idColumnData}>{deviceTypeItem.id}</div>
        </ALink>
      )
      const title = deviceTypeItem.title ? (
        <ALink href={`/admin/deviceTypes/${deviceTypeItem.id}`}>
            <div>{deviceTypeItem.title}</div>
        </ALink>
      ) : ''
      const deviceType = deviceTypeItem.deviceType ? (
        <ALink href={`/admin/deviceTypes/${deviceTypeItem.id}`}>
          <span>{deviceTypeItem.deviceType}</span>
        </ALink>
      ) : ''
      const description = deviceTypeItem.description ? (
        <ALink href={`/admin/deviceTypes/${deviceTypeItem.id}`}>
          <div>{deviceTypeItem.description}</div>
        </ALink>
      ) : ''
      return {id, title, deviceType, description, rowId: deviceTypeItem.id}
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

  const handlePageChange = async (event: {selected: number}) => {
    await setPage(event.selected + 1)
  };

  const onDelete = (id: string) => {
    setModal({
      title: "Удаление типа устройства",
      subtitle: <div>Подтвердите удаление типа устройства с id: <span className={styles.bold}>{id}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        setModal(emptyModal);
        setModalIsOpen(false);
        deleteDeviceType(id)
      }
    })
    setModalIsOpen(true);
  };

  const onDeleteMany = (ids: string[]) => {
    setModal({
      title: "Удаление типов устройств",
      subtitle: <div>Подтвердите удаление типов устройств с id: <span className={styles.bold}>{ids.join(', ')}</span></div>,
      buttonText: "Подтвердить удаление",
      onClick: () => {
        for (let id of ids) {
          deleteDeviceType(id)
        }
        setModal(emptyModal);
        setModalIsOpen(false);
      }
    })
    setModalIsOpen(true);
  };

  const onEdit = async (id: string) => {
    await router.push(`/admin/deviceTypes/${id}`)
  };

  if (error) return <div>Упс! Что-то пошло не так...</div>

  if (!page) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  const filters = (
    <div className={styles.filtersContainer}>
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <SearchInput
            name="search"
            type="text"
            onChange={onSearchHandler}
            label="Поиск устройств"
            placeholder="Введите тип, описание или имя"
            value={search || ""}
            onClear={async () => {
              await setPage(1)
              await setSearch("")
            }}
          />
        </div>
        <GrRotateRight className={styles.rotate} onClick={async () => {
          await setPage(1)
          await setSearch("")
        }} />
      </div>
      <div className={styles.filterButtons}>
        <Button buttonType={ButtonTypes.white} onClick={() => {
          router.push(`/admin/deviceTypes/create`)}
        }>Добавить устройство</Button>
      </div>
    </div>
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
