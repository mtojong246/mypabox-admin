import "./App.css";
import Main from './Main';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login  from './components/Login/Login'
import Schools from "./Schools";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/schools' element={<Schools />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
