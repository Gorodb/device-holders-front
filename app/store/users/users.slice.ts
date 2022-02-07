import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/auth.types";

interface IInitialState {
  users: IUser[] | {};
  userOnEdit: IUser | {};
}

const initialState: IInitialState = {
  users: {},
  userOnEdit: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setUserOnEdit: (state, action: PayloadAction<IUser>) => {
      state.userOnEdit = action.payload
    },
  },
})

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
