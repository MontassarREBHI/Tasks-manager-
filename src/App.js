import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Dashbord from "./pages/Dashbord.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <>
    <Router>
    <div className="container" >
      <Header/>
      <Routes>
        <Route path='/' element={<Dashbord/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
