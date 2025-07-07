import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const response = await resetPassword(uid, token, form.password);
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
    } catch (err) {
      console.error(err);
      setError("Reset failed. The link may be invalid or expired.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {message && <div className="text-green-600 mb-2">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Set New Password
        </button>
      </form>
    </div>
  );
}
