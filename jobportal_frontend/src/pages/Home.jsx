import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-8">
            Browse thousands of job listings from top companies and step into your future.
          </p>
          <div className="space-x-4">
            <Link
              to="/jobs"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="border border-white text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-700 transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Companies Hiring</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {[
            { name: 'TechX Pvt Ltd', logo: 'https://via.placeholder.com/120x60' },
            { name: 'CodeHimalaya', logo: 'https://via.placeholder.com/120x60' },
            { name: 'SmartWork Nepal', logo: 'https://via.placeholder.com/120x60' },
            { name: 'DataSoft Inc.', logo: 'https://via.placeholder.com/120x60' },
            { name: 'Infinity Labs', logo: 'https://via.placeholder.com/120x60' },
            { name: 'Global IT Solutions', logo: 'https://via.placeholder.com/120x60' },
            { name: 'AppNet', logo: 'https://via.placeholder.com/120x60' },
            { name: 'PixelWave Studio', logo: 'https://via.placeholder.com/120x60' },
          ].map((company, index) => (
            <div
              key={index}
              className="bg-white border p-5 rounded-lg shadow hover:shadow-md transition text-center"
            >
              <img
                src={company.logo}
                alt={`${company.name} Logo`}
                className="mx-auto h-12 object-contain"
              />
              <p className="mt-3 text-gray-800 font-medium">{company.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
