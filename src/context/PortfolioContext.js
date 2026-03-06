import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

// Fallback data for when API is unavailable
const fallbackData = {
  portfolio: {
    name: "Mahak Dalwani",
    title: "Full Stack Developer",
    email: "mahak.dalwani@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, State",
    about: "Passionate full stack developer with expertise in modern web technologies."
  },
  skills: [
    // { _id: '1', name: 'HTML', category: 'Frontend', level: 'Expert', proficiency: 95 },
    // { _id: '2', name: 'React', category: 'Frontend', level: 'Expert', proficiency: 95 },
    // { _id: '3', name: 'Node.js', category: 'Backend', level: 'Advanced', proficiency: 90 },
    // { _id: '4', name: 'MongoDB', category: 'Database', level: 'Advanced', proficiency: 85 },
    // { _id: '5', name: 'JavaScript', category: 'Frontend', level: 'Expert', proficiency: 95 },
    // { _id: '6', name: 'CSS3', category: 'Frontend', level: 'Advanced', proficiency: 88 }
  ],
  projects: [
    // {
    //   _id: '1',
    //   title: "E-Commerce Platform",
    //   description: "A full-featured e-commerce platform with payment integration",
    //   technologies: ["React", "Node.js", "MongoDB"],
    //   liveUrl: "https://example.com",
    //   githubUrl: "https://github.com/example"
    // }
  ],
  experiences: [
    {
      _id: '1',
      company: "TECH STARTUP INC.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2021-01-01",
      endDate: "2023-06-01",
      current: false,
      description: "Led development of multiple features and mentored junior developers. Improved application performance by 40%.",
      employmentType: "FULL-TIME",
      skills: ["REACT", "NODE.JS", "MONGODB", "AWS"]
    }
  ]
};
const initialState = {
  portfolio: null,
  skills: [],
  projects: [],
  experiences: [],
  loading: {
    portfolio: false,
    skills: false,
    projects: false,
    experiences: false,
  },
  error: {
    portfolio: null,
    skills: null,
    projects: null,
    experiences: null,
  },
};

// Action types
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_ERROR: 'SET_ERROR',
  UPDATE_PORTFOLIO: 'UPDATE_PORTFOLIO',
};

// Reducer
const portfolioReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
        error: {
          ...state.error,
          [action.payload.key]: null,
        },
      };

    case ACTION_TYPES.SET_SUCCESS:
      return {
        ...state,
        [action.payload.key]: action.payload.data,
        loading: {
          ...state.loading,
          [action.payload.key]: false,
        },
        error: {
          ...state.error,
          [action.payload.key]: null,
        },
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: false,
        },
        error: {
          ...state.error,
          [action.payload.key]: action.payload.error,
        },
      };

    case ACTION_TYPES.UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

// API functions
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Portfolio
  fetchPortfolio: async () => {
    const response = await axios.get(`${API_BASE_URL}/portfolio`);
    return response.data;
  },

  // Skills
  fetchSkills: async () => {
    const response = await axios.get(`${API_BASE_URL}/skills`);
    return response.data;
  },

  // Projects
  fetchProjects: async () => {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  },

  // Experiences
  fetchExperiences: async () => {
    const response = await axios.get(`${API_BASE_URL}/experiences`);
    return response.data;
  },

  updateExperience: async (id, data) => {
    const response = await axios.patch(`${API_BASE_URL}/experiences/${id}`, data);
    return response.data;
  },

  deleteExperience: async (id) => {
    await axios.delete(`${API_BASE_URL}/experiences/${id}`);
  },
};

// Context
const PortfolioContext = createContext();

// Provider component
export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Memoized actions
  const fetchPortfolio = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { key: 'portfolio', value: true } });
    try {
      const data = await api.fetchPortfolio();
      dispatch({ type: ACTION_TYPES.SET_SUCCESS, payload: { key: 'portfolio', data } });
    } catch (error) {
      // Use fallback data only if API fails
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { key: 'portfolio', data: fallbackData.portfolio } 
      });
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { key: 'skills', value: true } });
    try {
      const data = await api.fetchSkills();
      dispatch({ type: ACTION_TYPES.SET_SUCCESS, payload: { key: 'skills', data } });
    } catch (error) {
      // Use fallback data only if API fails
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { key: 'skills', data: fallbackData.skills } 
      });
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { key: 'projects', value: true } });
    try {
      const data = await api.fetchProjects();
      dispatch({ type: ACTION_TYPES.SET_SUCCESS, payload: { key: 'projects', data } });
    } catch (error) {
      // Use fallback data only if API fails
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { key: 'projects', data: fallbackData.projects } 
      });
    }
  }, []);

  const fetchExperiences = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { key: 'experiences', value: true } });
    try {
      const data = await api.fetchExperiences();
      dispatch({ type: ACTION_TYPES.SET_SUCCESS, payload: { key: 'experiences', data } });
    } catch (error) {
      // Use fallback data only if API fails
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { key: 'experiences', data: fallbackData.experiences } 
      });
    }
  }, []);

  const updateExperience = useCallback(async (id, data) => {
    try {
      const updatedExperience = await api.updateExperience(id, data);
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'experiences', 
          data: state.experiences.map(exp => 
            exp._id === id ? updatedExperience : exp
          ) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'experiences', error: error.message } 
      });
    }
  }, [state.experiences]);

  const deleteExperience = useCallback(async (id) => {
    try {
      await api.deleteExperience(id);
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'experiences', 
          data: state.experiences.filter(exp => exp._id !== id) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'experiences', error: error.message } 
      });
    }
  }, [state.experiences]);

  const updateProject = useCallback(async (id, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/projects/${id}`, data);
      const updatedProject = response.data;
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'projects', 
          data: state.projects.map(project => 
            project._id === id ? updatedProject : project
          ) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'projects', error: error.message } 
      });
    }
  }, [state.projects]);

  const deleteProject = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'projects', 
          data: state.projects.filter(project => project._id !== id) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'projects', error: error.message } 
      });
    }
  }, [state.projects]);

  const updateSkill = useCallback(async (id, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/skills/${id}`, data);
      const updatedSkill = response.data;
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'skills', 
          data: state.skills.map(skill => 
            skill._id === id ? updatedSkill : skill
          ) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'skills', error: error.message } 
      });
    }
  }, [state.skills]);

  const deleteSkill = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/skills/${id}`);
      dispatch({ 
        type: ACTION_TYPES.SET_SUCCESS, 
        payload: { 
          key: 'skills', 
          data: state.skills.filter(skill => skill._id !== id) 
        } 
      });
    } catch (error) {
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key: 'skills', error: error.message } 
      });
    }
  }, [state.skills]);

  const updatePortfolio = useCallback((data) => {
    dispatch({ type: ACTION_TYPES.UPDATE_PORTFOLIO, payload: data });
  }, []);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchPortfolio(),
      fetchSkills(),
      fetchProjects(),
      fetchExperiences(),
    ]);
  }, [fetchPortfolio, fetchSkills, fetchProjects, fetchExperiences]);

  const value = {
    ...state,
    fetchPortfolio,
    fetchSkills,
    fetchProjects,
    fetchExperiences,
    updateExperience,
    deleteExperience,
    updateProject,
    deleteProject,
    updateSkill,
    deleteSkill,
    updatePortfolio,
    fetchAllData,
    isLoading: Object.values(state.loading).some(loading => loading),
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Hook to use the context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
