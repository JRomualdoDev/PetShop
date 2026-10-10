import React from 'react';
import { Star, Heart } from 'lucide-react';
import type { ProductItem } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductItem;
  onToggleFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
  onClick,
}) => {
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <article
      className="product-card"
      onClick={() => onClick && onClick(product.id)}
      id={`product-card-${product.id}`}
    >
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <button
          type="button"
          className={`favorite-btn ${product.isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(product.id);
          }}
          aria-label={product.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            size={16}
            className="favorite-heart-icon"
            fill={product.isFavorite ? '#ff5252' : 'none'}
            stroke={product.isFavorite ? '#ff5252' : '#9ca3af'}
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <Star size={13} fill="#ffb800" stroke="#ffb800" className="rating-star" />
          <span className="rating-score">{product.rating.toFixed(1)}</span>
        </div>

        <div className="product-price">{formattedPrice}</div>
      </div>
    </article>
  );
};
