import React from 'react';
import type { AdoptionCampaignData } from '../../types';
import './AdoptionBannerCard.css';

interface AdoptionBannerCardProps {
  campaign: AdoptionCampaignData;
  onExplore?: () => void;
}

export const AdoptionBannerCard: React.FC<AdoptionBannerCardProps> = ({
  campaign,
  onExplore,
}) => {
  return (
    <section className="adoption-banner-section" aria-labelledby="adoption-campaign-heading">
      <div className="section-container">
        <div className="adoption-banner-card">
          {/* Left Media */}
          <div className="adoption-card-media">
            <img
              src={campaign.imageUrl}
              alt="Cão para adoção consciente"
              className="adoption-card-img"
              loading="lazy"
            />
          </div>

          {/* Right Content */}
          <div className="adoption-card-content">
            <span className="adoption-campaign-badge">{campaign.badge}</span>
            <h2 id="adoption-campaign-heading" className="adoption-campaign-title">
              {campaign.title}
            </h2>
            <p className="adoption-campaign-desc">{campaign.description}</p>
            <button
              type="button"
              className="adoption-cta-btn"
              onClick={onExplore}
            >
              {campaign.ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
