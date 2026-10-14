import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import type { NavPageId, CategoryId } from './types';
import './App.css';

export function App() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlPage = searchParams.get('page') as NavPageId | null;

  const [currentPage, setCurrentPage] = useState<NavPageId>(urlPage || 'inicio');
  const [cartCount, setCartCount] = useState<number>(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const handleNavigate = (page: NavPageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page !== 'inicio') {
      const pageNames: Record<string, string> = {
        produtos: 'Catálogo de Produtos',
        servicos: 'Serviços Profissionais',
        adocao: 'Adoção de Pets',
        apoie: 'Apoie uma Causa',
        chat: 'Atendimento via Chat',
        favoritos: 'Meus Favoritos',
        perfil: 'Perfil do Tutor',
      };
      showToast(`Acessando: ${pageNames[page] || page}`);
    }
  };

  const handleSelectCategory = (catId: CategoryId) => {
    const map: Record<CategoryId, NavPageId> = {
      produtos: 'produtos',
      servicos: 'servicos',
      adote: 'adocao',
      apoie: 'apoie',
    };
    handleNavigate(map[catId]);
  };

  const handleBookService = (serviceId: string) => {
    showToast(`Solicitação de agendamento iniciada para o serviço (${serviceId})!`);
  };

  const handleSelectProduct = (productId: string) => {
    setCartCount((prev) => prev); // keep count reactive
    showToast(`Visualizando produto selecionado (${productId})`);
  };

  return (
    <div className="site-wrapper">
      {/* Desktop Sticky Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        favoritesCount={0}
      />

      {/* Main Content Area */}
      <main className="site-main" id="site-main-content">
        {currentPage === 'inicio' && (
          <HomePage
            onNavigate={handleNavigate}
            onNavigateToCategory={handleSelectCategory}
            onNavigateToProduct={handleSelectProduct}
            onBookService={handleBookService}
          />
        )}

        {currentPage !== 'inicio' && (
          <div className="placeholder-tab-view">
            <h2 className="placeholder-title">
              {currentPage === 'produtos' && 'Catálogo de Produtos'}
              {currentPage === 'servicos' && 'Serviços Profissionais'}
              {currentPage === 'adocao' && 'Adoção de Pets'}
              {currentPage === 'apoie' && 'Apoie uma Causa'}
              {currentPage === 'chat' && 'Chat de Atendimento'}
              {currentPage === 'favoritos' && 'Meus Favoritos'}
              {currentPage === 'perfil' && 'Perfil de Mariana'}
            </h2>
            <p className="placeholder-desc">
              Esta seção será implementada nas próximas etapas do plano incremental do PetConnect.
            </p>
            <button
              type="button"
              className="back-to-home-btn"
              onClick={() => handleNavigate('inicio')}
            >
              Voltar para a Página Inicial
            </button>
          </div>
        )}
      </main>

      {/* Desktop Slate Footer */}
      <Footer onNavigate={handleNavigate} />

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
