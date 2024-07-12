
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    userId: null,
    currentPage: 'landing',
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
  },
});

export const { setLogin, setUserId, setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
