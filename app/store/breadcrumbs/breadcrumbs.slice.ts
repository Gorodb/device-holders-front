import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBreadcrumbs} from "../../types/breadcrumbs.types";

interface IInitialState {
  breadcrumbs: IBreadcrumbs[]
}

const initialState: IInitialState = {
  breadcrumbs: []
};

export const usersSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<IBreadcrumbs[]>) => {
      state.breadcrumbs = action.payload
    },
  },
})

export const breadcrumbsReducer = usersSlice.reducer;
export const breadcrumbsActions = usersSlice.actions;
