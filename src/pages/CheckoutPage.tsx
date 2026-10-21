import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Barcode,
  MapPin,
  CheckCircle2,
  Lock,
  Clock,
  Store,
  Copy,
  Check,
  Edit2,
  Plus,
  Package,
  ShoppingBag,
} from 'lucide-react';
import type { CartItem } from '../types';
import './CheckoutPage.css';

export interface OrderSummaryData {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  installments?: number;
  shippingOption: string;
  shippingAddress: {
    label: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface CheckoutPageProps {
  items: CartItem[];
  onBackToCart: () => void;
  onConfirmOrder: (orderData: OrderSummaryData) => void;
  onNavigateHome: () => void;
  onShowToast?: (message: string) => void;
  userName?: string;
}

interface AddressItem {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

type ShippingOptionId = 'standard' | 'express' | 'pickup';
type PaymentMethodId = 'credit' | 'pix' | 'boleto' | 'debit';

const DEFAULT_ADDRESSES: AddressItem[] = [
  {
    id: 'addr-casa',
    label: 'Minha Casa (Principal)',
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Apt 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: true,
  },
  {
    id: 'addr-trabalho',
    label: 'Escritório / Comercial',
    street: 'Rua Funchal',
    number: '418',
    complement: '12º Andar',
    neighborhood: 'Vila Olímpia',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '04551-060',
    isDefault: false,
  },
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBackToCart,
  onConfirmOrder,
  onNavigateHome,
  onShowToast,
  userName = 'Mariana Silva',
}) => {
  // Stepper / flow active state
  const [shippingOption, setShippingOption] = useState<ShippingOptionId>('standard');
  const [addresses, setAddresses] = useState<AddressItem[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-casa');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);

  // Form inputs for new address
  const [modalAddrLabel, setModalAddrLabel] = useState<string>('');
  const [modalAddrStreet, setModalAddrStreet] = useState<string>('');
  const [modalAddrNumber, setModalAddrNumber] = useState<string>('');
  const [modalAddrComplement, setModalAddrComplement] = useState<string>('');
  const [modalAddrNeighborhood, setModalAddrNeighborhood] = useState<string>('');
  const [modalAddrCity, setModalAddrCity] = useState<string>('São Paulo');
  const [modalAddrState, setModalAddrState] = useState<string>('SP');
  const [modalAddrZip, setModalAddrZip] = useState<string>('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('credit');
  const [useSavedCard, setUseSavedCard] = useState<boolean>(true);
  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4829');
  const [cardHolder, setCardHolder] = useState<string>('MARIANA SILVA');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);
  const [pixCopied, setPixCopied] = useState<boolean>(false);
  const [deliveryNotes, setDeliveryNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Financial calculations
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const shippingCost =
    shippingOption === 'pickup'
      ? 0.0
      : shippingOption === 'express'
      ? 22.0
      : items.length > 0
      ? 12.0
      : 0.0;

  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = Math.max(0, subtotal + shippingCost - pixDiscount);
  const totalItemsCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  // Address modal handlers
  const handleOpenNewAddressModal = () => {
    setEditingAddress(null);
    setModalAddrLabel('');
    setModalAddrStreet('');
    setModalAddrNumber('');
    setModalAddrComplement('');
    setModalAddrNeighborhood('');
    setModalAddrCity('São Paulo');
    setModalAddrState('SP');
    setModalAddrZip('');
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (addr: AddressItem) => {
    setEditingAddress(addr);
    setModalAddrLabel(addr.label);
    setModalAddrStreet(addr.street);
    setModalAddrNumber(addr.number);
    setModalAddrComplement(addr.complement || '');
    setModalAddrNeighborhood(addr.neighborhood);
    setModalAddrCity(addr.city);
    setModalAddrState(addr.state);
    setModalAddrZip(addr.zipCode);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalAddrStreet || !modalAddrNumber || !modalAddrZip) {
      if (onShowToast) onShowToast('Por favor, preencha os campos obrigatórios do endereço.');
      return;
    }

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id
            ? {
                ...a,
                label: modalAddrLabel || a.label,
                street: modalAddrStreet,
                number: modalAddrNumber,
                complement: modalAddrComplement,
                neighborhood: modalAddrNeighborhood,
                city: modalAddrCity,
                state: modalAddrState,
                zipCode: modalAddrZip,
              }
            : a
        )
      );
      if (onShowToast) onShowToast('Endereço atualizado com sucesso!');
    } else {
      const newId = `addr-${Date.now()}`;
      const newAddress: AddressItem = {
        id: newId,
        label: modalAddrLabel || 'Novo Endereço',
        street: modalAddrStreet,
        number: modalAddrNumber,
        complement: modalAddrComplement,
        neighborhood: modalAddrNeighborhood,
        city: modalAddrCity,
        state: modalAddrState,
        zipCode: modalAddrZip,
        isDefault: false,
      };
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newId);
      if (onShowToast) onShowToast('Novo endereço adicionado e selecionado!');
    }
    setIsAddressModalOpen(false);
  };

