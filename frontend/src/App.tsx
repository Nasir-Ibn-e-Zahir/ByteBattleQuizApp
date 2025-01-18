import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AddQuestion from "./components/AddQuestion";
// import AddTeam from "./components/AddTeam";
import Home from "./components/Home";
import RegisterUser from "./components/auth/RegisterUser";
import Login from "./components/auth/Login";
import LayOut from "./Layout";
import AddMatch from "./components/AddMatch";
import AddQuestion from "./components/AddQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create_match" element={<AddMatch />} />
          <Route path="/add_question" element={<AddQuestion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
