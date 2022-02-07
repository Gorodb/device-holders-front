import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {deviceActions} from "../store/devices/device.slice";
import {authActions} from "../store/auth/auth.slice";
import {usersActions} from "../store/users/users.slice";
import {breadcrumbsActions} from "../store/breadcrumbs/breadcrumbs.slice";
import {modalActions} from "../store/modal/modal.slice";

const allActions = {
  ...deviceActions,
  ...authActions,
  ...usersActions,
  ...breadcrumbsActions,
  ...modalActions
}

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
