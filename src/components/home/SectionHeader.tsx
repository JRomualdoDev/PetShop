import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText = 'Ver tudo',
  onActionClick,
}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {actionText && (
        <button
          type="button"
          className="section-action-link"
          onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
