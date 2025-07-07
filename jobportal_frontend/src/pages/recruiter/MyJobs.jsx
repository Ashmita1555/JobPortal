import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const res = await api.get('jobs/');
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    await api.delete(`jobs/${id}/`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold mb-6 text-center">My Posted Jobs</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
          <p className="text-gray-600 mb-2">{job.description}</p>
          <p className="text-sm text-gray-500 mb-4">Deadline: {job.deadline}</p>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-lg text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteJob(job.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
