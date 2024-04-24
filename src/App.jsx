import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LandingMaintenance } from "./components/LandingMaintenance/LandingMaintenance";
import { Home } from "./components/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.scss";

function App() {
  // const hostProduction = window.location.href === "https://jaicodigital.com/";
  const hostProduction = window.location.href === "http://localhost:5173/";

  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute hostProduction={hostProduction}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/en-mantenimiento" element={<LandingMaintenance />} />
      </Routes>
    </Router>
  );

  function Navigation() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/en-mantenimiento">Landing Mantenimiento</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default App;
