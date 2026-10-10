import React, { useState } from 'react';
import { Heart, Star, Minus, Plus } from 'lucide-react';
import { TopBar } from '../components/common/TopBar';
import type { ProductItem } from '../types';
import './ProductDetailPage.css';

interface ProductDetailPageProps {
  product: ProductItem;
  onBack: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-detail-page" id="product-detail-view">
      {/* Top Header / Breadcrumb navigation */}
      <div className="product-detail-top-nav">
        <TopBar
          title="Detalhes do Produto"
          onBack={onBack}
          rightAction={
            <button
              type="button"
              className="top-bar-btn"
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                size={20}
                fill={isFavorite ? '#ff5252' : 'none'}
                stroke={isFavorite ? '#ff5252' : '#1e2229'}
                strokeWidth={2}
              />
            </button>
          }
        />
      </div>

      {/* Main Responsive Layout */}
      <div className="product-detail-container">
        <div className="product-detail-layout">
          {/* Left Column: Product Image Gallery */}
          <div className="product-detail-media-col">
            <div className="product-detail-hero">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-detail-hero-img"
              />
            </div>
          </div>

          {/* Right Column: Product Information & Buy Box */}
          <div className="product-detail-info-col">
            <div className="product-detail-header">
              <h2 className="product-detail-title">{product.name}</h2>

              <div className="product-detail-rating-row">
                <Star size={16} fill="#ffb800" stroke="#ffb800" className="rating-star" />
                <span className="rating-score-bold">{product.rating.toFixed(1)}</span>
                <span className="rating-count">
                  ({product.reviewsCount || 142} avaliações)
                </span>
              </div>

              <div className="product-detail-price">{formattedPrice}</div>
            </div>

            {/* Description Section */}
            <div className="product-detail-section">
              <h3 className="section-subtitle">Descrição</h3>
              <p className="product-detail-text">
                {product.description ||
                  'Fonte de água automática com filtro de carvão ativado. Mantém a água do seu pet sempre fresca, limpa e oxigenada, estimulando um maior consumo de água diário para cães e gatos.'}
              </p>
            </div>

            {/* Specifications Card */}
            {product.specs && (
              <div className="product-specs-card">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Desktop / Tablet In-Page Buy Box */}
            <div className="product-detail-desktop-buybox">
              <div className="quantity-selector">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={handleDecrease}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>
                <span className="quantity-number">{quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={handleIncrease}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>

              <button
                type="button"
                className="add-to-cart-cta-btn"
                onClick={() => onAddToCart(product, quantity)}
                id="btn-add-to-cart-desktop"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Hidden on >= 768px via CSS) */}
      <div className="product-detail-bottom-bar">
        <div className="quantity-selector">
          <button
            type="button"
            className="quantity-btn"
            onClick={handleDecrease}
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>
          <span className="quantity-number">{quantity}</span>
          <button
            type="button"
            className="quantity-btn"
            onClick={handleIncrease}
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>

        <button
          type="button"
          className="add-to-cart-cta-btn"
          onClick={() => onAddToCart(product, quantity)}
          id="btn-add-to-cart-mobile"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};
