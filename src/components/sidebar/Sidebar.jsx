import { Link } from "react-router-dom"
import { GrNote } from "react-icons/gr"
import { PiArchiveTrayFill } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import { FcTodoList } from "react-icons/fc"

const Sidebar = () => {
  return (
    <div className="w-full md:w-[30%] p-4 fixed top-20 left-0 bottom-0">

        <nav className="flex flex-col justify-center items-start space-y-5 p-1">
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><GrNote size={20} className="inline"/> <Link className="ml-2"  to="/Notes">Notes </Link></li>
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><GrNote size={20} className="inline"/> <Link className="ml-2"  to="/Posts">Postnotes </Link></li>
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><FcTodoList size={20} className="inline"/> <Link className="ml-2"  to="/Todolist">Todolist</Link></li>
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><PiArchiveTrayFill size={20} className="inline"/> <Link className="ml-2"  to="/Archive">Archive </Link></li>
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><BsTrash size={20} className="inline"/> <Link className="ml-2"  to="/Trash">Trash </Link></li>
          <li className="py-2 px-10 text-xl ml-5 font-normal flex flex-row justify-start items-center gap-2"><BiUserCircle size={23} className="inline"/> <Link className="ml-2"  to="/Profile">Profile </Link></li>
          <button className="py-2 px-10 text-xl  font-normal  ml-5 bg-[#FBBC04]  rounded-md">Logout</button>
        </nav>

    </div>
  )
}

export default Sidebar