import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDevice} from "../../types/device.types";

interface IState {
  devices: IDevice[];
  devicesOnMe: IDevice[];
}

const initialState: IState = {
  devices: [],
  devicesOnMe: [],
};

export const devicesSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<IDevice[]>) => {
      state.devices = action.payload;
    },
    updateDeviceInDevices: (state, action: PayloadAction<IDevice>) => {
      state.devices = state.devices.map((device) => device.id === action.payload.id ? action.payload : device)
    },
    setDevicesOnMe: (state, action: PayloadAction<IDevice[]>) => {
      state.devicesOnMe = action.payload;
    },
    addDeviceIntoDevicesOnMe: (state, action: PayloadAction<IDevice>) => {
      state.devicesOnMe.push(action.payload);
    },
    removeDeviceFromDevicesOnMe: (state, action: PayloadAction<IDevice>) => {
      state.devicesOnMe = state.devicesOnMe.filter((device) => device.id !== action.payload.id)
    },
  },
})

export const devicesReducer = devicesSlice.reducer;
export const devicesActions = devicesSlice.actions;
