import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum AlertsTypesEnum {
  error = "error",
  success = "success",
}

export interface IAlert {
  id?: string;
  text: string;
  type: AlertsTypesEnum;
}

const initialState: { alerts: IAlert[] } = { alerts: [] };

export const alertsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(({ id }) => id !== action.payload);
    },
  },
})

export const pushReducer = alertsSlice.reducer;
export const pushActions = alertsSlice.actions;
