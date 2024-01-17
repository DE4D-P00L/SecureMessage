import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user')||null,
  token: localStorage.getItem('token')||null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token',action.payload.token);
      localStorage.setItem('user',JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
});

export const { login, logout } = userSlice.actions;

 
export default userSlice.reducer;