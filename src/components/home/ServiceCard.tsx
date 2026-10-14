import React from 'react';
import { Star, MapPin } from 'lucide-react';
import type { ServiceItem } from '../../types';
import './ServiceCard.css';

interface ServiceCardProps {
  service: ServiceItem;
  onBook?: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <article className="desktop-service-card" id={`service-card-${service.id}`}>
      <div className="service-card-media">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="service-card-img"
          loading="lazy"
        />
      </div>

      <div className="service-card-body">
        {/* Category Badge & Rating */}
        <div className="service-header-row">
          <span className="service-category-badge">{service.categoryLabel}</span>
          <div className="service-rating-box">
            <Star size={14} className="star-icon" />
            <span className="rating-value">{service.rating.toFixed(1)}</span>
            <span className="reviews-count">({service.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="service-card-title">{service.name}</h3>

        {/* Distance */}
        <div className="service-distance-row">
          <MapPin size={15} className="map-pin-icon" />
          <span className="distance-text">{service.distance}</span>
        </div>

        <div className="service-card-divider" />

        {/* Bottom Actions */}
        <div className="service-card-footer-row">
          <span className="service-feature-tag">
            {service.isHomeService ? 'Atendimento domiciliar' : 'Atendimento no local'}
          </span>
          <button
            type="button"
            className="service-book-btn"
            onClick={() => onBook && onBook(service.id)}
          >
            {service.buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};
