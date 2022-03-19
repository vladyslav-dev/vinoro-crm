
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuth: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    }
})

export const { setUser, setAuth } = authSlice.actions;
export default authSlice.reducer;