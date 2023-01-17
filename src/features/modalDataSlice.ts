import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface state{
value:{
  id?:String|null;
  first_name:String;
  last_name:String;
  email:String;
  password:String
  imgUrl?: String|null,
  salary?: Number|null,
  joinDate?: String|null,
  department?: String|null
}

}

const initialState:state ={
    value:{
    id:"",
  first_name:"",
  last_name:"",
  email:"",
  password:"",
  imgUrl: null,
  salary: null,
  joinDate: null,
  department:null
    }

}
const modalDataSlice = createSlice({
    name:'modalDataState',
      initialState,
    reducers:{
     modalData:(state,action:PayloadAction)=>{
            state.value = Object.assign(state.value,action.payload);
        }

    }
})

export const {modalData} = modalDataSlice.actions;
export default modalDataSlice.reducer;