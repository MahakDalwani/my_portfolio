import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const hasFetched = useRef(false);
  const {
    portfolio,
    skills,
    projects,
    experiences,
    loading,
    error,
    fetchAllData,
  } = usePortfolio();

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllData();
      hasFetched.current = true;
    }
  }, [fetchAllData]);

  return (
    <div className="portfolio">
      <Header portfolioData={portfolio} />
      <Hero portfolioData={portfolio} />
      <Skills 
        skills={skills} 
        loading={loading.skills} 
        error={error.skills} 
      />
      <Projects 
        projects={projects} 
        loading={loading.projects} 
        error={error.projects} 
      />
      <Experience 
        experiences={experiences} 
        loading={loading.experiences} 
        error={error.experiences} 
      />
      <Contact portfolioData={portfolio} />
      <Footer />
    </div>
  );
};

export default Portfolio;
