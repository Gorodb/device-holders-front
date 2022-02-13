import {configureStore} from "@reduxjs/toolkit";
import {deviceApi} from "./devices/device.api";
import {authApi} from "./auth/auth.api";
import {authReducer} from "./auth/auth.slice";
import {departmentsApi} from "./departments/departments.api";
import {breadcrumbsReducer} from "./breadcrumbs/breadcrumbs.slice";
import {usersApi} from "./users/users.api";
import {modalReducer} from "./modal/modal.slice";
import {pushReducer} from "./alerts/alerts.slice";
import {deviceTypesApi} from "./deviceTypes/deviceTypes.api";
import {deviceHoldersApi} from "./deviceHolders/deviceHoldersApi";

export const store = configureStore({
  reducer: {
    [deviceApi.reducerPath]: deviceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [deviceTypesApi.reducerPath]: deviceTypesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [deviceHoldersApi.reducerPath]: deviceHoldersApi.reducer,
    modal: modalReducer,
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    push: pushReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    deviceHoldersApi.middleware,
    deviceApi.middleware,
    authApi.middleware,
    departmentsApi.middleware,
    usersApi.middleware,
    deviceTypesApi.middleware,
  )
});

export type TypeRootState = ReturnType<typeof store.getState>;
