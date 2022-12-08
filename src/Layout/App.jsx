import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "../Components/Auth/Register";
import Reset from "../Components/Auth/Reset";
import Search from "./Pages/Search";
import CocktailDetails from '../Components/CocktailList/CocktailDetails'
import Saved from './Pages/Saved';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/search/:cocktail" element={<Search />} />
            <Route path='/cocktail/:id' element={<CocktailDetails />} />
            <Route path='/profile/saved' element={<Saved />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
