import { usePortfolio } from '../context/PortfolioContext';

export const useExperience = () => {
  const {
    experiences,
    loading,
    error,
    updateExperience,
    deleteExperience,
  } = usePortfolio();

  return { 
    experiences, 
    loading: loading.experiences, 
    error: error.experiences, 
    updateExperience, 
    deleteExperience 
  };
};
