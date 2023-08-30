import { Link, useNavigate } from "react-router-dom"
import { GrNote } from "react-icons/gr"
import { BsTrash } from "react-icons/bs"
import { FcTodoList } from "react-icons/fc"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { auth } from "../lib/Firebase"
const Sidebar = ({showMenu , setShowMenu , hideMenu  }) => {

  const [ auths , setAuths ] = useState(false);

  const token = Cookies.get("accessToken");

  useEffect(()=>{

    if(token){
      setAuths(true)
    }else{
      setAuths(false)
    }

  },[token])

  const navigate = useNavigate();

  const handleLayout = async () => {
    try {
      signOut(auth).then(()=>{
        Cookies.remove("accessToken")
        toast.success('successfully logout ');

        navigate('/Login');

      }).catch((error) => {

        console.log(error.message);

      })
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={` ${showMenu ? 'hidden md:block' : 'block'} w-full md:w-[19%] p-3 z-10 fixed top-14 md:top-24 left-0 bottom-0 bg-white`}>

       {
         auths ?
          <nav className={`${showMenu ? 'hidden md:flex flex-col justify-center items-start space-y-5 p-1' : 'block md:w-fit h-screen md:h-fit'}flex flex-col justify-center items-start space-y-5 p-1`} onClick={()=>hideMenu()}>
           <li className="py-2 px-8 text-xl ml-3 font-normal flex flex-row justify-start items-center gap-2"><GrNote size={20} className="inline"/> <Link className="ml-2"  to="/">Notes </Link></li>
           <li className="py-2 px-8 text-xl ml-3 font-normal flex flex-row justify-start items-center gap-2"><GrNote size={20} className="inline"/> <Link className="ml-2"  to="/Posts">AddNote </Link></li>
           <li className="py-2 px-8 text-xl ml-3 font-normal flex flex-row justify-start items-center gap-2"><FcTodoList size={20} className="inline"/> <Link className="ml-2"  to="/Todos">Todolist</Link></li>
           <li className="py-2 px-8 text-xl ml-3 font-normal flex flex-row justify-start items-center gap-2"><BsTrash size={20} className="inline"/> <Link className="ml-2"  to="/Trashes">Trash </Link></li>
           <button className="py-2 px-8 text-xl  font-normal  ml-3 bg-[#FBBC04]  rounded-md" onClick={()=>handleLayout()}>Logout</button>
        </nav> : ''
       }

    </div>
  )
}

export default Sidebar