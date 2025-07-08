import { useState } from "react";
import axios from "axios";

export default function CreateTempJob() {
  const [form, setForm] = useState({ title: "", description: "", duration_days: 3 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/admin/temp-job/", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    alert("Temporary job posted!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post a Job as Dummy User</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Duration (days)"
          value={form.duration_days}
          onChange={(e) => setForm({ ...form, duration_days: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>
      </form>
    </div>
  );
}
