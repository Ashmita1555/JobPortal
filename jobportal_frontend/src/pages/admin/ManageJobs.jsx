// src/pages/admin/ManageJobs.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/jobs/") // update to match your Django endpoint
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Job Posts</h2>

      {loading && <p>Loading jobs...</p>}

      {!loading && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="border p-2">{job.id}</td>
                <td className="border p-2">{job.title}</td>
                <td className="border p-2">{job.company?.name}</td>
                <td className="border p-2">{job.location}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => alert(`Edit ${job.id}`)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => alert(`Delete ${job.id}`)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
