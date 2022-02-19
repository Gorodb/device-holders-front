import Image from "next/image";
import {IUser} from "../../../../../types/auth.types";
import styles from "./userSearchItem.module.scss"

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL

interface IProps {
  user: IUser;
  setSelectedUser: (arg: IUser) => void;
}

export const UserSearchItem = ({user, setSelectedUser}: IProps) => {
  const name = `${user.name}, ${user.email}`

  const logo = user.logo
    ? <Image width={20} height={20} src={imgPrefix + user.logo.url} alt={user.name}/>
    : <i className={styles.avatarIcon}/>

  return (
    <div key={user.id} className={styles.userItemContainer} onClick={() => setSelectedUser(user)}>
      {logo} {name}
    </div>
  )
}
