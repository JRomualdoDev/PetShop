import React from 'react';
import { Search, Heart, ShoppingBag, User, PawPrint } from 'lucide-react';
import type { NavTabId, CategoryId } from '../../types';
import './Navbar.css';

interface NavbarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  onSelectCategory?: (category: CategoryId) => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: () => void;
  cartCount?: number;
  favoritesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  cartCount = 0,
  favoritesCount = 0,
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <header className="site-header">
      <div className="site-header-container">
        {/* Brand Logo */}
        <div
          className="brand-logo"
          onClick={() => onTabChange('inicio')}
          role="button"
          tabIndex={0}
        >
          <div className="brand-logo-icon">
            <PawPrint size={22} className="logo-paw-svg" />
          </div>
          <div className="brand-logo-text">
            <span className="brand-name">PetConnect</span>
            <span className="brand-tagline">Cuidado & Pet Shop</span>
          </div>
        </div>

        {/* Desktop Search Bar (Tablet & Desktop) */}
        <form className="desktop-search-form" onSubmit={handleSearchSubmit}>
          <Search className="desktop-search-icon" size={18} />
          <input
            type="text"
            className="desktop-search-input"
            placeholder="Buscar produtos, serviços ou animais..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </form>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links" aria-label="Navegação desktop">
          <button
            type="button"
            className={`nav-link-btn ${activeTab === 'inicio' ? 'active' : ''}`}
            onClick={() => onTabChange('inicio')}
          >
            Início
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeTab === 'buscar' ? 'active' : ''}`}
            onClick={() => onTabChange('buscar')}
          >
            Produtos
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onSelectCategory && onSelectCategory('servicos')}
          >
            Serviços
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onSelectCategory && onSelectCategory('adote')}
          >
            Adoção
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onSelectCategory && onSelectCategory('apoie')}
          >
            Apoie
          </button>
        </nav>

        {/* Header Action Buttons */}
        <div className="header-actions">
          <button
            type="button"
            className={`header-action-btn ${activeTab === 'favoritos' ? 'active' : ''}`}
            onClick={() => onTabChange('favoritos')}
            title="Favoritos"
            aria-label="Favoritos"
          >
            <Heart size={20} />
            {favoritesCount > 0 && <span className="action-badge">{favoritesCount}</span>}
          </button>

          <button
            type="button"
            className="header-action-btn cart-btn"
            onClick={() => onTabChange('buscar')}
            title="Carrinho de Compras"
            aria-label="Carrinho"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
          </button>

          <button
            type="button"
            className={`header-user-btn ${activeTab === 'perfil' ? 'active' : ''}`}
            onClick={() => onTabChange('perfil')}
            aria-label="Perfil do usuário"
          >
            <div className="user-avatar-circle">
              <User size={16} />
            </div>
            <span className="user-name-text">João</span>
          </button>
        </div>
      </div>
    </header>
  );
};
