import { usePortfolio } from '../context/PortfolioContext';

export const useProjects = () => {
  const {
    projects,
    loading,
    error,
    updateProject,
    deleteProject,
  } = usePortfolio();

  return { 
    projects, 
    loading: loading.projects, 
    error: error.projects, 
    updateProject, 
    deleteProject 
  };
};
