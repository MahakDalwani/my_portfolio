import React, { useState, useMemo, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ portfolioData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const headerInfo = useMemo(() => {
    return {
      name: 'Mahak Dakwani',
      title: portfolioData?.title || 'Full Stack Developer',
    };
  }, [portfolioData]);

  useEffect(() => {
    const saved = localStorage.getItem('pref-theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('theme-dark');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('theme-dark', next);
    localStorage.setItem('pref-theme', next ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>{headerInfo.name}</h1>
          <p className="subtitle">{headerInfo.title}</p>
        </div>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? '🌙' : '☀️'}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
