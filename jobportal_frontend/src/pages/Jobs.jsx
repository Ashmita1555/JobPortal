import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: Replace with your real API URL
    axios.get('http://127.0.0.1:8000/api/jobs/')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Job Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.company_name || 'Company not listed'}</p>
            <p className="text-gray-500 text-sm mt-1">{job.location || 'Location not specified'}</p>
            <p className="text-sm text-gray-600 mt-2">{job.description?.slice(0, 100)}...</p>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
