import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/jobs/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setJobs(res.data));
  }, []);

  const approveJob = async (id) => {
    await axios.post(`http://localhost:8000/api/admin/jobs/approve/${id}/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    alert("Job approved!");
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:8000/api/admin/jobs/delete/${id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    alert("Job deleted!");
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
          {jobs.map(job => (
            <tr key={job.id}>
              <td className="p-2 border">{job.title}</td>
              <td className="p-2 border">{job.posted_by_username || 'Unknown'}</td>
              <td className="p-2 border">
                {!job.is_approved && (
                  <button onClick={() => approveJob(job.id)} className="text-green-600 mr-2">Approve</button>
                )}
                <button onClick={() => deleteJob(job.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
