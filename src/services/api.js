import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Portfolio APIs
export const portfolioAPI = {
  getPortfolio: () => apiClient.get('/portfolio'),
  createPortfolio: (data) => apiClient.post('/portfolio', data),
  updatePortfolio: (data) => apiClient.put('/portfolio', data),
  patchPortfolio: (data) => apiClient.patch('/portfolio', data),
  deletePortfolio: () => apiClient.delete('/portfolio'),
};

// Skills APIs
export const skillsAPI = {
  getAllSkills: () => apiClient.get('/skills'),
  getSkillById: (id) => apiClient.get(`/skills/${id}`),
  createSkill: (data) => apiClient.post('/skills', data),
  updateSkill: (id, data) => apiClient.put(`/skills/${id}`, data),
  patchSkill: (id, data) => apiClient.patch(`/skills/${id}`, data),
  deleteSkill: (id) => apiClient.delete(`/skills/${id}`),
};

// Projects APIs
export const projectsAPI = {
  getAllProjects: () => apiClient.get('/projects'),
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  createProject: (data) => apiClient.post('/projects', data),
  updateProject: (id, data) => apiClient.put(`/projects/${id}`, data),
  patchProject: (id, data) => apiClient.patch(`/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/projects/${id}`),
};

// Experience APIs
export const experienceAPI = {
  getAllExperiences: () => apiClient.get('/experience'),
  getExperienceById: (id) => apiClient.get(`/experience/${id}`),
  createExperience: (data) => apiClient.post('/experience', data),
  updateExperience: (id, data) => apiClient.put(`/experience/${id}`, data),
  patchExperience: (id, data) => apiClient.patch(`/experience/${id}`, data),
  deleteExperience: (id) => apiClient.delete(`/experience/${id}`),
};

export default apiClient;
