import React from 'react';
import { ArrowRight } from 'lucide-react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  showArrow?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionClick,
  showArrow = true,
}) => {
  return (
    <div className="desktop-section-header">
      <h2 className="section-title">{title}</h2>
      {actionText && (
        <button
          type="button"
          className="section-action-link"
          onClick={onActionClick}
        >
          <span>{actionText}</span>
          {showArrow && <ArrowRight size={16} className="action-arrow-icon" />}
        </button>
      )}
    </div>
  );
};
