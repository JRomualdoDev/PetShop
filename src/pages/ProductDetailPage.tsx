import React, { useState } from 'react';
import { ChevronLeft, Star, Minus, Plus } from 'lucide-react';
import { ProductCard } from '../components/home/ProductCard';
import { HOME_FEATURED_PRODUCTS, CATALOG_PRODUCTS } from '../data/mockData';
import type { ProductItem } from '../types';
import './ProductDetailPage.css';

interface ProductDetailPageProps {
  product?: ProductItem;
  onBack: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onSelectProduct?: (productId: string) => void;
}

type TabKey = 'especificacoes' | 'niveis' | 'guia';

const DEFAULT_DETAIL_IMAGES = [
  '/images/desktop/prod-detail-main.png',
  '/images/desktop/prod-detail-thumb-2.png',
  '/images/desktop/prod-detail-thumb-3.png',
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product: initialProduct,
  onBack,
  onAddToCart,
  onSelectProduct,
}) => {
  // Fallback to primary product matching Figma
  const product = initialProduct || CATALOG_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(
    '/images/desktop/prod-detail-main.png'
  );
  const [selectedThumbIndex, setSelectedThumbIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabKey>('especificacoes');

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const installmentPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price / 10);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleThumbClick = (index: number, imgSrc: string) => {
    setSelectedThumbIndex(index);
    setSelectedImage(imgSrc);
  };

  // 4 related products for "Quem viu este produto também comprou"
  const relatedProducts = HOME_FEATURED_PRODUCTS;

  return (
    <div className="desktop-product-detail-page" id="desktop-product-detail-screen">
      <div className="product-detail-container">
        {/* Breadcrumb / Back Link */}
        <nav className="detail-breadcrumb-nav" aria-label="Navegação de retorno">
          <button
            type="button"
            className="detail-back-link-btn"
            onClick={onBack}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>Voltar para {product.category || 'Produtos'}</span>
          </button>
        </nav>

        {/* Top Product Section: Left Gallery + Right Buy Box */}
        <div className="product-main-showcase">
          {/* Left Column: Image Gallery */}
          <div className="showcase-gallery-column">
            <div className="main-image-display">
              <img
                src={selectedImage}
                alt={product.name}
                className="main-product-img"
              />
            </div>

            {/* Thumbnails row */}
            <div className="gallery-thumbnails-row">
              {DEFAULT_DETAIL_IMAGES.map((imgSrc, idx) => {
                const isSelected = selectedThumbIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-thumb-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleThumbClick(idx, imgSrc)}
                    aria-label={`Ver imagem ${idx + 1} de ${product.name}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Miniatura ${idx + 1}`}
                      className="thumb-img"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="showcase-details-column">
            {/* Category Pill Badge */}
            <div className="detail-category-badge-wrapper">
              <span className="detail-category-badge">
                {product.category === 'Rações' ? 'Ração Premium' : product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="detail-product-title">
              {product.id === 'racao-premium-caes-15kg'
                ? 'Ração Premium Cães Adultos Sabores Selecionados 15kg'
                : product.name}
            </h1>

            {/* Rating row */}
            <div className="detail-rating-row">
              <Star size={18} className="detail-star-icon" />
              <span className="detail-rating-score">{product.rating.toFixed(1)}</span>
              <span className="detail-reviews-text">
                ({product.reviewsCount || 120} avaliações de clientes)
              </span>
            </div>

            {/* Price Box */}
            <div className="detail-price-box">
              <div className="detail-main-price">{formattedPrice}</div>
              <div className="detail-installments-text">
                Ou em até 10x de {installmentPrice} sem juros no cartão de crédito.
              </div>
            </div>

            {/* Description */}
            <p className="detail-description-paragraph">
              {product.description ||
                'Formulada cientificamente para cães adultos de porte médio a grande. Contém proteínas selecionadas de alta digestibilidade, antioxidantes naturais para suporte imunológico e ômega 3 e 6 para uma pelagem brilhante e saudável. Sem corantes artificiais.'}
            </p>

            {/* Action Row: Quantity + Add to Cart */}
            <div className="detail-action-row">
              <div className="detail-quantity-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleDecrease}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleIncrease}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>

              <button
                type="button"
                className="detail-add-cart-btn"
                onClick={() => onAddToCart(product, quantity)}
                id="btn-add-to-cart-detail"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <section className="product-tabs-card" aria-label="Informações detalhadas do produto">
          <div className="tabs-header-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'especificacoes'}
              className={`tab-nav-btn ${activeTab === 'especificacoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('especificacoes')}
            >
              Especificações
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'niveis'}
              className={`tab-nav-btn ${activeTab === 'niveis' ? 'active' : ''}`}
              onClick={() => setActiveTab('niveis')}
            >
              Níveis de Garantia
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'guia'}
              className={`tab-nav-btn ${activeTab === 'guia' ? 'active' : ''}`}
              onClick={() => setActiveTab('guia')}
            >
              Guia Alimentar
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content-panel">
            {activeTab === 'especificacoes' && (
              <div className="specs-table-view">
                <div className="spec-item-row">
                  <span className="spec-key">Peso da Embalagem</span>
                  <span className="spec-val">15 kg</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Idade Recomendada</span>
                  <span className="spec-val">Cães Adultos de 1 a 7 anos</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Porte</span>
                  <span className="spec-val">Médio, Grande, Gigante</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Sabor</span>
                  <span className="spec-val">Frango, Arroz e Vegetais selecionados</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Marca</span>
                  <span className="spec-val">PetConnect BioCuidado</span>
                </div>
              </div>
            )}

            {activeTab === 'niveis' && (
              <div className="specs-table-view">
                <div className="spec-item-row">
                  <span className="spec-key">Proteína Bruta (mín.)</span>
                  <span className="spec-val">260 g/kg (26%)</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Extrato Etéreo / Gorduras (mín.)</span>
                  <span className="spec-val">140 g/kg (14%)</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Matéria Fibrosa (máx.)</span>
                  <span className="spec-val">35 g/kg (3.5%)</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Cálcio (mín./máx.)</span>
                  <span className="spec-val">10 g/kg - 16 g/kg</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Fósforo (mín.)</span>
                  <span className="spec-val">9.000 mg/kg</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Ômega 3 e 6 (mín.)</span>
                  <span className="spec-val">3.000 mg/kg / 25 g/kg</span>
                </div>
              </div>
            )}

            {activeTab === 'guia' && (
              <div className="specs-table-view">
                <div className="spec-item-row">
                  <span className="spec-key">Cães de Porte Médio (10kg a 15kg)</span>
                  <span className="spec-val">160g a 220g por dia</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Cães de Porte Grande (15kg a 25kg)</span>
                  <span className="spec-val">220g a 315g por dia</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Cães Grandes a Gigantes (25kg a 45kg)</span>
                  <span className="spec-val">315g a 485g por dia</span>
                </div>
                <div className="spec-item-row">
                  <span className="spec-key">Cães Gigantes (acima de 45kg)</span>
                  <span className="spec-val">485g + 45g a cada 5kg adicionais</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Section */}
        <section className="detail-related-section" aria-label="Produtos relacionados">
          <h2 className="related-section-title">
            Quem viu este produto também comprou
          </h2>

          <div className="related-products-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onClick={onSelectProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
