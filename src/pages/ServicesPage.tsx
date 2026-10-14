import React, { useState } from 'react';
import { MapPin, ChevronDown, Check, X, Star } from 'lucide-react';
import { ServiceCard } from '../components/home/ServiceCard';
import { SERVICES_CATALOG, SERVICE_CATEGORIES } from '../data/mockData';
import type { ServiceItem } from '../types';
import './ServicesPage.css';

interface ServicesPageProps {
  onBookService?: (serviceId: string) => void;
}

const AVAILABLE_LOCATIONS = [
  'Pinheiros, São Paulo',
  'Vila Madalena, São Paulo',
  'Moema, São Paulo',
  'Jardins, São Paulo',
  'Itaim Bibi, São Paulo',
  'Perdizes, São Paulo',
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('veterinarios');
  const [selectedLocation, setSelectedLocation] = useState<string>('Pinheiros, São Paulo');
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // In the Figma design (servicos.png), the "Veterinários" pill is active,
  // and the grid displays the 6 featured multi-category cards.
  // Clicking other pills filters dynamically.
  const displayedServices =
    selectedCategory === 'veterinarios'
      ? SERVICES_CATALOG
      : SERVICES_CATALOG.filter((s) => s.category === selectedCategory);

  const handleSelectLocation = (loc: string) => {
    setSelectedLocation(loc);
    setIsLocationMenuOpen(false);
  };

  return (
    <div className="desktop-services-page" id="desktop-services-screen">
      <div className="services-page-container">
        {/* Page Header Row: Title & Subtitle on Left, Location Dropdown on Right */}
        <header className="services-header-row">
          <div className="services-title-col">
            <h1 className="services-main-title">Serviços Profissionais</h1>
            <p className="services-sub-title">
              Selecione o profissional ou clínica ideal para a saúde e bem-estar do seu amigo.
            </p>
          </div>

          {/* Location Selector */}
          <div className="services-location-wrapper">
            <button
              type="button"
              className="location-selector-btn"
              onClick={() => setIsLocationMenuOpen((prev) => !prev)}
              aria-expanded={isLocationMenuOpen}
              aria-label="Selecionar localização"
            >
              <MapPin size={17} className="location-pin-icon" strokeWidth={2.5} />
              <span className="location-text">{selectedLocation}</span>
              <ChevronDown size={16} className={`location-arrow-icon ${isLocationMenuOpen ? 'open' : ''}`} />
            </button>

            {isLocationMenuOpen && (
              <div className="location-dropdown-card" role="menu">
                <div className="location-dropdown-header">Escolha sua região</div>
                <ul className="location-dropdown-list">
                  {AVAILABLE_LOCATIONS.map((loc) => {
                    const isCurrent = loc === selectedLocation;
                    return (
                      <li key={loc}>
                        <button
                          type="button"
                          className={`location-dropdown-item ${isCurrent ? 'selected' : ''}`}
                          onClick={() => handleSelectLocation(loc)}
                        >
                          <span>{loc}</span>
                          {isCurrent && <Check size={16} className="loc-check-icon" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Category Filter Pills Row */}
        <nav className="services-categories-row" aria-label="Filtro de categorias de serviços">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`service-cat-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Services Grid (3 Columns) */}
        <section className="services-grid-section" aria-label="Lista de profissionais e clínicas">
          {displayedServices.length > 0 ? (
            <div className="services-grid">
              {displayedServices.map((service: ServiceItem) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBook={onBookService}
                />
              ))}
            </div>
          ) : (
            <div className="services-empty-state">
              <p className="empty-state-title">Nenhum profissional encontrado nesta categoria em {selectedLocation}.</p>
              <p className="empty-state-desc">Tente selecionar outra categoria ou visualizar todas as opções disponíveis.</p>
              <button
                type="button"
                className="empty-state-reset-btn"
                onClick={() => setSelectedCategory('veterinarios')}
              >
                Ver todos os serviços
              </button>
            </div>
          )}
        </section>

        {/* Map Promotion Banner */}
        <aside className="services-map-banner" aria-label="Visualização em mapa interativo">
          <div className="map-banner-content-col">
            <h2 className="map-banner-title">Prefere visualizar os serviços no mapa?</h2>
            <p className="map-banner-description">
              Visualize clínicas 24 horas, pet shops locais e passeadores em tempo real na sua região com a nossa ferramenta integrada de mapa interativo.
            </p>
            <button
              type="button"
              className="map-banner-cta-btn"
              onClick={() => setIsMapModalOpen(true)}
              id="btn-open-interactive-map"
            >
              Abrir mapa interativo
            </button>
          </div>

          <div className="map-banner-graphic-col">
            <img
              src="/images/desktop/services-map-illustration.png"
              alt="Ilustração do mapa de serviços com pontos interativos"
              className="map-banner-illustration"
            />
          </div>
        </aside>
      </div>

      {/* Interactive Map Modal */}
      {isMapModalOpen && (
        <div className="map-modal-backdrop" onClick={() => setIsMapModalOpen(false)}>
          <div
            className="map-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-modal-title"
          >
            <div className="map-modal-header">
              <div className="map-modal-title-box">
                <MapPin size={20} className="modal-pin-icon" />
                <h3 id="map-modal-title">Mapa Interativo — {selectedLocation}</h3>
              </div>
              <button
                type="button"
                className="map-modal-close-btn"
                onClick={() => setIsMapModalOpen(false)}
                aria-label="Fechar mapa"
              >
                <X size={20} />
              </button>
            </div>

            <div className="map-modal-body">
              <div className="simulated-map-canvas">
                <img
                  src="/images/desktop/services-map-illustration.png"
                  alt="Visão ampla do mapa"
                  className="modal-map-bg-img"
                />

                {/* Simulated Pins */}
                <div className="map-pin-badge pin-1" title="Dr. Gustavo Silva">
                  <span className="pin-dot">🐾</span>
                  <span className="pin-label">Dr. Gustavo (1.2 km)</span>
                </div>
                <div className="map-pin-badge pin-2" title="Clínica VetVida 24h">
                  <span className="pin-dot">🏥</span>
                  <span className="pin-label">VetVida 24h (3.4 km)</span>
                </div>
                <div className="map-pin-badge pin-3" title="Pet Shop Amigo Fiel">
                  <span className="pin-dot">✂️</span>
                  <span className="pin-label">Amigo Fiel (2.5 km)</span>
                </div>
              </div>

              <div className="map-modal-sidebar">
                <h4 className="sidebar-title">Profissionais próximos</h4>
                <div className="sidebar-services-list">
                  {SERVICES_CATALOG.slice(0, 3).map((item) => (
                    <div key={item.id} className="sidebar-service-item">
                      <div className="sidebar-item-info">
                        <strong>{item.name}</strong>
                        <div className="sidebar-item-sub">
                          <Star size={13} className="star-icon" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="dist">• {item.distance}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="sidebar-item-btn"
                        onClick={() => {
                          setIsMapModalOpen(false);
                          if (onBookService) onBookService(item.id);
                        }}
                      >
                        Agendar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
