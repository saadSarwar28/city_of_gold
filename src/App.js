import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Mint from "./pages/Mint/Mint";
import TreasureHunt from "./pages/TreasureHunt/TreasureHunt";
import { routeUrl } from "./utils/routeUrls";
import "./static/css/style.css";
import Conversion from "./pages/Conversion/Conversion";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route For Home Page */}
          <Route 
            path="/" 
            element={<Home />} 
          />

          {/* Route For Mint Page */}
          <Route 
            path={routeUrl.mint} 
            element={<Mint />} 
          />

          {/* Route For Staking */}
          <Route 
            path={routeUrl.staking}
            element={<Dashboard />} 
          />

          {/* Route for Treasure Hunt */}
          <Route 
            path={routeUrl.treasureHunt}
            element={<TreasureHunt />} 
          />

          {/* Route for Conversion */}
          <Route
            path={routeUrl.conversion}
            element={<Conversion />} 
          />


        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
