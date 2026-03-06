import React, { useMemo, useRef } from 'react';
import EmptyState from './EmptyState';
import '../styles/Experience.css';

const Experience = ({ experiences, loading, error }) => {
  const experienceRef = useRef(null);

  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }, [experiences]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <section className="experience" id="experience" ref={experienceRef}>
        <div className="experience-container">
          <h2>Work Experience</h2>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading experiences...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="experience" id="experience" ref={experienceRef}>
        <div className="experience-container">
          <h2>Work Experience</h2>
          <div className="error-state">
            <div className="error-state-icon">⚠️</div>
            <h3 className="error-state-title">Failed to Load Experience</h3>
            <p className="error-state-message">Unable to fetch your work experience right now. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section className="experience" id="experience" ref={experienceRef}>
        <div className="experience-container">
          <h2>Work Experience</h2>
          <EmptyState type="experience" />
        </div>
      </section>
    );
  }

  return (
    <section className="experience" id="experience" ref={experienceRef}>
      <div className="experience-container">
        <h2>Work Experience</h2>
        <div className="experience-timeline">
          {sortedExperiences.map((exp, idx) => (
            <div key={exp._id} className="experience-item">
              <div className="timeline-marker"></div>
              <div className="experience-content">
                <div className="experience-header">
                  <h3>{exp.jobTitle}</h3>
                  <span className="employment-type">{exp.employmentType}</span>
                </div>
                <p className="company">{exp.company}</p>
                <p className="location">{exp.location}</p>
                <p className="date">
                  {formatDate(exp.startDate)} -{' '}
                  {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                </p>
                <p className="description">{exp.description}</p>
                {exp.skills && exp.skills.length > 0 && (
                  <div className="skills-list">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
