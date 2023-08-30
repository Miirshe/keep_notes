import { addDoc, collection, doc , serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '../lib/Firebase';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import Lists from './Lists';

const UpdateTodoList = () => {
	const states = useLocation().state;
	const [ values , setValues ] = useState(states?.list);
	const [ user , setUser ] = useState(null);
	const valueRef = useRef(null);
	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if(userAuth){
				setUser(userAuth);
			}else{
				setUser(null);
			}
		})
	},[])
	const handleValues = async () => {
		try {
			const listId = doc(db,"todolists",states.id);
			await updateDoc(listId,{
				list:values,
				userId : user?.uid,
				timestemp: serverTimestamp()
			}).then((Response) => {
				toast.success('successfully added todos');
				valueRef.current.value = '';
				console.log(Response);
			} )

		} catch (error) {
			console.log(error);
		}
	}


  return (
	<div className='md:w-[75%] md:ml-[25%] mt-32 p-1'>
		<Link to='/Todos' className='text-3xl bg-[#FBBC04] py-2 px-5 rounded mt-5 text-white'>Back</Link>
		<div className='p-5 mt-14 shadow-xl rounded w-[90%] mx-auto md:ml-0 flex flex-row justify-start items-start gap-4'>
		<input ref={valueRef}  type="text" value={values} placeholder='Add New Todo List ..' 
		className='p-4 outline-none border-none w-full' onChange={(e)=>setValues(e.target.value)}/>
		<button className='px-4 py-2 bg-[#FBBC04] capitalize text-white  rounded' onClick={()=>handleValues()}>Add</button>
		</div>
		<Lists/>
	</div>
  )
}

export default UpdateTodoList