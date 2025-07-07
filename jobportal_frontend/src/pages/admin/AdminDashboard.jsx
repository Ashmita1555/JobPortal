import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul>
        <li><a href="/admin/users" className="text-blue-600">Manage Users</a></li>
        <li><a href="/admin/jobs" className="text-blue-600">Manage Jobs</a></li>
        <li><a href="/admin/dummyuser" className="text-blue-600">Create Dummy USer</a></li>
      </ul>
    </div>
  );
}
