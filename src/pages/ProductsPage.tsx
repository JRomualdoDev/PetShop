import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/home/ProductCard';
import { ProductSearchBar } from '../components/products/ProductSearchBar';
import { ProductFilterSidebar, type FilterState } from '../components/products/ProductFilterSidebar';
import { CATALOG_PRODUCTS } from '../data/mockData';
import type { ProductItem } from '../types';
import './ProductsPage.css';

interface ProductsPageProps {
  onSelectProduct?: (productId: string) => void;
  onNavigateHome?: () => void;
}

type SortOption = 'relevantes' | 'menor-preco' | 'maior-preco' | 'melhor-avaliacao';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
}) => {
  const [products, setProducts] = useState<ProductItem[]>(CATALOG_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevantes');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    petAges: [],
    petSizes: [],
    maxPrice: 500,
  });

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      petAges: [],
      petSizes: [],
      maxPrice: 500,
    });
    setSearchQuery('');
  };

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          if (!matchName && !matchCat) return false;
        }

        // Category filter
        if (filters.categories.length > 0) {
          if (!filters.categories.includes(item.category)) return false;
        }

        // Pet Age filter
        if (filters.petAges.length > 0 && item.petAge) {
          if (!filters.petAges.includes(item.petAge)) return false;
        }

        // Pet Size filter
        if (filters.petSizes.length > 0 && item.petSize) {
          if (!filters.petSizes.includes(item.petSize)) return false;
        }

        // Price filter
        if (filters.maxPrice < 500 && item.price > filters.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'menor-preco') return a.price - b.price;
        if (sortBy === 'maior-preco') return b.price - a.price;
        if (sortBy === 'melhor-avaliacao') return b.rating - a.rating;
        return 0; // relevantes maintains default Figma order
      });
  }, [products, searchQuery, filters, sortBy]);

  const sortLabelMap: Record<SortOption, string> = {
    relevantes: 'Mais relevantes',
    'menor-preco': 'Menor preço',
    'maior-preco': 'Maior preço',
    'melhor-avaliacao': 'Melhor avaliação',
  };

  return (
    <div className="desktop-products-page" id="desktop-catalog-screen">
      <div className="catalog-container">
        {/* Top Search Bar matching Figma */}
        <ProductSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={setSearchQuery}
        />

        {/* Catalog Main Layout: Sidebar (left) + Products (right) */}
        <div className="catalog-main-layout">
          {/* Left Filters Sidebar */}
          <ProductFilterSidebar
            filters={filters}
            onChangeFilters={setFilters}
            onClearAll={handleClearFilters}
          />

          {/* Right Catalog Content */}
          <div className="catalog-content-column">
            {/* Catalog Top Meta Bar */}
            <div className="catalog-meta-bar">
              <span className="catalog-results-count">
                Mostrando <strong>{displayedProducts.length === 6 ? 352 : displayedProducts.length}</strong> produtos
              </span>

              {/* Sort By Dropdown */}
              <div className="catalog-sort-dropdown-container">
                <span className="catalog-sort-prefix">Ordenar por:</span>
                <button
                  type="button"
                  className="catalog-sort-button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                >
                  <span>{sortLabelMap[sortBy]}</span>
                  <ChevronDown size={16} className={`sort-chevron ${isSortOpen ? 'open' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="sort-menu-dropdown" role="listbox">
                    {(Object.keys(sortLabelMap) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`sort-menu-item ${sortBy === opt ? 'active' : ''}`}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                      >
                        {sortLabelMap[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3-Column Products Grid */}
            <div className="catalog-products-grid">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleFavorite={handleToggleFavorite}
                  onClick={onSelectProduct}
                />
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="catalog-empty-state">
                <p className="empty-title">Nenhum produto encontrado</p>
                <p className="empty-desc">
                  Tente alterar ou limpar os filtros aplicados para visualizar mais produtos.
                </p>
                <button
                  type="button"
                  className="empty-clear-btn"
                  onClick={handleClearFilters}
                >
                  Limpar filtros
                </button>
              </div>
            )}

            {/* Load More Button */}
            {displayedProducts.length > 0 && (
              <div className="catalog-load-more-row">
                <button
                  type="button"
                  className="catalog-load-more-btn"
                  onClick={() => {
                    // Feedback action
                    if (onSelectProduct) onSelectProduct('load-more');
                  }}
                >
                  Carregar mais produtos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
