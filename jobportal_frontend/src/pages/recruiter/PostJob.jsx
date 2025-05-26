import { useState } from 'react';
import api from '../../services/api';

export function PostJob() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    deadline: '',
    companyName: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.deadline ||
      !form.companyName.trim()
    ) {
      alert('Please fill in all fields before posting the job.');
      return;
    }

    // Prepare payload for backend
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      deadline: form.deadline,
      company: form.companyName, // Assuming backend expects 'company' as name here
    };

    try {
      await api.post('jobs/', payload);
      alert('Job posted!');
      setForm({ title: '', description: '', location: '', deadline: '', companyName: '' });
    } catch (err) {
      console.error('Error posting job:', err.response?.data || err.message);
      alert('Failed to post job. Check console for details.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow-md"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={4}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
      >
        Post Job
      </button>
    </form>
  );
}
