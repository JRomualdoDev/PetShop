import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  value?: string;
  onChange?: (val: string) => void;
  onSubmit?: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Buscar produtos, serviços ou animais',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          aria-label="Campo de busca"
        />
      </form>
    </div>
  );
};
