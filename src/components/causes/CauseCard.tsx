import React from 'react';
import type { CauseItem } from '../../types';
import './CauseCard.css';

interface CauseCardProps {
  cause: CauseItem;
  onDonate: (cause: CauseItem) => void;
  onShare?: (cause: CauseItem) => void;
}

export const CauseCard: React.FC<CauseCardProps> = ({ cause, onDonate }) => {
  const percentage = Math.min(
    100,
    Math.round((cause.currentAmount / cause.targetAmount) * 100)
  );

  return (
    <article className="desktop-cause-card" id={`cause-card-${cause.id}`}>
      {/* Top Image Media */}
      <div className="cause-card-media">
        <img
          src={cause.imageUrl}
          alt={cause.title}
          className="cause-card-img"
          loading="lazy"
        />
      </div>

      {/* Card Content Body */}
      <div className="cause-card-body">
        <span className="cause-card-org">{cause.organization}</span>
        <h3 className="cause-card-title">{cause.title}</h3>
        <p className="cause-card-description">{cause.description}</p>

        {/* Progress Metrics & Bar */}
        <div className="cause-progress-wrapper">
          <div className="cause-progress-labels">
            <span className="cause-current-amount">
              R$ {cause.currentAmount} arrecadados
            </span>
            <span className="cause-target-amount">
              Meta: R$ {cause.targetAmount}
            </span>
          </div>

          <div
            className="cause-progress-track"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso da arrecadação: ${percentage}%`}
          >
            <div
              className="cause-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <span className="cause-progress-sub">{percentage}% arrecadado</span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="cause-card-btn"
          id={`btn-apoiar-${cause.id}`}
          onClick={() => onDonate(cause)}
        >
          Apoiar Causa
        </button>
      </div>
    </article>
  );
};
