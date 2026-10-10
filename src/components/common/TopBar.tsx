import React from 'react';
import { ChevronLeft } from 'lucide-react';
import './TopBar.css';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onBack, rightAction }) => {
  return (
    <header className="page-top-bar" aria-label="Cabeçalho da tela">
      {onBack ? (
        <button
          type="button"
          className="top-bar-btn"
          onClick={onBack}
          aria-label="Voltar"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
      ) : (
        <div className="top-bar-placeholder" />
      )}

      <h1 className="top-bar-title">{title}</h1>

      <div className="top-bar-right">
        {rightAction || <div className="top-bar-placeholder" />}
      </div>
    </header>
  );
};
