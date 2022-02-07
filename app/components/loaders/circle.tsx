import cn from 'classnames';
import styles from './circle.module.scss'
import Loader from './circleLoader.svg';
import {CircleLoaderProps, CircleTypes} from "./circleLoader.props";

export const CircleLoader = ({type}: CircleLoaderProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Loader className={cn(styles.icon, {
        [styles.dark]: type === CircleTypes.dark,
        [styles.light]: type === CircleTypes.light,
      })} />
    </div>
  )
}
