import {  deleteDoc, doc } from "firebase/firestore";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { db } from "../lib/Firebase";
import { useEffect, useState } from "react";

const Note = ({note}) => {

	const [ checkImage , setCheckImage ] = useState(false);

	useEffect(()=>{
		const checkImages = () => {
			if(note?.avator?.avator){
				setCheckImage(true);
			}else{
				setCheckImage(false);
			}
		}
		return () => checkImages();
	},[])

	const getText = (html) => {
		const text = new DOMParser().parseFromString(html,"text/html");
		return text.body.textContent;
	}
	const handleDelete = async (id) =>{
		try {
			if(confirm("are you sure to delete this note ? ")){
				const noteId = doc(db,'Notes',id)
				await deleteDoc(noteId);
			}
		} catch (error) {
			console.log(error);
		}
	}
  return (
	<div className="flex flex-col justify-start items-start cursor-pointer gap-2 space-y-2 transition-all ease-in-out hover:shadow-md rounded-md p-1 overflow-hidden">
		{
			checkImage ? <img className="w-full md:h-60 bg-center object-cover " src={note?.avator?.avator} alt="" /> :
			""
		}
		
		<div className="p-1 flex flex-col justify-start items-start gap-2 space-y-2">
			<p className="text-lg tracking-widest text-justify">{getText(note?.Note)}</p>
			<span className="w-full flex flex-row justify-end items-end space-x-2 gap-2 p-1">
				<Link to={`/Posts/${note?.id}`} state={note}> <AiOutlineEdit size={25} className="text-lg inline text-[#FBBC04]"/> </Link>
				<AiOutlineDelete size={25} className="text-lg inline cursor-pointer text-red-500" 
				onClick={()=>handleDelete(note?.id)}/>
			</span>
		</div>

	</div>
  )
}

export default Note