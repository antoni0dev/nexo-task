import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  children?: React.ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },

    setChildren: (state, action) => {
      state.children = action.payload;
    },
  },
});

export const { openModal, closeModal, setChildren } = modalSlice.actions;
export default modalSlice.reducer;
