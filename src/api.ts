import axios from "axios";
import { InputData } from "./pages/RegistrationPage";

export const api = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
})
export const registerNewEmployee= async (data:InputData)=>{
    console.log(process.env.REACT_APP_BASE_URL)
  const  response = await api.post('/register_new_employee',data,{
    headers:{
        "content-type":"application/json"
    }
  })

    return response;
}
export const fetchAllEmployee= async ()=>{
   console.log(process.env.REACT_APP_BASE_URL)
  const  response = await api.get('/get_all_employee')

    return response;
}

export const fupdateEmployeeDetails= async (data:InputData)=>{
  const  response = await api.put('/update_details',data,{
    headers:{
      'Content-Type':'Application/json'
    }
  })

    return response;
}
export const deleteEmployee = async(id:String)=>{
    await api.get(`/delete_employee/${id}`)
}
