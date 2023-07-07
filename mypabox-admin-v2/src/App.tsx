import "./App.css";
import Main from './routes/Main/Main';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from "./routes/Login/Login";
import Schools from "./routes/Schools/Schools";
import Navbar from "./components/NavBar/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
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
