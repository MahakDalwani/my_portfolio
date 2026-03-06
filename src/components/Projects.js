import React, { useState, useContext, useMemo } from 'react';
import EmptyState from './EmptyState';
import '../styles/Projects.css';

const Projects = ({ projects, loading, error }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured).slice(0, 3);
  }, [projects]);

  if (loading) {
    return (
      <section className="projects" id="projects">
        <div className="projects-container">
          <h2>Featured Projects</h2>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects" id="projects">
        <div className="projects-container">
          <h2>Featured Projects</h2>
          <div className="error-state">
            <div className="error-state-icon">⚠️</div>
            <h3 className="error-state-title">Failed to Load Projects</h3>
            <p className="error-state-message">Unable to fetch your projects right now. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects;

  if (!projects || projects.length === 0) {
    return (
      <section className="projects" id="projects">
        <div className="projects-container">
          <h2>Featured Projects</h2>
          <EmptyState type="projects" />
        </div>
      </section>
    );
  }

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <h2>Featured Projects</h2>
        {displayProjects.length === 0 ? (
          <EmptyState type="projects" />
        ) : (
          <div className="projects-grid">
            {displayProjects.map(project => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="description">{project.description}</p>
                  <div className="technologies">
                    {project.technologies && project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.githubrepo && (
                      <a href={project.githubrepo} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
