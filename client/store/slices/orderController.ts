
import { createSlice } from "@reduxjs/toolkit";

const orderControllerSlice = createSlice({
    name: 'orderController',
    initialState: {
        current: 0,
    },
    reducers: {
        increase: (state) => {
            state.current += 1;
        },
        decrease: (state) => {
            state.current -= 1;
        },
    }
})

export const { increase, decrease } = orderControllerSlice.actions;
export default orderControllerSlice.reducer;