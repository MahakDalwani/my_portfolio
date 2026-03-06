import { usePortfolio } from '../context/PortfolioContext';

export const useSkills = () => {
  const {
    skills,
    loading,
    error,
    updateSkill,
    deleteSkill,
  } = usePortfolio();

  return { 
    skills, 
    loading: loading.skills, 
    error: error.skills, 
    updateSkill, 
    deleteSkill 
  };
};
