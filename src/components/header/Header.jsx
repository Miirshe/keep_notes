import logo from '../../assets/logo.png';
import avator from '../../assets/avator.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRef, useState } from 'react';
const Header = () => {
  const [ show , setShow ] = useState(false);
  const ref = useRef();
  const  handleSearch = () =>{
    setShow(!show);
  }
  return (
    <div className="w-full p-1 shadow">
        <div className="w-[90%] relative mx-auto flex flex-row justify-between items-center gap-3">
           <div className='w-full md:w-[70%] relative overflow-hidden flex flex-row justify-between gap-3 items-center'>
            <div className='flex flex-row justify-evenly items-center gap-5'>
              <img src={logo} alt="" className=' w-8 rounded' />
              <span className='hidden md:block text-base md:text-2xl font-bold'>Google Keep</span>
            </div>
           <div className='w-full md:w-[60%] flex flex-row justify-evenly items-center'>
              <input type="text" placeholder='Search' className={`${show ? 'md:block border-none outline-slate-300 absolute left-0  rounded-none shadow p-3 w-full' : 'hidden'}` }
              />
              <AiOutlineSearch size={24} className='inline absolute right-5 cursor-pointer'
              onClick={()=>handleSearch()}/>
            </div>

           </div>
            <div className='flex flex-row justify-evenly items-center gap-2 w-[20%]'>
              <p className='text-xl tracking-widest hidden md:block'>Hi, miirshe</p>
              <img className=' rounded w-14' src={avator} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Header