import React from 'react';
import './HeroBanner.css';

interface HeroBannerProps {
  onCtaClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onCtaClick }) => {
  return (
    <section className="hero-banner-section" aria-label="Banner de Destaque">
      <div className="hero-banner-container">
        <div className="hero-banner-content">
          <h1 className="hero-banner-title">
            Tudo para cuidar melhor do seu pet
          </h1>
          <p className="hero-banner-description">
            Encontre rações premium, acessórios exclusivos, clínicas veterinárias de confiança e serviços de estética pet pertinho de você.
          </p>
          <button
            type="button"
            className="hero-banner-cta-btn"
            onClick={onCtaClick}
          >
            Explorar agora
          </button>
        </div>
      </div>
    </section>
  );
};
