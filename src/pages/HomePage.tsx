import React, { useState } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { QuickActionCards } from '../components/home/QuickActionCards';
import { SectionHeader } from '../components/home/SectionHeader';
import { ProductCard } from '../components/home/ProductCard';
import { ServiceCard } from '../components/home/ServiceCard';
import { AdoptionBannerCard } from '../components/home/AdoptionBannerCard';
import {
  QUICK_CATEGORIES,
  HOME_FEATURED_PRODUCTS,
  HOME_SERVICES,
  ADOPTION_CAMPAIGN,
} from '../data/mockData';
import type { CategoryId, ProductItem, NavPageId } from '../types';
import './HomePage.css';

interface HomePageProps {
  onNavigate?: (page: NavPageId) => void;
  onNavigateToCategory?: (category: CategoryId) => void;
  onNavigateToProduct?: (productId: string) => void;
  onBookService?: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onNavigateToCategory,
  onNavigateToProduct,
  onBookService,
}) => {
  const [products, setProducts] = useState<ProductItem[]>(HOME_FEATURED_PRODUCTS);

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleCategoryClick = (catId: CategoryId) => {
    if (onNavigateToCategory) {
      onNavigateToCategory(catId);
    } else if (onNavigate) {
      if (catId === 'produtos') onNavigate('produtos');
      else if (catId === 'servicos') onNavigate('servicos');
      else if (catId === 'adote') onNavigate('adocao');
      else if (catId === 'apoie') onNavigate('apoie');
    }
  };

  return (
    <div className="desktop-home-page" id="desktop-home-view">
      {/* 1. Hero Banner */}
      <HeroBanner
        onCtaClick={() => onNavigate && onNavigate('produtos')}
      />

      {/* 2. Quick Action Category Cards */}
      <QuickActionCards
        categories={QUICK_CATEGORIES}
        onSelectCategory={handleCategoryClick}
      />

      {/* 3. Featured Products Section */}
      <section className="home-section products-section" aria-labelledby="featured-products-heading">
        <div className="section-container">
          <SectionHeader
            title="Produtos em destaque"
            actionText="Ver todos os produtos"
            onActionClick={() => onNavigate && onNavigate('produtos')}
          />
          <div className="products-grid-row">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleFavorite={handleToggleFavorite}
                onClick={onNavigateToProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Nearby Section */}
      <section className="home-section services-section" aria-labelledby="services-nearby-heading">
        <div className="section-container">
          <SectionHeader
            title="Serviços próximos de você"
            actionText="Ver no mapa"
            onActionClick={() => onNavigate && onNavigate('servicos')}
          />
          <div className="services-grid-row">
            {HOME_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={onBookService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Adoption Campaign Banner Card */}
      <AdoptionBannerCard
        campaign={ADOPTION_CAMPAIGN}
        onExplore={() => onNavigate && onNavigate('adocao')}
      />
    </div>
  );
};
