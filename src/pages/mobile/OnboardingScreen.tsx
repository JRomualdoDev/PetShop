import React, { useState } from 'react';
import { StatusBar } from '../../components/common/StatusBar';
import { HomeIndicator } from '../../components/common/HomeIndicator';
import './OnboardingScreen.css';

interface OnboardingScreenProps {
  onComplete: () => void;
  initialStep?: number;
}

interface StepData {
  image: string;
  title: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    image: '/images/mobile/onboarding-1.png',
    title: 'Tudo para o seu pet',
    description:
      'Encontre produtos para cuidar melhor do seu animal. De rações a brinquedos que eles mais amam.',
  },
  {
    image: '/images/mobile/onboarding-2.png',
    title: 'Serviços especializados',
    description:
      'Encontre profissionais e serviços para cuidar do seu pet. Veterinários, cuidadores e pet shops pertinho de você.',
  },
  {
    image: '/images/mobile/onboarding-3.png',
    title: 'Ajude uma causa',
    description:
      'Encontre animais para adoção e descubra formas de apoiar causas animais locais e globais de forma transparente.',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  initialStep = 1,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    Math.max(0, Math.min(STEPS.length - 1, initialStep - 1))
  );

  const step = STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mobile-onboarding-screen" id="onboarding-view">
      <StatusBar time="9:41" />

      {/* Main Illustration Card */}
      <section className="onboarding-media-container">
        <img
          src={step.image}
          alt={step.title}
          className="onboarding-media-img"
        />
      </section>

      {/* Text and Actions */}
      <section className="onboarding-details-section">
        <h1 className="onboarding-title">{step.title}</h1>
        <p className="onboarding-desc">{step.description}</p>

        {/* Stepper Dots */}
        <div
          className="onboarding-stepper-dots"
          role="tablist"
          aria-label="Indicador de passos do onboarding"
        >
          {STEPS.map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={`stepper-dot ${idx === currentStepIndex ? 'active' : ''}`}
              onClick={() => setCurrentStepIndex(idx)}
              aria-label={`Passo ${idx + 1} de ${STEPS.length}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="onboarding-actions-container">
          {currentStepIndex === 1 ? (
            <div className="onboarding-dual-buttons">
              <button
                type="button"
                className="onboarding-btn-outline"
                onClick={handleBack}
              >
                Voltar
              </button>
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="onboarding-btn-primary full"
              onClick={handleNext}
            >
              {currentStepIndex === STEPS.length - 1 ? 'Começar' : 'Próximo'}
            </button>
          )}
        </div>
      </section>

      <footer className="onboarding-footer">
        <HomeIndicator />
      </footer>
    </div>
  );
};
