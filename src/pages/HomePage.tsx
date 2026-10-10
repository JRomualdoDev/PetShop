import React, { useState } from 'react';
import { GreetingHeader } from '../components/home/GreetingHeader';
import { SearchBar } from '../components/home/SearchBar';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { SectionHeader } from '../components/home/SectionHeader';
import { ProductCard } from '../components/home/ProductCard';
import { OfferBanner } from '../components/home/OfferBanner';
import { CATEGORIES, FEATURED_PRODUCTS, OFFER_BANNER } from '../data/mockData';
import type { CategoryId, ProductItem } from '../types';
import './HomePage.css';

interface HomePageProps {
  onNavigateToCategory?: (category: CategoryId) => void;
  onNavigateToProduct?: (productId: string) => void;
  onNavigateToSearch?: () => void;
  onNavigateToOffers?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToCategory,
  onNavigateToProduct,
  onNavigateToSearch,
  onNavigateToOffers,
}) => {
  const [products, setProducts] = useState<ProductItem[]>(FEATURED_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  return (
    <div className="home-page-content" id="home-screen-view">
      {/* Top Greeting */}
      <GreetingHeader userName="João" />

      {/* Search Input Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={() => onNavigateToSearch && onNavigateToSearch()}
      />

      {/* Category Shortcut Grid */}
      <CategoryGrid
        categories={CATEGORIES}
        onSelectCategory={onNavigateToCategory}
      />

      {/* Featured Products Section */}
      <section className="home-section" aria-labelledby="featured-products-heading">
        <SectionHeader
          title="Produtos em destaque"
          actionText="Ver tudo"
          onActionClick={onNavigateToSearch}
        />
        <div className="products-horizontal-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
              onClick={onNavigateToProduct}
            />
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="home-section offers-section" aria-labelledby="offers-heading">
        <SectionHeader
          title="Ofertas para seu pet"
          actionText="Ver tudo"
          onActionClick={onNavigateToOffers}
        />
        <div className="offer-banner-wrapper">
          <OfferBanner
            banner={OFFER_BANNER}
            onClick={onNavigateToOffers}
          />
        </div>
      </section>
    </div>
  );
};
