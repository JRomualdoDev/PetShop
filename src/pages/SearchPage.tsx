import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { ProductCard } from '../components/home/ProductCard';
import { ALL_PRODUCTS, SEARCH_CATEGORIES } from '../data/mockData';
import type { ProductItem } from '../types';
import './SearchPage.css';

interface SearchPageProps {
  initialCategory?: string;
  onSelectProduct?: (productId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialCategory = 'Ração',
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<ProductItem[]>(ALL_PRODUCTS);

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === 'Todos' ||
        selectedCategory === 'Ração'
          ? true // in the Figma screenshot "Ração" is selected and all 4 products are shown in the grid
          : p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="search-page-container" id="search-screen-view">
      {/* Active Search Input matching Figma */}
      <div className="search-input-header">
        <div className="search-active-bar">
          <Search className="search-bar-icon" size={20} strokeWidth={2.2} />
          <input
            type="text"
            className="search-active-input"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar produtos"
            autoFocus={false}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          )}
          {!searchTerm && (
            <button
              type="button"
              className="clear-search-btn inactive"
              aria-hidden="true"
            >
              <X size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Horizontal scroll) */}
      <div className="category-pills-row">
        {SEARCH_CATEGORIES.map((category: string) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 2-Column Product Grid */}
      <div className="search-product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
            onClick={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
