import React from 'react';
import { Check } from 'lucide-react';
import './ProductFilterSidebar.css';

export interface FilterState {
  categories: string[];
  petAges: string[];
  petSizes: string[];
  maxPrice: number;
}

interface ProductFilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onClearAll: () => void;
}

const CATEGORY_OPTIONS = [
  { id: 'Rações', label: 'Rações', count: 142 },
  { id: 'Brinquedos', label: 'Brinquedos', count: 84 },
  { id: 'Acessórios', label: 'Acessórios', count: 56 },
  { id: 'Higiene', label: 'Higiene', count: 29 },
  { id: 'Farmácia', label: 'Farmácia', count: 41 },
];

const AGE_OPTIONS = ['Filhote', 'Adulto', 'Sênior'];
const SIZE_OPTIONS = ['Pequeno', 'Médio', 'Grande'];

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onClearAll,
}) => {
  const toggleCategory = (catId: string) => {
    const next = filters.categories.includes(catId)
      ? filters.categories.filter((c) => c !== catId)
      : [...filters.categories, catId];
    onChangeFilters({ ...filters, categories: next });
  };

  const toggleAge = (age: string) => {
    const next = filters.petAges.includes(age)
      ? filters.petAges.filter((a) => a !== age)
      : [...filters.petAges, age];
    onChangeFilters({ ...filters, petAges: next });
  };

  const toggleSize = (size: string) => {
    const next = filters.petSizes.includes(size)
      ? filters.petSizes.filter((s) => s !== size)
      : [...filters.petSizes, size];
    onChangeFilters({ ...filters, petSizes: next });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilters({ ...filters, maxPrice: Number(e.target.value) });
  };

  return (
    <aside className="product-filter-sidebar" aria-label="Filtros de Produtos">
      {/* Sidebar Header */}
      <div className="filter-sidebar-header">
        <h2 className="filter-sidebar-title">Filtros</h2>
        <button
          type="button"
          className="filter-clear-all-btn"
          onClick={onClearAll}
        >
          Limpar todos
        </button>
      </div>

      <div className="filter-divider" />

      {/* Categorias */}
      <section className="filter-group-section">
        <h3 className="filter-group-heading">CATEGORIAS</h3>
        <div className="filter-options-list">
          {CATEGORY_OPTIONS.map((cat) => {
            const isChecked = filters.categories.includes(cat.id);
            return (
              <label key={cat.id} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.id)}
                  className="filter-hidden-checkbox"
                />
                <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="filter-label-text">
                  {cat.label} ({cat.count})
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Idade do Pet */}
      <section className="filter-group-section">
        <h3 className="filter-group-heading">IDADE DO PET</h3>
        <div className="filter-options-list">
          {AGE_OPTIONS.map((age) => {
            const isChecked = filters.petAges.includes(age);
            return (
              <label key={age} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAge(age)}
                  className="filter-hidden-checkbox"
                />
                <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="filter-label-text">{age}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Porte do Pet */}
      <section className="filter-group-section">
        <h3 className="filter-group-heading">PORTE DO PET</h3>
        <div className="filter-options-list">
          {SIZE_OPTIONS.map((size) => {
            const isChecked = filters.petSizes.includes(size);
            return (
              <label key={size} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSize(size)}
                  className="filter-hidden-checkbox"
                />
                <span className={`filter-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="filter-label-text">{size}</span>
              </label>
            );
          })}
        </div>
      </section>

      <div className="filter-divider" />

      {/* Preço */}
      <section className="filter-group-section price-section">
        <h3 className="filter-group-heading">PREÇO</h3>
        <div className="filter-price-slider-container">
          <div className="slider-track-bg" />
          <div
            className="slider-track-active"
            style={{ width: `${Math.min(100, (filters.maxPrice / 500) * 100)}%` }}
          />
          <div className="slider-handle-left" />
          <div
            className="slider-handle-right"
            style={{ left: `calc(${Math.min(100, (filters.maxPrice / 500) * 100)}% - 8px)` }}
          />
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="filter-price-range-input"
            aria-label="Filtro de preço máximo"
          />
        </div>
        <div className="filter-price-labels-row">
          <span className="price-label-text">R$ 0,00</span>
          <span className="price-label-text">R$ 500,00+</span>
        </div>
      </section>
    </aside>
  );
};
