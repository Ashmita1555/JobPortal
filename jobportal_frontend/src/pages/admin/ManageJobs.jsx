import { useEffect, useState } from "react";
import api from "../../services/api"; 

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("admin/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const approveJob = async (id) => {
    try {
      await api.post(`admin/jobs/approve/${id}/`);
      alert("Job approved!");
      fetchJobs(); // Refresh list
    } catch (err) {
      console.error("Approve failed:", err.response?.data || err.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`admin/jobs/delete/${id}/`);
      alert("Job deleted!");
      fetchJobs(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Posted By</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="p-2 border">{job.title}</td>
              <td className="p-2 border">{job.posted_by_username || "Unknown"}</td>
              <td className="p-2 border">
                {!job.is_approved && (
                  <button
                    onClick={() => approveJob(job.id)}
                    className="text-green-600 mr-2"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => deleteJob(job.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
