import { Link, Outlet } from 'react-router-dom';

export default function SidebarLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Recruiter Panel</h2>
        <nav className="space-y-4">
          <Link to="/recruiter/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/recruiter/post-job" className="block text-gray-700 hover:text-blue-600">Post Job</Link>
          <Link to="/recruiter/my-jobs" className="block text-gray-700 hover:text-blue-600">My Jobs</Link>
          <Link to="/recruiter/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}