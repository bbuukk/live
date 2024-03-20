import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    signInModalOpen: false,
    signUpModalOpen: false,
    changePasswordModalOpen: false,
    deleteAccountModalOpen: false,
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
    toggleChangePasswordModal: (state) => {
      state.changePasswordModalOpen = !state.changePasswordModalOpen;
    },
    toggleDeleteAccountModal: (state) => {
      state.deleteAccountModalOpen = !state.deleteAccountModalOpen;
    },
  },
});

export const {
  toggleSignUpModal,
  toggleSignInModal,
  toggleChangePasswordModal,
  toggleDeleteAccountModal,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
