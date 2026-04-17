import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (studentData) => api.post('/api/register', studentData),
};

export const academyService = {
  getStats: () => api.get('/api/stats'),
  getAnnouncements: () => api.get('/api/announcements'),
  getCourses: () => api.get('/api/courses'),
  addCourse: (courseData) => api.post('/api/courses', courseData),
  deleteCourse: (id) => api.delete(`/api/courses/${id}`),
};

export default api;
