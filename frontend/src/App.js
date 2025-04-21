import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard/dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard/>} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
