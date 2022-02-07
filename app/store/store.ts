import {configureStore} from "@reduxjs/toolkit";
import {deviceApi} from "./devices/device.api";
import {authApi} from "./auth/auth.api";
import {deviceReducer} from "./devices/device.slice";
import {authReducer} from "./auth/auth.slice";
import {departmentsApi} from "./departments/departments.api";
import {usersReducer} from "./users/users.slice";
import {breadcrumbsReducer} from "./breadcrumbs/breadcrumbs.slice";
import {usersApi} from "./users/users.api";
import {modalReducer} from "./modal/modal.slice";

export const store = configureStore({
  reducer: {
    [deviceApi.reducerPath]: deviceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalReducer,
    devices: deviceReducer,
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    deviceApi.middleware,
    authApi.middleware,
    departmentsApi.middleware,
    usersApi.middleware,
  )
});

export type TypeRootState = ReturnType<typeof store.getState>;

