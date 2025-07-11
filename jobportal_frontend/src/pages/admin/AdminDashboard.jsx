import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("http://localhost:8000/api/admin/dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`

        },
      });
      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">Users: {stats.total_users}</div>
          <div className="bg-white p-4 rounded shadow">Jobs: {stats.total_jobs}</div>
          <div className="bg-white p-4 rounded shadow">Applications: {stats.total_applications}</div>
          <div className="bg-white p-4 rounded shadow">Companies: {stats.total_companies}</div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}
