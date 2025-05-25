// src/pages/jobseeker/SearchJobs.jsx
import { useState } from 'react';

export function SearchJobs() {
  const [search, setSearch] = useState('');
  const jobs = [
    { id: 1, title: "Frontend Developer", location: "Kathmandu", type: "Full-time" },
    { id: 2, title: "Backend Engineer", location: "Pokhara", type: "Part-time" },
  ];

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Jobs</h2>
      <input
        type="text"
        placeholder="Search jobs..."
        className="p-2 border w-full mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid gap-4">
        {filtered.map(job => (
          <div key={job.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>{job.location} | {job.type}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
