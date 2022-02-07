import {IDepartment} from "../../types/departments.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IDepartment[] = [];

export const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    createDepartment: (state, action: PayloadAction<IDepartment>) => {
      state.push(action.payload);
    },
    removeDepartment: (state, action: PayloadAction<{id: string}>) => {
      return state.filter(device => device.id !== action.payload.id)
    },
  },
})

export const deviceReducer = departmentsSlice.reducer;
export const deviceActions = departmentsSlice.actions;
