import cn from 'classnames'
import classes from './alert.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

export const Alert = (): JSX.Element => {
  const {alerts} = useTypedSelector(state => state.push);
  const {removeAlert} = useActions()

  return (
    <div className={classes.alerts}>
      {alerts.length > 0 && alerts.map(({ id, text, type }) => (
        <div className={cn(classes.alert, classes['alert-' + type])} key={id} onClick={() => removeAlert(id!)}>
          <span>{text}</span>
          <i className={cn(classes.icon, classes['icon-' + type])} onClick={() => removeAlert(id!)} />
        </div>
      ))}
    </div>
  )
}
