import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import type { NavTabId } from '../../types';
import './BottomNav.css';

interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <button
        type="button"
        className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
        onClick={() => onTabChange('inicio')}
        id="nav-tab-inicio"
      >
        <Home className="nav-icon" size={24} strokeWidth={activeTab === 'inicio' ? 2.3 : 1.8} />
        <span className="nav-label">Início</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'buscar' ? 'active' : ''}`}
        onClick={() => onTabChange('buscar')}
        id="nav-tab-buscar"
      >
        <Search className="nav-icon" size={24} strokeWidth={activeTab === 'buscar' ? 2.3 : 1.8} />
        <span className="nav-label">Buscar</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'favoritos' ? 'active' : ''}`}
        onClick={() => onTabChange('favoritos')}
        id="nav-tab-favoritos"
      >
        <Heart className="nav-icon" size={24} strokeWidth={activeTab === 'favoritos' ? 2.3 : 1.8} />
        <span className="nav-label">Favoritos</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
        onClick={() => onTabChange('perfil')}
        id="nav-tab-perfil"
      >
        <User className="nav-icon" size={24} strokeWidth={activeTab === 'perfil' ? 2.3 : 1.8} />
        <span className="nav-label">Perfil</span>
      </button>
    </nav>
  );
};
