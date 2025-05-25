// src/pages/jobseeker/JobSeekerLayout.jsx
import { Link, Outlet } from 'react-router-dom';

export default function JobSeekerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Job Seeker</h2>
        <nav className="space-y-4">
          <Link to="/seeker/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/seeker/search-jobs" className="block text-gray-700 hover:text-blue-600">Search Jobs</Link>
          <Link to="/seeker/upload-resume" className="block text-gray-700 hover:text-blue-600">Upload Resume</Link>
          <Link to="/seeker/applications" className="block text-gray-700 hover:text-blue-600">My Applications</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
