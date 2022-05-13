
import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
    name: 'viewMode',
    initialState: {
        viewMode: false,
    },
    reducers: {
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        }
    }
})

export const { setViewMode } = viewSlice.actions;
export default viewSlice.reducer;