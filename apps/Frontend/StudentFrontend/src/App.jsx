import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./page/Dashboard";
import Profile from "./page/profile";
import Job from "./page/Job";
// import Events- from './page/Events';
// import Resume from './page/Resume';
import Login from "./page/Login";
import Signup from "./page/Signup";
import StudentidProvider from "./context/StudentidProvider";
import EditProfile from "./page/EditProfile";
import ResumeBuilder from "./page/ResumeBuilder";
function App() {
  return (
    <Router>
      <StudentidProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/edit-profile/:studentid" element={<EditProfile />} />
            <Route path="/profile/:studentid" element={<Profile />} />
            <Route path="/jobs" element={<Job />} />
            <Route path="/resume-builder/:studentid" element={<ResumeBuilder />} />
            {/* <Route path="/events" element={<Events />} /> */}
            {/* <Route path="/resume" element={<Resume />} /> */}
          </Route>
        </Routes>
      </StudentidProvider>
    </Router>
  );
}

export default App;
