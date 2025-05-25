import { useState } from 'react';

export function PostJob() {
  const [form, setForm] = useState({ title: '', location: '', type: '', salary: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posting job", form);
    setForm({ title: '', location: '', type: '', salary: '', description: '' });
  };

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="type" placeholder="Job Type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="salary" placeholder="Salary Range" value={form.salary} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded h-24" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post Job</button>
      </form>
    </div>
  );
}