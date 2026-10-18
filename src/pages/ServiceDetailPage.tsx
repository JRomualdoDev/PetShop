import React, { useState } from 'react';
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Check,
  Calendar,
  MessageSquare,
  Share2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/mockData';
import type { ServiceItem, ServiceProcedure, NavPageId } from '../types';
import './ServiceDetailPage.css';

interface ServiceDetailPageProps {
  serviceId?: string;
  onBack: () => void;
  onChat: () => void;
  onRequestService?: (bookingInfo: {
    serviceName: string;
    procedureName: string;
    petName: string;
    date: string;
    time: string;
    price: number;
    isHomeService: boolean;
  }) => void;
  onShowToast?: (message: string) => void;
  onNavigate?: (page: NavPageId) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onBack,
  onChat,
  onRequestService,
  onShowToast,
  onNavigate,
}) => {
  // Find selected service or default to first service
  const currentService: ServiceItem =
    SERVICES_CATALOG.find((s) => s.id === serviceId) || SERVICES_CATALOG[0];

  const defaultProcedures = currentService.procedures || [
    {
      id: 'default-1',
      name: 'Atendimento Especializado Completo',
      description: 'Consulta e avaliação detalhada para a saúde e bem-estar do seu amigo.',
      duration: '45 min',
      price: 160.0,
    },
  ];

  const [selectedProcedure, setSelectedProcedure] = useState<ServiceProcedure>(defaultProcedures[0]);
  const [selectedPet, setSelectedPet] = useState<string>('Pipoca (Maltês)');
  const [isHomeServiceType, setIsHomeServiceType] = useState<boolean>(currentService.isHomeService);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-21');
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [notes, setNotes] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const timeSlots = ['09:00', '10:30', '11:45', '14:00', '15:30', '17:00'];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    if (onShowToast) {
      onShowToast('Link do serviço copiado para a área de transferência!');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingInfo = {
      serviceName: currentService.name,
      procedureName: selectedProcedure.name,
      petName: selectedPet,
      date: selectedDate,
      time: selectedTime,
      price: selectedProcedure.price,
      isHomeService: isHomeServiceType,
    };

    if (onRequestService) {
      onRequestService(bookingInfo);
    }

    if (onShowToast) {
      onShowToast(`Agendamento confirmado para ${selectedPet} com ${currentService.name.split(' - ')[0]}!`);
    }

    setIsSuccessModalOpen(true);
  };

  return (
    <div className="desktop-service-detail-page" id="desktop-service-detail-view">
      <div className="service-detail-container">
        {/* Top Breadcrumb & Back Bar */}
        <div className="service-detail-top-bar">
          <nav className="service-breadcrumb" aria-label="Navegação em trilha">
            <span
              className="service-breadcrumb-link"
              onClick={() => onNavigate && onNavigate('inicio')}
              role="button"
              tabIndex={0}
            >
              Início
            </span>
            <ChevronRight size={14} />
            <span
              className="service-breadcrumb-link"
              onClick={onBack}
              role="button"
              tabIndex={0}
            >
              Serviços Profissionais
            </span>
            <ChevronRight size={14} />
            <span className="service-breadcrumb-current">{currentService.name}</span>
          </nav>

          <button
            type="button"
            className="service-back-btn"
            onClick={onBack}
            id="btn-back-to-services"
          >
            <ChevronLeft size={16} />
            <span>Voltar para Serviços</span>
          </button>
        </div>

        {/* Hero Service Identity Card */}
        <section className="service-hero-card" aria-label="Informações Principais do Serviço">
          <div className="service-hero-media">
            <img
              src={currentService.imageUrl}
              alt={currentService.name}
              className="service-hero-img"
              onError={(e) => {
                (e.target as HTMLElement).src = '/images/desktop/service-vet-gustavo.png';
              }}
            />
            {currentService.crmv && (
              <span className="service-hero-badge">
                <ShieldCheck size={13} />
                {currentService.crmv}
              </span>
            )}
          </div>

          <div className="service-hero-info">
            <div className="service-hero-header-row">
              <div>
                <span className="service-category-tag">{currentService.categoryLabel}</span>
                <h1 className="service-hero-title">{currentService.name}</h1>
              </div>
            </div>

            <div className="service-rating-meta">
              <span className="service-rating-stars">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                {currentService.rating.toFixed(1)}
              </span>
              <span className="service-reviews-total">
                ({currentService.reviewsCount} avaliações verificadas)
              </span>
              <span className="service-distance-pill">
                <MapPin size={13} />
                {currentService.distance}
              </span>
            </div>

            <div className="service-contact-grid">
              <div className="service-contact-item">
                <MapPin size={15} />
                <span>{currentService.address || 'São Paulo - SP'}</span>
              </div>
              <div className="service-contact-item">
                <Clock size={15} />
                <span>{currentService.openingHours || 'Segunda a Sábado, 08:00 - 19:00'}</span>
              </div>
              {currentService.phone && (
                <div className="service-contact-item">
                  <Phone size={15} />
                  <span>{currentService.phone}</span>
                </div>
              )}
              {currentService.isHomeService && (
                <div className="service-contact-item highlight">
                  <Sparkles size={15} />
                  <span>Atendimento Domiciliar Disponível nesta região</span>
                </div>
              )}
            </div>

            <div className="service-hero-actions">
              <button
                type="button"
                className="btn-hero-schedule"
                onClick={() => {
                  const el = document.getElementById('booking-widget-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                id="btn-scroll-to-booking"
              >
                <Calendar size={16} />
                Agendar Horário Online
              </button>
              <button
                type="button"
                className="btn-hero-chat"
                onClick={onChat}
                id="btn-chat-with-provider"
              >
                <MessageSquare size={16} />
                Falar no Chat
              </button>
              <button
                type="button"
                className="btn-hero-share"
                onClick={handleShare}
                title="Compartilhar serviço"
                aria-label="Compartilhar serviço"
              >
                <Share2 size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Two-Column Desktop Grid */}
        <div className="service-body-grid">
          {/* Left Column: Procedures, Bio, Features, Reviews */}
          <div className="service-details-col">
            {/* Procedures Table */}
            <section className="service-section-box">
              <h2 className="service-section-title">
                <Sparkles size={18} color="var(--color-primary)" />
                Procedimentos Disponíveis &amp; Tabela de Valores
              </h2>
              <p className="service-description-text">
                Selecione o procedimento desejado abaixo para preencher o formulário de agendamento online:
              </p>

              <div className="procedures-list">
                {defaultProcedures.map((proc) => {
                  const isSelected = selectedProcedure.id === proc.id;
                  return (
                    <div
                      key={proc.id}
                      className={`procedure-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedProcedure(proc)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="procedure-info-side">
                        <h4 className="procedure-name">{proc.name}</h4>
                        <p className="procedure-desc">{proc.description}</p>
                        <span className="procedure-duration">
                          <Clock size={12} />
                          Duração média: {proc.duration}
                        </span>
                      </div>
                      <div className="procedure-price-side">
                        <div className="procedure-price-val">
                          R$ {proc.price.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="procedure-select-indicator">
                          {isSelected ? (
                            <>
                              <CheckCircle2 size={16} color="var(--color-primary)" />
                              <span>Selecionado</span>
                            </>
                          ) : (
                            <span>Clique para escolher</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* About / Description Box */}
            <section className="service-section-box">
              <h2 className="service-section-title">
                <ShieldCheck size={18} color="var(--color-primary)" />
                Sobre o Profissional &amp; Instalações
              </h2>
              <p className="service-description-text">
                {currentService.description ||
                  'Profissional altamente capacitado e dedicado ao bem-estar e cuidados integrais do seu animal de estimação. Infraestrutura completa com equipamentos modernos e protocolos sanitários rigorosos.'}
              </p>

              {currentService.features && (
                <div className="service-features-grid">
                  {currentService.features.map((feat, index) => (
                    <div key={index} className="service-feature-item">
                      <Check size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Reviews Section */}
            {currentService.reviews && currentService.reviews.length > 0 && (
              <section className="service-section-box">
                <h2 className="service-section-title">
                  <Star size={18} color="#f59e0b" fill="#f59e0b" />
                  Avaliações Recentes de Tutores
                </h2>

                <div className="service-reviews-list">
                  {currentService.reviews.map((rev) => (
                    <div key={rev.id} className="service-review-card">
                      <div className="service-review-header">
                        <div>
                          <strong className="service-review-author">{rev.author}</strong>
                          {rev.petName && (
                            <span className="service-review-pet">• Tutor de {rev.petName}</span>
                          )}
                        </div>
                        <div className="service-review-stars">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} size={13} fill="#f59e0b" />
                          ))}
                        </div>
                      </div>
                      <p className="service-review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <aside className="service-booking-widget" id="booking-widget-section">
            <div className="booking-widget-header">
              <h3 className="booking-widget-title">Agendamento Online</h3>
              <p className="booking-widget-subtitle">
                Escolha o horário e confirme em poucos segundos
              </p>
            </div>

            <form onSubmit={handleConfirmBooking} className="booking-form-fields">
              {/* Selected Procedure */}
              <div className="booking-field-group">
                <label className="booking-field-label" htmlFor="booking-proc-select">
                  Procedimento Selecionado
                </label>
                <select
                  id="booking-proc-select"
                  className="booking-select-input"
                  value={selectedProcedure.id}
                  onChange={(e) => {
                    const found = defaultProcedures.find((p) => p.id === e.target.value);
                    if (found) setSelectedProcedure(found);
                  }}
                >
                  {defaultProcedures.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - R$ {p.price.toFixed(2).replace('.', ',')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pet Selection */}
              <div className="booking-field-group">
                <label className="booking-field-label" htmlFor="booking-pet-select">
                  Qual pet será atendido?
                </label>
                <select
                  id="booking-pet-select"
                  className="booking-select-input"
                  value={selectedPet}
                  onChange={(e) => setSelectedPet(e.target.value)}
                >
                  <option value="Pipoca (Maltês)">Pipoca (Cão Maltês - 1.5 anos)</option>
                  <option value="Luna (Siamês)">Luna (Gata Siamês - 3 anos)</option>
                  <option value="Outro Pet">Outro pet da família</option>
                </select>
              </div>

              {/* Service Type (Clinic vs Home) */}
              {currentService.isHomeService && (
                <div className="booking-field-group">
                  <label className="booking-field-label">Local do Atendimento</label>
                  <div className="booking-type-toggle">
                    <button
                      type="button"
                      className={`booking-type-btn ${!isHomeServiceType ? 'active' : ''}`}
                      onClick={() => setIsHomeServiceType(false)}
                    >
                      No Consultório
                    </button>
                    <button
                      type="button"
                      className={`booking-type-btn ${isHomeServiceType ? 'active' : ''}`}
                      onClick={() => setIsHomeServiceType(true)}
                    >
                      Em Domicílio 🏡
                    </button>
                  </div>
                </div>
              )}

              {/* Date Input */}
              <div className="booking-field-group">
                <label className="booking-field-label" htmlFor="booking-date-input">
                  Data do Atendimento
                </label>
                <input
                  id="booking-date-input"
                  type="date"
                  className="booking-text-input"
                  value={selectedDate}
                  min="2026-10-18"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>

              {/* Time Slots Grid */}
              <div className="booking-field-group">
                <label className="booking-field-label">Horários Disponíveis</label>
                <div className="booking-time-grid">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`booking-time-slot ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div className="booking-field-group">
                <label className="booking-field-label" htmlFor="booking-notes-input">
                  Observações ou Sintomas (Opcional)
                </label>
                <input
                  id="booking-notes-input"
                  type="text"
                  placeholder="Ex: Vacina anual de rotina, muito calmo"
                  className="booking-text-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Price Summary */}
              <div className="booking-price-summary">
                <div className="booking-price-row">
                  <span>Procedimento ({selectedProcedure.duration})</span>
                  <span>R$ {selectedProcedure.price.toFixed(2).replace('.', ',')}</span>
                </div>
                {isHomeServiceType && (
                  <div className="booking-price-row">
                    <span>Taxa de deslocamento domiciliar</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>Grátis (Cortesia)</span>
                  </div>
                )}
                <div className="booking-price-row total">
                  <span>Total</span>
                  <span>R$ {selectedProcedure.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn-confirm-booking" id="btn-submit-booking-order">
                <Check size={18} />
                Confirmar Agendamento
              </button>

              <div className="booking-guarantee-note">
                <ShieldCheck size={14} />
                <span>Cancelamento grátis até 24h antes • Pagamento seguro</span>
              </div>
            </form>
          </aside>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      {isSuccessModalOpen && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="logout-modal-content" style={{ padding: '36px 28px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: '8px' }}>
                Agendamento Confirmado!
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--color-slate-500)', lineHeight: '1.5', marginBottom: '24px' }}>
                Seu agendamento com <strong>{currentService.name}</strong> para <strong>{selectedPet}</strong> foi realizado com sucesso para{' '}
                <strong>{selectedDate} às {selectedTime}</strong>.
              </p>

              <div
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  marginBottom: '24px',
                  fontSize: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  textAlign: 'left',
                }}
              >
                <div><strong>Procedimento:</strong> {selectedProcedure.name}</div>
                <div><strong>Formato:</strong> {isHomeServiceType ? 'Em Domicílio' : 'No Consultório'}</div>
                <div><strong>Valor:</strong> R$ {selectedProcedure.price.toFixed(2).replace('.', ',')}</div>
              </div>

              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button
                  type="button"
                  className="btn-modal-cancel"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    onBack();
                  }}
                >
                  Voltar para Serviços
                </button>
                <button
                  type="button"
                  className="btn-modal-confirm"
                  style={{ flex: 1.2 }}
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    if (onNavigate) onNavigate('perfil');
                  }}
                >
                  Ver no Meu Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;
