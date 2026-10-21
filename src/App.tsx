import { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { AdoptionPage } from './pages/AdoptionPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { CausesPage } from './pages/CausesPage';
import { ChatPage } from './pages/ChatPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SplashScreen } from './pages/mobile/SplashScreen';
import { OnboardingScreen } from './pages/mobile/OnboardingScreen';
import { CartPage } from './pages/CartPage';
import { CheckoutScreen } from './pages/mobile/CheckoutScreen';
import { OrderConfirmationScreen } from './pages/mobile/OrderConfirmationScreen';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HomeScreen } from './pages/mobile/HomeScreen';
import { SearchScreen } from './pages/mobile/SearchScreen';
import { ProductDetailScreen as MobileProductDetailScreen } from './pages/mobile/ProductDetailScreen';
import { TutorProfilePage } from './pages/TutorProfilePage';
import { CATALOG_PRODUCTS, ADOPTION_PETS, INITIAL_CART_ITEMS } from './data/mockData';
import type { NavPageId, CategoryId, ProductItem, PetItem, CartItem } from './types';
import './App.css';

export function App() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlPage = searchParams.get('page') as NavPageId | null;

  const [currentPage, setCurrentPage] = useState<NavPageId>(urlPage || 'inicio');
  const [selectedProductId, setSelectedProductId] = useState<string>('racao-premium-caes-15kg');
  const [selectedPetId, setSelectedPetId] = useState<string>('luna');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('dr-gustavo-silva');

  // Shared Cart State with persistent localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('petconnect_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return INITIAL_CART_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('petconnect_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<string>('Mariana');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Você encerrou sua sessão na PetConnect.');
  };

  const handleNavigate = (page: NavPageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page !== 'inicio') {
      const pageNames: Record<string, string> = {
        produtos: 'Catálogo de Produtos',
        'detalhes-produto': 'Detalhes do Produto',
        servicos: 'Serviços Profissionais',
        'detalhes-servico': 'Detalhes do Serviço',
        adocao: 'Adoção de Pets',
        'detalhes-animal': 'Detalhes do Animal',
        apoie: 'Apoie uma Causa',
        chat: 'Atendimento via Chat',
        feedback: 'Feedback e Avaliação',
        login: 'Entrar na Conta',
        cadastro: 'Criar Conta',
        splash: 'Tela de Abertura (Splash)',
        onboarding: 'Boas-vindas (Onboarding)',
        carrinho: 'Meu Carrinho',
        checkout: 'Finalizar Compra',
        'pedido-confirmado': 'Pedido Confirmado',
        'mobile-home': 'Início Mobile',
        'mobile-busca': 'Busca Mobile',
        'mobile-detalhes-produto': 'Detalhes do Produto Mobile',
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
    setSelectedServiceId(serviceId);
    handleNavigate('detalhes-servico');
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    handleNavigate('detalhes-produto');
  };

  const handleAddToCart = (product: ProductItem | CartItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrl,
        };
        return [...prev, newItem];
      }
    });
    showToast(`${quantity}x "${product.name}" adicionado ao carrinho com sucesso!`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string, name: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`"${name}" removido do carrinho.`);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddMultipleToCart = (itemsToAdd: CartItem[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      for (const item of itemsToAdd) {
        const existingIndex = updated.findIndex((it) => it.id === item.id || it.name === item.name);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
        } else {
          updated.push(item);
        }
      }
      return updated;
    });
  };

  const handleAdoptRequest = (pet: PetItem) => {
    showToast(`Solicitação de adoção para ${pet.name} registrada com sucesso!`);
  };

  const handleSelectPet = (petId: string) => {
    setSelectedPetId(petId);
    handleNavigate('detalhes-animal');
  };

  const currentSelectedProduct =
    CATALOG_PRODUCTS.find((p) => p.id === selectedProductId) || CATALOG_PRODUCTS[0];

  const currentSelectedPet =
    ADOPTION_PETS.find((p) => p.id === selectedPetId) ||
    ADOPTION_PETS.find((p) => p.id === 'luna') ||
    ADOPTION_PETS[0];

  const isStandalonePage =
    currentPage === 'login' ||
    currentPage === 'cadastro' ||
    currentPage === 'splash' ||
    currentPage === 'onboarding' ||
    currentPage === 'checkout' ||
    currentPage === 'pedido-confirmado' ||
    currentPage.startsWith('mobile-');

  return (
    <div className={`site-wrapper ${isStandalonePage ? 'auth-mode' : ''}`}>
      {/* Desktop Sticky Header (hidden on standalone mobile/auth screens) */}
      {!isStandalonePage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          cartCount={cartCount}
          favoritesCount={0}
          isLoggedIn={isLoggedIn}
          userName={currentUserName}
        />
      )}

      {/* Main Content Area */}
      <main className="site-main" id="site-main-content">
        {currentPage === 'inicio' && (
          <HomePage
            onNavigate={handleNavigate}
            onNavigateToCategory={handleSelectCategory}
            onNavigateToProduct={handleSelectProduct}
            onBookService={handleBookService}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'produtos' && (
          <ProductsPage
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate('inicio')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'detalhes-produto' && (
          <ProductDetailPage
            product={currentSelectedProduct}
            onBack={() => handleNavigate('produtos')}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'servicos' && (
          <ServicesPage onBookService={handleBookService} />
        )}

        {currentPage === 'detalhes-servico' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onBack={() => handleNavigate('servicos')}
            onChat={() => handleNavigate('chat')}
            onNavigate={handleNavigate}
            onRequestService={(info) => {
              showToast(`Agendamento de ${info.procedureName} confirmado com sucesso!`);
            }}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'adocao' && (
          <AdoptionPage
            onAdoptRequest={handleAdoptRequest}
            onSelectPet={handleSelectPet}
          />
        )}

        {currentPage === 'detalhes-animal' && (
          <PetDetailPage
            pet={currentSelectedPet}
            onBack={() => handleNavigate('adocao')}
            onAdoptRequest={handleAdoptRequest}
            onSelectPet={handleSelectPet}
          />
        )}

        {currentPage === 'apoie' && (
          <CausesPage onShowToast={showToast} />
        )}

        {currentPage === 'chat' && (
          <ChatPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'feedback' && (
          <FeedbackPage
            onShowToast={showToast}
            onNavigateHome={() => handleNavigate('inicio')}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setCurrentUserName('Mariana');
              showToast('Bem-vinda de volta, Mariana!');
              handleNavigate('inicio');
            }}
            onNavigateToRegister={() => handleNavigate('cadastro')}
            onNavigateHome={() => handleNavigate('inicio')}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'cadastro' && (
          <RegisterPage
            onRegisterSuccess={(name) => {
              setIsLoggedIn(true);
              const firstName = name.split(' ')[0] || 'Mariana';
              setCurrentUserName(firstName);
              showToast(`Conta criada com sucesso! Bem-vindo(a), ${firstName}!`);
              handleNavigate('inicio');
            }}
            onNavigateToLogin={() => handleNavigate('login')}
            onNavigateHome={() => handleNavigate('inicio')}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'splash' && (
          <SplashScreen onContinue={() => handleNavigate('onboarding')} />
        )}

        {currentPage === 'onboarding' && (
          <OnboardingScreen onComplete={() => handleNavigate('inicio')} />
        )}

        {currentPage === 'carrinho' && (
          <CartPage
            items={cartItems}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onCheckout={() => handleNavigate('checkout')}
            onNavigateHome={() => handleNavigate('inicio')}
            onContinueShopping={() => handleNavigate('produtos')}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutScreen
            items={cartItems}
            onBack={() => handleNavigate('carrinho')}
            onConfirmOrder={() => {
              handleClearCart();
              handleNavigate('pedido-confirmado');
            }}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'pedido-confirmado' && (
          <OrderConfirmationScreen
            onViewOrder={() => handleNavigate('carrinho')}
            onNavigateHome={() => handleNavigate('inicio')}
          />
        )}

        {currentPage === 'mobile-home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'mobile-busca' && (
          <SearchScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'mobile-detalhes-produto' && (
          <MobileProductDetailScreen
            onBack={() => handleNavigate('mobile-busca')}
            onAddToCart={(qty) => {
              const fonteItem: ProductItem = CATALOG_PRODUCTS.find((p) => p.id === 'fonte-agua') || {
                id: 'fonte-agua',
                name: 'Fonte de Água Bivolt',
                category: 'Acessórios',
                price: 89.9,
                rating: 4.8,
                reviewsCount: 94,
                imageUrl: '/images/fonte-agua.png',
                isFavorite: false,
              };
              handleAddToCart(fonteItem, qty);
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'perfil' && (
          <TutorProfilePage
            isLoggedIn={isLoggedIn}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onShowToast={showToast}
            onAddCartItems={handleAddMultipleToCart}
          />
        )}

        {currentPage !== 'inicio' &&
          currentPage !== 'produtos' &&
          currentPage !== 'detalhes-produto' &&
          currentPage !== 'servicos' &&
          currentPage !== 'detalhes-servico' &&
          currentPage !== 'adocao' &&
          currentPage !== 'detalhes-animal' &&
          currentPage !== 'apoie' &&
          currentPage !== 'chat' &&
          currentPage !== 'feedback' &&
          currentPage !== 'login' &&
          currentPage !== 'cadastro' &&
          currentPage !== 'splash' &&
          currentPage !== 'onboarding' &&
          currentPage !== 'carrinho' &&
          currentPage !== 'checkout' &&
          currentPage !== 'pedido-confirmado' &&
          currentPage !== 'mobile-home' &&
          currentPage !== 'mobile-busca' &&
          currentPage !== 'mobile-detalhes-produto' &&
          currentPage !== 'perfil' && (
            <div className="placeholder-tab-view">
              <h2 className="placeholder-title">
                {currentPage === 'favoritos' && 'Meus Favoritos'}
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

      {/* Desktop Slate Footer (hidden on standalone mobile/auth screens) */}
      {!isStandalonePage && <Footer onNavigate={handleNavigate} />}

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

