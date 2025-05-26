import { useEffect, useState } from 'react';
import api from '../../services/api';

export function RecruiterDashboard() {
  const [dashboardData, setDashboardData] = useState({
    jobsPosted: 0,
    applicationsReceived: 0,
    activeJobs: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const jobsRes = await api.get('jobs/');
      const jobs = jobsRes.data;

      const jobsPosted = jobs.length;
      const activeJobs = jobs.filter(job => new Date(job.deadline) > new Date()).length;

      // Assuming you have an endpoint for recruiter’s job applications:
      const appsRes = await api.get('applications/');
      const applicationsReceived = appsRes.data.length;

      setDashboardData({
        jobsPosted,
        applicationsReceived,
        activeJobs,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome Back, Recruiter!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Jobs Posted</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.jobsPosted}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Applications Received</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.applicationsReceived}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Active Jobs</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.activeJobs}</p>
        </div>
      </div>
    </div>
  );
}
