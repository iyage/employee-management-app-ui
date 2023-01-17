import { Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import EmplyeeListPage from "./pages/EmplyeeListPage";
import RegistrationPage from "./pages/RegistrationPage";
import { ReactQueryDevtools } from "react-query/devtools";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
function App() {
  const modalState = useSelector((state:RootState)=>state.modalReducer.value)
  return (
   
    <div >
              { modalState&&<Modal/>}
      <Routes>
        <Route path="/" element={ <Container/>}>
          <Route index element={<EmplyeeListPage/>}/>
          <Route path="/add-employee" element={<RegistrationPage/>}/>
          </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </div>
      
  );
}

export default App;
