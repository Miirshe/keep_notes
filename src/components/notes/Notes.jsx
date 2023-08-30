import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../lib/Firebase";
import { Link } from "react-router-dom";
import Note from "./Note";

const Notes = ({ inputSearch }) => {

  const [ notes , setNotes ] = useState([]);

  useEffect(()=>{
    const GetNotes =onSnapshot(
      collection(db,"Notes"),
      (onSnapshot) =>{
        let list = [];
        onSnapshot.docs.forEach(doc =>{
          list.push({id:doc.id,...doc.data()})
        })
        setNotes(list);
      }
    )
    return ()=> GetNotes();
  },[])

  console.log("notes",notes);
  return (
    <div className='md:w-[75%] md:ml-[20%] mt-32 p-2'>

      <Link to='/Notes' className="text-xl p-2">Home / <span className="text-[#FBBC04]">Notes</span> </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

        {
          notes?.filter(note => {
            return note.Note.toLowerCase().includes(inputSearch.toLowerCase())
          }).map(note => {
            return <Note key={note.id} note={note} notes={notes}/>
          })
        }

      </div>

    </div>
  )
}

export default Notes