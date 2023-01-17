  import { toast } from "react-toastify"
  
  
 export  const success = (message:String) => toast.success(`😄  ${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style:{fontSize:'14px',width:'350px'}
    });
export const fail =(message:string)=>{
  toast.error(`😠  ${message}`,{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style:{fontSize:'14px',width:'350px'}
  })
}