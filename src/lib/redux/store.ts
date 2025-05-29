import { configureStore } from '@reduxjs/toolkit'
import modalReduce from './slice/modal-slice'

export const createStore = () => configureStore({
    reducer: {
        modal: modalReduce
    }
})