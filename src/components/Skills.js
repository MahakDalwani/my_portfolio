import React, { useState, useRef, useMemo } from 'react';
import EmptyState from './EmptyState';
import '../styles/Skills.css';

const Skills = ({ skills, loading, error }) => {
  const [filter, setFilter] = useState('All');
  const skillsRef = useRef(null);

  const filteredSkills = useMemo(() => {
    if (filter === 'All') return skills;
    return skills.filter(skill => skill.category === filter);
  }, [skills, filter]);

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, [skills]);

  if (loading) {
    return (
      <section className="skills" id="skills" ref={skillsRef}>
        <div className="skills-container">
          <h2>My Skills</h2>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="skills" id="skills" ref={skillsRef}>
        <div className="skills-container">
          <h2>My Skills</h2>
          <div className="error-state">
            <div className="error-state-icon">⚠️</div>
            <h3 className="error-state-title">Failed to Load Skills</h3>
            <p className="error-state-message">Unable to fetch your skills right now. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!skills || skills.length === 0) {
    return (
      <section className="skills" id="skills" ref={skillsRef}>
        <div className="skills-container">
          <h2>My Skills</h2>
          <EmptyState type="skills" />
        </div>
      </section>
    );
  }

  return (
    <section className="skills" id="skills" ref={skillsRef}>
      <div className="skills-container">
        <h2>My Skills</h2>
        <div className="skill-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {filteredSkills.length === 0 ? (
          <div style={{ marginTop: '30px' }}>
            <EmptyState type="skills" />
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map(skill => (
              <div key={skill._id} className="skill-card">
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <span className={`skill-level level-${skill.level}`}>{skill.level}</span>
                </div>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <span className="proficiency">{skill.proficiency}%</span>
                </div>
                <p className="category">{skill.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
