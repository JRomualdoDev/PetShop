import React, { useState } from 'react';
import { PawPrint, Eye, EyeOff, XCircle } from 'lucide-react';
import './LoginPage.css';

interface LoginPageProps {
  onLoginSuccess?: (email: string) => void;
  onNavigateToRegister?: () => void;
  onNavigateHome?: () => void;
  onShowToast?: (message: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateHome,
  onShowToast,
}) => {
  const [email, setEmail] = useState<string>('mariana@petconnect.com');
  const [password, setPassword] = useState<string>('senhaSegura123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('mariana@petconnect.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      if (onShowToast) onShowToast('Por favor, informe seu e-mail.');
      return;
    }
    if (!password) {
      if (onShowToast) onShowToast('Por favor, informe sua senha.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onShowToast) {
        onShowToast(`Login realizado com sucesso! Bem-vinda de volta, Mariana.`);
      }
      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
    }, 500);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotModal(true);
  };

  const handleSendRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForgotModal(false);
    if (onShowToast) {
      onShowToast(`Link de redefinição enviado para: ${forgotEmail}`);
    }
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    if (onShowToast) {
      onShowToast(`Autenticando via ${provider}...`);
    }
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess('mariana@petconnect.com');
      }
    }, 600);
  };

  return (
    <div className="auth-split-layout" id="login-page-view">
      {/* Left 50% Photo Side */}
      <section className="auth-cover-side" aria-label="Imagem ilustrativa de tutor e animal">
        <img
          src="/images/desktop/auth-login-cover.png"
          alt="Mulher acariciando seu cachorro Golden Retriever na sala"
          className="auth-cover-img"
        />
      </section>

      {/* Right 50% Authentication Form Side */}
      <section className="auth-form-side">
        <div className="auth-card" role="region" aria-label="Formulário de Login">
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
          <h1 className="auth-card-title">Bem-vindo de volta!</h1>
          <p className="auth-card-subtitle">Entre na sua conta para continuar.</p>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="login-email" className="auth-label">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                className="auth-input"
                placeholder="mariana@petconnect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="login-password" className="auth-label">
                Senha
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-password-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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

            <div className="auth-forgot-row">
              <button
                type="button"
                className="auth-forgot-link"
                onClick={handleForgotPassword}
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
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
              onClick={() => handleSocialLogin('Google')}
              aria-label="Entrar com Google"
            >
              <XCircle size={18} className="auth-social-icon" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="auth-social-btn"
              onClick={() => handleSocialLogin('Apple')}
              aria-label="Entrar com Apple"
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
            Não tem uma conta?{' '}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={onNavigateToRegister}
            >
              Criar conta
            </button>
          </p>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div
            className="auth-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-pwd-title"
          >
            <h2 id="forgot-pwd-title" className="auth-modal-title">
              Recuperar Senha
            </h2>
            <p className="auth-modal-desc">
              Digite seu e-mail cadastrado e enviaremos um link de recuperação com instruções seguras.
            </p>
            <form onSubmit={handleSendRecovery}>
              <div className="auth-form-group">
                <label htmlFor="recovery-email" className="auth-label">
                  Seu E-mail
                </label>
                <input
                  id="recovery-email"
                  type="email"
                  className="auth-input"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="auth-modal-actions">
                <button
                  type="button"
                  className="auth-modal-cancel-btn"
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="auth-modal-submit-btn">
                  Enviar Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
