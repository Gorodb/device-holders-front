import styles from './device.module.scss'
import {DeviceProps} from "./device.props";

export const Device = ({device}: DeviceProps): JSX.Element => {
  return (
    <div className={styles.deviceContainer}>{device.name} | {device.deviceType!.description}</div>
  )
}
