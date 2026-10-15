import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import type { PetItem } from '../../types';
import './PetCard.css';

interface PetCardProps {
  pet: PetItem;
  onAdopt?: (petId: string) => void;
  onSelectPet?: (petId: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onAdopt, onSelectPet }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(pet.isFavorite || false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleCardClick = () => {
    if (onSelectPet) {
      onSelectPet(pet.id);
    }
  };

  const handleAdoptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAdopt) {
      onAdopt(pet.id);
    }
  };

  return (
    <article
      className="desktop-pet-card"
      id={`pet-card-${pet.id}`}
      onClick={handleCardClick}
    >
      {/* Top Media: Pet Photo + Floating Heart Button */}
      <div className="pet-card-media">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="pet-card-img"
          loading="lazy"
        />
        <button
          type="button"
          className={`pet-favorite-btn ${isFavorite ? 'is-fav' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? `Remover ${pet.name} dos favoritos` : `Favoritar ${pet.name}`}
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={`heart-icon ${isFavorite ? 'filled' : ''}`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="pet-card-body">
        {/* Name & Gender Badge */}
        <div className="pet-header-row">
          <h3 className="pet-card-name">{pet.name}</h3>
          <span className={`pet-gender-badge ${pet.gender.toLowerCase()}`}>
            {pet.gender}
          </span>
        </div>

        {/* Age */}
        <div className="pet-age-text">
          Idade: {pet.age}
        </div>

        {/* Location with MapPin */}
        <div className="pet-location-row">
          <MapPin size={14} className="pet-pin-icon" strokeWidth={2} />
          <span>{pet.location}</span>
        </div>

        {/* Action Button: Quero Adotar */}
        <button
          type="button"
          className="pet-adopt-btn"
          onClick={handleAdoptClick}
          aria-label={`Quero adotar ${pet.name}`}
        >
          Quero Adotar
        </button>
      </div>
    </article>
  );
};
