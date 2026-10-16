import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Check, X, Heart } from 'lucide-react';
import { ADOPTION_PETS, RECOMMENDED_PETS_DETAIL } from '../data/mockData';
import type { PetItem } from '../types';
import './PetDetailPage.css';

interface PetDetailPageProps {
  pet?: PetItem;
  onBack: () => void;
  onAdoptRequest?: (pet: PetItem) => void;
  onSelectPet?: (petId: string) => void;
}

export const PetDetailPage: React.FC<PetDetailPageProps> = ({
  pet: initialPet,
  onBack,
  onAdoptRequest,
  onSelectPet,
}) => {
  // Default to Luna matching design/Desktop/detalhes-do-animal.png
  const defaultLuna = ADOPTION_PETS.find((p) => p.id === 'luna') || ADOPTION_PETS[3];
  const pet = initialPet || defaultLuna;

  const galleryImages = pet.galleryImages || [
    '/images/desktop/pet-detail-luna-thumb-1.png',
    '/images/desktop/pet-detail-luna-thumb-2.png',
    '/images/desktop/pet-detail-luna-thumb-3.png',
  ];

  const [selectedImage, setSelectedImage] = useState<string>(
    pet.detailImageUrl || pet.imageUrl || '/images/desktop/pet-detail-luna-main.png'
  );
  const [selectedThumbIndex, setSelectedThumbIndex] = useState<number>(0);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState<boolean>(false);
  const [adoptionSubmitted, setAdoptionSubmitted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    setSelectedImage(pet.detailImageUrl || pet.imageUrl || '/images/desktop/pet-detail-luna-main.png');
    setSelectedThumbIndex(0);
  }, [pet.id, pet.detailImageUrl, pet.imageUrl]);

  const handleThumbClick = (index: number, imgSrc: string) => {
    setSelectedThumbIndex(index);
    setSelectedImage(imgSrc);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const handleOpenAdoptModal = () => {
    setIsAdoptModalOpen(true);
    setAdoptionSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsAdoptModalOpen(false);
    setAdoptionSubmitted(false);
  };

  const handleSubmitAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdoptRequest) {
      onAdoptRequest(pet);
    }
    setAdoptionSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  const healthBadges = pet.healthBadges || [
    'Vacinada',
    'Castrada',
    'Vermifugada',
    'FIV/FELV Negativo',
  ];

  return (
    <div className="desktop-pet-detail-page" id="desktop-pet-detail-screen">
      <div className="pet-detail-container">
        {/* Back Link */}
        <div className="pet-detail-back-bar">
          <button
            type="button"
            className="pet-detail-back-btn"
            onClick={onBack}
            aria-label="Voltar para lista de adoção"
          >
            <ChevronLeft size={20} className="pet-back-icon" />
            <span>Voltar para lista de adoção</span>
          </button>
        </div>

        {/* 2-Column Hero Section */}
        <div className="pet-detail-hero-grid">
          {/* Left Column: Main Image & Thumbnail Gallery */}
          <div className="pet-gallery-column">
            <div className="pet-main-image-wrapper">
              <img
                src={selectedImage}
                alt={pet.name}
                className="pet-main-image"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="pet-thumbnails-row" role="tablist" aria-label="Galeria de fotos do animal">
              {galleryImages.map((thumbSrc, idx) => {
                const isActive = selectedThumbIndex === idx;
                return (
                  <button
                    key={thumbSrc}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`pet-thumbnail-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleThumbClick(idx, thumbSrc)}
                  >
                    <img
                      src={thumbSrc}
                      alt={`${pet.name} foto miniatura ${idx + 1}`}
                      className="pet-thumbnail-img"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Pet Information, Badges & CTAs */}
          <div className="pet-info-column">
            {/* Gender & Age Category Pill Tag */}
            <div className="pet-gender-age-tag">
              {pet.gender} • {pet.ageCategory || 'Jovem'}
            </div>

            {/* Main Title Heading */}
            <h1 className="pet-detail-title">{pet.name}</h1>

            {/* Location & Rescue Foundation */}
            <div className="pet-location-rescue-row">
              <span className="pet-location-text">
                <MapPin size={17} className="pet-pin-icon" />
                <strong>{pet.location}</strong>
              </span>
              <span className="pet-rescue-text">
                ({pet.rescueInfo || 'Resgatada pela ONG Patas Livres'})
              </span>
            </div>

            <div className="pet-info-divider" />

            {/* About Section */}
            <div className="pet-about-section">
              <h2 className="pet-about-title">{pet.aboutTitle || `Sobre a ${pet.name}`}</h2>
              <p className="pet-about-description">
                {pet.longDescription ||
                  'A Luna é uma gatinha siamesa de 3 anos, extremamente dócil, carinhosa e tranquila. Ela adora tirar sonecas ao sol, receber carinho atrás das orelhas e convive muito bem com outros gatos. Ela já está castrada, vacinada com as principais vacinas e com teste fiv/felv negativo. Procura um lar seguro de apartamento telado.'}
              </p>
            </div>

            {/* Health & Care Badges */}
            <div className="pet-health-badges-row">
              {healthBadges.map((badge) => (
                <span key={badge} className="pet-health-badge-pill">
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pet-actions-row">
              <button
                type="button"
                className="pet-primary-adopt-btn"
                onClick={handleOpenAdoptModal}
              >
                Tenho interesse na adoção
              </button>

              <button
                type="button"
                className="pet-secondary-share-btn"
                onClick={handleShare}
              >
                {copiedLink ? (
                  <>
                    <Check size={18} />
                    <span>Link copiado!</span>
                  </>
                ) : (
                  <span>Compartilhar</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section: Outros pets que precisam de um lar */}
        <section className="other-pets-section" aria-label="Outros pets recomendados">
          <h2 className="other-pets-title">Outros pets que precisam de um lar</h2>

          <div className="other-pets-grid">
            {RECOMMENDED_PETS_DETAIL.map((recPet) => (
              <div key={recPet.id} className="other-pet-card">
                <div className="other-pet-image-box">
                  <img
                    src={recPet.imageUrl}
                    alt={recPet.name}
                    className="other-pet-image"
                  />
                </div>

                <div className="other-pet-card-body">
                  <div className="other-pet-header-row">
                    <h3 className="other-pet-name">{recPet.name}</h3>
                    <span className="other-pet-age">{recPet.age}</span>
                  </div>

                  <div className="other-pet-location-row">
                    <MapPin size={15} className="other-pet-pin" />
                    <span>{recPet.location}</span>
                  </div>

                  <div className="other-pet-card-divider" />

                  <button
                    type="button"
                    className="other-pet-view-profile-btn"
                    onClick={() => {
                      if (onSelectPet) {
                        onSelectPet(recPet.id);
                      }
                    }}
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Interactive Adoption Form Modal */}
      {isAdoptModalOpen && (
        <div className="adopt-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="adopt-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="adopt-modal-heading"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="adopt-modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>

            {adoptionSubmitted ? (
              <div className="adopt-modal-success-state">
                <div className="adopt-success-icon-wrap">
                  <Check size={36} color="#0f766e" />
                </div>
                <h3 className="adopt-success-title">Interesse Registrado!</h3>
                <p className="adopt-success-desc">
                  A equipe responsável pelo pet <strong>{pet.name}</strong> entrará em contato com você pelo WhatsApp para dar início à entrevista de adoção responsável.
                </p>
              </div>
            ) : (
              <>
                <div className="adopt-modal-header">
                  <div className="adopt-modal-pet-preview">
                    <img
                      src={selectedImage}
                      alt={pet.name}
                      className="adopt-modal-pet-thumb"
                    />
                    <div>
                      <h3 id="adopt-modal-heading" className="adopt-modal-title">
                        Quero adotar a {pet.name}
                      </h3>
                      <p className="adopt-modal-subtitle">
                        {pet.breed || 'Siamês'} • {pet.age} • {pet.location}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitAdoption} className="adopt-modal-form">
                  <div className="adopt-form-field">
                    <label htmlFor="adopt-name" className="adopt-form-label">
                      Seu Nome Completo
                    </label>
                    <input
                      id="adopt-name"
                      type="text"
                      required
                      placeholder="Ex: Mariana Silva"
                      defaultValue="Mariana Silva"
                      className="adopt-form-input"
                    />
                  </div>

                  <div className="adopt-form-field">
                    <label htmlFor="adopt-phone" className="adopt-form-label">
                      WhatsApp / Telefone para contato
                    </label>
                    <input
                      id="adopt-phone"
                      type="tel"
                      required
                      placeholder="(11) 98765-4321"
                      defaultValue="(11) 98765-4321"
                      className="adopt-form-input"
                    />
                  </div>

                  <div className="adopt-form-field">
                    <label htmlFor="adopt-residence" className="adopt-form-label">
                      Tipo de Residência
                    </label>
                    <select
                      id="adopt-residence"
                      className="adopt-form-select"
                      defaultValue="apartamento-telado"
                    >
                      <option value="apartamento-telado">Apartamento com telas de proteção</option>
                      <option value="casa-quintal-fechado">Casa com quintal seguro e murado</option>
                      <option value="casa-sem-quintal">Casa sem quintal</option>
                      <option value="sitio-chacara">Sítio / Chácara</option>
                    </select>
                  </div>

                  <div className="adopt-form-field">
                    <label htmlFor="adopt-message" className="adopt-form-label">
                      Conte um pouco sobre sua rotina com animais
                    </label>
                    <textarea
                      id="adopt-message"
                      rows={3}
                      placeholder="Ex: Já tive gatos antes, trabalho em home office e tenho espaço tranquilo."
                      defaultValue="Moro em apartamento totalmente telado, trabalho de home office e busco uma companheira dócil e tranquila."
                      className="adopt-form-textarea"
                    />
                  </div>

                  <div className="adopt-modal-actions">
                    <button
                      type="button"
                      className="adopt-modal-cancel-btn"
                      onClick={handleCloseModal}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="adopt-modal-submit-btn">
                      <Heart size={18} fill="#ffffff" />
                      <span>Confirmar Interesse</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
