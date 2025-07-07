import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setForgotMessage('');

    try {
      // Step 1: Login and get tokens
      const response = await api.post('users/api/token/', {
        username: form.username,
        password: form.password,
      });

      const { access, refresh } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Step 2: Fetch user profile to get role
      const profileResponse = await api.get('users/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      const role = profileResponse.data.role;

      // Step 3: Redirect based on role
      if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (role === 'job_seeker') {
        navigate('/jobseeker/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard'); // or wherever admin dashboard is located
      } else {
        setError('Unknown user role.');
      }
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  const handleForgotPassword = async () => {
    setForgotMessage('');
    setError('');
    try {
      await axios.post('http://localhost:8000/api/users/forgot-password/', {
        username: form.username,
      });
      setForgotMessage('Reset link sent to your email.');
    } catch (err) {
      setForgotMessage('Error: User not found or issue occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-3 cursor-pointer text-sm text-blue-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-sm text-right">
        <button
          onClick={handleForgotPassword}
          className="text-blue-600 hover:underline"
          disabled={!form.username}
        >
          Forgot Password?
        </button>
      </div>

      {forgotMessage && (
        <p className="text-sm text-green-600 mt-2">{forgotMessage}</p>
      )}
    </div>
  );
}
