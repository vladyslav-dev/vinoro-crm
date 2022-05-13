
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        products: [],
        category: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    }
})

export const { setProducts, setCategory } = searchSlice.actions;
export default searchSlice.reducer;