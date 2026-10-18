import React from 'react';
import { Search, Heart, ShoppingBag, PawPrint, User } from 'lucide-react';
import type { NavPageId } from '../../types';
import { USER_PROFILE } from '../../data/mockData';
import './Navbar.css';

interface NavbarProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
  cartCount?: number;
  favoritesCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount = 3,
  favoritesCount = 0,
  isLoggedIn = true,
  userName = USER_PROFILE.name,
  userAvatar = USER_PROFILE.avatarUrl,
}) => {
  return (
    <header className="site-header" id="main-header">
      <div className="site-header-container">
        {/* Brand Logo */}
        <button
          type="button"
          className="brand-logo-btn"
          onClick={() => onNavigate('inicio')}
          aria-label="PetConnect Página Inicial"
        >
          <div className="brand-logo-icon">
            <PawPrint size={22} className="logo-paw-svg" />
          </div>
          <span className="brand-name">PetConnect</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-menu" aria-label="Navegação Principal">
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'inicio' ? 'active' : ''}`}
            onClick={() => onNavigate('inicio')}
          >
            Início
          </button>
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'produtos' || currentPage === 'detalhes-produto' ? 'active' : ''}`}
            onClick={() => onNavigate('produtos')}
          >
            Produtos
          </button>
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'servicos' ? 'active' : ''}`}
            onClick={() => onNavigate('servicos')}
          >
            Serviços
          </button>
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'adocao' || currentPage === 'detalhes-animal' ? 'active' : ''}`}
            onClick={() => onNavigate('adocao')}
          >
            Adoção
          </button>
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'apoie' ? 'active' : ''}`}
            onClick={() => onNavigate('apoie')}
          >
            Apoie
          </button>
          <button
            type="button"
            className={`nav-menu-link ${currentPage === 'chat' ? 'active' : ''}`}
            onClick={() => onNavigate('chat')}
          >
            Chat
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => onNavigate('produtos')}
            title="Buscar"
            aria-label="Buscar produtos e serviços"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            className={`action-icon-btn ${favoritesCount > 0 ? 'has-badge' : ''}`}
            onClick={() => onNavigate('favoritos')}
            title="Favoritos"
            aria-label="Meus favoritos"
          >
            <Heart size={20} />
            {favoritesCount > 0 && <span className="action-badge">{favoritesCount}</span>}
          </button>

          <button
            type="button"
            className="action-icon-btn cart-btn"
            onClick={() => onNavigate('carrinho')}
            title="Carrinho de compras"
            aria-label="Carrinho com itens"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => onNavigate('perfil')}
              aria-label={`Perfil de ${userName}`}
              id="header-user-profile-btn"
            >
              <img
                src={userAvatar}
                alt={userName}
                className="user-avatar-img"
                onError={(e) => {
                  // Fallback gracefully if image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="user-name-label">{userName}</span>
            </button>
          ) : (
            <button
              type="button"
              className="nav-login-btn"
              onClick={() => onNavigate('login')}
              aria-label="Entrar na conta"
              id="header-login-btn"
            >
              <User size={16} />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
