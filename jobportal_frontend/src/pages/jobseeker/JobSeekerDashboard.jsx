// src/pages/jobseeker/JobSeekerDashboard.jsx
export function JobSeekerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Job Seeker!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Jobs Applied</h2>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Saved Jobs</h2>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Resume Uploaded</h2>
          <p className="text-2xl font-bold text-green-600">Yes</p>
        </div>
      </div>
    </div>
  );
}
