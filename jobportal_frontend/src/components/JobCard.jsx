export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <a href={`/job/${job.id}`} className="text-blue-500 mt-2 block">View Details</a>
    </div>
  );
}