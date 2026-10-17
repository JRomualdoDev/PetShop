import React, { useState } from 'react';
import { PawPrint, Eye, EyeOff, Check, XCircle } from 'lucide-react';
import './RegisterPage.css';

interface RegisterPageProps {
  onRegisterSuccess?: (name: string, email: string) => void;
  onNavigateToLogin?: () => void;
  onNavigateHome?: () => void;
  onShowToast?: (message: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onNavigateHome,
  onShowToast,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      if (onShowToast) onShowToast('Por favor, preencha seu nome completo.');
      return;
    }
    if (!email.trim()) {
      if (onShowToast) onShowToast('Por favor, informe um e-mail válido.');
      return;
    }
    if (!password) {
      if (onShowToast) onShowToast('Por favor, crie uma senha.');
      return;
    }
    if (password.length < 6) {
      if (onShowToast) onShowToast('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      if (onShowToast) onShowToast('As senhas digitadas não coincidem.');
      return;
    }
    if (!termsAccepted) {
      if (onShowToast) onShowToast('Você precisa aceitar os Termos de Uso e Política de Privacidade.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onShowToast) {
        onShowToast(`Conta criada com sucesso! Seja bem-vindo(a), ${name.split(' ')[0]}!`);
      }
      if (onRegisterSuccess) {
        onRegisterSuccess(name, email);
      }
    }, 600);
  };

  const handleSocialRegister = (provider: 'Google' | 'Apple') => {
    if (onShowToast) {
      onShowToast(`Cadastrando via ${provider}...`);
    }
    setTimeout(() => {
      if (onRegisterSuccess) {
        onRegisterSuccess('Novo Tutor', 'novo@petconnect.com');
      }
    }, 600);
  };

  return (
    <div className="auth-split-layout" id="register-page-view">
      {/* Left 50% Photo Side */}
      <section className="auth-cover-side" aria-label="Imagem ilustrativa de gatinho filhote">
        <img
          src="/images/desktop/auth-register-cover.png"
          alt="Gatinho filhote cinza brincando com novelo de lã vermelho"
          className="auth-cover-img"
        />
      </section>

      {/* Right 50% Registration Form Side */}
      <section className="auth-form-side">
        <div className="auth-card register-auth-card" role="region" aria-label="Formulário de Cadastro">
          {/* Brand Logo Header */}
          <button
            type="button"
            className="auth-brand-logo-btn"
            onClick={onNavigateHome}
            title="Voltar para a página inicial"
            aria-label="Ir para a página inicial da PetConnect"
          >
            <div className="auth-brand-logo-icon">
              <PawPrint size={20} className="auth-paw-svg" />
            </div>
            <span className="auth-brand-name">PetConnect</span>
          </button>

          {/* Titles */}
          <h1 className="auth-card-title">Crie sua conta</h1>
          <p className="auth-card-subtitle">Junte-se à comunidade PetConnect.</p>

          {/* Registration Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="reg-name" className="auth-label">
                Nome completo
              </label>
              <input
                id="reg-name"
                type="text"
                className="auth-input"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-email" className="auth-label">
                E-mail
              </label>
              <input
                id="reg-email"
                type="email"
                className="auth-input"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-password" className="auth-label">
                Senha
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-password-input"
                  placeholder="Crie uma senha forte"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-eye-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-confirm-password" className="auth-label">
                Confirmar senha
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="auth-input auth-password-input"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-eye-toggle-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  title={showConfirmPassword ? 'Ocultar confirmação' : 'Ver confirmação'}
                  aria-label={showConfirmPassword ? 'Ocultar confirmação' : 'Ver confirmação'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="auth-terms-row">
              <button
                type="button"
                className={`auth-custom-checkbox ${termsAccepted ? 'checked' : ''}`}
                onClick={() => setTermsAccepted((prev) => !prev)}
                role="checkbox"
                aria-checked={termsAccepted}
                aria-label="Aceitar Termos de Uso e Política de Privacidade"
              >
                {termsAccepted && <Check size={14} strokeWidth={3} />}
              </button>
              <span className="auth-terms-text">
                Li e aceito os{' '}
                <button
                  type="button"
                  className="auth-terms-link"
                  onClick={() => setTermsModalOpen(true)}
                >
                  Termos de Uso
                </button>{' '}
                e{' '}
                <button
                  type="button"
                  className="auth-terms-link"
                  onClick={() => setTermsModalOpen(true)}
                >
                  Política de Privacidade
                </button>
              </span>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">ou</span>
            <span className="auth-divider-line" />
          </div>

          {/* Social Row */}
          <div className="auth-social-row">
            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleSocialRegister('Google')}
              aria-label="Criar conta com Google"
            >
              <XCircle size={18} className="auth-social-icon" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleSocialRegister('Apple')}
              aria-label="Criar conta com Apple"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="auth-social-icon"
                aria-hidden="true"
              >
                <path d="M12 20.94c1.88 0 3.05-.87 4.14-.87 1.07 0 2.09.87 3.86.87 2.37 0 4-2.17 4-4.5 0-2.34-1.92-3.8-3.48-4.22-.32-1.93-1.63-3.46-3.52-3.46-1.57 0-2.82.91-3.5 1.76-.73-.85-2-1.76-3.5-1.76-2 0-3.3 1.55-3.52 3.48-1.56.4-3.48 1.88-3.48 4.2 0 2.33 1.63 4.5 4 4.5 1.77 0 2.79-.87 3.86-.87 1.09 0 2.26.87 4.14.87z" />
                <path d="M12 4.5c.34-1.28 1.5-2.5 3-2.5" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Bottom Switch Link */}
          <p className="auth-switch-text">
            Já tem uma conta?{' '}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={onNavigateToLogin}
            >
              Entrar
            </button>
          </p>
        </div>
      </section>

      {/* Terms and Privacy Modal */}
      {termsModalOpen && (
        <div className="auth-modal-backdrop" onClick={() => setTermsModalOpen(false)}>
          <div
            className="auth-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
          >
            <h2 id="terms-modal-title" className="auth-modal-title">
              Termos de Uso e Privacidade
            </h2>
            <div className="auth-terms-scrollable-body">
              <p>
                Bem-vindo ao <strong>PetConnect</strong>! Ao se cadastrar, você concorda em utilizar nossa plataforma com responsabilidade e respeito aos animais e profissionais parceiros.
              </p>
              <p>
                <strong>Proteção de Dados:</strong> Seus dados pessoais e de seus pets são tratados com absoluta segurança e criptografia, nunca compartilhados com terceiros sem seu consentimento explícito.
              </p>
              <p>
                <strong>Adoção Responsável:</strong> Toda solicitação de adoção passa por triagem orientada ao bem-estar animal com as ONGs cadastradas.
              </p>
            </div>
            <div className="auth-modal-actions">
              <button
                type="button"
                className="auth-modal-submit-btn"
                onClick={() => setTermsModalOpen(false)}
              >
                Compreendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
