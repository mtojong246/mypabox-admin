import './App.css'
import Main from './routes/Main/Main';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from "./routes/Login/Login";
import Schools from "./routes/Schools/Schools";
import Navbar from "./components/Navbar/Navbar";
import AddSchool from "./routes/Schools/AddSchool";


function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='main' element={<Main />} />
          <Route path='schools' element={<Schools />} />
          <Route path='schools/add-school' element={<AddSchool />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
