import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './features/grid/gridSlice.jsx'

export default configureStore({
    reducer: {
        grid: gridReducer,
    },
})