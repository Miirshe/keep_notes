import { Route, Routes, useLocation } from "react-router-dom";
import { Header , Sidebar, Posts, Login, Signup, Home } from "./components/index";
import { useState } from "react";
import Private_Routes from "./Private_Routes";

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

        {
          location.pathname === '/Login' ?  <Route path="/Login" element={<Login/>}/> :
        <Route path="/Signup" element={<Signup/>}/>

        }
        
      </Routes>
    </div>
  );
};

export default App;
