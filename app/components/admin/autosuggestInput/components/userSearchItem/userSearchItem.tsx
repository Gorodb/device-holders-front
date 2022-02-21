import Image from "next/image";
import {IUser} from "../../../../../types/auth.types";
import styles from "./userSearchItem.module.scss"
import NoSsr from "../../../NoSsr/noSsr";

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL

interface IProps {
  user: IUser;
  setSelectedUser: (arg: IUser) => void;
}

export const UserSearchItem = ({user, setSelectedUser}: IProps) => {
  const name = `${user.name}, ${user.email}`

  const logo = user.logo
    ? <img className={styles.image} src={imgPrefix + user.logo.url} alt={user.name}/>
    : <i className={styles.avatarIcon}/>

  return (
    <NoSsr>
      <div key={user.id} className={styles.userItemContainer} onClick={() => setSelectedUser(user)}>
        {logo} {name}
      </div>
    </NoSsr>
  )
}
