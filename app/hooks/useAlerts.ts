import {IAlert} from "../store/alerts/alerts.slice";
import {useActions} from "./useActions";
import {v4 as uuid} from "uuid";

export const useAlerts = () => {
  const {setAlert: setAlertRedux, removeAlert: removeAlertRedux} = useActions()

  return (alert: IAlert, timeout = 3000) => {
    const id = uuid();
    setAlertRedux({...alert, id})
    setTimeout(() => {
      removeAlertRedux(id)
    }, timeout)
  };
}
