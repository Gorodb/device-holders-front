import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {deviceActions} from "../store/devices/device.slice";
import {authActions} from "../store/auth/auth.slice";
import {breadcrumbsActions} from "../store/breadcrumbs/breadcrumbs.slice";
import {modalActions} from "../store/modal/modal.slice";
import {pushActions} from "../store/alerts/alerts.slice";

const allActions = {
  ...deviceActions,
  ...authActions,
  ...breadcrumbsActions,
  ...modalActions,
  ...pushActions,
}

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
