import "./App.css";
import Main from "./Main";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login  from './components/Login/Login'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
