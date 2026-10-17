import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './CartScreen.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartScreenProps {
  onCheckout: () => void;
  onNavigateHome: () => void;
  onShowToast?: (message: string) => void;
}

const INITIAL_CART: CartItem[] = [
  {
    id: 'fonte-agua',
    name: 'Fonte de Água Bivolt',
    price: 89.9,
    quantity: 1,
    imageUrl: '/images/fonte-agua.png',
  },
  {
    id: 'varinha-gatos',
    name: 'Varinha para Gatos',
    price: 19.9,
    quantity: 2,
    imageUrl: '/images/varinha-gatos.png',
  },
];

export const CartScreen: React.FC<CartScreenProps> = ({
  onCheckout,
  onShowToast,
}) => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const shippingFee = items.length > 0 ? 12.0 : 0.0;

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
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

  const handleRemove = (id: string, name: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (onShowToast) onShowToast(`"${name}" removido do carrinho.`);
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const total = subtotal + shippingFee;

  return (
    <div className="mobile-cart-screen" id="cart-screen-view">
      <StatusBar time="9:41" />

      {/* Header */}
      <header className="cart-header">
        <h1 className="cart-title">Meu carrinho</h1>
      </header>

      {/* Cart Items List */}
      <main className="cart-items-container">
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-img-box">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-img"
                />
              </div>

              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <span className="cart-item-price">
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="cart-item-actions">
                <div className="cart-item-stepper">
                  <button
                    type="button"
                    className="stepper-action-btn"
                    onClick={() => handleUpdateQty(item.id, -1)}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="stepper-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="stepper-action-btn"
                    onClick={() => handleUpdateQty(item.id, 1)}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className="cart-delete-btn"
                  onClick={() => handleRemove(item.id, item.name)}
                  aria-label={`Remover ${item.name} do carrinho`}
                  title="Remover produto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Footer / Summary Box */}
      <footer className="cart-footer-summary">
        <div className="summary-row">
          <span className="summary-label">Subtotal</span>
          <span className="summary-value">
            R$ {subtotal.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Frete</span>
          <span className="summary-value">
            R$ {shippingFee.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className="summary-row total-row">
          <span className="summary-total-label">Total</span>
          <span className="summary-total-value">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          type="button"
          className="cart-checkout-btn"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Finalizar compra
        </button>

        <HomeIndicator />
      </footer>
    </div>
  );
};
