import cn from "classnames";
import styles from './avatarDropdown.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface IElement {
  onClick: () => void;
  name: string;
}

interface IProps {
  className?: string;
  elements: IElement[];
}

export const AvatarDropdown = ({elements, className}: IProps): JSX.Element => {
  const user = useTypedSelector(store => store.auth.user)

  return (
    <div className={cn(styles.dropdown, className)}>
      <div className={styles.userInfoContainer}>
        <div className={cn(styles.userInfoItem, styles.name)}>{user.name}</div>
        <div className={styles.userInfoItem}>{user.email}</div>
      </div>
      <div className={styles.dropItemsContainer}>
        {elements.map((element: IElement, index: number) => (
          <div key={index} className={styles.dropItem} onClick={element.onClick}>
            {element.name}
          </div>
        ))}
      </div>
    </div>
  )
}
