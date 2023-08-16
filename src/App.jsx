import { Route, Routes } from "react-router-dom";
import { Header , Sidebar , Notes , Posts } from "./components/index";

const App = () => {
  return (
    <div>
      <Header />
      <Sidebar/>
      <Routes>
        <Route path="/Notes" element={<Notes/>}/>
        <Route path="/Posts" element={<Posts/>}/>
        <Route path="/Posts/:id" element={<Posts/>}/>
      </Routes>
    </div>
  );
};

export default App;
