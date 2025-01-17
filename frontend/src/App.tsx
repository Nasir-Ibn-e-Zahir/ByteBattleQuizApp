import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AddQuestion from "./components/AddQuestion";
// import AddTeam from "./components/AddTeam";
import Home from "./components/Home";
import RegisterUser from "./components/auth/RegisterUser";
import Login from "./components/auth/Login";
import LayOut from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
