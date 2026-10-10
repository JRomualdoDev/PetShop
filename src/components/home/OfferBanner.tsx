import React from 'react';
import type { OfferBannerData } from '../../types';
import './OfferBanner.css';

interface OfferBannerProps {
  banner: OfferBannerData;
  onClick?: () => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ banner, onClick }) => {
  return (
    <div
      className="offer-banner"
      onClick={onClick}
      role="button"
      tabIndex={0}
      id="promo-banner-racoes"
    >
      <div className="offer-banner-content">
        <span className="offer-discount-badge">{banner.discountBadge}</span>
        <h3 className="offer-banner-title">{banner.title}</h3>
        <p className="offer-banner-desc">{banner.description}</p>
      </div>

      <div className="offer-banner-image-box">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="offer-banner-img"
        />
      </div>
    </div>
  );
};
