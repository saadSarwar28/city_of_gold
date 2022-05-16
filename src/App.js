import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Mint from "./pages/Mint/Mint";
import TreasureHunt from "./pages/TreasureHunt/TreasureHunt";
import { routeUrl } from "./utils/routeUrls";
import "./static/css/style.css";
import Conversion from "./pages/Conversion/Conversion";
import NotFound from "./pages/404/NotFound";
import Thankyou from "./pages/Thankyou/Thankyou";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {/* Route For Home Page */}
          <Route
            exact
            path="/"
            element={<Home />}
          />

          {/* Route For Mint Page */}
          <Route
            exact
            path={routeUrl.mint}
            element={<Mint />}
          />

          {/* Route For Staking */}
          <Route
            exact
            path={routeUrl.staking}
            element={<Dashboard />}
          />

          {/* Route for Treasure Hunt */}
          <Route
            exact
            path={routeUrl.treasureHunt}
            element={<TreasureHunt />}
          />

          {/* Route for Conversion */}
          <Route
            exact
            path={routeUrl.conversion}
            element={<Conversion />}
          />

          {/* Route for Thankyou Page */}
          <Route
            exact
            path={routeUrl.thankyou}
            element={<Thankyou />}
          />

          {/* For Non Existing URL shows 404 Page  */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
