import React from 'react';
import { PawPrint } from 'lucide-react';
import type { NavPageId } from '../../types';
import './Footer.css';

interface FooterProps {
  onNavigate?: (page: NavPageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer" id="main-footer">
      <div className="site-footer-container">
        {/* Top 4 Columns */}
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand-logo">
              <div className="footer-logo-icon">
                <PawPrint size={20} />
              </div>
              <span className="footer-brand-title">PetConnect</span>
            </div>
            <p className="footer-brand-desc">
              O ecossistema definitivo para o bem-estar do seu animal de estimação. Conectando marcas, tutores e profissionais com responsabilidade e carinho.
            </p>
          </div>

          {/* SERVIÇOS */}
          <div className="footer-nav-column">
            <h3 className="footer-column-heading">SERVIÇOS</h3>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => onNavigate && onNavigate('servicos')}>Veterinários</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('servicos')}>Banho & Tosa</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('servicos')}>Dog Walkers</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('servicos')}>Pet Sitter</button></li>
            </ul>
          </div>

          {/* PRODUTOS */}
          <div className="footer-nav-column">
            <h3 className="footer-column-heading">PRODUTOS</h3>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => onNavigate && onNavigate('produtos')}>Rações Premium</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('produtos')}>Acessórios</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('produtos')}>Brinquedos</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('produtos')}>Farmácia</button></li>
            </ul>
          </div>

          {/* INSTITUCIONAL */}
          <div className="footer-nav-column">
            <h3 className="footer-column-heading">INSTITUCIONAL</h3>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => onNavigate && onNavigate('inicio')}>Sobre nós</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('apoie')}>Seja um parceiro</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('inicio')}>Blog</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('chat')}>Fale conosco</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <p className="footer-copyright-text">
            © 2024 PetConnect Marketplace Ltda. Todos os direitos reservados.
          </p>
          <div className="footer-social-links">
            <a href="#instagram" className="social-icon-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#facebook" className="social-icon-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#twitter" className="social-icon-link" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
