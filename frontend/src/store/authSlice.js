import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { data, token } = action.payload;
            state.userData = data;
            state.token = token;
            localStorage.setItem("userData", JSON.stringify(data));
            localStorage.setItem("token", JSON.stringify(token));
        },
        update: (state, action) => {
            const { data, token } = action.payload;
            state.userData = data;
            state.token = token;
            localStorage.setItem("userData", JSON.stringify(data));
            localStorage.setItem("token", JSON.stringify(token));
        },
        logout: (state) => {
            state.userData = null;
            state.token = null;
            localStorage.clear();
        }
    }
});

export const { login, update, logout } = authSlice.actions

export default authSlice.reducer;