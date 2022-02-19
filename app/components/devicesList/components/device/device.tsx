import cn from "classnames";

import styles from './device.module.scss';
import {DeviceProps} from "./device.props";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {Button, ButtonTypes} from "../../../htmlTags";
import {
  useReturnDeviceMutation,
  useReturnDeviceToPreviousMutation,
  useTakeDeviceMutation
} from "../../../../store/devices/device.api";

export const Device = ({device}: DeviceProps): JSX.Element => {
  const [isTaken, setIsTaken] = useState<boolean>(false)
  const [isReturnToPrev, setIsReturnToPrev] = useState<boolean>(false)
  const currentUser = useTypedSelector(state => state.auth.user)
  const [takeDevice] = useTakeDeviceMutation()
  const [returnDevice] = useReturnDeviceMutation()
  const [returnDeviceToPrev] = useReturnDeviceToPreviousMutation()

  useEffect(() => {
    if (currentUser && device.heldByUser) {
      setIsTaken(device.heldByUser.id === currentUser.id)
      setIsReturnToPrev(device.heldByUser.id === currentUser.id && !!device.previousUser)
    } else {
      setIsTaken(false)
      setIsReturnToPrev(false)
    }
  }, [currentUser, device.previousUser, device.heldByUser])

  const takeDeviceHandler = () => {
    takeDevice({device: device.id})
  }

  const returnDeviceHandler = () => {
    returnDevice({device: device.id})
  }

  const returnDeviceToPrevHandler = () => {
    returnDeviceToPrev({device: device.id})
  }

  return (
    <div className={styles.deviceContainer}>
      <div className={styles.info}>
        <div><span className={styles.title}>Название: </span>{device.name}</div>
        <div><span className={styles.title}>Операционная система: </span>{device.osName}</div>
        <div><span className={styles.title}>Инвентаризационный номер: </span>{device.inventoryNumber || "не заполнен"}</div>
      </div>
      <div className={styles.info}>
        <div>
          <span className={styles.title}>Местонахождение: </span>
          <span
            className={styles.text}>{
            device.heldByUser && device.heldByUser.location
              ? device.heldByUser.location
              : device.defaultLocation}
          </span>
        </div>
        {device.heldByUser && <div>
          <span className={styles.title}>Устройство у пользователя: </span>
          {device.heldByUser.name}
        </div>}
        {device.previousUser && <div>
          <span className={styles.title}>Предыдущий пользователь: </span>
          {device.previousUser.name}
        </div>}
      </div>
      <div className={styles.buttons}>
        {isTaken && <span className={styles.returnContainer}>
          <i onClick={returnDeviceHandler} className={cn(styles.icon, styles.return)}/>
        </span>}
        {isTaken && isReturnToPrev
          && <span className={styles.returnToPrevContainer}>
            <i onClick={returnDeviceToPrevHandler} className={cn(styles.icon, styles.returnToPrev)}/>
          </span>
        }
        {currentUser.id && !isTaken &&
          <Button onClick={takeDeviceHandler} buttonType={ButtonTypes.white}>Взять</Button>}
      </div>
    </div>
  )
}
