import React, { useState } from 'react';
import { Search, X, Heart } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { BottomNav } from '../../components/common/BottomNav';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import type { NavPageId, NavTabId } from '../../types';
import './SearchScreen.css';

interface SearchScreenProps {
  onNavigate: (page: NavPageId) => void;
  onSelectProduct?: (productId: string) => void;
  onShowToast?: (message: string) => void;
}

interface CatalogProduct {
  id: string;
  name: string;
  rating: number;
  price: string;
  imageUrl: string;
  category: string;
  isFavorite?: boolean;
}

const SEARCH_CATALOG: CatalogProduct[] = [
  {
    id: 'shampoo-neutro',
    name: 'Shampoo Neutro Pet',
    rating: 4.8,
    price: 'R$ 45,00',
    imageUrl: '/images/shampoo-neutro.png',
    category: 'Higiene',
    isFavorite: false,
  },
  {
    id: 'varinha-gatos',
    name: 'Varinha para Gatos',
    rating: 4.9,
    price: 'R$ 19,90',
    imageUrl: '/images/varinha-gatos.png',
    category: 'Brinquedos',
    isFavorite: true,
  },
  {
    id: 'cama-conforto',
    name: 'Cama Conforto M',
    rating: 4.6,
    price: 'R$ 129,90',
    imageUrl: '/images/cama-conforto.png',
    category: 'Acessórios',
    isFavorite: false,
  },
  {
    id: 'fonte-agua',
    name: 'Fonte de Água Bivolt',
    rating: 4.7,
    price: 'R$ 89,90',
    imageUrl: '/images/fonte-agua.png',
    category: 'Acessórios',
    isFavorite: false,
  },
];

const FILTER_PILLS = ['Ração', 'Brinquedos', 'Higiene', 'Acessórios'];

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Ração');
  const [products, setProducts] = useState<CatalogProduct[]>(SEARCH_CATALOG);

  const handleToggleFav = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFav = !p.isFavorite;
          if (onShowToast) {
            onShowToast(nextFav ? `"${name}" adicionado aos favoritos!` : `"${name}" removido dos favoritos.`);
          }
          return { ...p, isFavorite: nextFav };
        }
        return p;
      })
    );
  };

  const handleProductClick = (id: string) => {
    if (onSelectProduct) onSelectProduct(id);
    onNavigate('mobile-detalhes-produto');
  };

  const handleTabChange = (tab: NavTabId) => {
    if (tab === 'inicio') onNavigate('mobile-home');
    else if (tab === 'buscar') onNavigate('mobile-busca');
    else if (tab === 'favoritos') onNavigate('mobile-adocao');
    else if (tab === 'perfil') onNavigate('mobile-login');
  };

  return (
    <div className="mobile-search-screen" id="mobile-search-view">
      <StatusBar time="9:41" />

      <div className="search-scroll-body">
        {/* Active Focused Search Input Bar */}
        <div className="search-bar-wrapper">
          <Search size={20} className="search-input-icon" />
          <input
            type="text"
            className="search-text-input"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="mobile-search-input"
            autoFocus
          />
          {searchTerm.length > 0 ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              <X size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills Horizontal Scroll */}
        <div className="search-filter-pills" role="tablist" aria-label="Categorias de produtos">
          {FILTER_PILLS.map((pill) => {
            const isActive = activeFilter === pill;
            return (
              <button
                key={pill}
                type="button"
                className={`filter-pill-item ${isActive ? 'pill-active' : ''}`}
                onClick={() => setActiveFilter(pill)}
                role="tab"
                aria-selected={isActive}
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* 2x2 Products Grid */}
        <div className="search-products-grid">
          {products.map((p) => (
            <div
              key={p.id}
              className="search-product-card"
              onClick={() => handleProductClick(p.id)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes de ${p.name}`}
            >
              <div className="search-media-box">
                <img src={p.imageUrl} alt={p.name} className="search-product-img" />
                <button
                  type="button"
                  className={`search-fav-pill ${p.isFavorite ? 'fav-active' : ''}`}
                  onClick={(e) => handleToggleFav(e, p.id, p.name)}
                  aria-label={`Favoritar ${p.name}`}
                >
                  <Heart
                    size={16}
                    className="fav-heart-icon"
                    strokeWidth={2.2}
                    fill={p.isFavorite ? '#ef4444' : 'none'}
                  />
                </button>
              </div>

              <div className="search-card-body">
                <h3 className="search-product-title">{p.name}</h3>
                <div className="search-product-rating">
                  <span className="search-star">★</span>
                  <span className="search-rating-val">{p.rating.toFixed(1)}</span>
                </div>
                <div className="search-product-price">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Tab Navigation & Home Indicator */}
      <footer className="search-bottom-dock">
        <BottomNav activeTab="buscar" onTabChange={handleTabChange} />
        <HomeIndicator />
      </footer>
    </div>
  );
};
