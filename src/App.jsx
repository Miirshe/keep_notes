import { Route, Routes, useLocation } from "react-router-dom";
import { Header , Sidebar, Posts, Login, Signup, Home, Private_Routes, Trashes, TodoList, Completed, Todos, UpdateTodoList, Opps } from "./components/index";
import { useState } from "react";
const App = () => {
  const [ inputSearch , setInputSearch ] = useState('');
  const [ showMenu , setShowMenu ] = useState(true);
  const hideMenu = () =>{
    setShowMenu(!showMenu);
  }
  const location = useLocation();
  return (
    <div>
      <Header inputSearch = { inputSearch }  setInputSearch = { setInputSearch } showMenu ={showMenu} setShowMenu = {setShowMenu} hideMenu = {hideMenu} />
      <Sidebar showMenu ={showMenu} setShowMenu = {setShowMenu} hideMenu = {hideMenu} />
      <Routes>
        <Route path="/" element={<Private_Routes/>}>
          <Route path="/" element={<Home inputSearch = { inputSearch } />}/>
        </Route>
        <Route path="/Posts" element={<Private_Routes/>}>
          <Route path="/Posts" element={<Posts/>}/>
          <Route path="/Posts/:id" element={<Posts/>}/>
        </Route>
        <Route path="/Trashes" element={<Private_Routes/>}>
          <Route path="/Trashes" element={<Trashes/>}/>
        </Route>
        <Route path="/Todos" element={<Private_Routes/>}>
          <Route path="/Todos" element={<Todos/>}>
            <Route index element={<TodoList/>}/>
            <Route path="TodoList" element={<TodoList/>}/>
            <Route path="Completed" element={<Completed/>}/>
          </Route>
        </Route>
        <Route path="/UpdateTodoList/:id" element={<Private_Routes/>}>
          <Route path="/UpdateTodoList/:id" element={<UpdateTodoList/>}/>
        </Route>
        {
          location.pathname === '/Login' ?  <Route path="/Login" element={<Login/>}/> :
        <Route path="/Signup" element={<Signup/>}/>

        }

        <Route path="*" element={<Opps/>}/>
        
      </Routes>
    </div>
  );
};

export default App;
