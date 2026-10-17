import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import './FeedbackPage.css';

interface FeedbackPageProps {
  onShowToast?: (message: string) => void;
  onNavigateHome?: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onShowToast }) => {
  const [rating, setRating] = useState<number>(3);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessBanner(true);
      if (onShowToast) {
        onShowToast('Obrigado pelo seu feedback! Sua avaliação foi registrada.');
      }
    }, 400);
  };

  const effectiveRating = hoverRating || rating;

  return (
    <div className="desktop-feedback-page" id="feedback-page-view">
      <div className="feedback-card-container">
        {/* Header */}
        <h1 className="feedback-card-title">Como foi sua experiência?</h1>
        <p className="feedback-card-subtitle">
          Sua opinião é fundamental para melhorarmos a nossa plataforma.
        </p>

        {/* 5-Star Rating Selector */}
        <div
          className="feedback-stars-row"
          role="radiogroup"
          aria-label="Avaliação em estrelas de 1 a 5"
        >
          {[1, 2, 3, 4, 5].map((starValue) => {
            const isFilled = starValue <= effectiveRating;
            return (
              <button
                key={starValue}
                type="button"
                className={`feedback-star-btn ${isFilled ? 'is-filled' : 'is-empty'}`}
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                onMouseLeave={handleMouseLeave}
                aria-label={`${starValue} de 5 estrelas`}
                role="radio"
                aria-checked={rating === starValue}
              >
                <Star
                  size={32}
                  className={`star-svg-icon ${isFilled ? 'fill-gold' : 'stroke-muted'}`}
                  strokeWidth={isFilled ? 1.5 : 1.8}
                />
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="feedback-form">
          <label htmlFor="feedback-comment-input" className="feedback-label">
            Seu comentário
          </label>
          <textarea
            id="feedback-comment-input"
            className="feedback-textarea"
            placeholder="Digite seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            className="feedback-submit-btn"
            id="btn-submit-feedback"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar feedback'}
          </button>
        </form>

        {/* Divider & Feedback Alert Banner */}
        <div className="feedback-divider" />

        {showSuccessBanner && (
          <div className="feedback-success-banner" role="status" aria-live="polite">
            <CheckCircle2 size={18} className="feedback-success-icon" />
            <span className="feedback-success-text">Obrigado pelo seu feedback! ❤</span>
          </div>
        )}
      </div>
    </div>
  );
};
