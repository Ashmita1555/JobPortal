import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add access token if available unless skipAuth flag is set
api.interceptors.request.use((config) => {
  if (config.skipAuth) {
    // Don't add Authorization header if skipAuth is true
    return config;
  }

  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchRecruiterJobs = () => api.get("company/my-jobs/");
export const postNewJob = (jobData) => api.post("company/post-job/", jobData);
export const deleteJob = (jobId) => api.delete(`company/delete-job/${jobId}/`);
export const getUserProfile = () => api.get("users/me/");

// You will need to call this with skipAuth: true
export const resetPassword = (uid, token, password) =>
  api.post(
    `users/reset-password/${uid}/${token}/`,
    { password },
    { skipAuth: true }
  );

export default api;
