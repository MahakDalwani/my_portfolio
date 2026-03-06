import React, { useMemo } from 'react';
import '../styles/Hero.css';

const Hero = ({ portfolioData }) => {
  const heroContent = useMemo(() => {
    return {
      name: portfolioData?.name || 'Mahak Dalwani',
      bio: portfolioData?.bio || 'Building amazing digital experiences',
      socialLinks: portfolioData?.socialLinks || {},
    };
  }, [portfolioData]);

  return (
    <section className="hero" id="home">
      <div className="particles" aria-hidden="true"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">Welcome to My Portfolio</h2>
          <h1>{heroContent.name}</h1>
          <p className="hero-description">{heroContent.bio}</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">View My Work</button>
            <button className="btn btn-secondary">Download Resume</button>
          </div>
          <div className="social-links">
            {heroContent.socialLinks.github && (
              <a href={heroContent.socialLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {heroContent.socialLinks.linkedin && (
              <a href={heroContent.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {heroContent.socialLinks.twitter && (
              <a href={heroContent.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

