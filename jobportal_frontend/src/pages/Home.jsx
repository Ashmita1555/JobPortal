
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore thousands of job listings from top companies and take the next step in your career.
          </p>
          <div className="space-x-4">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="text-blue-600 border border-blue-600 px-6 py-3 rounded text-lg hover:bg-blue-50 transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Top Companies Hiring</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Example placeholders */}
          <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <img src="https://via.placeholder.com/100x50" alt="Company Logo" className="mx-auto" />
            <p className="mt-2 text-center text-gray-700 font-medium">Company A</p>
          </div>
          <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <img src="https://via.placeholder.com/100x50" alt="Company Logo" className="mx-auto" />
            <p className="mt-2 text-center text-gray-700 font-medium">Company B</p>
          </div>
          {/* Add more company cards as needed */}
        </div>
      </section>
    </div>
  );
}
