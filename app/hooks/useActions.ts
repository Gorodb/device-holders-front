import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {authActions} from "../store/auth/auth.slice";
import {breadcrumbsActions} from "../store/breadcrumbs/breadcrumbs.slice";
import {modalActions} from "../store/modal/modal.slice";
import {pushActions} from "../store/alerts/alerts.slice";
import {devicesActions} from "../store/devices/devices.slice";

const allActions = {
  ...authActions,
  ...breadcrumbsActions,
  ...modalActions,
  ...pushActions,
  ...devicesActions,
}

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
