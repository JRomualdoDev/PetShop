import React, { useState } from 'react';
import { MapPin, ChevronDown, Check, X, Heart } from 'lucide-react';
import { PetCard } from '../components/adoption/PetCard';
import { ADOPTION_PETS, ADOPTION_CATEGORIES } from '../data/mockData';
import type { PetItem } from '../types';
import './AdoptionPage.css';

interface AdoptionPageProps {
  onSelectPet?: (petId: string) => void;
  onAdoptRequest?: (pet: PetItem) => void;
}

const LOCATION_OPTIONS = [
  'São Paulo - SP',
  'Rio de Janeiro - RJ',
  'Belo Horizonte - MG',
  'Curitiba - PR',
  'Porto Alegre - RS',
  'Campinas - SP',
  'Todas as regiões',
];

export const AdoptionPage: React.FC<AdoptionPageProps> = ({
  onSelectPet,
  onAdoptRequest,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('todos');
  const [selectedLocation, setSelectedLocation] = useState<string>('São Paulo - SP');
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState<boolean>(false);
  const [adoptingPet, setAdoptingPet] = useState<PetItem | null>(null);
  const [adoptionSubmitted, setAdoptionSubmitted] = useState<boolean>(false);

  // In the Figma reference, "Todos" is active and all 8 pets are shown in the grid.
  // When a specific filter is clicked, filter appropriately.
  const filteredPets = ADOPTION_PETS.filter((pet) => {
    // Species filter
    if (selectedSpecies !== 'todos' && pet.species !== selectedSpecies) {
      return false;
    }
    // Location filter (if not "Todas as regiões" and user explicitly filtered location,
    // note that in Figma "São Paulo - SP" is displayed as the filter label while all 8 pets are visible.
    // To match Figma's exact 8-pet visual display, if selectedLocation === 'São Paulo - SP' and selectedSpecies === 'todos',
    // we show all 8 pets. If user picks another city, filter by location).
    if (selectedLocation !== 'São Paulo - SP' && selectedLocation !== 'Todas as regiões') {
      return pet.location === selectedLocation;
    }
    return true;
  });

  const handleOpenAdoptModal = (petId: string) => {
    const pet = ADOPTION_PETS.find((p) => p.id === petId) || null;
    setAdoptingPet(pet);
    setAdoptionSubmitted(false);
  };

  const handleCloseModal = () => {
    setAdoptingPet(null);
    setAdoptionSubmitted(false);
  };

  const handleSubmitAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    if (adoptingPet && onAdoptRequest) {
      onAdoptRequest(adoptingPet);
    }
    setAdoptionSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  return (
    <div className="desktop-adoption-page" id="desktop-adoption-screen">
      <div className="adoption-page-container">
        {/* Page Title & Subtitle */}
        <header className="adoption-header-section">
          <h1 className="adoption-main-title">Encontre um novo amigo 🐾</h1>
          <p className="adoption-sub-title">
            Animais esperando por um lar amoroso e uma nova família.
          </p>

          {/* Unified Filter Bar Card */}
          <div className="adoption-filter-bar-card">
            {/* Species Filter Pills */}
            <div className="species-pills-group" role="tablist" aria-label="Filtrar espécies">
              {ADOPTION_CATEGORIES.map((cat) => {
                const isActive = selectedSpecies === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`species-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedSpecies(cat.id)}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Location Filter Dropdown */}
            <div className="adoption-location-filter-wrapper">
              <button
                type="button"
                className="adoption-location-btn"
                onClick={() => setIsLocationMenuOpen((prev) => !prev)}
                aria-expanded={isLocationMenuOpen}
                aria-label="Filtrar animais por localização"
              >
                <MapPin size={16} className="filter-pin-icon" strokeWidth={2.2} />
                <span className="location-btn-text">
                  Filtrar por localização: <strong>{selectedLocation}</strong>
                </span>
                <ChevronDown
                  size={16}
                  className={`filter-chevron-icon ${isLocationMenuOpen ? 'open' : ''}`}
                />
              </button>

              {isLocationMenuOpen && (
                <div className="adoption-location-dropdown-card" role="menu">
                  <div className="dropdown-label">Região desejada</div>
                  <ul className="dropdown-menu-list">
                    {LOCATION_OPTIONS.map((loc) => {
                      const isCurrent = loc === selectedLocation;
                      return (
                        <li key={loc}>
                          <button
                            type="button"
                            className={`dropdown-menu-item ${isCurrent ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setIsLocationMenuOpen(false);
                            }}
                          >
                            <span>{loc}</span>
                            {isCurrent && <Check size={16} className="check-icon" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 8-Pet Grid (4 Columns) */}
        <section className="adoption-grid-section" aria-label="Lista de pets para adoção">
          {filteredPets.length > 0 ? (
            <div className="adoption-pets-grid">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onAdopt={handleOpenAdoptModal}
                  onSelectPet={onSelectPet}
                />
              ))}
            </div>
          ) : (
            <div className="adoption-empty-state">
              <p className="empty-title">Nenhum pet encontrado com os filtros selecionados.</p>
              <p className="empty-desc">
                Que tal expandir sua busca para ver todos os nossos companheiros disponíveis?
              </p>
              <button
                type="button"
                className="empty-reset-btn"
                onClick={() => {
                  setSelectedSpecies('todos');
                  setSelectedLocation('São Paulo - SP');
                }}
              >
                Mostrar todos os pets
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Adoption Interest Modal */}
      {adoptingPet && (
        <div className="adoption-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="adoption-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="adopt-modal-title"
          >
            <div className="adoption-modal-header">
              <div className="adopt-modal-title-box">
                <Heart size={20} className="modal-heart-icon" />
                <h3 id="adopt-modal-title">Formulário de Adoção — {adoptingPet.name}</h3>
              </div>
              <button
                type="button"
                className="adopt-modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="adoption-modal-body">
              {adoptionSubmitted ? (
                <div className="adoption-success-view">
                  <div className="success-icon-badge">🐾</div>
                  <h4>Solicitação enviada com sucesso!</h4>
                  <p>
                    A ONG responsável por <strong>{adoptingPet.name}</strong> entrará em contato via WhatsApp com você em breve para agendar uma visita e entrevista.
                  </p>
                </div>
              ) : (
                <form className="adoption-form" onSubmit={handleSubmitAdoption}>
                  <div className="modal-pet-preview">
                    <img
                      src={adoptingPet.imageUrl}
                      alt={adoptingPet.name}
                      className="preview-pet-thumb"
                    />
                    <div className="preview-pet-info">
                      <strong>{adoptingPet.name}</strong> ({adoptingPet.gender})
                      <span className="preview-pet-meta">
                        {adoptingPet.breed} • {adoptingPet.age} • {adoptingPet.location}
                      </span>
                      <p className="preview-pet-desc">{adoptingPet.description}</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="adopter-name">Seu Nome Completo</label>
                    <input
                      id="adopter-name"
                      type="text"
                      defaultValue="Mariana da Silva"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="adopter-phone">WhatsApp / Telefone para contato</label>
                    <input
                      id="adopter-phone"
                      type="tel"
                      defaultValue="(11) 98765-4321"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="adopter-home">Tipo de Residência</label>
                    <select id="adopter-home" defaultValue="apartamento-telas">
                      <option value="casa-quintal">Casa com quintal seguro</option>
                      <option value="apartamento-telas">Apartamento com redes de proteção</option>
                      <option value="sitio">Chácara / Sítio</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="adopter-message">Mensagem para a ONG ou Protetor</label>
                    <textarea
                      id="adopter-message"
                      rows={3}
                      placeholder="Conte um pouco sobre sua rotina e experiência com pets..."
                      defaultValue="Olá! Gostaria muito de dar um lar cheio de carinho para o pet. Minha casa é telada e segura."
                    />
                  </div>

                  <div className="form-actions-row">
                    <button
                      type="button"
                      className="modal-cancel-btn"
                      onClick={handleCloseModal}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="modal-submit-btn">
                      Enviar solicitação de adoção
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
