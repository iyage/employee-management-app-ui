import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputData } from "../pages/RegistrationPage";

 interface EmployeeList{
  value:InputData[]
}

const initialState:EmployeeList={
    value: []
}

const EmployeeListSlice = createSlice({
    name:'employee-data',
    initialState,
    reducers:{
        setData: (state,action:PayloadAction<InputData>)=>{
             state.value.concat(action.payload)
        },
    
    }
})

export const {setData} =EmployeeListSlice.actions;
export default EmployeeListSlice.reducer;