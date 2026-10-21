import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Download,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import type { OrderSummaryData } from './CheckoutPage';
import './OrderConfirmationPage.css';

interface OrderConfirmationPageProps {
  orderData?: OrderSummaryData | null;
  onViewOrders: () => void;
  onNavigateHome: () => void;
  onShowToast?: (message: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderData,
  onViewOrders,
  onNavigateHome,
  onShowToast,
}) => {
  const orderNumber = orderData?.orderNumber || '#PC-84920';
  const total = orderData?.total || 101.9;
  const items = orderData?.items || [];

  const handleDownloadReceipt = () => {
    if (onShowToast) {
      onShowToast(`Comprovante do pedido ${orderNumber} baixado com sucesso em PDF.`);
    }
  };

  return (
    <div className="desktop-order-confirmed-page" id="desktop-order-confirmed-view">
      <div className="order-confirmed-container">
        {/* Breadcrumb */}
        <nav className="confirmation-breadcrumb" aria-label="Navegação estrutural">
          <button type="button" onClick={onNavigateHome} className="breadcrumb-link">
            Início
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Pedido Confirmado</span>
        </nav>

        {/* Hero Success Banner */}
        <section className="confirmation-hero-card">
          <div className="success-icon-badge-outer">
            <div className="success-icon-badge-inner">
              <CheckCircle2 size={48} className="success-check-icon" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="confirmation-title">Pedido Realizado com Sucesso!</h1>
          <p className="confirmation-lead-text">
            Obrigado pela sua compra! Seu pedido foi aprovado e nossa equipe já está separando os produtos com todo o carinho para o seu pet.
          </p>

          <div className="order-meta-pill-box">
            <span className="meta-pill-label">Número do Pedido:</span>
            <strong className="meta-pill-val">{orderNumber}</strong>
            <span className="meta-pill-divider">•</span>
            <span className="meta-pill-date">
              <Calendar size={14} />
              {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </section>

        {/* 2-Column Grid: Timeline & Details */}
        <div className="confirmation-layout-grid">
          {/* Left Column: Progress Timeline & Delivery Info */}
          <main className="confirmation-main-column">
            {/* Delivery Progress Timeline Card */}
            <div className="confirmation-detail-card">
              <h2 className="card-section-heading">Status do Pedido</h2>

              <div className="order-timeline-stepper">
                {/* Step 1 */}
                <div className="timeline-step completed">
                  <div className="timeline-node">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">Pedido Recebido e Aprovado</h3>
                    <p className="timeline-step-desc">
                      Pagamento confirmado via {orderData?.paymentMethod || 'Cartão de Crédito'}.
                    </p>
                    <span className="timeline-step-time">Hoje</span>
                  </div>
                </div>

                <div className="timeline-bar completed" />

                {/* Step 2 */}
                <div className="timeline-step current">
                  <div className="timeline-node">
                    <Package size={16} />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">Preparação e Embalagem</h3>
                    <p className="timeline-step-desc">
                      Itens sendo cuidadosamente conferidos e embalados no Centro de Distribuição PetConnect.
                    </p>
                    <span className="timeline-step-badge">Em andamento</span>
                  </div>
                </div>

                <div className="timeline-bar" />

                {/* Step 3 */}
                <div className="timeline-step pending">
                  <div className="timeline-node">
                    <Truck size={16} />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">Em Trânsito / Rastreamento</h3>
                    <p className="timeline-step-desc">
                      Coleta pela transportadora expressa com rastreamento em tempo real.
                    </p>
                  </div>
                </div>

                <div className="timeline-bar" />

                {/* Step 4 */}
                <div className="timeline-step pending">
                  <div className="timeline-node">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-step-title">Entrega Concluída</h3>
                    <p className="timeline-step-desc">
                      Recebimento confirmado no endereço do tutor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info Boxes */}
            <div className="confirmation-two-cards-grid">
              {/* Delivery Box */}
              <div className="confirmation-info-box">
                <div className="info-box-header">
                  <MapPin size={18} className="info-icon" />
                  <h3>Endereço de Entrega</h3>
                </div>
                <div className="info-box-body">
                  <strong>{orderData?.shippingAddress?.label || 'Minha Casa (Principal)'}</strong>
                  <p>
                    {orderData?.shippingAddress?.street || 'Av. Paulista'}, {orderData?.shippingAddress?.number || '1000'}
                    {orderData?.shippingAddress?.complement ? ` - ${orderData.shippingAddress.complement}` : ' - Apt 42'}
                  </p>
                  <p>
                    {orderData?.shippingAddress?.neighborhood || 'Bela Vista'} • {orderData?.shippingAddress?.city || 'São Paulo'} - {orderData?.shippingAddress?.state || 'SP'}
                  </p>
                  <span className="info-cep">CEP: {orderData?.shippingAddress?.zipCode || '01310-100'}</span>
                  <div className="shipping-type-badge">
                    <Truck size={13} />
                    <span>{orderData?.shippingOption || 'Entrega Padrão PetConnect'}</span>
                  </div>
                </div>
              </div>

              {/* Payment Box */}
              <div className="confirmation-info-box">
                <div className="info-box-header">
                  <CreditCard size={18} className="info-icon" />
                  <h3>Pagamento</h3>
                </div>
                <div className="info-box-body">
                  <strong>{orderData?.paymentMethod || 'Cartão de Crédito'}</strong>
                  <p>Status: <span className="payment-paid-badge">Aprovado</span></p>
                  {orderData?.installments && (
                    <p>Parcelamento: {orderData.installments}x sem juros</p>
                  )}
                  <span className="total-highlight">
                    Total: R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                  <div className="security-verified-badge">
                    <ShieldCheck size={13} />
                    <span>Transação 100% Criptografada</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Column: Order Items Summary & Actions */}
          <aside className="confirmation-sidebar-column">
            <div className="confirmation-sidebar-card">
              <h2 className="sidebar-card-title">Itens do Pedido</h2>

              <div className="confirmation-items-list">
                {items.length === 0 ? (
                  <p className="no-items-text">Detalhes dos itens registrados no pedido {orderNumber}.</p>
                ) : (
                  items.map((it) => (
                    <div key={it.id} className="confirmed-item-row">
                      <div className="confirmed-item-img-box">
                        <img src={it.imageUrl} alt={it.name} />
                      </div>
                      <div className="confirmed-item-meta">
                        <h4>{it.name}</h4>
                        <span>{it.quantity}x • R$ {it.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <span className="confirmed-item-subtotal">
                        R$ {(it.price * it.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="confirmed-pricing-block">
                <div className="pricing-line">
                  <span>Subtotal</span>
                  <span>R$ {(orderData?.subtotal || total).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="pricing-line">
                  <span>Frete</span>
                  <span>
                    {(orderData?.shippingCost || 0) === 0 ? (
                      <strong className="free-tag">Grátis</strong>
                    ) : (
                      `R$ ${(orderData?.shippingCost || 12).toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>
                {(orderData?.discount || 0) > 0 && (
                  <div className="pricing-line discount">
                    <span>Desconto</span>
                    <span>- R$ {orderData?.discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="pricing-divider" />
                <div className="pricing-line total-line">
                  <span>Total Pago</span>
                  <span className="total-value">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="confirmation-actions-stack">
                <button
                  type="button"
                  className="btn-track-orders-primary"
                  onClick={onViewOrders}
                >
                  <Package size={17} />
                  <span>Acompanhar meus Pedidos</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-continue-shopping-secondary"
                  onClick={onNavigateHome}
                >
                  <ShoppingBag size={17} />
                  <span>Continuar Comprando</span>
                </button>

                <button
                  type="button"
                  className="btn-download-receipt"
                  onClick={handleDownloadReceipt}
                >
                  <Download size={15} />
                  <span>Baixar Comprovante em PDF</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
