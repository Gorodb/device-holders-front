import {ChangeEvent, useEffect, useState} from "react";
import {queryTypes, useQueryState} from 'next-usequerystate'
import {useRouter} from "next/router";
import Image from "next/image";

import {TableFilters} from "../tableFilters";
import styles from './usersList.module.scss';
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useActions} from "../../../hooks/useActions";
import {useDeleteUsersMutation, useGetUsersQuery} from "../../../store/users/users.api";
import {ITableData, ITableDataHead, Table} from "../table";
import {IUser} from "../../../types/auth.types";
import {emptyModal} from "../../../store/modal/modal.slice";
import SearchInput from "../searchInput";
import {useDepartmentsOptions} from "../../../hooks/useDepartmentsOptions";
import AdminSelect from "../adminSelect";
import {IPagination} from "../../../types/pagination.types";
import {Pagination} from "../../pagination";
import {CircleLoader, CircleTypes} from "../../loaders";
import {clearObject} from "../../../utils/jsonCleaner";
import {ALink} from "../../aLink";

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL

export const UsersList = (): JSX.Element => {
  const router = useRouter();
  const {options} = useDepartmentsOptions({page: 1, limit: 1000})
  const [page, setPage] = useQueryState('page', queryTypes.integer.withDefault(1));
  const [limit] = useQueryState('limit', queryTypes.integer.withDefault(10));
  const [department, setDepartment] = useQueryState('department', queryTypes.string.withDefault(""));
  const [search, setSearch] = useQueryState('search', queryTypes.string.withDefault(""));
  const [pagination, setPagination] = useState<IPagination>()
  const [usersData, setUsersData] = useState<ITableData>()
  const {setBreadcrumbs, setModalIsOpen, setModal} = useActions()
  const [deleteUser] = useDeleteUsersMutation()
  const {data, isLoading, error, } = useGetUsersQuery(clearObject({page, limit, department, search}), {
    refetchOnReconnect: true,
  })

  useEffect(() => {
    data && setPagination(data.pagination)
    const head: ITableDataHead[] = [
      {name: "id", title: "id"},
      {name: "logo", title: "????????????"},
      {name: "email", title: "Email"},
      {name: "name", title: "??????"},
      {name: "department", title: "??????????????????????????"}
    ]
    const columns = ["id", "logo", "email", "name", "department"]
    const tableData = data && data.items.map((user: IUser) => {
      const id = (
        <ALink href={`/admin/users/${user.id}`}>
          <div className={styles.idColumnData}>{user.id}</div>
        </ALink>
      )
      const logo = user.logo ? (
        <ALink href={`/admin/users/${user.id}`}>
          <div className={styles.img}>
            <img className={styles.image} src={imgPrefix + user.logo.url} alt="preview"/>
          </div>
        </ALink>
      ) : ''
      const email = user.email ? (
        <ALink href={`/admin/users/${user.id}`}>
          <div>{user.email}</div>
        </ALink>
      ) : ''
      const name = user.name ? (
        <ALink href={`/admin/users/${user.id}`}>
          <div>{user.name}</div>
        </ALink>
      ) : ''
      const department = user.department ? (
        <ALink href={`/admin/users/${user.id}`}>
          <div>{user.department.name} - {user.department.description}</div>
        </ALink>
      ) : ''
      return {id, logo, email, name, department, rowId: user.id}
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
      {route: '/', pathName: '??????????????'},
      {route: '/admin', pathName: '??????????????'},
      {route: '/admin/usersList', pathName: '???????????? ??????????????????????????', isLast: true},
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
      title: "???????????????? ????????????????????????",
      subtitle: <div>?????????????????????? ???????????????? ???????????????????????? ?? id: <span className={styles.bold}>{id}</span></div>,
      buttonText: "?????????????????????? ????????????????",
      onClick: () => {
        setModal(emptyModal);
        setModalIsOpen(false);
        deleteUser(id)
      }
    })
    setModalIsOpen(true);
  };

  const onDeleteMany = (ids: string[]) => {
    setModal({
      title: "???????????????? ??????????????????????????",
      subtitle: <div>?????????????????????? ???????????????? ???????????????????????? ?? id: <span className={styles.bold}>{ids.join(', ')}</span></div>,
      buttonText: "?????????????????????? ????????????????",
      onClick: () => {
        for (let id of ids) {
          deleteUser(id)
        }
        setModal(emptyModal);
        setModalIsOpen(false);
      }
    })
    setModalIsOpen(true);
  };

  const onEdit = async (id: string) => {
    await router.push(`/admin/users/${id}`)
  };

  if (error) return <div>??????-???? ?????????? ???? ??????</div>

  if (!page) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  const filters = (
    <TableFilters
      onClickHandler={() => router.push(`/admin/users/create`)}
      newItemButtonText="???????????????? ????????????????????????"
      onClearHandler={async () => {
        await setPage(1)
        await setSearch("")
        await setDepartment("")
      }}
    >
      <SearchInput
        name="search"
        type="text"
        onChange={onSearchHandler}
        label="?????????? ??????????????????????????"
        placeholder="?????????????? ??????, email ?????? ????????????????"
        value={search || ""}
        onClear={async () => {
          await setPage(1)
          await setSearch("")
        }}
      />
      {options && <AdminSelect
        label="???????????????? ??????????????????????????"
        value={department}
        onClear={async () => {
          await setPage(1)
          await setDepartment("")
        }}
        onChange={onSelectDepartment}
        defaultOptionText={"??????"}
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
