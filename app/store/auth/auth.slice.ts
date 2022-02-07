import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/auth.types";

interface IAuthState {
  isAdmin: boolean,
  isAuth: boolean,
  user: IUser;
}

const initialState = {
  isAdmin: false,
  isAuth: false,
  user: {},
} as IAuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
