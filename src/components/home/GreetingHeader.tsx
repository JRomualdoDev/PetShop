import React from 'react';
import './GreetingHeader.css';

interface GreetingHeaderProps {
  userName?: string;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ userName = 'João' }) => {
  return (
    <div className="greeting-header">
      <h1 className="greeting-title">
        Olá, {userName} <span className="greeting-emoji" role="img" aria-label="Aceno">👋</span>
      </h1>
      <p className="greeting-subtitle">
        Como podemos ajudar você e seu pet hoje?
      </p>
    </div>
  );
};
