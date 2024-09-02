import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    showLoginModal: false,
  },
  reducers: {
    openLoginModal(state,action) {
        console.log("hehe")
      state.showLoginModal = action.payload;
    },
    closeLoginModal(state) {
      state.showLoginModal = false;
    }
  }
});

export const { openLoginModal, closeLoginModal } = ModalSlice.actions;
export default ModalSlice.reducer;
