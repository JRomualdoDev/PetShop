import React, { useState } from 'react';
import { ChevronLeft, Heart, Plus, Minus } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import type { NavPageId } from '../../types';
import './ProductDetailScreen.css';

interface ProductDetailScreenProps {
  onBack: () => void;
  onAddToCart?: (quantity: number) => void;
  onNavigate?: (page: NavPageId) => void;
  onShowToast?: (message: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  onBack,
  onAddToCart,
  onNavigate,
  onShowToast,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleToggleFav = () => {
    const nextFav = !isFavorite;
    setIsFavorite(nextFav);
    if (onShowToast) {
      onShowToast(
        nextFav
          ? '"Fonte de Água Bivolt" adicionada aos favoritos!'
          : '"Fonte de Água Bivolt" removida dos favoritos.'
      );
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
    } else if (onShowToast) {
      onShowToast(`${quantity}x "Fonte de Água Bivolt" adicionada ao carrinho!`);
    }
    if (onNavigate) {
      onNavigate('carrinho');
    }
  };

  return (
    <div className="mobile-product-detail-screen" id="mobile-product-detail-view">
      <StatusBar time="9:41" />

      {/* Top Header Navigation */}
      <header className="detail-top-nav">
        <button
          type="button"
          className="detail-nav-btn"
          onClick={onBack}
          aria-label="Voltar para a página anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <h1 className="detail-nav-title">Detalhes</h1>

        <button
          type="button"
          className={`detail-nav-btn ${isFavorite ? 'fav-active' : ''}`}
          onClick={handleToggleFav}
          aria-label="Favoritar produto"
        >
          <Heart
            size={20}
            strokeWidth={2.2}
            className="detail-heart-icon"
            fill={isFavorite ? '#ef4444' : 'none'}
          />
        </button>
      </header>

      {/* Scrollable Content */}
      <div className="detail-scroll-body">
        {/* Big Product Image */}
        <div className="detail-image-box">
          <img
            src="/images/fonte-agua-large.png"
            alt="Fonte de Água Bivolt"
            className="detail-product-hero-img"
          />
        </div>

        {/* Product Meta */}
        <section className="detail-info-section">
          <h2 className="detail-product-title">Fonte de Água Bivolt</h2>

          <div className="detail-rating-row">
            <span className="rating-star">★</span>
            <span className="rating-score">4.7</span>
            <span className="rating-count">(142 avaliações)</span>
          </div>

          <div className="detail-price-tag">R$ 89,90</div>

          {/* Description Section */}
          <div className="detail-description-block">
            <h3 className="detail-desc-title">Descrição</h3>
            <p className="detail-desc-text">
              Fonte de água automática com filtro de carvão ativado. Mantém a água do seu pet sempre fresca, limpa e oxigenada, estimulando um maior consumo de água diário para cães e gatos.
            </p>
          </div>

          {/* Technical Specs Box */}
          <div className="detail-specs-card">
            <div className="specs-line">
              <span className="specs-label">Capacidade</span>
              <span className="specs-val">2.5 Litros</span>
            </div>
            <div className="specs-line">
              <span className="specs-label">Material</span>
              <span className="specs-val">Plástico BPA-Free</span>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Action Dock */}
      <footer className="detail-action-dock">
        <div className="detail-action-row">
          {/* Stepper */}
          <div className="detail-qty-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="stepper-value">{quantity}</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            className="detail-add-cart-btn"
            onClick={handleAdd}
            id="mobile-add-cart-btn"
          >
            Adicionar ao carrinho
          </button>
        </div>

        <HomeIndicator />
      </footer>
    </div>
  );
};
