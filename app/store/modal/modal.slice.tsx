import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IModal {
  title: string;
  subtitle: string | JSX.Element;
  buttonText: string;
  onClick?: (...args: any[]) => void
}

export const emptyModal: IModal = {
  title: "",
  subtitle: "",
  buttonText: "",
  onClick: undefined,
}

interface IState {
  isOpen: boolean;
  modal: IModal;
}

const initialState: IState = {
  isOpen: true,
  modal: emptyModal,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modal = action.payload;
    },
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
})

export const modalReducer = modalSlice.reducer;
export const modalActions = modalSlice.actions;
