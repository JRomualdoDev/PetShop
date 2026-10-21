import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, Tag, ShoppingBag } from 'lucide-react';
import type { NavPageId } from '../types';
import './CartPage.css';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartPageProps {
  items?: CartItem[];
  onUpdateQty?: (id: string, delta: number) => void;
  onRemoveItem?: (id: string, name: string) => void;
  onClearCart?: () => void;
  onCheckout: () => void;
  onNavigateHome: () => void;
  onContinueShopping?: () => void;
  onNavigate?: (page: NavPageId) => void;
  onShowToast?: (message: string) => void;
}

const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: 'fonte-agua',
    name: 'Fonte de Água Bivolt',
    category: 'Acessórios',
    price: 89.90,
    quantity: 1,
    imageUrl: '/images/fonte-agua.png',
  },
  {
    id: 'varinha-gatos',
    name: 'Varinha para Gatos',
    category: 'Brinquedos',
    price: 19.90,
    quantity: 2,
    imageUrl: '/images/varinha-gatos.png',
  },
];

export const CartPage: React.FC<CartPageProps> = ({
  items: propItems,
  onUpdateQty: propUpdateQty,
  onRemoveItem: propRemoveItem,
  onClearCart,
  onCheckout,
  onNavigateHome,
  onContinueShopping,
  onNavigate,
  onShowToast,
}) => {
  const [localItems, setLocalItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const items = propItems !== undefined ? propItems : localItems;

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [cepInput, setCepInput] = useState<string>('');
  const [shippingCalculated, setShippingCalculated] = useState<boolean>(false);

  const baseShippingFee = items.length > 0 ? 12.00 : 0.00;
  const shippingFee = shippingCalculated ? baseShippingFee : (items.length > 0 ? 12.00 : 0.00);

  const handleUpdateQty = (id: string, delta: number) => {
    if (propUpdateQty) {
      propUpdateQty(id, delta);
    } else {
      setLocalItems((prev) =>
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
    }
  };

  const handleRemove = (id: string, name: string) => {
    if (propRemoveItem) {
      propRemoveItem(id, name);
    } else {
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
      if (onShowToast) onShowToast(`"${name}" removido do carrinho.`);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PETCONNECT10' || clean === 'BEMVINDO') {
      setDiscountPercent(0.10);
      setCouponApplied(clean);
      if (onShowToast) onShowToast(`Cupom ${clean} aplicado: 10% de desconto!`);
    } else if (clean.length > 0) {
      if (onShowToast) onShowToast('Cupom inválido. Tente PETCONNECT10.');
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.trim().length >= 8) {
      setShippingCalculated(true);
      if (onShowToast) onShowToast('Frete calculado: R$ 12,00 (Prazo: 2 a 4 dias úteis).');
    } else {
      if (onShowToast) onShowToast('Informe um CEP válido com 8 dígitos.');
    }
  };

  const handleContinue = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else if (onNavigate) {
      onNavigate('produtos');
    } else {
      onNavigateHome();
    }
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const total = Math.max(0, subtotal - discountAmount + (items.length > 0 ? shippingFee : 0));
  const totalItemsCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="cart-page-wrapper" id="cart-page-view">
      <div className="cart-page-container">
        {/* Breadcrumb Navigation (Desktop) */}
        <nav className="cart-breadcrumb" aria-label="Navegação estrutural">
          <button type="button" onClick={onNavigateHome} className="breadcrumb-link">
            Início
          </button>
          <span className="breadcrumb-separator">/</span>
          <button type="button" onClick={handleContinue} className="breadcrumb-link">
            Produtos
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Meu Carrinho</span>
        </nav>

        {/* Page Title & Item Count */}
        <header className="cart-page-header">
          <div className="cart-header-left">
            <h1 className="cart-main-title">Meu carrinho</h1>
            <span className="cart-count-badge">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'}
            </span>
          </div>

          <div className="cart-header-actions">
            {items.length > 0 && onClearCart && (
              <button
                type="button"
                className="cart-clear-btn"
                onClick={() => {
                  if (window.confirm('Tem certeza de que deseja esvaziar todos os itens do carrinho?')) {
                    onClearCart();
                    if (onShowToast) onShowToast('Carrinho esvaziado com sucesso.');
                  }
                }}
                title="Esvaziar carrinho"
              >
                <Trash2 size={15} />
                <span>Esvaziar carrinho</span>
              </button>
            )}

            <button
              type="button"
              className="cart-continue-link"
              onClick={handleContinue}
            >
              <ArrowLeft size={16} />
              <span>Continuar comprando</span>
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty-box">
            <div className="empty-icon-circle">
              <ShoppingBag size={48} className="empty-cart-icon" />
            </div>
            <h2 className="empty-title">Seu carrinho está vazio</h2>
            <p className="empty-desc">
              Explore nossos produtos, rações balanceadas e acessórios exclusivos para o seu pet.
            </p>
            <button
              type="button"
              className="empty-cta-btn"
              onClick={handleContinue}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Left Column: Cart Items List */}
            <section className="cart-items-section" aria-label="Produtos no carrinho">
              {/* Desktop Table Header */}
              <div className="cart-table-header">
                <span className="th-col th-product">Produto</span>
                <span className="th-col th-price">Preço</span>
                <span className="th-col th-qty">Quantidade</span>
                <span className="th-col th-subtotal">Subtotal</span>
                <span className="th-col th-action"></span>
              </div>

              {/* Items List */}
              <div className="cart-items-list">
                {items.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  return (
                    <article key={item.id} className="cart-card-item">
                      {/* Product Thumbnail */}
                      <div className="item-thumbnail-box">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="item-thumbnail-img"
                        />
                      </div>

                      {/* Info */}
                      <div className="item-meta-info">
                        <span className="item-category-tag">{item.category}</span>
                        <h2 className="item-name-heading">{item.name}</h2>
                        <span className="item-unit-price-mobile">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Desktop Unit Price */}
                      <div className="item-unit-price-desktop">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </div>

                      {/* Stepper */}
                      <div className="item-stepper-control">
                        <button
                          type="button"
                          className="stepper-btn-circle"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="stepper-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn-circle"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Desktop Item Subtotal */}
                      <div className="item-subtotal-desktop">
                        R$ {itemSubtotal.toFixed(2).replace('.', ',')}
                      </div>

                      {/* Delete Button */}
                      <div className="item-remove-wrapper">
                        <button
                          type="button"
                          className="item-trash-btn"
                          onClick={() => handleRemove(item.id, item.name)}
                          aria-label={`Remover ${item.name}`}
                          title="Remover produto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Shipping & Coupon Tools (Desktop & Tablet) */}
              <div className="cart-tools-row">
                {/* Shipping Estimator */}
                <form className="cart-tool-card" onSubmit={handleCalculateShipping}>
                  <div className="tool-card-title">
                    <Truck size={18} className="tool-icon" />
                    <span>Calcular frete e prazo</span>
                  </div>
                  <div className="tool-input-group">
                    <input
                      type="text"
                      className="tool-text-input"
                      placeholder="Digite seu CEP (ex: 01310-100)"
                      value={cepInput}
                      onChange={(e) => setCepInput(e.target.value)}
                      maxLength={9}
                    />
                    <button type="submit" className="tool-submit-btn">
                      Calcular
                    </button>
                  </div>
                  {shippingCalculated && (
                    <p className="tool-success-note">
                      ✓ Entrega expressa PetConnect: R$ 12,00 (2 a 4 dias úteis)
                    </p>
                  )}
                </form>

                {/* Coupon Code */}
                <form className="cart-tool-card" onSubmit={handleApplyCoupon}>
                  <div className="tool-card-title">
                    <Tag size={18} className="tool-icon" />
                    <span>Cupom de desconto</span>
                  </div>
                  <div className="tool-input-group">
                    <input
                      type="text"
                      className="tool-text-input"
                      placeholder="Insira seu cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="tool-submit-btn">
                      Aplicar
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="tool-success-note">
                      ✓ Cupom <strong>{couponApplied}</strong> aplicado (10% OFF)!
                    </p>
                  )}
                </form>
              </div>
            </section>

            {/* Right Column: Order Summary Card */}
            <aside className="cart-summary-sidebar" aria-label="Resumo do pedido">
              <div className="summary-sticky-card">
                <h2 className="summary-card-title">Resumo do Pedido</h2>

                <div className="summary-lines-group">
                  <div className="summary-data-line">
                    <span className="data-line-label">Subtotal</span>
                    <span className="data-line-val">
                      R$ {subtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="summary-data-line">
                    <span className="data-line-label">Frete</span>
                    <span className="data-line-val">
                      R$ {shippingFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="summary-data-line discount-line">
                      <span className="data-line-label">Desconto (10%)</span>
                      <span className="data-line-val">
                        - R$ {discountAmount.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  )}

                  <div className="summary-divider-line" />

                  <div className="summary-total-block">
                    <span className="total-label-text">Total</span>
                    <span className="total-val-highlight">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Main Checkout Button */}
                <button
                  type="button"
                  className="cart-primary-checkout-btn"
                  onClick={onCheckout}
                  id="cart-checkout-cta"
                >
                  Finalizar compra
                </button>

                {/* Trust Badges */}
                <div className="cart-trust-badges">
                  <div className="trust-badge-item">
                    <ShieldCheck size={18} className="trust-icon" />
                    <span>Compra 100% segura e criptografada</span>
                  </div>
                  <div className="trust-badge-item">
                    <Truck size={18} className="trust-icon" />
                    <span>Envio rastreado para todo o Brasil</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;
