import React from 'react';
import { ShoppingBag, Scissors, HeartHandshake, Gift } from 'lucide-react';
import type { QuickCategoryItem, CategoryId } from '../../types';
import './QuickActionCards.css';

interface QuickActionCardsProps {
  categories: QuickCategoryItem[];
  onSelectCategory?: (id: CategoryId) => void;
}

export const QuickActionCards: React.FC<QuickActionCardsProps> = ({
  categories,
  onSelectCategory,
}) => {
  const getIcon = (name: QuickCategoryItem['iconName'], color: string) => {
    const props = { size: 22, color };
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag {...props} />;
      case 'Scissors':
        return <Scissors {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Gift':
        return <Gift {...props} />;
      default:
        return <ShoppingBag {...props} />;
    }
  };

  return (
    <section className="quick-actions-section" aria-labelledby="quick-actions-heading">
      <div className="section-container">
        <h2 id="quick-actions-heading" className="quick-actions-heading">
          O que você precisa hoje?
        </h2>

        <div className="quick-actions-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="quick-action-card"
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            >
              <div
                className="action-card-icon-box"
                style={{ backgroundColor: cat.bgLightColor }}
              >
                {getIcon(cat.iconName, cat.iconColor)}
              </div>
              <div className="action-card-text">
                <span className="action-card-title">{cat.label}</span>
                <span className="action-card-desc">{cat.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
