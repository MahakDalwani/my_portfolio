import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './pages/Portfolio';
import './App.css';

function App() {
  return (
    <PortfolioProvider>
      <Portfolio />
    </PortfolioProvider>
  );
}

export default App;

