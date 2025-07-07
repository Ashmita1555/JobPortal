// src/pages/jobseeker/UploadResume.jsx
import { useState } from 'react';

export function UploadResume() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    alert(`Uploaded: ${file.name}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
          accept=".pdf,.doc,.docx"
        />
        <br />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
