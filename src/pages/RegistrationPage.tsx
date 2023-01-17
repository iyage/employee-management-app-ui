import React from 'react'
import styled from 'styled-components'
import {  HashLoader } from 'react-spinners'
import { SubmitHandler, useForm } from 'react-hook-form'
import {useMutation} from 'react-query'
import { AxiosError } from 'axios'
import { registerNewEmployee } from '../api'
import { ToastContainer } from 'react-toastify'
import { fail, success } from '../components/notification'
 import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
  width: 100%;
`
const Form = styled.form`
  width: 100%;
`
const FormControl = styled.div`
  width: 100%;
  margin: 25px 0;
`
const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 1px  solid purple;
  background-color: transparent;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
  &:focus{
    box-shadow: 0 0 5px 0 	rgba(148,0,211);
    outline: none;
  }
`
const FormHeader = styled.h3`
  text-align: center;
  color: purple;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 2px;
`
const SubitBtn = styled.button`
  width: 100%;
  padding:5px;
  /* background-color: purple; */
  border-radius: 7px;
  border: none;
  color: white;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 0 500px 5px purple inset;
  transition: all .2s;
  &:active{
    transform: scale(0.98);
  
  }
  &:hover {
	background:linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
	background-color:#468ccf;
  }
    background: rgb(128, 0, 128);
  background-image: -webkit-linear-gradient(top, rgb(128, 0, 128), rgb(61, 12, 61));
  background-image: -moz-linear-gradient(top, rgb(128, 0, 128), rgb(61, 12, 61));
  background-image: -ms-linear-gradient(top, rgb(128, 0, 128), rgb(61, 12, 61));
  background-image: -o-linear-gradient(top, rgb(128, 0, 128), rgb(61, 12, 61));
  background-image: linear-gradient(to bottom, rgb(128, 0, 128), rgb(61, 12, 61));
  padding: 10px 20px 10px 20px;
  text-decoration: none;
`
const ButtonContent = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export  interface InputData{
  id?:String|null;
  first_name?:String;
  last_name?:String;
  email?:String;
  password?:String
  imgUrl?: String|null,
  salary?: Number|null,
  joinDate?: String|null,
  department?: String|null
}
function RegistrationPage() {

const ValidationError = styled.p`
  font-size: 12px;
  color: red;
  letter-spacing: 2px;
  padding: 3px;
`

  const {register,
    handleSubmit,
    resetField,
  formState:{errors}} = useForm<InputData>();
  const submit:SubmitHandler<InputData> = (data) => {
    console.log()
     data.department = null;
     data.imgUrl= null;
     data.joinDate = null;
     data.salary= null
     mutate(data)
   
  }
const {isLoading,mutate} = useMutation(  (variables:InputData) => registerNewEmployee(variables),{
  
  onError(error:AxiosError){
    console.log(error.message)
    fail(error.message)
  },
  onSuccess(data,variables,context){
console.log(data.data)
success(data.data.message)
resetField('email')
resetField('last_name')
resetField('first_name')
resetField('password')
  }
})

  return (
    <Container>
      <div>
  <ToastContainer />
      </div>
    
      <FormHeader>New Employee Form</FormHeader>
<Form  onSubmit={handleSubmit(submit)}>
  <FormControl>
    <Input placeholder='Enter First Name' {...register('first_name',{required:true})} name='first_name'/>
      {errors.first_name?.type==='required'&& <ValidationError>😠 First Name is required </ValidationError>}
  </FormControl>
    <FormControl>
    <Input placeholder='Enter Last Name'  {...register('last_name',{required:true})} name='last_name'/>
      {errors.last_name?.type==='required'&& <ValidationError>😠 Last Name is required </ValidationError>}
  </FormControl>
    <FormControl>
    <Input placeholder='Enter Email'{...register('email',{required:true,pattern:/^\S+@\S+$/i})} name='email'/>
        {errors.email?.type==='required'&& <ValidationError>😠 Email is required </ValidationError>}
{errors.email?.type==='pattern'&& <ValidationError>😠 Not a valid email </ValidationError>}
  </FormControl>
    <FormControl>
    <Input type={'password'} placeholder='Set Password' {...register('password',{required:true,pattern:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/})} name='password'/>
    {errors.password?.type==='pattern'&& <ValidationError>😠 Password must contain one uppercase character and one special character </ValidationError>}
        {errors.password?.type==='required'&& <ValidationError>😠 Password is Required </ValidationError>}
  </FormControl>
  <SubitBtn><ButtonContent><div style={{flex:'97%'}}> Add New Employee</div> {isLoading && <HashLoader 
  color='white' size={20} />}</ButtonContent>  </SubitBtn>
    <FormControl>
  </FormControl>

</Form>

    </Container>
  )
}

export default RegistrationPage