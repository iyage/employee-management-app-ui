import {configureStore } from "@reduxjs/toolkit";
import employeeDataSlice from "../features/employeeDataSlice";
import modalDataSlice from "../features/modalDataSlice";
import modalSlice from "../features/modalSlice";

export const store = configureStore({
reducer:{
    modalReducer:modalSlice,
    modalDataReducer:modalDataSlice,
    employeeListReducer:employeeDataSlice
}
})

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;