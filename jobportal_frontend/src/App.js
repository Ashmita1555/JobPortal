import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './pages/recruiter/SidebarLayout';
import { RecruiterDashboard } from './pages/recruiter/Dashboard';
import { PostJob } from './pages/recruiter/PostJob';
import { MyJobs } from './pages/recruiter/MyJobs';
import { RecruiterProfile } from './pages/recruiter/Profile';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSeekerLayout from './pages/jobseeker/JobSeekerLayout';
import { JobSeekerDashboard } from './pages/jobseeker/JobSeekerDashboard';
import { SearchJobs } from './pages/jobseeker/SearchJobs';
import { UploadResume } from './pages/jobseeker/UploadResume';
import { Applications } from './pages/jobseeker/Applications';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<SidebarLayout />}>
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="profile" element={<RecruiterProfile />} />
        </Route>
        
        {/* job seeker */}
        <Route path="/seeker" element={<JobSeekerLayout />}>
          <Route path="dashboard" element={<JobSeekerDashboard />} />
          <Route path="search-jobs" element={<SearchJobs />} />
          <Route path="upload-resume" element={<UploadResume />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
