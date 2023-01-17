import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface state{
 value : Boolean

}


const initialState:state={
    value: false
}

const modalSlice = createSlice({
    name:'state',
    initialState,
    reducers:{
        modal: (state,action:PayloadAction)=>{
            state.value = !state.value;
        }

    }
})

export const {modal} = modalSlice.actions;
export default modalSlice.reducer;