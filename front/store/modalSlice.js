import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    signInModalOpen: false,
    signUpModalOpen: false,
  },
  reducers: {
    toggleSignInModal: (state) => {
      state.signUpModalOpen = false;
      state.signInModalOpen = !state.signInModalOpen;
    },
    toggleSignUpModal: (state) => {
      state.signInModalOpen = false;
      state.signUpModalOpen = !state.signUpModalOpen;
    },
  },
});

export const { toggleSignUpModal, toggleSignInModal } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
