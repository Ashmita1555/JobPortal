export function RecruiterDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome Back, Recruiter!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Jobs Posted</h2>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Applications Received</h2>
          <p className="text-2xl font-bold text-blue-600">48</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Active Jobs</h2>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>
      </div>
    </div>
  );
}
