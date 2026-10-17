import React, { useState } from 'react';
import { ChevronLeft, MapPin, CreditCard, XCircle } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './CheckoutScreen.css';

interface CheckoutScreenProps {
  onBack: () => void;
  onConfirmOrder: () => void;
  onShowToast?: (message: string) => void;
}

type PaymentMethod = 'credit' | 'pix' | 'debit';

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  onConfirmOrder,
  onShowToast,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [addressModalOpen, setAddressModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState({
    label: 'Minha Casa',
    details: 'Av. Paulista, 1000 - Apt 42, Bela Vista, São Paulo - SP',
  });

  const handleConfirm = () => {
    onConfirmOrder();
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressModalOpen(false);
    if (onShowToast) onShowToast('Endereço de entrega atualizado com sucesso!');
  };

  return (
    <div className="mobile-checkout-screen" id="checkout-screen-view">
      <StatusBar time="9:41" />

      {/* Top Header with Back button */}
      <header className="checkout-top-header">
        <button
          type="button"
          className="checkout-back-btn"
          onClick={onBack}
          aria-label="Voltar para o carrinho"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="checkout-page-title">Finalizar compra</h1>
      </header>

      {/* Content */}
      <main className="checkout-content-area">
        {/* Endereço de entrega */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Endereço de entrega</h2>
          <div className="checkout-address-card">
            <div className="address-icon-box">
              <MapPin size={20} className="address-pin-icon" />
            </div>
            <div className="address-text-box">
              <h3 className="address-label">{address.label}</h3>
              <p className="address-details">{address.details}</p>
            </div>
            <button
              type="button"
              className="address-change-btn"
              onClick={() => setAddressModalOpen(true)}
            >
              Alterar
            </button>
          </div>
        </section>

        {/* Forma de pagamento */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Forma de pagamento</h2>
          <div className="payment-options-list" role="radiogroup" aria-label="Forma de pagamento">
            {/* Credit Card */}
            <div
              className={`payment-option-card ${paymentMethod === 'credit' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('credit')}
              role="radio"
              aria-checked={paymentMethod === 'credit'}
              tabIndex={0}
            >
              <div className="payment-option-left">
                <CreditCard size={20} className="payment-icon" />
                <span className="payment-label">Cartão de crédito</span>
              </div>
              <div className="payment-radio-circle">
                {paymentMethod === 'credit' && <div className="payment-radio-dot" />}
              </div>
            </div>

            {/* Pix */}
            <div
              className={`payment-option-card ${paymentMethod === 'pix' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('pix')}
              role="radio"
              aria-checked={paymentMethod === 'pix'}
              tabIndex={0}
            >
              <div className="payment-option-left">
                <XCircle size={20} className="payment-icon" />
                <span className="payment-label">Pix</span>
              </div>
              <div className="payment-radio-circle">
                {paymentMethod === 'pix' && <div className="payment-radio-dot" />}
              </div>
            </div>

            {/* Debit Card */}
            <div
              className={`payment-option-card ${paymentMethod === 'debit' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('debit')}
              role="radio"
              aria-checked={paymentMethod === 'debit'}
              tabIndex={0}
            >
              <div className="payment-option-left">
                <CreditCard size={20} className="payment-icon" />
                <span className="payment-label">Cartão de débito</span>
              </div>
              <div className="payment-radio-circle">
                {paymentMethod === 'debit' && <div className="payment-radio-dot" />}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Order Total & Confirmation */}
      <footer className="checkout-footer">
        <div className="checkout-total-row">
          <span className="checkout-total-label">Total do pedido</span>
          <span className="checkout-total-value">R$ 101,90</span>
        </div>

        <button
          type="button"
          className="checkout-confirm-btn"
          onClick={handleConfirm}
        >
          Confirmar pedido
        </button>

        <HomeIndicator />
      </footer>

      {/* Address Edit Modal */}
      {addressModalOpen && (
        <div className="address-modal-backdrop" onClick={() => setAddressModalOpen(false)}>
          <div
            className="address-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="address-modal-title">Alterar Endereço</h3>
            <form onSubmit={handleSaveAddress}>
              <div className="form-group">
                <label>Identificação (Ex: Minha Casa, Trabalho)</label>
                <input
                  type="text"
                  value={address.label}
                  onChange={(e) => setAddress({ ...address, label: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Endereço Completo</label>
                <input
                  type="text"
                  value={address.details}
                  onChange={(e) => setAddress({ ...address, details: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setAddressModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="modal-save-btn">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
