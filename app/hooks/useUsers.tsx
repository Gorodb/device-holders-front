import {useLazyGetUsersQuery} from "../store/users/users.api";
import {IUser} from "../types/auth.types";
import {useEffect, useState} from "react";
import {UserSearchItem} from "../components/admin/autosuggestInput/components/userSearchItem";

export const useUsersAutosuggestList = (initialSearch: string) => {
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [users, setUsers] = useState<JSX.Element[] | undefined>()
  const [getUsers, {data, ...props}] = useLazyGetUsersQuery()

  useEffect(() => {
    if (data) {
      const usersList: JSX.Element[] | undefined = data.items.map((user: IUser): JSX.Element =>
        <UserSearchItem key={user.id} user={user} setSelectedUser={setSelectedUser} />
      )
      setUsers(usersList)
    }
  }, [data])

  useEffect(() => {
    if (initialSearch) {
      getUsers({page: 1, limit: 10, search: initialSearch})
    }
  }, [getUsers, initialSearch])

  const searchUsers = (search: string) => {
    if (search) {
      getUsers({page: 1, limit: 10, search})
    } else {
      setUsers(undefined)
    }
  }

  return {users, searchUsers, selectedUser, data, ...props}
}
