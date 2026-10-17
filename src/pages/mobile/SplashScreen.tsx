import React, { useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './SplashScreen.css';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  // Auto-advance after 2.5s or click
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div
      className="mobile-splash-screen"
      onClick={onContinue}
      role="button"
      tabIndex={0}
      aria-label="Tela de abertura da PetConnect. Clique para continuar."
    >
      <StatusBar time="9:41" />

      <main className="splash-center-content">
        <div className="splash-logo-box">
          <PawPrint size={48} className="splash-paw-icon" strokeWidth={2} />
        </div>

        <h1 className="splash-title">PetConnect</h1>
        <p className="splash-subtitle">Conectando pessoas e cuidados para animais</p>
      </main>

      <footer className="splash-bottom-content">
        <div className="splash-version-pill">
          <span>Versão 1.0 • Cuidado Amoroso</span>
        </div>
        <HomeIndicator />
      </footer>
    </div>
  );
};
