import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-yellow-400">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-yellow-400">Manage Users</Link>
          <Link to="/admin/jobs" className="block hover:text-yellow-400">Manage Jobs</Link>
          <Link to="/admin/post-dummy" className="block hover:text-yellow-400">Post as Temp User</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
