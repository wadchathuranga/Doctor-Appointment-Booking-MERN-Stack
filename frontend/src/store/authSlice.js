import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    role: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData,
                state.token = action.payload.token,
                state.role = action.payload.role
        },
        logout: (state) => {
            state.userData = null,
                state.token = null,
                state.role = null
        }
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer;