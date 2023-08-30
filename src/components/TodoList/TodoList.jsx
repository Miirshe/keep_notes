import { addDoc, collection , serverTimestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '../lib/Firebase';
import { toast } from 'react-toastify';
import Lists from './Lists';

const TodoList = () => {
	const [ values , setValues ] = useState('');
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
			await addDoc(collection(db,"todolists"),{
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
	<div className='w-full'>
		<div className='mt-10 p-5 shadow-xl rounded w-[90%] mx-auto md:ml-0 flex flex-row justify-start items-start gap-4'>
		<input ref={valueRef}  type="text"  placeholder='Add New Todo List ..' 
		className='p-4 outline-none border-none w-full' onChange={(e)=>setValues(e.target.value)}/>
		<button className='px-4 py-2 bg-[#FBBC04] capitalize text-white  rounded' onClick={()=>handleValues()}>Add</button>
		</div>
		<Lists/>
	</div>
  )
}

export default TodoList