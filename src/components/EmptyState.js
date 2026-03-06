import React from 'react';
import '../styles/EmptyState.css';

const EmptyState = ({ type = 'default', message = 'No data available' }) => {
  const emptyStates = {
    skills: {
      icon: '⚙️',
      title: 'No Skills Yet',
      message: 'Your skills will appear here once added.',
    },
    projects: {
      icon: '📁',
      title: 'No Projects Yet',
      message: 'Your portfolio projects will appear here once created.',
    },
    experience: {
      icon: '💼',
      title: 'No Experience Yet',
      message: 'Your work experience will appear here once added.',
    },
    default: {
      icon: '📭',
      title: 'No Data',
      message: message,
    },
  };

  const state = emptyStates[type] || emptyStates.default;

  return (
    <div className="empty-state">
      <div className="empty-state-icon">{state.icon}</div>
      <h3 className="empty-state-title">{state.title}</h3>
      <p className="empty-state-message">{state.message}</p>
    </div>
  );
};

export default EmptyState;
