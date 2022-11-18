import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../Components/Auth/Login'
import Dashboard from './Dashboard'
import Register from '../Components/Auth/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;