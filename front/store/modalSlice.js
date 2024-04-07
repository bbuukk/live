import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    loading: false,
    signInModalOpen: false,
    signUpModalOpen: false,
    changePasswordModalOpen: false,
    deleteAccountModalOpen: false,
    cartModalOpen: false,
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
    toggleCartModal: (state) => {
      state.cartModalOpen = !state.cartModalOpen;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  toggleSignUpModal,
  toggleSignInModal,
  toggleChangePasswordModal,
  toggleDeleteAccountModal,
  toggleCartModal,
  startLoading,
  stopLoading,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
