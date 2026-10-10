import React from 'react';
import type { CategoryItem, CategoryId } from '../../types';
import './CategoryGrid.css';

interface CategoryGridProps {
  categories: CategoryItem[];
  onSelectCategory?: (id: CategoryId) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="category-grid-wrapper">
      <div className="category-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="category-card"
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            id={`category-${cat.id}`}
          >
            <div
              className="category-icon-box"
              style={{ backgroundColor: cat.bgColor }}
            >
              <img
                src={cat.iconSrc}
                alt={cat.label}
                className="category-icon-img"
              />
            </div>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
