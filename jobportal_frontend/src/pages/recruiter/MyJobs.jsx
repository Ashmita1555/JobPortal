import { useState } from 'react';

export function MyJobs() {
  // Mock job data (can be replaced with API data)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Kathmandu',
      type: 'Full-time',
      salary: 'Rs. 50,000/month'
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'Pokhara',
      type: 'Part-time',
      salary: 'Rs. 30,000/month'
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit job with ID:', id);
    // navigate to edit form or open modal
  };

  const handleDelete = (id) => {
    console.log('Delete job with ID:', id);
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleViewApplications = (id) => {
    console.log('View applications for job ID:', id);
    // navigate to application list page
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Job Posts</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>{job.location} | {job.type} | {job.salary}</p>
            <div className="flex justify-between mt-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleViewApplications(job.id)}
              >
                View Applications
              </button>
              <div>
                <button
                  className="mr-2 text-yellow-600 hover:underline"
                  onClick={() => handleEdit(job.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-gray-500 text-center">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}
