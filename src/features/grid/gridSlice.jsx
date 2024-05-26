import { createSlice } from '@reduxjs/toolkit'

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        rowOne: 2,
        rowTwo: 4,
        rowThree: 3,
        rowHeight: '35vh',
        rowPadding: '5px 0'
    },
    reducers: {
        setRowOne: (state, action) => {
            state.rowOne = action.payload;
        },
        setRowTwo: (state, action) => {
            state.rowTwo = action.payload;
        },
        setRowThree: (state, action) => {
            state.rowThree = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRowOne, setRowTwo, setRowThree , rowHeight, rowPadding} = gridSlice.actions

export default gridSlice.reducer