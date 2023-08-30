import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Trash from "./Trash";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../components/lib/Firebase";

const Trashes = () => {
	const [ trashes , setTrashes ] = useState([]);

	useEffect(()=>{
		const gettrashes = onSnapshot(collection(db,"TrashData"),
		(onSnapshot) => {

			let list = [];

			onSnapshot.docs.forEach(doc => {
				list.push({id:doc.id , ...doc.data()});
			})
			console.log("list",list);
			setTrashes(list)
		})
		return () => gettrashes();
	},[])
  return (
	<div className='md:w-[75%] md:ml-[20%] mt-32 p-2'>

      <Link to='/' className="text-xl p-2">Home / <span className="text-[#FBBC04]">Trash Notes </span> </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

        {
          trashes?.map(trash => {
			console.log("trahsaaaa",trash);
            return <Trash key={trash.id} trash={trash} trashes={trashes}/>
          })
        }

      </div>

    </div>
  )
}

export default Trashes