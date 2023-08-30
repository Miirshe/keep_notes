import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../lib/Firebase";
import { useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Note = ({ note, notes }) => {
  const [checkImage, setCheckImage] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    const checkImages = () => {
      if (note?.avator?.avator) {
        setCheckImage(true);
      } else {
        setCheckImage(false);
      }
    };
    return () => checkImages();
  }, []);

  const getText = (html) => {
    const text = new DOMParser().parseFromString(html, "text/html");
    return text.body.textContent;
  };
  const handleDelete = async (id) => {
    try {
      if (confirm("are you sure to delete this note ? ")) {
        const noteId = doc(db, "Notes", id);
        const TrashData = notes?.find((note) => {
          return note.id === id;
        });

        await addDoc(collection(db, "TrashData"), {
          Note: TrashData.Note,
          avator: TrashData.avator,
          timestemp: TrashData.timestemp,
          userId: TrashData.userId,
        });
        console.log("TrashData", TrashData);
        await deleteDoc(noteId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    user?.uid &&
    note?.userId === user?.uid && (
      <div className="flex flex-col h-fit justify-start items-start cursor-pointer gap-2 space-y-2 transition-all ease-in-out hover:shadow-md rounded-md p-1 overflow-hidden">
        {checkImage ? (
          <img
            className="w-full md:h-40 bg-center object-cover "
            src={note?.avator?.avator}
            alt=""
          />
        ) : (
          ""
        )}

        <div className="p-1 flex flex-col justify-start items-start gap-2 space-y-2">
          <p className="text-lg tracking-widest text-justify">
            {getText(note?.Note)}
          </p>
          <span className="w-full flex flex-row justify-end items-end space-x-2 gap-2 p-1">
            <Link to={`/Posts/${note?.id}`} state={note}>
              {" "}
              <MdOutlineEditNote
                size={30}
                className="text-lg inline text-slate-800"
              />{" "}
            </Link>
            <TiDelete
              size={30}
              className="text-lg inline cursor-pointer text-red-500"
              onClick={() => handleDelete(note?.id)}
            />
          </span>
        </div>
      </div>
    )
  );
};

export default Note;
