import React from 'react';
import { PawPrint, Heart, Phone, Mail, MapPin } from 'lucide-react';
import type { NavTabId, CategoryId } from '../../types';
import './Footer.css';

interface FooterProps {
  onNavigateTab?: (tab: NavTabId) => void;
  onSelectCategory?: (category: CategoryId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onSelectCategory }) => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        {/* Brand Col */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <PawPrint size={20} />
            </div>
            <span className="footer-brand-name">PetConnect</span>
          </div>
          <p className="footer-description">
            Conectando tutores amorosos aos melhores produtos, serviços de confiança e causas de proteção animal.
          </p>
          <div className="footer-contact-info">
            <div className="contact-item">
              <Phone size={14} />
              <span>(11) 98765-4321</span>
            </div>
            <div className="contact-item">
              <Mail size={14} />
              <span>contato@petconnect.com.br</span>
            </div>
            <div className="contact-item">
              <MapPin size={14} />
              <span>São Paulo - SP</span>
            </div>
          </div>
        </div>

        {/* Quick Links Col */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Produtos</h4>
          <ul className="footer-links-list">
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('produtos') : onNavigateTab?.('buscar')}>Rações & Nutrição</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('produtos') : onNavigateTab?.('buscar')}>Brinquedos & Lazer</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('produtos') : onNavigateTab?.('buscar')}>Higiene & Cuidados</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('produtos') : onNavigateTab?.('buscar')}>Acessórios & Camas</button></li>
          </ul>
        </div>

        {/* Services Col */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Serviços & Adoção</h4>
          <ul className="footer-links-list">
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('servicos') : onNavigateTab?.('inicio')}>Veterinários Especializados</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('servicos') : onNavigateTab?.('inicio')}>Banho e Tosa Higiênica</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('adote') : onNavigateTab?.('inicio')}>Adoção de Cães & Gatos</button></li>
            <li><button type="button" onClick={() => onSelectCategory ? onSelectCategory('apoie') : onNavigateTab?.('inicio')}>Apoie ONGs Parceiras</button></li>
          </ul>
        </div>

        {/* App Info Col */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">PetConnect</h4>
          <ul className="footer-links-list">
            <li><button type="button" onClick={() => onNavigateTab?.('inicio')}>Sobre nós</button></li>
            <li><button type="button" onClick={() => onNavigateTab?.('perfil')}>Minha Conta</button></li>
            <li><button type="button" onClick={() => onNavigateTab?.('favoritos')}>Meus Favoritos</button></li>
            <li><button type="button" onClick={() => onNavigateTab?.('inicio')}>Termos e Privacidade</button></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© 2026 PetConnect • Feito com <Heart size={14} className="heart-inline-icon" /> para você e seu pet.</p>
          <span className="footer-version-tag">Versão 1.0 • Cuidado Amoroso</span>
        </div>
      </div>
    </footer>
  );
};
