import "./App.css";
import Login from "./Login";
import Main from "./Main";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

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
