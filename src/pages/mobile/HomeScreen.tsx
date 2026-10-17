import React, { useState } from 'react';
import { Search, Heart, Package, Scissors, HeartHandshake, HandHeart } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { BottomNav } from '../../components/common/BottomNav';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import type { NavPageId, NavTabId } from '../../types';
import './HomeScreen.css';

interface HomeScreenProps {
  onNavigate: (page: NavPageId) => void;
  onSelectCategory?: (categoryId: string) => void;
  onSelectProduct?: (productId: string) => void;
  onShowToast?: (message: string) => void;
}

interface HomeProductItem {
  id: string;
  name: string;
  rating: number;
  price: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const INITIAL_FEATURED_PRODUCTS: HomeProductItem[] = [
  {
    id: 'racao-premium',
    name: 'Ração Premium Cães',
    rating: 4.9,
    price: 'R$ 149,90',
    imageUrl: '/images/racao-premium.png',
    isFavorite: true,
  },
  {
    id: 'brinquedo-mordedor',
    name: 'Brinquedo Mordedor',
    rating: 4.7,
    price: 'R$ 29,90',
    imageUrl: '/images/brinquedo-mordedor.png',
    isFavorite: false,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onShowToast,
}) => {
  const [products, setProducts] = useState<HomeProductItem[]>(INITIAL_FEATURED_PRODUCTS);

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

  const handleCategoryClick = (catId: string, page: NavPageId) => {
    if (onSelectCategory) onSelectCategory(catId);
    onNavigate(page);
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
    <div className="mobile-home-screen" id="mobile-home-view">
      <StatusBar time="9:41" />

      <div className="home-scroll-body">
        {/* User Greeting */}
        <header className="home-header">
          <h1 className="home-greeting">Olá, João 👋</h1>
          <p className="home-subgreeting">Como podemos ajudar você e seu pet hoje?</p>
        </header>

        {/* Search Bar Input Trigger */}
        <div
          className="home-search-trigger"
          onClick={() => onNavigate('mobile-busca')}
          role="button"
          tabIndex={0}
          aria-label="Buscar produtos, serviços ou animais"
        >
          <Search size={18} className="search-trigger-icon" />
          <span className="search-trigger-text">Buscar produtos, serviços ou animais</span>
        </div>

        {/* 4 Quick Category Shortcuts */}
        <nav className="home-quick-categories" aria-label="Categorias rápidas">
          <button
            type="button"
            className="quick-cat-btn"
            onClick={() => handleCategoryClick('produtos', 'mobile-busca')}
            id="cat-produtos"
          >
            <div className="quick-cat-icon-box cat-box-blue">
              <Package size={26} strokeWidth={2.1} className="cat-icon-blue" />
            </div>
            <span className="quick-cat-label">Produtos</span>
          </button>

          <button
            type="button"
            className="quick-cat-btn"
            onClick={() => handleCategoryClick('servicos', 'mobile-servicos')}
            id="cat-servicos"
          >
            <div className="quick-cat-icon-box cat-box-green">
              <Scissors size={26} strokeWidth={2.1} className="cat-icon-green" />
            </div>
            <span className="quick-cat-label">Serviços</span>
          </button>

          <button
            type="button"
            className="quick-cat-btn"
            onClick={() => handleCategoryClick('adote', 'mobile-adocao')}
            id="cat-adote"
          >
            <div className="quick-cat-icon-box cat-box-pink">
              <HeartHandshake size={26} strokeWidth={2.1} className="cat-icon-pink" />
            </div>
            <span className="quick-cat-label">Adote</span>
          </button>

          <button
            type="button"
            className="quick-cat-btn"
            onClick={() => handleCategoryClick('apoie', 'mobile-apoie')}
            id="cat-apoie"
          >
            <div className="quick-cat-icon-box cat-box-amber">
              <HandHeart size={26} strokeWidth={2.1} className="cat-icon-amber" />
            </div>
            <span className="quick-cat-label">Apoie</span>
          </button>
        </nav>

        {/* Featured Products Section */}
        <section className="home-featured-section" aria-labelledby="featured-heading">
          <div className="home-section-header">
            <h2 id="featured-heading" className="home-section-title">
              Produtos em destaque
            </h2>
            <button
              type="button"
              className="home-view-all-btn"
              onClick={() => onNavigate('mobile-busca')}
            >
              Ver tudo
            </button>
          </div>

          <div className="home-products-grid">
            {products.map((p) => (
              <div
                key={p.id}
                className="home-product-card"
                onClick={() => handleProductClick(p.id)}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes de ${p.name}`}
              >
                <div className="product-media-wrapper">
                  <img src={p.imageUrl} alt={p.name} className="product-cover-img" />
                  <button
                    type="button"
                    className={`product-fav-pill ${p.isFavorite ? 'fav-active' : ''}`}
                    onClick={(e) => handleToggleFav(e, p.id, p.name)}
                    aria-label={`Favoritar ${p.name}`}
                  >
                    <Heart
                      size={16}
                      className="product-fav-icon"
                      strokeWidth={2.2}
                      fill={p.isFavorite ? '#ef4444' : 'none'}
                    />
                  </button>
                </div>

                <div className="product-card-body">
                  <h3 className="product-card-title">{p.name}</h3>
                  <div className="product-card-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-num">{p.rating.toFixed(1)}</span>
                  </div>
                  <div className="product-card-price">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offer Banner Section */}
        <section className="home-offers-section" aria-labelledby="offers-heading">
          <div className="home-section-header">
            <h2 id="offers-heading" className="home-section-title">
              Ofertas para seu pet
            </h2>
            <button
              type="button"
              className="home-view-all-btn"
              onClick={() => onNavigate('mobile-busca')}
            >
              Ver tudo
            </button>
          </div>

          <div
            className="home-offer-banner"
            onClick={() => onNavigate('mobile-busca')}
            role="button"
            tabIndex={0}
            aria-label="Ofertas 30% OFF Rações e Petiscos"
          >
            <div className="offer-info-col">
              <span className="offer-tag-badge">30% OFF</span>
              <h3 className="offer-banner-title">Rações &amp; Petiscos</h3>
              <p className="offer-banner-desc">Todo o setor com descontos especiais hoje</p>
            </div>
            <div className="offer-image-col">
              <img
                src="/images/banner-petiscos.png"
                alt="Filhote com petiscos"
                className="offer-dog-image"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Sticky Tab Navigation & Home Indicator */}
      <footer className="home-bottom-dock">
        <BottomNav activeTab="inicio" onTabChange={handleTabChange} />
        <HomeIndicator />
      </footer>
    </div>
  );
};
