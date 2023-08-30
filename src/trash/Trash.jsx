import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../components/lib/Firebase";
import { MdRestore } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function Trash({trashes , trash}) {
	const getText = (html) => {
		const doc = new DOMParser().parseFromString(html,'text/html');
		return doc.body.textContent;
	}
	const [ checkImage , setCheckImage ] = useState(false);
	const [ user , setUser ] = useState(null);

	useEffect(()=>{
		auth.onAuthStateChanged((userAuth) => {
			if(userAuth){
				setUser(userAuth);
			}else{
				setUser(null);
			}
		})
	},[])
	useEffect(()=>{
		if(trash?.avator?.avator){
			setCheckImage(true);
		}else{
			setCheckImage(false);
		}
	},[]);

	const handleDelete = async (id) => {
		try {
			if (confirm("Are you sure you want to delete this note?")) {
				await deleteDoc(doc(db,"TrashData",id));
				
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleRestore = async (id) => {
		try {
			if(confirm("are you sure to restore this note ? ")){
				const restoreData = trashes?.find(note =>{
					return note.id === id;
				});
				await addDoc(collection(db , "Notes"),{
					Note:restoreData.Note,
					avator : restoreData.avator,
					timestemp: restoreData.timestemp,
					userId: restoreData.userId,
				})
				await deleteDoc(doc(db,"TrashData",id));
			}
		} catch (error) {
			console.log(error);
		}
	}
  return (

	user?.uid && trash?.userId === user?.uid && (
		<div className="flex flex-col justify-start items-start cursor-pointer gap-2 space-y-2 transition-all ease-in-out hover:shadow-md rounded-md p-1 overflow-hidden">
		{
			checkImage ? <img className="w-full md:h-60 bg-center object-cover " src={trash?.avator?.avator} alt="" /> :
			""
		}
		
		<div className="p-1 flex flex-col justify-start items-start gap-2 space-y-2">
			<p className="text-lg tracking-widest text-justify">{getText(trash?.Note)}</p>
			<span className="w-full flex flex-row justify-end items-end space-x-2 gap-2 p-1">
			<MdRestore size={30} className="text-lg inline cursor-pointer text-slate-800" 
				onClick={()=>handleRestore(trash?.id)}/>
			<TiDelete size={30} className="text-lg inline cursor-pointer text-red-500" 
				onClick={()=>handleDelete(trash?.id)}/>
			</span>
		</div>

	</div>
    )
	
  )
}

export default Trash