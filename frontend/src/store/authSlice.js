import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
    role: localStorage.getItem("role") ? JSON.parse(localStorage.getItem("role")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.data;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.userData = null;
            state.token = null;
            state.role = null;
        }
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer;