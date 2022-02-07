import {IDevice} from "../../types/device.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IDevice[] = [];

export const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    createDevice: (state, action: PayloadAction<IDevice>) => {
      state.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<{id: string}>) => {
      return state.filter(device => device.id !== action.payload.id)
    },
  },
})

export const deviceReducer = deviceSlice.reducer;
export const deviceActions = deviceSlice.actions;
