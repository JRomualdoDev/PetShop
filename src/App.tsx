import { useState, useMemo } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ALL_PRODUCTS } from './data/mockData';
import type { NavTabId, CategoryId, ProductItem } from './types';
import './App.css';

export function App() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlTab = searchParams.get('tab') as NavTabId | null;
  const urlProduct = searchParams.get('product');

  const [activeTab, setActiveTab] = useState<NavTabId>(urlTab || 'inicio');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(urlProduct);
  const [searchInitialCategory, setSearchInitialCategory] = useState<string>('Ração');
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string>('');
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return ALL_PRODUCTS.find((p) => p.id === selectedProductId) || ALL_PRODUCTS[3];
  }, [selectedProductId]);

  const handleSelectCategory = (catId: CategoryId) => {
    if (catId === 'produtos') {
      setSearchInitialCategory('Todos');
      setActiveTab('buscar');
      showToast('Abrindo catálogo de produtos');
    } else {
      const names: Record<CategoryId, string> = {
        produtos: 'Produtos',
        servicos: 'Serviços',
        adote: 'Adoção de Pets',
        apoie: 'Apoie uma Causa',
      };
      showToast(`Navegando para: ${names[catId]}`);
    }
  };

  const handleOpenProduct = (productId: string) => {
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetails = () => {
    setSelectedProductId(null);
  };

  const handleAddToCart = (product: ProductItem, quantity: number) => {
    setCartItemsCount((prev) => prev + quantity);
    showToast(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  const handleHeaderSearchSubmit = () => {
    setActiveTab('buscar');
    if (headerSearchQuery.trim()) {
      showToast(`Buscando por: "${headerSearchQuery}"`);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Real Responsive Desktop / Tablet / Mobile Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedProductId(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        searchQuery={headerSearchQuery}
        onSearchChange={setHeaderSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        cartCount={cartItemsCount}
        favoritesCount={0}
      />

      {/* Main Responsive Content */}
      <main className="site-main" id="site-main-content">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackFromDetails}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <HomePage
                onNavigateToCategory={handleSelectCategory}
                onNavigateToProduct={handleOpenProduct}
                onNavigateToSearch={() => {
                  setSearchInitialCategory('Ração');
                  setActiveTab('buscar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToOffers={() => {
                  setSearchInitialCategory('Ração');
                  setActiveTab('buscar');
                  showToast('Exibindo ofertas em rações e petiscos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'buscar' && (
              <SearchPage
                initialCategory={searchInitialCategory}
                onSelectProduct={handleOpenProduct}
              />
            )}

            {activeTab === 'favoritos' && (
              <div className="placeholder-tab-view">
                <h2 className="placeholder-title">Favoritos</h2>
                <p className="placeholder-desc">
                  Seus itens e pets favoritados aparecerão nesta aba.
                </p>
                <button
                  type="button"
                  className="back-to-home-btn"
                  onClick={() => setActiveTab('inicio')}
                >
                  Voltar para Início
                </button>
              </div>
            )}

            {activeTab === 'perfil' && (
              <div className="placeholder-tab-view">
                <h2 className="placeholder-title">Meu Perfil</h2>
                <p className="placeholder-desc">
                  Perfil e preferências do tutor João.
                </p>
                <button
                  type="button"
                  className="back-to-home-btn"
                  onClick={() => setActiveTab('inicio')}
                >
                  Voltar para Início
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation (Hidden on >= 768px via CSS) */}
      {!selectedProduct && (
        <div className="mobile-bottom-nav-holder">
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setSelectedProductId(null);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* Desktop & Tablet Footer (Hidden on < 768px via CSS) */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <aside className="app-toast-alert" role="status" aria-live="polite">
          {toastMessage}
        </aside>
      )}
    </div>
  );
}

export default App;
