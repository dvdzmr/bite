import { createSlice } from "@reduxjs/toolkit";

const gridSlice = createSlice({
    name: "gridSystem",
    initialState: [{rowOne: 3, rowTwo: 4, rowThree: 2}],
    reducers: {
        setRowOne: (state, action) => {
            state.rowOne = action.payload;
        },
        setRowTwo: (state, action) => {
            state.rowOne = action.payload;
        },
        setRowThree: (state, action) => {
            state.rowOne = action.payload;
        },
    },
});

export const { setRowOne, setRowTwo, setRowThree } = gridSlice.actions;
export default gridSlice.reducer;