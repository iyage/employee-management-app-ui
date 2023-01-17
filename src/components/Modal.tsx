import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../app/store'
import { InputData } from '../pages/RegistrationPage'
import  profile  from "../assests/User-Profile-PNG.png";
import { FaTimes } from 'react-icons/fa'
import { modal } from '../features/modalSlice'
import { useMutation,  useQueryClient } from 'react-query'
import {  fupdateEmployeeDetails } from '../api'
import { AxiosError } from 'axios'
import { HashLoader } from 'react-spinners'
import { fail, success } from './notification'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import AWS  from 'aws-sdk'
const Container = styled.div`
    transition: all 0.3s ease-in;
    width: 100%;
    height: 100vh;
    z-index: 100;
    position: absolute;
    background-color: rgba(0,0,0,0.1);
    top: 0;
    left: 0;


`
const ModalContainer = styled.div`
    width:50%;
    margin: auto;
    margin-top: 70px;
    border: 1px solid  purple;
    background-color: white;
    padding: 20px 20px;
        border-radius: 7px;
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
margin-bottom: 10px;
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
const ButtonContent = styled.span.attrs({id:'modalForm'})`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ValidationError = styled.p`
  font-size: 12px;
  color: red;
  letter-spacing: 2px;
  padding: 3px;
`
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
`
const Img = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid purple;
`

         AWS.config.update({
                        region: process.env.REACT_APP_bucketRegion,
                        credentials: new AWS.CognitoIdentityCredentials({
                            IdentityPoolId:process.env.REACT_APP_IdentityPoolId!
                        })
                    });
        
                    let s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        params: {Bucket: process.env.REACT_APP_bucketName}
                });

function Modal() {

    const modalDatas = useSelector((state:RootState)=>state.modalDataReducer.value)
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
  formState:{errors}} = useForm<InputData>({defaultValues:{
    'first_name':`${modalDatas.first_name}`,
    'email':`${modalDatas.email}`,
    'last_name':`${modalDatas.last_name}`,
    'department':`${modalDatas.department==null?"":modalDatas.department}`,
    'joinDate':`${modalDatas.joinDate?.slice(0,10)}`,
    'salary':`${modalDatas.salary==null?"":modalDatas.salary}`,
    'id':`${modalDatas.id}`,
    'imgUrl':`${modalDatas.imgUrl}`

  }});
  const {mutate,isLoading} = useMutation((variables:InputData)=>fupdateEmployeeDetails(variables),{
    onSuccess:(data,variables,contex)=>{
        console.log(data)
      success(data.data.message)
       queryClient.invalidateQueries('employee-list')

    },
onError:(error:AxiosError)=>{
 console.log(error)
}
  })
  
const  submit:SubmitHandler<InputData> =   (data) => {
console.log(data)
             mutate(data)
   
}
const [picURL,setPicURL] = useState<any|null>(profile);
function getFileProps(e:any):void{
 let fileProps = e.target.files[0];
 let url:String = window.URL.createObjectURL(fileProps);
 setPicURL(url)
 s3.upload({
                Key:`dufil-img-uploads/${modalDatas.id}`,
                Body: fileProps,
                ACL: 'public-read',
                Bucket:`${process.env.REACT_APP_bucketName}`
              }, 
                function(err: any, resp:any) {
                      if(err) {
                        console.log(err)
                        fail('😠 Problem uploading pics try again')
                      }
                      else{
                            setValue('imgUrl',resp.Location)
                            console.log('pics uploaded')
                            console.log(resp)
                            
                      }
                           
            })
 console.log(fileProps)
}
useEffect(()=>{
  setPicURL(modalDatas.imgUrl)
},[ ])

  return (
    <Container >
        <ToastContainer/>
<ModalContainer>
<div style={{textAlign:'end'}}><FaTimes style={{fontSize:'18px',color:'purple',cursor:'pointer'}}
onClick={()=>{
    dispatch(modal());
    }}/> </div>
      <FormHeader>UPdate Details</FormHeader>
   
      <ImageContainer>
        <input type={'file'} id='upload'  hidden  accept="image/png, image/jpeg" onChange={(e)=>getFileProps(e)} />
        <label htmlFor="upload">
<Img src={`${picURL}`} title={'Click to Change Image'} />
        </label>
        
      </ImageContainer>
<Form  onSubmit={handleSubmit(submit)}>
    <input type={'hidden'} {...register('id')} name='id' />
      <input type={'hidden'} {...register('imgUrl')} name='imgUrl' />
  <FormControl>
    <Input placeholder='Enter First Name' {...register('first_name',{required:true})} name='first_name' title='first name'/>
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
    <Input type={'text'} placeholder='Department' {...register('department')} name='department'/>
  </FormControl>
    <FormControl>
    <Input type={'date'} placeholder='Join Date' {...register('joinDate')} name='joinDate'/>
  </FormControl>
    <FormControl>
    <Input type={'text'} placeholder='Salary' {...register('salary')} name='salary'/>
  </FormControl>
  <SubitBtn><ButtonContent><div style={{flex:'97%'}}> Update Employee</div>{isLoading && <HashLoader 
  color='white' size={18} />} </ButtonContent>  </SubitBtn>
    <FormControl>
  </FormControl>
</Form>
</ModalContainer>
    </Container>
  )
}

export default Modal




