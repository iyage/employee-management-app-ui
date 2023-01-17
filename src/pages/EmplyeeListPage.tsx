import styled from 'styled-components'
import    userAvatar     from '../assests/User-Profile-PNG.png'
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {  useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteEmployee, fetchAllEmployee } from '../api';
import LoadingContainer from '../components/LoadingContainer';
import { modal } from "../features/modalSlice";
import { useDispatch} from 'react-redux';
import { modalData } from '../features/modalDataSlice';



const Container = styled.div`
  position: relative;
`
const EmployeeCard = styled.div`
  border: 1px solid purple;
  height: 150px;
  /* border-radius: 7px; */
  margin: 10px 0;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  height: 100%;
`

const  Left= styled.div`
flex: 30%;
display: flex;
height: 100%;
justify-content: center;
align-items:center;
`
const  Center= styled.div`
flex: 60%;

`
const  Right= styled.div`
flex: 10%;
display: flex;
justify-content: space-between;
align-items: center;
height: 10%;
padding: 5px 10px;
`
const ProfileImge = styled.div`

`
const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 0.5px solid purple;
  object-fit: cover;
  
    /* box-shadow: 0 0 10px 0 rgba(148,0,211) inset; */
       /* box-shadow: 0 0 10px 0 rgba(133, 118, 118) inset; */
    
`
const H3 = styled.h3`
  /* color: #c977c9; */
  color: purple;
  /* color: rgb(133, 118, 118); */
font-weight: 500;
letter-spacing: 2px;
margin: 10px 0;
font-size: 14px;
`
function EmplyeeListPage() {
   const {isLoading,data} = useQuery('employee-list',()=>{
    return fetchAllEmployee();
  },{
    enabled:true,
    refetchOnWindowFocus:true,
  })
  const dispatch = useDispatch();
   const queryClient = useQueryClient();
 
  const {mutate} = useMutation((varibles:String)=>deleteEmployee(varibles),{
    onSuccess:()=>{
 
  // queryClient.invalidateQueries('employee-list');
  queryClient.refetchQueries('employee-list')
    }
  })
  function handleDelete(id:any):any{
    mutate(id)
  }
  function handleUpdate(data:any)
  {
    dispatch(modal())
    dispatch(modalData(data))
  }
  return  isLoading?<LoadingContainer/>:
  (
    <Container>
      {data?.data.data.map((employee: { id: React.Key | null | undefined; 
      first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; 
      last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; 
      department: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
      joinDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
       salary: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
       imgUrl: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
     })=>{
        return (
            <EmployeeCard key={employee.id}>
             
    <Wrapper>
  <Left>
    <ProfileImge>
      <Image     src={`${employee.imgUrl==null?userAvatar:employee.imgUrl}`}/>
    </ProfileImge>
  </Left>
  <Center>
    <H3> {`${employee.first_name}  ${employee.last_name}`}</H3>
    <H3>{`Department: ${employee.department==null?'NA':employee.department}`}</H3>
    <H3>{`Date Joined: ${employee.joinDate==null?'NA':((employee.joinDate).toString()).slice(0,10)}`}</H3>
    <H3>{`Salary: ${employee.salary==null?'NA':employee.salary}`}</H3>
  </Center>
  <Right>
    <FaPencilAlt style={{margin:'5px',cursor:'pointer',color:'purple'}}  onClick={()=>handleUpdate(employee)}/>
    <FaTrashAlt  style={{cursor:'pointer',color:'purple'}} onClick={()=>handleDelete(employee.id)}/>
  </Right>
</Wrapper>
    </EmployeeCard> 
        )
      })} 
      <h1>{}</h1>
    </Container>
  )
}

export default EmplyeeListPage