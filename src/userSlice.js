
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    userId: null,
    currentPage: 'landing',
    qrcode: null
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setQrcode: (state, action) => {
      state.qrcode = action.payload
    }
  },
});

export const { setLogin, setUserId, setCurrentPage, setQrcode } = userSlice.actions;

export default userSlice.reducer;
