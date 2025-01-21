import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AddQuestion from "./components/AddQuestion";
// import AddTeam from "./components/AddTeam";
// import Home from "./components/Home";
// import RegisterUser from "./components/auth/RegisterUser";
// import Login from "./components/auth/Login";
import LayOut from "./Layout";
import AddMatch from "./components/AddMatch";
import AddQuestion from "./questions/components/AddQuestion";
import Timer from "./components/Timer";
import AddTeam from "./teams/components/AddTeam";
import AllTeams from "./teams/components/AllTeams";
import EditTeam from "./teams/components/EditTeam";
import AllQuestions from "./questions/components/AllQuestions";
import EditQuestion from "./questions/components/EditQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayOut />}>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/register" element={<RegisterUser />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/create_match" element={<AddMatch />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/team">
            <Route path="all_teams" element={<AllTeams />} />
            <Route path="add_team" element={<AddTeam />} />
            <Route path=":id/edit" element={<EditTeam />} />
          </Route>
          <Route path="/question">
            <Route path="add_question" element={<AddQuestion />} />
            <Route path="all_questions" element={<AllQuestions />} />
            <Route path=":id/edit" element={<EditQuestion />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
