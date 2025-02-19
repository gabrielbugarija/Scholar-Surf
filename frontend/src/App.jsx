import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Login" element={<Login />} />
      {/* Add a dashboard page so navigation works */}
        <Route path="/dashboard" element={<h1>Welcome to the Dashboard!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
