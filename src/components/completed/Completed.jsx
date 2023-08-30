import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { auth, db } from '../lib/Firebase';
import { TiDelete } from 'react-icons/ti';

const Completed = () => {
	const [complete , setComplete] = useState([]);
	const [ user , setUser ] = useState(null);
	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if(userAuth){
				setUser(userAuth);
			}else{
				setUser(null);
			}
		})
	},[])
	useEffect(() => {

		const getCompleted = onSnapshot(collection(db , "complete"),
		(onSnapshot)=>{
			const list = [];
			onSnapshot.docs.forEach(doc => {
				list.push({id:doc.id,...doc.data()});
			})
			setComplete(list);
		});
		return () => getCompleted();

	},[])
	const handleDelete = async (id) => {
		try {
			if(confirm("are you sure you want to delete this Completed Task")){
				await deleteDoc(doc(db,"complete",id));
			}
		} catch (error) {
			console.log(error);
		}
	}

	const checkCompleted = complete?.filter((res) => {
		return res?.userId == user?.uid
	});
  return (
	<div className='w-full mt-10'>
			<h1 className='text-2xl uppercase ml-5 md:ml-0 text-[#000] mt-4'>All complete Tasks <span className='text-[#FBBC04]'>({checkCompleted?.length})</span></h1>
			<div className=' mt-10 flex flex-col justify-start items-start gap-5'>
		{
		complete?.map( res => {

				return(
					user?.uid && res?.userId === user?.uid && (
						<>
						<div key={res?.id} className=' relative mx-auto md:m-0 p-5 w-[90%] border-b-2 border-slate-300 hover:shadow-xl transition-all ease-in-out hover:rounded'>
							<p className='w-[90%] line-through'>{res?.completed}</p>
							<TiDelete onClick={()=>handleDelete(res?.id)} size={30} className='inline absolute right-2 bottom-2  cursor-pointer text-red-500'/>
							</div>
						</>
					)
				)
			})
		}
		</div>
	</div>
  )
}

export default Completed