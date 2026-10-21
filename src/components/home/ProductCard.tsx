import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import type { ProductItem } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductItem;
  onToggleFavorite?: (id: string) => void;
  onClick?: (productId: string) => void;
  onAddToCart?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
  onClick,
  onAddToCart,
}) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <article className="desktop-product-card" id={`product-card-${product.id}`}>
      {/* Top Image Container with Favorite Action */}
      <div className="product-card-media" onClick={() => onClick && onClick(product.id)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
        <button
          type="button"
          className={`product-card-favorite-btn ${product.isFavorite ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(product.id);
          }}
          aria-label={product.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            size={18}
            className={`heart-icon ${product.isFavorite ? 'filled' : ''}`}
          />
        </button>
      </div>

      {/* Card Info Body */}
      <div className="product-card-body">
        {/* Rating */}
        <div className="product-rating-row">
          <Star size={14} className="star-icon" />
          <span className="rating-value">{product.rating.toFixed(1)}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Title */}
        <h3
          className="product-card-title"
          onClick={() => onClick && onClick(product.id)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Price & Action Row */}
        <div className="product-card-bottom-row">
          <span className="product-card-price">{formattedPrice}</span>
          <div className="product-card-actions">
            {onAddToCart && (
              <button
                type="button"
                className="product-card-add-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                title="Adicionar ao carrinho"
                aria-label={`Adicionar ${product.name} ao carrinho`}
              >
                <ShoppingBag size={15} />
              </button>
            )}
            <button
              type="button"
              className="product-card-cta-btn"
              onClick={() => onClick && onClick(product.id)}
            >
              Ver produto
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