  const handleCopyPix = () => {
    const pixCode =
      '00020126580014br.gov.bcb.pix0136petconnect-pagamentos@petconnect.com.br5204000053039865405101.905802BR5910PetConnect6009Sao Paulo62070503***6304E2D1';
    navigator.clipboard?.writeText(pixCode);
    setPixCopied(true);
    if (onShowToast) onShowToast('Código PIX copiado para a área de transferência!');
    setTimeout(() => setPixCopied(false), 3000);
  };

  const formatCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 16);
    return clean.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 4);
    if (clean.length >= 3) {
      return `${clean.substring(0, 2)}/${clean.substring(2)}`;
    }
    return clean;
  };

  const handleFinalize = () => {
    if (items.length === 0) {
      if (onShowToast) onShowToast('Seu carrinho está vazio.');
      return;
    }

    if (paymentMethod === 'credit' && !useSavedCard) {
      if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
        if (onShowToast) onShowToast('Preencha todos os dados do cartão de crédito.');
        return;
      }
    }

    setIsSubmitting(true);
    if (onShowToast) onShowToast('Processando pagamento seguro...');

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderNumber = `PC-${Math.floor(100000 + Math.random() * 900000)}`;

      const paymentLabelMap: Record<PaymentMethodId, string> = {
        credit: useSavedCard ? 'Cartão de Crédito (Mastercard •••• 4829)' : 'Cartão de Crédito',
        pix: 'PIX (Aprovação Imediata com 5% OFF)',
        boleto: 'Boleto Bancário',
        debit: 'Cartão de Débito',
      };

      const shippingLabelMap: Record<ShippingOptionId, string> = {
        standard: 'Entrega Padrão PetConnect (2 a 4 dias úteis)',
        express: 'Entrega Expressa PetConnect (Chega Amanhã)',
        pickup: 'Retirada em Loja Parceira (Em até 2 horas)',
      };

      const orderData: OrderSummaryData = {
        orderNumber: generatedOrderNumber,
        items: [...items],
        subtotal,
        shippingCost,
        discount: pixDiscount,
        total,
        paymentMethod: paymentLabelMap[paymentMethod],
        installments: paymentMethod === 'credit' ? installments : undefined,
        shippingOption: shippingLabelMap[shippingOption],
        shippingAddress: {
          label: selectedAddress.label,
          street: selectedAddress.street,
          number: selectedAddress.number,
          complement: selectedAddress.complement,
          neighborhood: selectedAddress.neighborhood,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
        },
      };

      onConfirmOrder(orderData);
    }, 1200);
  };

  return (
    <div className="desktop-checkout-page" id="desktop-checkout-view">
      <div className="checkout-page-container">
        {/* Breadcrumb Navigation */}
        <nav className="checkout-breadcrumb" aria-label="Navegação estrutural">
          <button type="button" onClick={onNavigateHome} className="breadcrumb-link">
            Início
          </button>
          <span className="breadcrumb-separator">/</span>
          <button type="button" onClick={onBackToCart} className="breadcrumb-link">
            Meu Carrinho
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Finalizar Compra</span>
        </nav>

        {/* Page Top Header */}
        <header className="checkout-header-bar">
          <div className="checkout-header-title-box">
            <h1 className="checkout-main-title">Finalizar Compra</h1>
            <p className="checkout-subtitle">
              Ambiente seguro criptografado com tecnologia SSL de 256 bits.
            </p>
          </div>

          <button
            type="button"
            className="checkout-back-cart-btn"
            onClick={onBackToCart}
          >
            <ArrowLeft size={16} />
            <span>Voltar ao carrinho</span>
          </button>
        </header>

        {/* Stepper Progress Bar */}
        <div className="checkout-stepper-row" aria-label="Etapas da compra">
          <div className="step-item step-completed">
            <div className="step-circle">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="step-label">1. Carrinho</span>
          </div>

          <div className="step-connector step-connector-active" />

          <div className="step-item step-active">
            <div className="step-circle">2</div>
            <span className="step-label">2. Entrega e Pagamento</span>
          </div>

          <div className="step-connector" />

          <div className="step-item">
            <div className="step-circle">3</div>
            <span className="step-label">3. Confirmação</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="checkout-empty-card">
            <div className="empty-icon-box">
              <ShoppingBag size={48} />
            </div>
            <h2>Nenhum item no pedido</h2>
            <p>Seu carrinho está vazio. Adicione produtos para prosseguir com a compra.</p>
            <button
              type="button"
              className="checkout-return-btn"
              onClick={onBackToCart}
            >
              Ir para o catálogo
            </button>
          </div>
        ) : (
          /* Main 2-Column Desktop Grid */
          <div className="checkout-layout-grid">
            {/* Left Column: Form Sections */}
            <main className="checkout-forms-column">
              {/* SECTION 1: DADOS DO TUTOR / IDENTIFICAÇÃO */}
              <section className="checkout-card-section" aria-labelledby="tutor-info-title">
                <div className="card-section-header">
                  <div className="section-title-with-num">
                    <span className="section-badge-num">1</span>
                    <h2 id="tutor-info-title" className="section-title-text">
                      Identificação do Tutor
                    </h2>
                  </div>
                  <div className="logged-secure-badge">
                    <ShieldCheck size={15} />
                    <span>Conectado com segurança</span>
                  </div>
                </div>

                <div className="tutor-identity-preview">
                  <div className="tutor-avatar-box">
                    <img
                      src="/images/desktop/avatar-mariana.png"
                      alt={userName}
                      className="tutor-avatar-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  <div className="tutor-identity-meta">
                    <h3 className="tutor-name-text">{userName}</h3>
                    <p className="tutor-email-text">mariana.silva@petconnect.com.br</p>
                    <span className="tutor-cpf-text">CPF: 123.456.789-00 • Telefone: (11) 98765-4321</span>
                  </div>
                  <span className="tutor-vip-tag">Tutor VIP PetConnect</span>
                </div>
              </section>

              {/* SECTION 2: ENDEREÇO DE ENTREGA */}
              <section className="checkout-card-section" aria-labelledby="address-section-title">
                <div className="card-section-header">
                  <div className="section-title-with-num">
                    <span className="section-badge-num">2</span>
                    <h2 id="address-section-title" className="section-title-text">
                      Endereço de Entrega
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="add-new-address-link"
                    onClick={handleOpenNewAddressModal}
                  >
                    <Plus size={15} />
                    <span>Cadastrar outro endereço</span>
                  </button>
                </div>

                {/* Saved Address Cards Grid */}
                <div className="address-cards-selection-grid">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        className={`address-selectable-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedAddressId(addr.id)}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                      >
                        <div className="address-card-top-row">
                          <div className="address-card-radio">
                            <div className={`radio-outer ${isSelected ? 'active' : ''}`}>
                              {isSelected && <div className="radio-dot" />}
                            </div>
                            <span className="address-card-label">{addr.label}</span>
                          </div>

                          <button
                            type="button"
                            className="address-edit-icon-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditAddressModal(addr);
                            }}
                            title="Editar endereço"
                            aria-label={`Editar ${addr.label}`}
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>

                        <div className="address-card-body">
                          <p className="address-street-line">
                            <MapPin size={15} className="pin-icon" />
                            <span>
                              {addr.street}, {addr.number}
                              {addr.complement ? ` - ${addr.complement}` : ''}
                            </span>
                          </p>
                          <p className="address-sub-line">
                            {addr.neighborhood} • {addr.city} - {addr.state}
                          </p>
                          <p className="address-cep-line">CEP: {addr.zipCode}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Shipping Options */}
                <div className="shipping-options-container">
                  <h3 className="shipping-options-title">
                    <Truck size={17} />
                    <span>Escolha a forma de envio:</span>
                  </h3>

                  <div className="shipping-options-list">
                    {/* 1. Padrão */}
                    <label
                      className={`shipping-option-row ${
                        shippingOption === 'standard' ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                        className="shipping-radio-input"
                      />
                      <div className="shipping-option-content">
                        <div className="shipping-left-info">
                          <span className="shipping-name">Entrega Padrão PetConnect</span>
                          <span className="shipping-eta">Prazo: 2 a 4 dias úteis</span>
                        </div>
                        <span className="shipping-price-tag">R$ 12,00</span>
                      </div>
                    </label>

                    {/* 2. Expressa */}
                    <label
                      className={`shipping-option-row ${
                        shippingOption === 'express' ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                        className="shipping-radio-input"
                      />
                      <div className="shipping-option-content">
                        <div className="shipping-left-info">
                          <div className="shipping-badge-wrap">
                            <span className="shipping-name">Entrega Expressa Prioritária</span>
                            <span className="fast-badge">Mais rápido</span>
                          </div>
                          <span className="shipping-eta">Receba até amanhã às 18h</span>
                        </div>
                        <span className="shipping-price-tag">R$ 22,00</span>
                      </div>
                    </label>

                    {/* 3. Retirada */}
                    <label
                      className={`shipping-option-row ${
                        shippingOption === 'pickup' ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        checked={shippingOption === 'pickup'}
                        onChange={() => setShippingOption('pickup')}
                        className="shipping-radio-input"
                      />
                      <div className="shipping-option-content">
                        <div className="shipping-left-info">
                          <div className="shipping-badge-wrap">
                            <span className="shipping-name">Retirada em Loja Parceira PetConnect</span>
                            <span className="free-badge">Grátis</span>
                          </div>
                          <span className="shipping-eta">
                            <Store size={13} />
                            <span>Disponível em até 2 horas na Unidade Paulista</span>
                          </span>
                        </div>
                        <span className="shipping-price-tag free">Grátis</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Optional Delivery Instructions */}
                <div className="delivery-instructions-box">
                  <label htmlFor="delivery-notes-input" className="instructions-label">
                    Instruções para o entregador (opcional):
                  </label>
                  <input
                    id="delivery-notes-input"
                    type="text"
                    className="instructions-input"
                    placeholder="Ex: Deixar na portaria com Seu Antônio, interfone 42, etc."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                  />
                </div>
              </section>

              {/* SECTION 3: FORMA DE PAGAMENTO */}
              <section className="checkout-card-section" aria-labelledby="payment-section-title">
                <div className="card-section-header">
                  <div className="section-title-with-num">
                    <span className="section-badge-num">3</span>
                    <h2 id="payment-section-title" className="section-title-text">
                      Forma de Pagamento
                    </h2>
                  </div>
                  <div className="ssl-secured-note">
                    <Lock size={14} />
                    <span>Criptografia de ponta a ponta</span>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="payment-tabs-grid" role="radiogroup" aria-label="Método de Pagamento">
                  {/* Cartão de Crédito */}
                  <div
                    className={`payment-tab-button ${paymentMethod === 'credit' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('credit')}
                    role="radio"
                    aria-checked={paymentMethod === 'credit'}
                    tabIndex={0}
                  >
                    <div className="tab-icon-wrap">
                      <CreditCard size={20} />
                    </div>
                    <div className="tab-text-wrap">
                      <span className="tab-title">Cartão de Crédito</span>
                      <span className="tab-sub">Até 10x sem juros</span>
                    </div>
                  </div>

                  {/* PIX */}
                  <div
                    className={`payment-tab-button ${paymentMethod === 'pix' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('pix')}
                    role="radio"
                    aria-checked={paymentMethod === 'pix'}
                    tabIndex={0}
                  >
                    <div className="tab-icon-wrap pix">
                      <QrCode size={20} />
                    </div>
                    <div className="tab-text-wrap">
                      <span className="tab-title">PIX</span>
                      <span className="tab-sub highlight-discount">5% de Desconto Imediato</span>
                    </div>
                  </div>

                  {/* Boleto Bancário */}
                  <div
                    className={`payment-tab-button ${paymentMethod === 'boleto' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('boleto')}
                    role="radio"
                    aria-checked={paymentMethod === 'boleto'}
                    tabIndex={0}
                  >
                    <div className="tab-icon-wrap">
                      <Barcode size={20} />
                    </div>
                    <div className="tab-text-wrap">
                      <span className="tab-title">Boleto Bancário</span>
                      <span className="tab-sub">Vencimento em 3 dias</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Details Panel */}
                <div className="payment-method-details-panel">
                  {/* OPTION 1: CREDIT CARD */}
                  {paymentMethod === 'credit' && (
                    <div className="credit-card-panel-view">
                      {/* Saved card toggle */}
                      <div className="saved-card-switch-row">
                        <label className="saved-card-radio-label">
                          <input
                            type="radio"
                            name="card-choice"
                            checked={useSavedCard}
                            onChange={() => setUseSavedCard(true)}
                          />
                          <span>Usar cartão salvo da carteira (Mastercard final 4829)</span>
                        </label>

                        <label className="saved-card-radio-label">
                          <input
                            type="radio"
                            name="card-choice"
                            checked={!useSavedCard}
                            onChange={() => {
                              setUseSavedCard(false);
                              setCardNumber('');
                              setCardHolder('');
                              setCardExpiry('');
                              setCardCvv('');
                            }}
                          />
                          <span>Pagar com outro cartão de crédito</span>
                        </label>
                      </div>

                      {/* Card Graphic Preview */}
                      <div className="card-visual-and-form-row">
                        <div className="card-visual-preview">
                          <div className="card-preview-top">
                            <span className="card-chip" />
                            <span className="card-brand-logo">Mastercard</span>
                          </div>
                          <div className="card-preview-number">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div className="card-preview-bottom">
                            <div className="card-meta-col">
                              <span className="preview-label">TITULAR</span>
                              <span className="preview-val">
                                {cardHolder ? cardHolder.toUpperCase() : 'NOME DO TITULAR'}
                              </span>
                            </div>
                            <div className="card-meta-col">
                              <span className="preview-label">VALIDADE</span>
                              <span className="preview-val">{cardExpiry || 'MM/AA'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Form Fields */}
                        <div className="card-form-fields-grid">
                          {!useSavedCard && (
                            <>
                              <div className="form-field-group">
                                <label htmlFor="cc-number">Número do Cartão *</label>
                                <input
                                  id="cc-number"
                                  type="text"
                                  className="checkout-text-input"
                                  placeholder="0000 0000 0000 0000"
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                />
                              </div>

                              <div className="form-field-group">
                                <label htmlFor="cc-holder">Nome Impresso no Cartão *</label>
                                <input
                                  id="cc-holder"
                                  type="text"
                                  className="checkout-text-input"
                                  placeholder="Como está grafado no cartão"
                                  value={cardHolder}
                                  onChange={(e) => setCardHolder(e.target.value)}
                                />
                              </div>

                              <div className="form-two-cols-row">
                                <div className="form-field-group">
                                  <label htmlFor="cc-expiry">Validade (MM/AA) *</label>
                                  <input
                                    id="cc-expiry"
                                    type="text"
                                    className="checkout-text-input"
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                  />
                                </div>

                                <div className="form-field-group">
                                  <label htmlFor="cc-cvv">Código CVV *</label>
                                  <input
                                    id="cc-cvv"
                                    type="password"
                                    className="checkout-text-input"
                                    placeholder="123"
                                    maxLength={4}
                                    value={cardCvv}
                                    onChange={(e) =>
                                      setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {useSavedCard && (
                            <div className="saved-card-security-check">
                              <div className="form-field-group" style={{ maxWidth: 220 }}>
                                <label htmlFor="cc-cvv-saved">Código CVV de Segurança *</label>
                                <input
                                  id="cc-cvv-saved"
                                  type="password"
                                  className="checkout-text-input"
                                  placeholder="3 dígitos no verso"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(e) =>
                                    setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))
                                  }
                                />
                              </div>
                              <span className="cvv-help-tip">
                                Para sua segurança, confirme o código CVV de 3 dígitos do cartão.
                              </span>
                            </div>
                          )}

                          {/* Installments Dropdown */}
                          <div className="form-field-group">
                            <label htmlFor="cc-installments">Parcelamento no Cartão</label>
                            <select
                              id="cc-installments"
                              className="checkout-select-input"
                              value={installments}
                              onChange={(e) => setInstallments(Number(e.target.value))}
                            >
                              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => {
                                const installmentVal = (total / num).toFixed(2).replace('.', ',');
                                return (
                                  <option key={num} value={num}>
                                    {num}x de R$ {installmentVal} sem juros ({num === 1 ? 'à vista' : 'sem juros'})
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPTION 2: PIX */}
                  {paymentMethod === 'pix' && (
                    <div className="pix-panel-view">
                      <div className="pix-banner-discount">
                        <CheckCircle2 size={18} className="discount-check-icon" />
                        <div>
                          <strong>5% de Desconto Imediato aplicado!</strong>
                          <p>
                            Você economiza R$ {pixDiscount.toFixed(2).replace('.', ',')} pagando via PIX.
                          </p>
                        </div>
                      </div>

                      <div className="pix-content-flex">
                        <div className="pix-qr-box">
                          {/* Simulated high-res QR Code pattern */}
                          <svg className="pix-qr-svg" viewBox="0 0 100 100" width="140" height="140">
                            <rect width="100" height="100" fill="#ffffff" />
                            {/* Outer square corners */}
                            <path d="M5 5 h30 v30 h-30 z M10 10 v20 h20 v-20 z M15 15 h10 v10 h-10 z" fill="#0f172a" />
                            <path d="M65 5 h30 v30 h-30 z M70 10 v20 h20 v-20 z M75 15 h10 v10 h-10 z" fill="#0f172a" />
                            <path d="M5 65 h30 v30 h-30 z M10 70 v20 h20 v-20 z M15 75 h10 v10 h-10 z" fill="#0f172a" />
                            {/* Pix Data matrix bars */}
                            <path d="M40 10 h10 v5 h-10 z M55 10 h5 v15 h-5 z M45 20 h5 v10 h-5 z M40 35 h15 v5 h-15 z" fill="#0f172a" />
                            <path d="M10 45 h10 v5 h-10 z M25 45 h15 v5 h-15 z M30 55 h10 v5 h-10 z M15 55 h10 v5 h-10 z" fill="#0f172a" />
                            <path d="M65 40 h10 v5 h-10 z M80 40 h15 v5 h-15 z M70 50 h10 v10 h-10 z M85 50 h5 v15 h-5 z" fill="#0f172a" />
                            <path d="M45 45 h10 v10 h-10 z M40 65 h10 v15 h-10 z M55 65 h15 v5 h-15 z M55 75 h10 v10 h-10 z" fill="#0f172a" />
                            <path d="M70 70 h20 v5 h-20 z M75 80 h10 v10 h-10 z M90 80 h5 v15 h-5 z M70 90 h15 v5 h-15 z" fill="#0f172a" />
                          </svg>
                          <span className="pix-qr-label">Aponte a câmera do seu app de banco</span>
                        </div>

                        <div className="pix-instructions-col">
                          <h4>Como pagar com o PIX:</h4>
                          <ol className="pix-steps-list">
                            <li>Abra o aplicativo do seu banco no smartphone.</li>
                            <li>Acesse a opção <strong>PIX</strong> e selecione <strong>Pagar com QR Code</strong> ou <strong>PIX Copia e Cola</strong>.</li>
                            <li>Escaneie o código ao lado ou use o botão abaixo para copiar a chave.</li>
                            <li>Confirme o valor de <strong>R$ {total.toFixed(2).replace('.', ',')}</strong> e conclua a transação.</li>
                          </ol>

                          <div className="pix-copia-cola-box">
                            <input
                              type="text"
                              readOnly
                              value="00020126580014br.gov.bcb.pix0136petconnect-pagamentos@petconnect.com.br"
                              className="pix-code-input"
                            />
                            <button
                              type="button"
                              className={`pix-copy-btn ${pixCopied ? 'copied' : ''}`}
                              onClick={handleCopyPix}
                            >
                              {pixCopied ? <Check size={16} /> : <Copy size={16} />}
                              <span>{pixCopied ? 'Chave Copiada!' : 'Copiar Chave PIX'}</span>
                            </button>
                          </div>

                          <div className="pix-timer-alert">
                            <Clock size={15} />
                            <span>O QR Code expira em 15 minutos após a confirmação.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPTION 3: BOLETO */}
                  {paymentMethod === 'boleto' && (
                    <div className="boleto-panel-view">
                      <div className="boleto-info-card">
                        <Barcode size={36} className="boleto-icon-lead" />
                        <div>
                          <h4>Pagamento via Boleto Bancário</h4>
                          <p>
                            O boleto será gerado após clicar em <strong>Confirmar Pedido</strong>. Você poderá imprimi-lo ou pagar usando o código de barras no seu internet banking.
                          </p>
                          <ul className="boleto-bullet-list">
                            <li>Prazo de compensação: de 1 a 2 dias úteis após o pagamento.</li>
                            <li>Vencimento em 3 dias corridos.</li>
                            <li>O envio do pedido será realizado logo após a confirmação da compensação.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </main>

            {/* Right Column: Order Summary Card (Sticky) */}
            <aside className="checkout-summary-column" aria-label="Resumo do Pedido">
              <div className="summary-sticky-container">
                <div className="summary-head-row">
                  <h2 className="summary-title">Resumo do Pedido</h2>
                  <span className="summary-badge-count">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {/* Items Mini-List */}
                <div className="summary-items-scroll">
                  {items.map((item) => (
                    <div key={item.id} className="summary-product-item">
                      <div className="item-thumb-wrapper">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="item-thumb-img"
                        />
                        <span className="item-qty-bubble">{item.quantity}</span>
                      </div>
                      <div className="item-details-meta">
                        <h4 className="item-name">{item.name}</h4>
                        <span className="item-cat-label">{item.category}</span>
                      </div>
                      <span className="item-price-val">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown Lines */}
                <div className="summary-breakdown-lines">
                  <div className="breakdown-line">
                    <span className="line-label">Subtotal dos produtos</span>
                    <span className="line-val">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="breakdown-line">
                    <span className="line-label">Frete e Envio</span>
                    <span className="line-val">
                      {shippingCost === 0 ? (
                        <strong className="free-frete-text">Grátis</strong>
                      ) : (
                        `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                      )}
                    </span>
                  </div>

                  {pixDiscount > 0 && (
                    <div className="breakdown-line discount-highlight">
                      <span className="line-label">Desconto PIX (5% OFF)</span>
                      <span className="line-val">- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="summary-separator-line" />

                  <div className="summary-final-total-row">
                    <div className="total-text-col">
                      <span className="total-lead-label">Valor Total</span>
                      <span className="installments-hint">
                        {paymentMethod === 'credit'
                          ? `Em até ${installments}x de R$ ${(total / installments).toFixed(2).replace('.', ',')} sem juros`
                          : paymentMethod === 'pix'
                          ? 'À vista com 5% de desconto via PIX'
                          : 'Pagamento à vista'}
                      </span>
                    </div>
                    <span className="total-final-amount">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Confirm Button */}
                <button
                  type="button"
                  className={`checkout-submit-order-btn ${isSubmitting ? 'submitting' : ''}`}
                  onClick={handleFinalize}
                  disabled={isSubmitting}
                  id="btn-confirm-checkout"
                >
                  {isSubmitting ? (
                    <span className="btn-spinner-content">
                      <span className="btn-spinner" />
                      <span>Processando pedido...</span>
                    </span>
                  ) : (
                    <span className="btn-normal-content">
                      <Lock size={18} />
                      <span>Confirmar e Finalizar Pedido</span>
                    </span>
                  )}
                </button>

                {/* Trust and Safety Badges */}
                <div className="checkout-trust-guarantees">
                  <div className="trust-item">
                    <ShieldCheck size={18} className="trust-icon" />
                    <div className="trust-desc">
                      <strong>Compra 100% Protegida</strong>
                      <span>Seus dados financeiros não são armazenados.</span>
                    </div>
                  </div>

                  <div className="trust-item">
                    <Package size={18} className="trust-icon" />
                    <div className="trust-desc">
                      <strong>Garantia PetConnect</strong>
                      <span>Troca e devolução grátis em até 30 dias.</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Address Edit / Add Modal */}
      {isAddressModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddressModalOpen(false)}>
          <div
            className="checkout-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-address-title"
          >
            <div className="modal-top-header">
              <h3 id="modal-address-title">
                {editingAddress ? 'Editar Endereço' : 'Cadastrar Novo Endereço'}
              </h3>
              <button
                type="button"
                className="modal-close-x-btn"
                onClick={() => setIsAddressModalOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="modal-form-content">
              <div className="modal-field-group">
                <label htmlFor="modal-label">Identificação do local (ex: Casa, Trabalho, Mãe) *</label>
                <input
                  id="modal-label"
                  type="text"
                  required
                  placeholder="Ex: Minha Casa"
                  value={modalAddrLabel}
                  onChange={(e) => setModalAddrLabel(e.target.value)}
                />
              </div>

              <div className="modal-two-cols">
                <div className="modal-field-group">
                  <label htmlFor="modal-zip">CEP *</label>
                  <input
                    id="modal-zip"
                    type="text"
                    required
                    placeholder="01310-100"
                    value={modalAddrZip}
                    onChange={(e) => setModalAddrZip(e.target.value)}
                  />
                </div>
                <div className="modal-field-group">
                  <label htmlFor="modal-neighborhood">Bairro *</label>
                  <input
                    id="modal-neighborhood"
                    type="text"
                    required
                    placeholder="Bela Vista"
                    value={modalAddrNeighborhood}
                    onChange={(e) => setModalAddrNeighborhood(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-two-cols-uneven">
                <div className="modal-field-group grow">
                  <label htmlFor="modal-street">Rua / Avenida *</label>
                  <input
                    id="modal-street"
                    type="text"
                    required
                    placeholder="Av. Paulista"
                    value={modalAddrStreet}
                    onChange={(e) => setModalAddrStreet(e.target.value)}
                  />
                </div>
                <div className="modal-field-group small">
                  <label htmlFor="modal-number">Número *</label>
                  <input
                    id="modal-number"
                    type="text"
                    required
                    placeholder="1000"
                    value={modalAddrNumber}
                    onChange={(e) => setModalAddrNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-two-cols">
                <div className="modal-field-group">
                  <label htmlFor="modal-comp">Complemento (Apto, Bloco)</label>
                  <input
                    id="modal-comp"
                    type="text"
                    placeholder="Apt 42"
                    value={modalAddrComplement}
                    onChange={(e) => setModalAddrComplement(e.target.value)}
                  />
                </div>
                <div className="modal-field-group">
                  <label htmlFor="modal-city">Cidade / Estado *</label>
                  <input
                    id="modal-city"
                    type="text"
                    required
                    placeholder="São Paulo - SP"
                    value={`${modalAddrCity} - ${modalAddrState}`}
                    onChange={(e) => {
                      const parts = e.target.value.split('-');
                      setModalAddrCity(parts[0]?.trim() || e.target.value);
                      if (parts[1]) setModalAddrState(parts[1].trim());
                    }}
                  />
                </div>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="modal-btn-save">
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
