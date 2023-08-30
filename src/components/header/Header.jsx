import logo from '../../assets/logo.png';
import avator from '../../assets/avator.png';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { auth } from '../lib/Firebase'
import { useLocation } from 'react-router-dom';
const Header = ({showMenu , setShowMenu , hideMenu , setInputSearch }) => {

  const [ auths , setAuths ] = useState(false);
  const [ showInput , setShowInput ] = useState(false);

  const location = useLocation();

  useEffect(()=>{

    if(location.pathname === '/'){
      setShowInput(true);
    }else{
      setShowInput(false);
    }

  },[location.pathname])

  const token = Cookies.get("accessToken");

  useEffect(()=>{

    if(token){
      setAuths(true)
    }else{
      setAuths(false)
    }

  },[token])
  const [ show , setShow ] = useState(false);
  const [user, setUser] = useState([]);

  const  handleSearch = () =>{
    setShow(!show);
  }
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [])

  return (
    <div className="w-full shadow p-4 fixed left-0 right-0 top-0 z-20 bg-white">
        <div className="w-[93%] relative mx-auto flex flex-row justify-between items-center gap-3">
           <div className='w-full md:w-[80%] relative overflow-hidden flex flex-row justify-between gap-3 items-center'>
            <div className='flex flex-row justify-evenly items-center gap-5'>
              <img src={logo} alt="" className=' w-8 rounded' />
              <span className='hidden md:block text-base md:text-2xl font-bold italic'>K~Note</span>
            </div>
           {
              auths ? <div className='w-full md:w-[60%] flex flex-row justify-evenly items-center'>
                {
                  showInput ? 
                  <>
                    <input type="text" placeholder='Search' className={`${show ? 'md:block border-2 outline-slate-300 absolute left-0  rounded-none shadow p-3 w-full' : 'hidden'}` }
                      onChange={(e)=>setInputSearch(e.target.value)}/>
                    <AiOutlineSearch size={24} className='inline absolute right-5 cursor-pointer'
                    onClick={()=>handleSearch()}/>
                  </>
                  : ""
                }
                      </div>
                      : ""
           }

           </div>
            {
              auths ? 
              <div className='flex flex-row justify-evenly items-center gap-2 w-[20%] relative'>
                    <p className='text-xl tracking-widest hidden md:block'>Hi, {user?.displayName}</p>
                    <img className=' rounded w-16 hidden md:block' src={user?.photoURL} alt="" />
                      {
                      showMenu ?<AiOutlineMenu size={25} className='cursor-pointer block absolute right-0  md:hidden' onClick={()=>setShowMenu(!showMenu)}/>  :
                      <AiOutlineClose size={25} className=' cursor-pointer block absolute right-0 md:hidden' onClick={()=>setShowMenu(!showMenu)}/>
                      } 
              </div>
              : ""
            }
        </div>
    </div>
  )
}

export default Header