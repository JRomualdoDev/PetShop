import React, { useState } from 'react';
import { Heart, X, CheckCircle2, ShieldCheck, QrCode, CreditCard, FileText } from 'lucide-react';
import { CauseCard } from '../components/causes/CauseCard';
import { COMMUNITY_CAUSES } from '../data/mockData';
import type { CauseItem } from '../types';
import './CausesPage.css';

interface CausesPageProps {
  onShowToast?: (message: string) => void;
}

export const CausesPage: React.FC<CausesPageProps> = ({ onShowToast }) => {
  const [causes, setCauses] = useState<CauseItem[]>(COMMUNITY_CAUSES);
  const [selectedCause, setSelectedCause] = useState<CauseItem | null>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const m = sp.get('modal');
      if (m) {
        return COMMUNITY_CAUSES.find((c) => c.id === m) || COMMUNITY_CAUSES[0];
      }
    }
    return null;
  });
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'boleto'>('pix');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  const presetAmounts = [20, 50, 100, 200];

  const handleOpenDonateModal = (cause: CauseItem) => {
    setSelectedCause(cause);
    setDonationAmount(50);
    setCustomAmount('');
    setPaymentMethod('pix');
    setDonorName('');
    setDonorEmail('');
    setIsAnonymous(false);
    setDonationSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedCause(null);
    setDonationSuccess(false);
  };

  const handleSelectPreset = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setDonationAmount(num);
    }
  };

  const handleConfirmDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCause || donationAmount <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Update cause amount in state
      setCauses((prev) =>
        prev.map((c) =>
          c.id === selectedCause.id
            ? { ...c, currentAmount: c.currentAmount + donationAmount }
            : c
        )
      );

      setIsSubmitting(false);
      setDonationSuccess(true);
      if (onShowToast) {
        onShowToast(`Doação de R$ ${donationAmount} realizada com sucesso para "${selectedCause.title}"! 💚`);
      }
    }, 900);
  };

  return (
    <div className="desktop-causes-page" id="causes-page-view">
      <div className="causes-page-container">
        {/* Page Header */}
        <header className="causes-page-header">
          <h1 className="causes-main-title">
            Ajude uma causa <span className="heart-emoji">💚</span>
          </h1>
          <p className="causes-subtitle">
            Apoie campanhas e organizações locais que lutam diariamente pela proteção e bem-estar dos animais.
          </p>
        </header>

        {/* 3-Column Causes Grid */}
        <div className="causes-grid">
          {causes.map((cause) => (
            <CauseCard
              key={cause.id}
              cause={cause}
              onDonate={handleOpenDonateModal}
            />
          ))}
        </div>
      </div>

      {/* Interactive Donation Modal */}
      {selectedCause && (
        <div className="donation-modal-overlay" onClick={handleCloseModal}>
          <div
            className="donation-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-cause-title"
          >
            <button
              type="button"
              className="donation-modal-close"
              onClick={handleCloseModal}
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>

            {!donationSuccess ? (
              <form onSubmit={handleConfirmDonation} className="donation-form">
                <div className="donation-modal-header">
                  <div className="modal-icon-badge">
                    <Heart size={20} className="modal-heart-icon" />
                  </div>
                  <div>
                    <h2 className="modal-title" id="modal-cause-title">
                      Apoiar Campanha
                    </h2>
                    <p className="modal-subtitle">
                      Sua contribuição faz a diferença direta no cuidado animal.
                    </p>
                  </div>
                </div>

                {/* Selected Cause Mini Card */}
                <div className="modal-cause-summary">
                  <img
                    src={selectedCause.imageUrl}
                    alt={selectedCause.title}
                    className="modal-cause-thumb"
                  />
                  <div className="modal-cause-info">
                    <span className="modal-cause-org">
                      {selectedCause.organization}
                    </span>
                    <strong className="modal-cause-name">
                      {selectedCause.title}
                    </strong>
                    <div className="modal-cause-metric">
                      <span>
                        Meta: R$ {selectedCause.targetAmount.toLocaleString('pt-BR')}
                      </span>
                      <span>
                        Arrecadado: R$ {selectedCause.currentAmount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Donation Value Selection */}
                <div className="form-section">
                  <label className="section-label">Selecione o valor do apoio:</label>
                  <div className="preset-amounts-grid">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`preset-btn ${donationAmount === amt && !customAmount ? 'active' : ''}`}
                        onClick={() => handleSelectPreset(amt)}
                      >
                        R$ {amt}
                      </button>
                    ))}
                  </div>

                  <div className="custom-amount-field">
                    <span className="currency-prefix">R$</span>
                    <input
                      type="text"
                      className="custom-amount-input"
                      placeholder="Outro valor"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="form-section">
                  <label className="section-label">Forma de contribuição:</label>
                  <div className="payment-methods-grid">
                    <button
                      type="button"
                      className={`payment-method-btn ${paymentMethod === 'pix' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('pix')}
                    >
                      <QrCode size={18} />
                      <span>PIX (Instantâneo)</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method-btn ${paymentMethod === 'cartao' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cartao')}
                    >
                      <CreditCard size={18} />
                      <span>Cartão</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method-btn ${paymentMethod === 'boleto' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('boleto')}
                    >
                      <FileText size={18} />
                      <span>Boleto</span>
                    </button>
                  </div>
                </div>

                {/* Donor Details */}
                <div className="form-section">
                  <label className="section-label">Dados do Apoiador:</label>
                  <div className="donor-fields-group">
                    <input
                      type="text"
                      className="donor-input"
                      placeholder="Seu nome completo"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required={!isAnonymous}
                      disabled={isAnonymous}
                    />
                    <input
                      type="email"
                      className="donor-input"
                      placeholder="E-mail para envio do recibo"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                    />
                  </div>

                  <label className="anonymous-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <span>Desejo doar de forma anônima (sem exibir meu nome publicamente)</span>
                  </label>
                </div>

                {/* Trust Badge */}
                <div className="modal-trust-badge">
                  <ShieldCheck size={16} className="trust-shield-icon" />
                  <span>Transação 100% segura criptografada de ponta a ponta.</span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="modal-submit-btn"
                  disabled={isSubmitting || donationAmount <= 0}
                >
                  {isSubmitting ? (
                    <span className="submit-spinner">Processando apoio...</span>
                  ) : (
                    `Confirmar Doação de R$ ${donationAmount.toLocaleString('pt-BR')}`
                  )}
                </button>
              </form>
            ) : (
              <div className="donation-success-view">
                <div className="success-icon-badge">
                  <CheckCircle2 size={44} className="success-check-icon" />
                </div>
                <h3 className="success-title">Muito obrigado pelo seu apoio! 💚</h3>
                <p className="success-message">
                  Sua contribuição de{' '}
                  <strong>R$ {donationAmount.toLocaleString('pt-BR')}</strong> para{' '}
                  <strong>"{selectedCause.title}"</strong> foi confirmada. Juntos salvamos vidas e
                  fortalecemos o bem-estar animal!
                </p>
                <div className="success-receipt-info">
                  <span>Comprovante enviado para: <strong>{donorEmail || 'seu e-mail'}</strong></span>
                </div>
                <button
                  type="button"
                  className="success-close-btn"
                  onClick={handleCloseModal}
                >
                  Concluir e Voltar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
