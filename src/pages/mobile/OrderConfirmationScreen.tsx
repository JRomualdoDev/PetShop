import React from 'react';
import { Check } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './OrderConfirmationScreen.css';

interface OrderConfirmationScreenProps {
  orderId?: string;
  onViewOrder: () => void;
  onNavigateHome: () => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  orderId = '#1024',
  onViewOrder,
  onNavigateHome,
}) => {
  return (
    <div className="mobile-order-confirmed-screen" id="order-confirmed-view">
      <StatusBar time="9:41" />

      {/* Center Success Info */}
      <main className="order-confirmed-center">
        <div className="order-success-circle-outer">
          <div className="order-success-circle-inner">
            <Check size={40} className="order-success-check-icon" strokeWidth={3} />
          </div>
        </div>

        <h1 className="order-confirmed-title">Pedido realizado!</h1>
        <p className="order-confirmed-desc">
          Seu pedido foi confirmado e será preparado para entrega.
        </p>

        <div className="order-number-pill">
          <span>Pedido {orderId}</span>
        </div>
      </main>

      {/* Bottom Actions */}
      <footer className="order-confirmed-footer">
        <button
          type="button"
          className="order-btn-primary"
          onClick={onViewOrder}
        >
          Ver pedido
        </button>

        <button
          type="button"
          className="order-btn-secondary"
          onClick={onNavigateHome}
        >
          Voltar para início
        </button>

        <HomeIndicator />
      </footer>
    </div>
  );
};
