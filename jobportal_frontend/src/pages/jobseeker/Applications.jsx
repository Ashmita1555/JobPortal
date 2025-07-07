// src/pages/jobseeker/Applications.jsx
export function Applications() {
  const applications = [
    { id: 1, job: "Frontend Developer", status: "Under Review" },
    { id: 2, job: "Backend Engineer", status: "Rejected" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      <ul className="space-y-2">
        {applications.map(app => (
          <li key={app.id} className="bg-white p-4 rounded shadow">
            <p><strong>{app.job}</strong> - {app.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
