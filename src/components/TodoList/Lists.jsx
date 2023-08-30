import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../lib/Firebase";

const Lists = () => {
  const locations = useLocation();
  const [user, setUser] = useState(null);
  const [done, setDone] = useState(false);
  const [check, setCheck] = useState(false);
  const [listLength , setListLength] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });
  }, []);
  const [lists, setLists] = useState(null);
  useEffect(() => {
    const getTodoLists = onSnapshot(
      collection(db, "todolists"),
      (onSnapshot) => {
        const lists = [];
        onSnapshot.docs.forEach((doc) => {
          return lists.push({ id: doc.id, ...doc.data() });
        });
        setLists(lists);
      }
    );

    return () => getTodoLists();
  }, []);

  const handleChecked = (id) => {
    console.log("id : ", id);
    return lists?.map((res) => {
      if (res.id === id) {
        setCheck(res.id);
        setDone(!done);
      } else {
        setDone(!done);
      }
    });
  };
  const handleCompleted = async (todo) => {
    try {
      const listCompleted = lists?.find((res) => {
        return res.id === todo.id;
      });

      console.log("listCompleted", listCompleted);
      const { list, timestemp, userId, id } = listCompleted;
      await addDoc(collection(db, "complete"), {
        completed: list,
        timestemp: timestemp,
        userId: userId,
      });
      await deleteDoc(doc(db, "todolists", id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this todos?")) {
        await deleteDoc(doc(db, "todolists", id));
      }
    } catch (error) {
      console.log(error);
    }
  };


	const checklist = lists?.filter((res) => {
		return res?.userId == user?.uid
	});


  return (
    <div className="p-3 rounded w-[90%] flex flex-col justify-start items-start gap-4">
      <h1 className="text-2xl uppercase ml-5 md:ml-0 text-[#000] mt-5">
        All Tasks <span className="text-[#FBBC04]">({checklist?.length})</span>
      </h1>
      {lists?.map((todo) => {
        return (
          user?.uid &&
          todo?.userId === user?.uid && (
            <div
              key={todo?.id}
              className=" border-b-2 border-slate-300 p-2 w-full hover:shadow-xl transition-all ease-in-out hover:rounded mt-8 flex flex-col justify-start items-start gap-2"
            >
              <div className="flex flex-row justify-start items-start gap-3 mt-10">
                {locations.pathname === "/Todos" ||
                locations.pathname === "/Todos/TodoList" ? (
                  <input
                    className="mt-1 p-2"
                    type="checkbox"
                    checked={todo?.id === check && done}
                    name={todo?.id}
                    onChange={() => handleChecked(todo.id)}
                    onClick={() => handleCompleted(todo)}
                  />
                ) : null}
                <p
                  className={` ${
                    todo?.id === check && done ? "line-through" : ""
                  }  md:w-[80%] cursor-pointer text-justify md:text-left text-xl`}
                >
                  {todo?.list}
                </p>
              </div>
              <div className=" flex flex-row justify-end items-center w-full gap-5">
                <Link to={`/UpdateTodoList/${todo?.id}`} state={todo}>
                  <MdOutlineEditNote
                    size={30}
                    className="inline cursor-pointer text-slate-800"
                  />
                </Link>
                <TiDelete
                  onClick={() => handleDelete(todo.id)}
                  size={30}
                  className="inline cursor-pointer text-red-500"
                />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Lists;
