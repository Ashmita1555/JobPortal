import React, { useState } from "react";
import axios from "axios";

export default function CreateDummyUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    jobTitle: "",
    jobDescription: "",
    expiryDays: 7,
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/admin/create_dummy_user/", form)
      .then((res) => {
        setSuccess(`Dummy user created with ID ${res.data.id}`);
      })
      .catch((err) => {
        console.error(err);
        setSuccess("Error creating dummy user.");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Dummy User + Post Job</h2>
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full"
          name="jobTitle"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 w-full"
          name="jobDescription"
          placeholder="Job Description"
          onChange={handleChange}
          required
        ></textarea>
        <input
          className="border p-2 w-full"
          type="number"
          name="expiryDays"
          placeholder="Active Days"
          value={form.expiryDays}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Dummy User + Post Job
        </button>
      </form>
    </div>
  );
}
