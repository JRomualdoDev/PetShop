import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './ProductSearchBar.css';

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'O que você está procurando hoje? Ex: ração hipoalergênica, tapete higiênico, arranhador...',
}) => {
  const [localQuery, setLocalQuery] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);
    onChange(val);
  };

  return (
    <div className="product-search-bar-wrapper">
      <form className="product-search-bar-form" onSubmit={handleSubmit} role="search">
        <Search className="search-bar-leading-icon" size={22} strokeWidth={2.2} />
        <input
          type="text"
          className="search-bar-text-input"
          value={localQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          aria-label="Campo de busca de produtos"
        />
        <button type="submit" className="search-bar-submit-btn">
          Buscar
        </button>
      </form>
    </div>
  );
};
