import React, { useState } from 'react';
import { ChevronLeft, Share2, Star, MapPin, Phone, Mail } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './ServiceDetailScreen.css';

interface ServiceDetailScreenProps {
  onBack: () => void;
  onChat: () => void;
  onRequestService: () => void;
  onShowToast?: (message: string) => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  onBack,
  onChat,
  onRequestService,
  onShowToast,
}) => {
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedPetName, setSelectedPetName] = useState<string>('Rex');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-20');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Pet Estilo Banho & Tosa',
        text: 'Confira os serviços da Pet Estilo no PetConnect!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      if (onShowToast) onShowToast('Link do serviço copiado para a área de transferência!');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingModalOpen(false);
    onRequestService();
  };

  return (
    <div className="mobile-service-detail-screen" id="service-detail-screen-view">
      <StatusBar time="9:41" />

      {/* Top Header */}
      <header className="service-detail-header">
        <button
          type="button"
          className="service-nav-btn"
          onClick={onBack}
          aria-label="Voltar para a lista de serviços"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="service-header-title">Detalhes do Serviço</h1>
        <button
          type="button"
          className="service-nav-btn"
          onClick={handleShare}
          aria-label="Compartilhar serviço"
          title="Compartilhar"
        >
          <Share2 size={18} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="service-detail-content">
        {/* Clinic Photo */}
        <div className="service-banner-box">
          <img
            src="/images/mobile/service-detail-clinic.png"
            alt="Ambiente moderno da clínica Pet Estilo Banho & Tosa"
            className="service-banner-img"
          />
        </div>

        {/* Title & Ratings */}
        <section className="service-main-info">
          <h2 className="service-name-title">Pet Estilo Banho & Tosa</h2>

          <div className="service-rating-row">
            <Star size={16} className="service-star-icon" fill="#f59e0b" color="#f59e0b" />
            <span className="service-rating-val">4.8</span>
            <span className="service-reviews-val">(98 avaliações)</span>
          </div>

          <div className="service-location-row">
            <MapPin size={16} className="service-map-pin" />
            <span>Alameda dos Anapurus, 1420 - Jardins, SP</span>
          </div>
        </section>

        {/* About Section */}
        <section className="service-about-section">
          <h3 className="section-block-title">Sobre o Serviço</h3>
          <p className="service-description-text">
            Oferecemos tratamento vip para o seu melhor amigo. Banho com produtos hipoalergênicos, tosa higiênica e estilizada com profissionais calmos e extremamente atenciosos com todas as raças e portes.
          </p>
        </section>

        {/* Hours Card */}
        <section className="service-info-card">
          <h3 className="card-block-title">Horário de Atendimento</h3>
          <div className="info-key-val-row">
            <span className="key-label">Segunda a Sexta</span>
            <span className="val-label">08:00 - 18:00</span>
          </div>
          <div className="info-key-val-row">
            <span className="key-label">Sábado</span>
            <span className="val-label">08:00 - 14:00</span>
          </div>
        </section>

        {/* Contact Card */}
        <section className="service-info-card">
          <h3 className="card-block-title">Contato</h3>
          <div className="contact-row">
            <Phone size={16} className="contact-icon" />
            <span>(11) 98765-4321</span>
          </div>
          <div className="contact-row">
            <Mail size={16} className="contact-icon" />
            <span>contato@petestilo.com.br</span>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="service-sticky-footer">
        <div className="service-footer-actions">
          <button
            type="button"
            className="service-btn-chat"
            onClick={onChat}
          >
            Conversar
          </button>
          <button
            type="button"
            className="service-btn-book"
            onClick={() => setBookingModalOpen(true)}
          >
            Solicitar serviço
          </button>
        </div>
        <HomeIndicator />
      </footer>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="service-modal-backdrop" onClick={() => setBookingModalOpen(false)}>
          <div
            className="service-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="service-modal-title">Agendar Atendimento</h3>
            <p className="service-modal-sub">
              Pet Estilo Banho & Tosa • Jardins, SP
            </p>

            <form onSubmit={handleConfirmBooking}>
              <div className="modal-form-group">
                <label>Nome do Pet</label>
                <input
                  type="text"
                  value={selectedPetName}
                  onChange={(e) => setSelectedPetName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Data Preferencial</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>

              <div className="service-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setBookingModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="modal-confirm-btn">
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
