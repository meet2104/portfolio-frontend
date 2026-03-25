import axios from 'axios';

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth tokens (if needed in future)
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getProjects = () => API.get('/projects');
export const getFeaturedProjects = () => API.get('/projects/featured');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.patch(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Contact form
export const submitContact = (data) => API.post('/contact', data);
export const getContacts = () => API.get('/contact');

// Skills
export const getSkills = () => API.get('/skills');
export const getSkillsByCategory = (category) => API.get(`/skills/category/${category}`);
export const createSkill = (data) => API.post('/skills', data);
export const updateSkill = (id, data) => API.patch(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

export default API;