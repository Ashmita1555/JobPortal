import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers:{
        "Content-Type":"application/json",
    },
});

//Automatically add access token if available
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    
});

export const fetchRecruiterJobs = () => api.get("company/my-jobs/");
export const postNewJob = (jobData) => api.post("company/post-job/", jobData);
export const deleteJob = (jobId) => api.delete(`company/delete-job/${jobId}/`);
export const getUserProfile = () => api.get("users/me/");

export default api;
