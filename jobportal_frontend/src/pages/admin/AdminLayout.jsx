import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className="block px-2 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="block px-2 py-2 rounded hover:bg-gray-700"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/jobs"
            className="block px-2 py-2 rounded hover:bg-gray-700"
          >
            Manage Jobs
          </Link>
          <Link
            to="/admin/createuser"
            className="block px-2 py-2 rounded hover:bg-gray-700"
          >
           Create Dummy User
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="text-xl font-semibold mb-4 border-b pb-2">Admin Section</div>
        <Outlet /> {/* nested routes will render here */}
      </main>
    </div>
  );
}
