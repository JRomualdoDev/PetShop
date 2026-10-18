import React, { useState } from 'react';
import {
  User,
  PawPrint,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Edit3,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Award,
  AlertCircle,
  X,
  Truck,
  Sparkles,
  ChevronRight,
  FileText,
  RefreshCw,
  MessageSquare,
  Lock,
  Check,
} from 'lucide-react';
import type {
  NavPageId,
  FullTutorProfile,
  TutorPet,
  TutorOrder,
  TutorAppointment,
  TutorAddress,
  TutorPaymentMethod,
  PetVaccineRecord,
} from '../types';
import { INITIAL_TUTOR_DATA } from '../data/tutorProfileData';
import './TutorProfilePage.css';

interface TutorProfilePageProps {
  onNavigate: (page: NavPageId) => void;
  onLogout: () => void;
  onShowToast?: (message: string) => void;
  isLoggedIn?: boolean;
}

type ProfileTab = 'pets' | 'pedidos' | 'agendamentos' | 'enderecos' | 'pagamentos' | 'configuracoes';

export const TutorProfilePage: React.FC<TutorProfilePageProps> = ({
  onNavigate,
  onLogout,
  onShowToast,
  isLoggedIn = true,
}) => {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlTab = searchParams.get('tab') as ProfileTab | null;
  const [activeTab, setActiveTab] = useState<ProfileTab>(urlTab || 'pets');
  const [profile, setProfile] = useState<FullTutorProfile>(INITIAL_TUTOR_DATA);

  // Modals state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showAddPet, setShowAddPet] = useState<boolean>(false);
  const [selectedPetVaccines, setSelectedPetVaccines] = useState<TutorPet | null>(null);
  const [selectedOrderTracking, setSelectedOrderTracking] = useState<TutorOrder | null>(null);
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);
  const [showAddPayment, setShowAddPayment] = useState<boolean>(false);
  const [showAddVaccineRecord, setShowAddVaccineRecord] = useState<boolean>(false);

  // Profile Edit Form State
  const [editName, setEditName] = useState<string>(profile.name);
  const [editEmail, setEditEmail] = useState<string>(profile.email);
  const [editPhone, setEditPhone] = useState<string>(profile.phone);
  const [editCity, setEditCity] = useState<string>(profile.city);
  const [editState, setEditState] = useState<string>(profile.state);
  const [editBio, setEditBio] = useState<string>(profile.bio || '');

  // Add Pet Form State
  const [newPetName, setNewPetName] = useState<string>('');
  const [newPetSpecies, setNewPetSpecies] = useState<'Cachorro' | 'Gato' | 'Pássaro' | 'Outro'>('Cachorro');
  const [newPetBreed, setNewPetBreed] = useState<string>('');
  const [newPetGender, setNewPetGender] = useState<'Macho' | 'Fêmea'>('Macho');
  const [newPetAge, setNewPetAge] = useState<string>('');
  const [newPetWeight, setNewPetWeight] = useState<string>('');
  const [newPetSize, setNewPetSize] = useState<'Pequeno' | 'Médio' | 'Grande'>('Pequeno');
  const [newPetCastrated, setNewPetCastrated] = useState<boolean>(true);
  const [newPetAllergies, setNewPetAllergies] = useState<string>('');
  const [newPetMicrochip, setNewPetMicrochip] = useState<string>('');

  // Add Vaccine Form State
  const [newVaxName, setNewVaxName] = useState<string>('');
  const [newVaxDate, setNewVaxDate] = useState<string>('');
  const [newVaxNextDue, setNewVaxNextDue] = useState<string>('');
  const [newVaxClinic, setNewVaxClinic] = useState<string>('');

  // Add Address Form State
  const [newAddrLabel, setNewAddrLabel] = useState<string>('Casa');
  const [newAddrStreet, setNewAddrStreet] = useState<string>('');
  const [newAddrNumber, setNewAddrNumber] = useState<string>('');
  const [newAddrComplement, setNewAddrComplement] = useState<string>('');
  const [newAddrNeighborhood, setNewAddrNeighborhood] = useState<string>('');
  const [newAddrCity, setNewAddrCity] = useState<string>('São Paulo');
  const [newAddrState, setNewAddrState] = useState<string>('SP');
  const [newAddrZip, setNewAddrZip] = useState<string>('');

  // Add Payment Form State
  const [newCardNumber, setNewCardNumber] = useState<string>('');
  const [newCardHolder, setNewCardHolder] = useState<string>('');
  const [newCardExpiry, setNewCardExpiry] = useState<string>('');
  const [newCardBrand, setNewCardBrand] = useState<string>('Mastercard');

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] = useState<boolean>(false);

  // If user is logged out, show pleasant sign-in prompt
  if (!isLoggedIn) {
    return (
      <div className="tutor-profile-page" id="tutor-profile-view">
        <div className="tutor-profile-container">
          <div className="tutor-logged-out-view">
            <div className="logged-out-icon-circle">
              <User size={38} />
            </div>
            <h2 className="logged-out-title">Acesso ao Perfil do Tutor</h2>
            <p className="logged-out-desc">
              Você não está conectado no momento. Entre na sua conta para gerenciar seus pets,
              acompanhar pedidos e agendamentos ou realizar novos agendamentos veterinários.
            </p>
            <div className="logged-out-btns">
              <button
                type="button"
                className="panel-primary-btn"
                onClick={() => onNavigate('login')}
              >
                <User size={16} />
                Entrar na Minha Conta
              </button>
              <button
                type="button"
                className="pet-action-btn-secondary"
                onClick={() => onNavigate('inicio')}
              >
                Página Inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Logout Confirmation
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    if (onShowToast) {
      onShowToast(`Sessão encerrada com sucesso. Até logo, ${profile.name.split(' ')[0]}!`);
    }
    onLogout();
  };

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
      phone: editPhone,
      city: editCity,
      state: editState,
      bio: editBio,
    }));
    setShowEditProfile(false);
    if (onShowToast) {
      onShowToast('Dados do perfil atualizados com sucesso!');
    }
  };

  // Handle Add Pet
  const handleSaveNewPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) {
      if (onShowToast) onShowToast('Por favor, informe o nome do seu pet.');
      return;
    }

    const defaultAvatar =
      newPetSpecies === 'Gato'
        ? '/images/desktop/pet-mel.png'
        : '/images/desktop/pet-baily.png';

    const newPet: TutorPet = {
      id: `pet-${Date.now()}`,
      name: newPetName,
      species: newPetSpecies,
      breed: newPetBreed || 'SRD (Sem Raça Definida)',
      gender: newPetGender,
      age: newPetAge || 'Idade não informada',
      weight: newPetWeight ? `${newPetWeight} kg` : '4.5 kg',
      size: newPetSize,
      avatarUrl: defaultAvatar,
      isCastrated: newPetCastrated,
      microchipNumber: newPetMicrochip || undefined,
      allergies: newPetAllergies || undefined,
      birthDate: '01/01/2024',
      vaccines: [
        {
          id: `vax-${Date.now()}`,
          name: newPetSpecies === 'Gato' ? 'Quádrupla Felina (V4)' : 'V10 (Déctupla Canina)',
          date: '10/08/2026',
          nextDue: '10/08/2027',
          status: 'Em dia',
          clinic: 'Clínica VetVida',
        },
      ],
    };

    setProfile((prev) => ({
      ...prev,
      pets: [...prev.pets, newPet],
    }));

    // Reset form
    setNewPetName('');
    setNewPetBreed('');
    setNewPetAge('');
    setNewPetWeight('');
    setNewPetAllergies('');
    setNewPetMicrochip('');
    setShowAddPet(false);

    if (onShowToast) {
      onShowToast(`Pet "${newPet.name}" adicionado com sucesso à sua Carteira Pet! 🐾`);
    }
  };

  // Handle Remove Pet
  const handleRemovePet = (petId: string, petName: string) => {
    if (window.confirm(`Deseja remover "${petName}" da sua carteira de pets?`)) {
      setProfile((prev) => ({
        ...prev,
        pets: prev.pets.filter((p) => p.id !== petId),
      }));
      if (onShowToast) {
        onShowToast(`"${petName}" foi removido da sua lista.`);
      }
    }
  };

  // Handle Add Vaccine to Selected Pet
  const handleSaveVaccineRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPetVaccines || !newVaxName.trim()) return;

    const newRecord: PetVaccineRecord = {
      id: `vax-${Date.now()}`,
      name: newVaxName,
      date: newVaxDate || '17/10/2026',
      nextDue: newVaxNextDue || '17/10/2027',
      status: 'Em dia',
      clinic: newVaxClinic || 'Clínica VetVida',
    };

    const updatedPets = profile.pets.map((pet) => {
      if (pet.id === selectedPetVaccines.id) {
        return {
          ...pet,
          vaccines: [...pet.vaccines, newRecord],
        };
      }
      return pet;
    });

    setProfile((prev) => ({
      ...prev,
      pets: updatedPets,
    }));

    setSelectedPetVaccines((prev) => (prev ? { ...prev, vaccines: [...prev.vaccines, newRecord] } : null));
    setNewVaxName('');
    setNewVaxDate('');
    setNewVaxNextDue('');
    setNewVaxClinic('');
    setShowAddVaccineRecord(false);

    if (onShowToast) {
      onShowToast(`Registro da vacina "${newRecord.name}" adicionado com sucesso!`);
    }
  };

  // Handle Save Address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet.trim()) {
      if (onShowToast) onShowToast('Por favor, informe o logradouro.');
      return;
    }

    const newAddress: TutorAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      street: newAddrStreet,
      number: newAddrNumber || 'S/N',
      complement: newAddrComplement || undefined,
      neighborhood: newAddrNeighborhood || 'Centro',
      city: newAddrCity,
      state: newAddrState,
      zipCode: newAddrZip || '01000-000',
      isDefault: false,
    };

    setProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
    }));

    setNewAddrStreet('');
    setNewAddrNumber('');
    setNewAddrComplement('');
    setNewAddrNeighborhood('');
    setNewAddrZip('');
    setShowAddAddress(false);

    if (onShowToast) {
      onShowToast(`Endereço "${newAddress.label}" adicionado com sucesso!`);
    }
  };

  // Handle Delete Address
  const handleDeleteAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
    if (onShowToast) {
      onShowToast('Endereço removido.');
    }
  };

  // Handle Save Payment Method
  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = newCardNumber.replace(/\D/g, '');
    const lastFour = cleanNumber.slice(-4) || '3891';

    const newPayment: TutorPaymentMethod = {
      id: `pay-${Date.now()}`,
      type: 'credit',
      brand: newCardBrand,
      lastFourDigits: lastFour,
      expiryDate: newCardExpiry || '12/28',
      holderName: newCardHolder.toUpperCase() || profile.name.toUpperCase(),
      isDefault: false,
    };

    setProfile((prev) => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, newPayment],
    }));

    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardExpiry('');
    setShowAddPayment(false);

    if (onShowToast) {
      onShowToast(`Cartão ${newPayment.brand} final ${lastFour} cadastrado com sucesso!`);
    }
  };

  // Handle Toggle Notification
  const handleToggleNotification = (key: 'vaccineAlerts' | 'orderUpdates' | 'marketingPromos') => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    if (onShowToast) {
      onShowToast('Preferência de notificação salva.');
    }
  };

  // Handle Cancel Appointment
  const handleCancelAppointment = (appId: string, title: string) => {
    if (window.confirm(`Deseja cancelar o agendamento de "${title}"?`)) {
      setProfile((prev) => ({
        ...prev,
        appointments: prev.appointments.map((a) =>
          a.id === appId ? { ...a, status: 'Cancelado' } : a
        ),
      }));
      if (onShowToast) {
        onShowToast('Agendamento cancelado com sucesso.');
      }
    }
  };

  // Handle Repeat Order
  const handleRepeatOrder = (order: TutorOrder) => {
    if (onShowToast) {
      onShowToast(`Itens do pedido ${order.orderNumber} adicionados novamente ao seu carrinho!`);
    }
    onNavigate('carrinho');
  };

  // Handle Change Password Form
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      if (onShowToast) onShowToast('Por favor, informe a senha atual.');
      return;
    }
    if (newPassword.length < 6) {
      if (onShowToast) onShowToast('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setShowPasswordChangeSuccess(true);
    setTimeout(() => setShowPasswordChangeSuccess(false), 4000);
    if (onShowToast) {
      onShowToast('Sua senha foi alterada com sucesso!');
    }
  };

  return (
    <div className="tutor-profile-page" id="tutor-profile-view">
      <div className="tutor-profile-container">
        {/* Breadcrumb Navigation */}
        <nav className="profile-breadcrumb" aria-label="Navegação em trilha">
          <span
            className="profile-breadcrumb-link"
            onClick={() => onNavigate('inicio')}
            role="button"
            tabIndex={0}
          >
            Início
          </span>
          <ChevronRight size={14} />
          <span className="profile-breadcrumb-current">Perfil do Tutor</span>
        </nav>

        {/* Hero Profile Identity Card */}
        <section className="profile-hero-card" aria-label="Identidade do Tutor">
          <div className="profile-hero-banner">
            <div className="profile-hero-pattern" />
          </div>

          <div className="profile-hero-content">
            <div className="profile-identity-bar">
              <div className="profile-avatar-wrapper">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="profile-avatar-img"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="profile-verified-badge" title="Tutor Verificado">
                  <ShieldCheck size={16} />
                </span>
              </div>

              {/* Profile Top Actions including Logout */}
              <div className="profile-actions-group">
                <button
                  type="button"
                  className="profile-btn-edit"
                  onClick={() => setShowEditProfile(true)}
                  id="btn-edit-tutor-profile"
                >
                  <Edit3 size={15} />
                  Editar Perfil
                </button>
                <button
                  type="button"
                  className="profile-btn-logout"
                  onClick={() => setShowLogoutConfirm(true)}
                  id="btn-logout-tutor-profile"
                  title="Encerrar sessão da conta"
                >
                  <LogOut size={16} />
                  Sair da Conta
                </button>
              </div>
            </div>

            {/* Profile User Info */}
            <div className="profile-details-row">
              <div className="profile-name-tier">
                <h1 className="profile-user-name">{profile.name}</h1>
                <span className="profile-tier-badge">
                  <Award size={13} />
                  {profile.memberTier}
                </span>
              </div>

              <div className="profile-meta-chips">
                <span className="profile-meta-chip">
                  <MapPin size={14} />
                  {profile.city}, {profile.state}
                </span>
                <span className="profile-meta-chip">
                  <Mail size={14} />
                  {profile.email}
                </span>
                <span className="profile-meta-chip">
                  <Phone size={14} />
                  {profile.phone}
                </span>
                <span className="profile-meta-chip">
                  <Calendar size={14} />
                  {profile.memberSince}
                </span>
              </div>

              {profile.bio && <p className="profile-bio-text">{profile.bio}</p>}
            </div>

            {/* Quick Metrics Bar */}
            <div className="profile-metrics-grid">
              <div
                className="profile-metric-card metric-pets"
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab('pets')}
              >
                <div className="profile-metric-icon">
                  <PawPrint size={22} />
                </div>
                <div>
                  <div className="profile-metric-value">{profile.pets.length} Pets</div>
                  <div className="profile-metric-label">Cadastrados na carteira</div>
                </div>
              </div>

              <div
                className="profile-metric-card metric-orders"
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab('pedidos')}
              >
                <div className="profile-metric-icon">
                  <Package size={22} />
                </div>
                <div>
                  <div className="profile-metric-value">{profile.orders.length} Pedidos</div>
                  <div className="profile-metric-label">
                    {profile.orders.filter((o) => o.status === 'Em Trânsito').length > 0
                      ? '1 em trânsito'
                      : 'Histórico de compras'}
                  </div>
                </div>
              </div>

              <div
                className="profile-metric-card metric-sched"
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab('agendamentos')}
              >
                <div className="profile-metric-icon">
                  <Calendar size={22} />
                </div>
                <div>
                  <div className="profile-metric-value">
                    {profile.appointments.filter((a) => a.status === 'Confirmado').length} Ativos
                  </div>
                  <div className="profile-metric-label">Consultas &amp; Banhos</div>
                </div>
              </div>

              <div className="profile-metric-card metric-points">
                <div className="profile-metric-icon">
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="profile-metric-value">{profile.petPoints} Pts</div>
                  <div className="profile-metric-label">R$ {(profile.petPoints * 0.05).toFixed(2)} em bônus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Body Split: Tabs Sidebar & Active Panel */}
        <div className="profile-main-layout">
          {/* Navigation Sidebar */}
          <aside className="profile-sidebar-nav" aria-label="Navegação do Perfil">
            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'pets' ? 'active' : ''}`}
              onClick={() => setActiveTab('pets')}
              id="tab-btn-pets"
            >
              <PawPrint size={18} />
              <span>Meus Pets</span>
              <span className="profile-nav-badge">{profile.pets.length}</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'pedidos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pedidos')}
              id="tab-btn-orders"
            >
              <Package size={18} />
              <span>Meus Pedidos</span>
              <span className="profile-nav-badge">{profile.orders.length}</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'agendamentos' ? 'active' : ''}`}
              onClick={() => setActiveTab('agendamentos')}
              id="tab-btn-appointments"
            >
              <Calendar size={18} />
              <span>Agendamentos</span>
              <span className="profile-nav-badge">{profile.appointments.length}</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'enderecos' ? 'active' : ''}`}
              onClick={() => setActiveTab('enderecos')}
              id="tab-btn-addresses"
            >
              <MapPin size={18} />
              <span>Endereços</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'pagamentos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pagamentos')}
              id="tab-btn-payments"
            >
              <CreditCard size={18} />
              <span>Formas de Pagamento</span>
            </button>

            <button
              type="button"
              className={`profile-nav-item ${activeTab === 'configuracoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('configuracoes')}
              id="tab-btn-settings"
            >
              <Settings size={18} />
              <span>Configurações</span>
            </button>

            <div className="profile-nav-divider" />

            <button
              type="button"
              className="profile-nav-item nav-logout"
              onClick={() => setShowLogoutConfirm(true)}
              id="sidebar-btn-logout"
            >
              <LogOut size={18} />
              <span>Deslogar</span>
            </button>
          </aside>

          {/* Active Content Panel */}
          <main className="profile-content-panel" id="profile-active-tab-content">
            {/* ============================================================ */}
            {/* TAB 1: MEUS PETS */}
            {/* ============================================================ */}
            {activeTab === 'pets' && (
              <div>
                <div className="panel-header-row">
                  <div className="panel-title-col">
                    <h3>Carteira Digital dos Meus Pets</h3>
                    <p>Gerencie informações, vacinas, histórico médico e cuidados dos seus bichinhos</p>
                  </div>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => setShowAddPet(true)}
                    id="btn-add-pet"
                  >
                    <Plus size={16} />
                    Adicionar Novo Pet
                  </button>
                </div>

                <div className="pets-cards-grid">
                  {profile.pets.map((pet) => (
                    <div key={pet.id} className="pet-wallet-card" id={`card-pet-${pet.id}`}>
                      <div className="pet-wallet-header">
                        <img
                          src={pet.avatarUrl}
                          alt={pet.name}
                          className="pet-wallet-avatar"
                          onError={(e) => {
                            (e.target as HTMLElement).src = '/images/desktop/pet-pipoca.png';
                          }}
                        />
                        <div className="pet-wallet-info">
                          <h4>{pet.name}</h4>
                          <p className="pet-species-breed">
                            {pet.species} • {pet.breed}
                          </p>
                          <div className="pet-wallet-tags">
                            <span className="pet-badge-tag breed">{pet.gender}</span>
                            {pet.isCastrated && (
                              <span className="pet-badge-tag castrated">Castrado(a)</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Attributes */}
                      <div className="pet-attributes-list">
                        <div className="pet-attr-item">
                          <span>Idade:</span>
                          <strong>{pet.age}</strong>
                        </div>
                        <div className="pet-attr-item">
                          <span>Peso:</span>
                          <strong>{pet.weight}</strong>
                        </div>
                        <div className="pet-attr-item">
                          <span>Porte:</span>
                          <strong>{pet.size}</strong>
                        </div>
                        <div className="pet-attr-item">
                          <span>Microchip:</span>
                          <strong>{pet.microchipNumber || 'Não cadastrado'}</strong>
                        </div>
                      </div>

                      {/* Allergies / Health alerts */}
                      {pet.allergies && (
                        <div className="pet-allergies-alert">
                          <AlertCircle size={15} />
                          <span>{pet.allergies}</span>
                        </div>
                      )}

                      {/* Vaccines Summary */}
                      <div className="pet-vaccines-summary">
                        <div className="vaccines-summary-title">
                          <span>Carteira de Vacinação</span>
                          <span style={{ color: 'var(--color-primary)' }}>
                            {pet.vaccines.filter((v) => v.status === 'Em dia').length} em dia
                          </span>
                        </div>
                        <div className="vaccines-quick-list">
                          {pet.vaccines.slice(0, 2).map((v) => (
                            <div key={v.id} className="vaccine-quick-item">
                              <span>{v.name}</span>
                              <span
                                className={`vaccine-status-pill ${
                                  v.status === 'Em dia' ? 'em-dia' : 'vence-em-breve'
                                }`}
                              >
                                {v.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pet-wallet-actions">
                        <button
                          type="button"
                          className="pet-action-btn-primary"
                          onClick={() => setSelectedPetVaccines(pet)}
                          title="Ver e gerenciar carteira completa de vacinas"
                        >
                          <FileText size={14} />
                          Ver Vacinas
                        </button>
                        <button
                          type="button"
                          className="pet-action-btn-secondary"
                          onClick={() => onNavigate('servicos')}
                          title="Agendar consulta ou banho para este pet"
                        >
                          <Calendar size={14} />
                          Agendar
                        </button>
                        <button
                          type="button"
                          className="pet-action-btn-secondary"
                          onClick={() => handleRemovePet(pet.id, pet.name)}
                          title="Remover pet da carteira"
                          style={{ maxWidth: '40px', padding: '8px' }}
                        >
                          <Trash2 size={14} color="#dc2626" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 2: MEUS PEDIDOS */}
            {/* ============================================================ */}
            {activeTab === 'pedidos' && (
              <div>
                <div className="panel-header-row">
                  <div className="panel-title-col">
                    <h3>Histórico de Pedidos &amp; Compras</h3>
                    <p>Acompanhe suas entregas em tempo real ou repita pedidos com 1 clique</p>
                  </div>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => onNavigate('produtos')}
                  >
                    <Package size={16} />
                    Explorar Catálogo
                  </button>
                </div>

                <div className="orders-list">
                  {profile.orders.map((order) => (
                    <div key={order.id} className="order-history-card">
                      <div className="order-card-header">
                        <div className="order-code-meta">
                          <span className="order-code">{order.orderNumber}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <span
                          className={`order-status-badge ${
                            order.status === 'Em Trânsito' ? 'em-transito' : 'entregue'
                          }`}
                        >
                          {order.status === 'Em Trânsito' ? (
                            <Truck size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          {order.status}
                        </span>
                      </div>

                      {/* Items Preview */}
                      <div className="order-items-preview">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-product-row">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="order-product-img"
                              onError={(e) => {
                                (e.target as HTMLElement).src = '/images/desktop/prod-racao-catalog.png';
                              }}
                            />
                            <div className="order-product-details">
                              <h5 className="order-product-name">{item.name}</h5>
                              <span className="order-product-qty">
                                Quantidade: {item.quantity}x
                              </span>
                            </div>
                            <span className="order-product-price">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="order-card-footer">
                        <div className="order-delivery-eta">
                          {order.deliveryDate} • Pago via {order.paymentMethod}
                        </div>
                        <div className="order-total-price-col">
                          <span className="order-total-label">Total do Pedido:</span>
                          <div className="order-total-amount">
                            R$ {order.totalPrice.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                        <div className="order-actions-btns">
                          {order.status === 'Em Trânsito' && (
                            <button
                              type="button"
                              className="btn-track-order"
                              onClick={() => setSelectedOrderTracking(order)}
                            >
                              <Truck size={14} />
                              Rastrear Entrega
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-repeat-order"
                            onClick={() => handleRepeatOrder(order)}
                          >
                            <RefreshCw size={14} />
                            Repetir Pedido
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 3: AGENDAMENTOS */}
            {/* ============================================================ */}
            {activeTab === 'agendamentos' && (
              <div>
                <div className="panel-header-row">
                  <div className="panel-title-col">
                    <h3>Agendamentos de Serviços</h3>
                    <p>Consultas veterinárias, banho e tosa, adestramento e hospedagem</p>
                  </div>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => onNavigate('servicos')}
                  >
                    <Plus size={16} />
                    Agendar Novo Serviço
                  </button>
                </div>

                <div className="appointments-list">
                  {profile.appointments.map((app) => (
                    <div key={app.id} className="appointment-card">
                      {app.imageUrl && (
                        <img
                          src={app.imageUrl}
                          alt={app.professionalName}
                          className="appointment-img"
                        />
                      )}
                      <div className="appointment-details">
                        <div className="appointment-header-row">
                          <span className="appointment-category-badge">{app.category}</span>
                          <span
                            className={`vaccine-status-pill ${
                              app.status === 'Confirmado' ? 'em-dia' : 'vence-em-breve'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <h4 className="appointment-title">{app.serviceTitle}</h4>
                        <p className="appointment-provider">{app.professionalName}</p>

                        <div className="appointment-meta-grid">
                          <span className="appointment-meta-item">
                            <Calendar size={14} />
                            {app.date} às {app.time}
                          </span>
                          <span className="appointment-meta-item">
                            <PawPrint size={14} />
                            Pet: {app.petName}
                          </span>
                          <span className="appointment-meta-item">
                            <MapPin size={14} />
                            {app.isHomeService ? 'Atendimento no Domicílio' : app.address}
                          </span>
                          <span className="appointment-meta-item">
                            <strong>Valor: R$ {app.price.toFixed(2).replace('.', ',')}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="appointment-actions-col">
                        <button
                          type="button"
                          className="btn-app-chat"
                          onClick={() => onNavigate('chat')}
                          title="Conversar com o profissional"
                        >
                          <MessageSquare size={14} />
                          Falar no Chat
                        </button>
                        {app.status === 'Confirmado' && (
                          <button
                            type="button"
                            className="btn-app-cancel"
                            onClick={() => handleCancelAppointment(app.id, app.serviceTitle)}
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 4: ENDEREÇOS */}
            {/* ============================================================ */}
            {activeTab === 'enderecos' && (
              <div>
                <div className="panel-header-row">
                  <div className="panel-title-col">
                    <h3>Meus Endereços de Entrega</h3>
                    <p>Cadastre endereços para entregas rápidas de rações e visitas domiciliares</p>
                  </div>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => setShowAddAddress(true)}
                  >
                    <Plus size={16} />
                    Adicionar Endereço
                  </button>
                </div>

                <div className="addresses-grid">
                  {profile.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`address-item-card ${addr.isDefault ? 'is-default' : ''}`}
                    >
                      {addr.isDefault && (
                        <span className="address-badge-default">Principal</span>
                      )}
                      <h4 className="address-item-title">{addr.label}</h4>
                      <p className="address-item-text">
                        {addr.street}, {addr.number}
                        {addr.complement ? ` - ${addr.complement}` : ''}
                        <br />
                        {addr.neighborhood} • {addr.city} - {addr.state}
                        <br />
                        CEP: {addr.zipCode}
                      </p>
                      <div className="address-item-actions">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            className="btn-addr-action delete"
                            onClick={() => handleDeleteAddress(addr.id)}
                          >
                            <Trash2 size={13} />
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 5: FORMAS DE PAGAMENTO */}
            {/* ============================================================ */}
            {activeTab === 'pagamentos' && (
              <div>
                <div className="panel-header-row">
                  <div className="panel-title-col">
                    <h3>Formas de Pagamento Salvas</h3>
                    <p>Seus cartões de crédito e chaves PIX protegidos com criptografia de ponta a ponta</p>
                  </div>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => setShowAddPayment(true)}
                  >
                    <Plus size={16} />
                    Adicionar Cartão
                  </button>
                </div>

                <div className="payments-grid">
                  {profile.paymentMethods.map((pay) => (
                    <div
                      key={pay.id}
                      className={`payment-method-card ${pay.isDefault ? 'is-default' : ''}`}
                    >
                      <div className="payment-icon-box">
                        <CreditCard size={24} />
                      </div>
                      <div className="payment-info">
                        <div className="payment-brand-digits">
                          {pay.brand} •••• {pay.lastFourDigits}
                        </div>
                        <div className="payment-holder-expiry">
                          {pay.holderName} • Exp: {pay.expiryDate}
                        </div>
                      </div>
                      {pay.isDefault && (
                        <span className="payment-default-pill">Padrão</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 6: CONFIGURAÇÕES & SEGURANÇA */}
            {/* ============================================================ */}
            {activeTab === 'configuracoes' && (
              <div className="settings-sections-wrapper">
                <div className="panel-header-row" style={{ marginBottom: '16px' }}>
                  <div className="panel-title-col">
                    <h3>Configurações &amp; Preferências da Conta</h3>
                    <p>Gerencie privacidade, alertas de vacinação e segurança da sessão</p>
                  </div>
                </div>

                {/* Notifications Group */}
                <div className="settings-group">
                  <h4 className="settings-group-title">Notificações e Avisos de Saúde</h4>
                  <p className="settings-group-desc">
                    Receba avisos automáticos sobre as vacinas dos seus pets e o status das suas compras
                  </p>

                  <div className="settings-toggle-row">
                    <div className="toggle-label-box">
                      <strong>Lembretes de Vacinas &amp; Consultas</strong>
                      <span>Avisar com 15 dias de antecedência quando uma vacina for vencer</span>
                    </div>
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={profile.notifications.vaccineAlerts}
                        onChange={() => handleToggleNotification('vaccineAlerts')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="settings-toggle-row">
                    <div className="toggle-label-box">
                      <strong>Rastreamento de Pedidos em Tempo Real</strong>
                      <span>Avisos de saída para entrega e confirmação de chegada por SMS e E-mail</span>
                    </div>
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={profile.notifications.orderUpdates}
                        onChange={() => handleToggleNotification('orderUpdates')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>

                  <div className="settings-toggle-row">
                    <div className="toggle-label-box">
                      <strong>Ofertas Exclusivas e Campanhas de Adoção</strong>
                      <span>Receber cupons especiais e novidades de ONGs parceiras</span>
                    </div>
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={profile.notifications.marketingPromos}
                        onChange={() => handleToggleNotification('marketingPromos')}
                      />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>

                {/* Password Change Form */}
                <div className="settings-group">
                  <h4 className="settings-group-title">Segurança da Senha</h4>
                  <p className="settings-group-desc">
                    Recomendamos o uso de uma senha forte com letras, números e símbolos
                  </p>

                  {showPasswordChangeSuccess && (
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13px',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Check size={16} />
                      Senha atualizada com sucesso!
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="form-group-field">
                      <label htmlFor="settings-current-pwd">Senha Atual</label>
                      <input
                        id="settings-current-pwd"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group-field">
                      <label htmlFor="settings-new-pwd">Nova Senha</label>
                      <input
                        id="settings-new-pwd"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button type="submit" className="panel-primary-btn" style={{ padding: '8px 20px' }}>
                        <Lock size={14} />
                        Atualizar Senha
                      </button>
                    </div>
                  </form>
                </div>

                {/* Danger Zone / Logout */}
                <div className="settings-group">
                  <div className="danger-zone-box">
                    <div className="danger-zone-info">
                      <h5>Encerrar Sessão da Conta</h5>
                      <p>
                        Você será desconectado com segurança deste navegador. Seus pets e histórico
                        continuarão salvos.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-danger-logout"
                      onClick={() => setShowLogoutConfirm(true)}
                      id="btn-settings-logout"
                    >
                      <LogOut size={16} />
                      Deslogar Agora
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: CONFIRMAR LOGOUT (BOTÃO DE DESLOGAR) */}
      {/* ============================================================ */}
      {showLogoutConfirm && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="logout-modal-content">
              <div className="logout-icon-circle">
                <LogOut size={32} />
              </div>
              <h3 className="logout-modal-title">Deseja realmente sair da sua conta?</h3>
              <p className="logout-modal-desc">
                Ao deslogar da PetConnect, você precisará informar suas credenciais novamente para
                acessar seus pets cadastrados, pedidos e agendamentos veterinários.
              </p>
              <div className="logout-modal-btns">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn-modal-danger"
                  onClick={handleConfirmLogout}
                  id="modal-confirm-logout-btn"
                >
                  Sim, Deslogar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: EDITAR PERFIL DO TUTOR */}
      {/* ============================================================ */}
      {showEditProfile && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="modal-header-bar">
              <h3>Editar Dados Pessoais do Tutor</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowEditProfile(false)}
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveProfile}>
              <div className="modal-scroll-body">
                <div className="modal-form-grid">
                  <div className="form-group-field span-2">
                    <label htmlFor="edit-name">Nome Completo</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="edit-email">E-mail</label>
                    <input
                      id="edit-email"
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="edit-phone">Telefone / WhatsApp</label>
                    <input
                      id="edit-phone"
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="edit-city">Cidade</label>
                    <input
                      id="edit-city"
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="edit-state">Estado</label>
                    <input
                      id="edit-state"
                      type="text"
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                      maxLength={2}
                    />
                  </div>
                  <div className="form-group-field span-2">
                    <label htmlFor="edit-bio">Biografia / Sobre Você</label>
                    <textarea
                      id="edit-bio"
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowEditProfile(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: ADICIONAR NOVO PET */}
      {/* ============================================================ */}
      {showAddPet && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card wide-modal">
            <div className="modal-header-bar">
              <h3>Cadastrar Novo Pet na Carteira</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAddPet(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveNewPet}>
              <div className="modal-scroll-body">
                <div className="modal-form-grid">
                  <div className="form-group-field">
                    <label htmlFor="pet-name-input">Nome do Pet *</label>
                    <input
                      id="pet-name-input"
                      type="text"
                      placeholder="Ex: Thor, Mel, Baily"
                      value={newPetName}
                      onChange={(e) => setNewPetName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-species-select">Espécie *</label>
                    <select
                      id="pet-species-select"
                      value={newPetSpecies}
                      onChange={(e) =>
                        setNewPetSpecies(e.target.value as 'Cachorro' | 'Gato' | 'Pássaro' | 'Outro')
                      }
                    >
                      <option value="Cachorro">Cachorro</option>
                      <option value="Gato">Gato</option>
                      <option value="Pássaro">Pássaro</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-breed-input">Raça</label>
                    <input
                      id="pet-breed-input"
                      type="text"
                      placeholder="Ex: Golden Retriever, Siamês, SRD"
                      value={newPetBreed}
                      onChange={(e) => setNewPetBreed(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-gender-select">Sexo</label>
                    <select
                      id="pet-gender-select"
                      value={newPetGender}
                      onChange={(e) => setNewPetGender(e.target.value as 'Macho' | 'Fêmea')}
                    >
                      <option value="Macho">Macho</option>
                      <option value="Fêmea">Fêmea</option>
                    </select>
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-age-input">Idade aproximada</label>
                    <input
                      id="pet-age-input"
                      type="text"
                      placeholder="Ex: 2 anos, 6 meses"
                      value={newPetAge}
                      onChange={(e) => setNewPetAge(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-weight-input">Peso (kg)</label>
                    <input
                      id="pet-weight-input"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 5.5"
                      value={newPetWeight}
                      onChange={(e) => setNewPetWeight(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-size-select">Porte</label>
                    <select
                      id="pet-size-select"
                      value={newPetSize}
                      onChange={(e) =>
                        setNewPetSize(e.target.value as 'Pequeno' | 'Médio' | 'Grande')
                      }
                    >
                      <option value="Pequeno">Pequeno (até 10kg)</option>
                      <option value="Médio">Médio (11 a 25kg)</option>
                      <option value="Grande">Grande (mais de 25kg)</option>
                    </select>
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pet-castrated-check">Castrado(a)?</label>
                    <select
                      id="pet-castrated-check"
                      value={newPetCastrated ? 'sim' : 'nao'}
                      onChange={(e) => setNewPetCastrated(e.target.value === 'sim')}
                    >
                      <option value="sim">Sim, já castrado(a)</option>
                      <option value="nao">Não castrado(a)</option>
                    </select>
                  </div>
                  <div className="form-group-field span-2">
                    <label htmlFor="pet-allergies-input">Alergias ou Cuidados Especiais</label>
                    <input
                      id="pet-allergies-input"
                      type="text"
                      placeholder="Ex: Alergia a picada de pulga, dieta hipoalergênica"
                      value={newPetAllergies}
                      onChange={(e) => setNewPetAllergies(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field span-2">
                    <label htmlFor="pet-microchip-input">Número do Microchip (Opcional)</label>
                    <input
                      id="pet-microchip-input"
                      type="text"
                      placeholder="Ex: BR-981.203.491"
                      value={newPetMicrochip}
                      onChange={(e) => setNewPetMicrochip(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowAddPet(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Salvar Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: CARTEIRA DE VACINAÇÃO DO PET */}
      {/* ============================================================ */}
      {selectedPetVaccines && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card wide-modal">
            <div className="modal-header-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PawPrint size={20} color="var(--color-primary)" />
                <h3>Carteira de Vacinação: {selectedPetVaccines.name}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setSelectedPetVaccines(null);
                  setShowAddVaccineRecord(false);
                }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <table className="vaccine-modal-table">
                <thead>
                  <tr>
                    <th>Vacina / Imunizante</th>
                    <th>Data Aplicação</th>
                    <th>Próximo Reforço</th>
                    <th>Clínica Veterinária</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPetVaccines.vaccines.map((vax) => (
                    <tr key={vax.id}>
                      <td>
                        <strong>{vax.name}</strong>
                      </td>
                      <td>{vax.date}</td>
                      <td>{vax.nextDue}</td>
                      <td>{vax.clinic || 'Clínica Parceira'}</td>
                      <td>
                        <span
                          className={`vaccine-status-pill ${
                            vax.status === 'Em dia' ? 'em-dia' : 'vence-em-breve'
                          }`}
                        >
                          {vax.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Vaccine Subform */}
              {showAddVaccineRecord ? (
                <form
                  onSubmit={handleSaveVaccineRecord}
                  style={{
                    marginTop: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--color-slate-50)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-slate-200)',
                  }}
                >
                  <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
                    Registrar Nova Vacina para {selectedPetVaccines.name}
                  </h4>
                  <div className="modal-form-grid">
                    <div className="form-group-field">
                      <label htmlFor="new-vax-name">Nome da Vacina *</label>
                      <input
                        id="new-vax-name"
                        type="text"
                        placeholder="Ex: Antirrábica, V8/V10, Giardia"
                        value={newVaxName}
                        onChange={(e) => setNewVaxName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-field">
                      <label htmlFor="new-vax-clinic">Clínica / Veterinário</label>
                      <input
                        id="new-vax-clinic"
                        type="text"
                        placeholder="Ex: Dr. Gustavo Silva"
                        value={newVaxClinic}
                        onChange={(e) => setNewVaxClinic(e.target.value)}
                      />
                    </div>
                    <div className="form-group-field">
                      <label htmlFor="new-vax-date">Data da Aplicação</label>
                      <input
                        id="new-vax-date"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={newVaxDate}
                        onChange={(e) => setNewVaxDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group-field">
                      <label htmlFor="new-vax-due">Próximo Reforço</label>
                      <input
                        id="new-vax-due"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={newVaxNextDue}
                        onChange={(e) => setNewVaxNextDue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button type="submit" className="btn-modal-confirm" style={{ padding: '8px 16px' }}>
                      Salvar Registro
                    </button>
                    <button
                      type="button"
                      className="btn-modal-cancel"
                      style={{ padding: '8px 16px' }}
                      onClick={() => setShowAddVaccineRecord(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    className="panel-primary-btn"
                    onClick={() => setShowAddVaccineRecord(true)}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <Plus size={14} />
                    Adicionar Registro de Vacina
                  </button>
                </div>
              )}
            </div>

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => {
                  setSelectedPetVaccines(null);
                  setShowAddVaccineRecord(false);
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: RASTREAMENTO DO PEDIDO */}
      {/* ============================================================ */}
      {selectedOrderTracking && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="modal-header-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} color="var(--color-primary)" />
                <h3>Rastreamento {selectedOrderTracking.orderNumber}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedOrderTracking(null)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '13px',
                  color: '#0369a1',
                }}
              >
                Código de Rastreio: <strong>{selectedOrderTracking.trackingCode}</strong>
                <br />
                {selectedOrderTracking.deliveryDate}
              </div>

              <div className="tracking-steps-timeline">
                <div className="tracking-step-item completed">
                  <div className="tracking-step-dot">
                    <Check size={13} />
                  </div>
                  <div className="tracking-step-info">
                    <strong>Pedido Confirmado</strong>
                    <span>16 de Outubro às 10:15 • Pagamento aprovado</span>
                  </div>
                </div>

                <div className="tracking-step-item completed">
                  <div className="tracking-step-dot">
                    <Check size={13} />
                  </div>
                  <div className="tracking-step-info">
                    <strong>Separado no Centro de Distribuição</strong>
                    <span>16 de Outubro às 14:30 • Produtos embalados com cuidado</span>
                  </div>
                </div>

                <div className="tracking-step-item active">
                  <div className="tracking-step-dot">
                    <Truck size={13} />
                  </div>
                  <div className="tracking-step-info">
                    <strong>Em Trânsito com Transportadora PetExpress</strong>
                    <span>Hoje às 08:45 • Saiu para transferência local</span>
                  </div>
                </div>

                <div className="tracking-step-item">
                  <div className="tracking-step-dot">
                    <Clock size={13} />
                  </div>
                  <div className="tracking-step-info">
                    <strong>Entrega no Endereço do Tutor</strong>
                    <span>Previsão: Amanhã até às 18:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setSelectedOrderTracking(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 6: ADICIONAR ENDEREÇO */}
      {/* ============================================================ */}
      {showAddAddress && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="modal-header-bar">
              <h3>Adicionar Novo Endereço de Entrega</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAddAddress(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveAddress}>
              <div className="modal-scroll-body">
                <div className="modal-form-grid">
                  <div className="form-group-field">
                    <label htmlFor="addr-label">Identificação</label>
                    <input
                      id="addr-label"
                      type="text"
                      placeholder="Ex: Casa da Praia, Consultório"
                      value={newAddrLabel}
                      onChange={(e) => setNewAddrLabel(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="addr-cep">CEP</label>
                    <input
                      id="addr-cep"
                      type="text"
                      placeholder="00000-000"
                      value={newAddrZip}
                      onChange={(e) => setNewAddrZip(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field span-2">
                    <label htmlFor="addr-street">Logradouro / Rua *</label>
                    <input
                      id="addr-street"
                      type="text"
                      placeholder="Ex: Rua Oscar Freire"
                      value={newAddrStreet}
                      onChange={(e) => setNewAddrStreet(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="addr-number">Número</label>
                    <input
                      id="addr-number"
                      type="text"
                      placeholder="Ex: 140"
                      value={newAddrNumber}
                      onChange={(e) => setNewAddrNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="addr-comp">Complemento</label>
                    <input
                      id="addr-comp"
                      type="text"
                      placeholder="Apto, Bloco"
                      value={newAddrComplement}
                      onChange={(e) => setNewAddrComplement(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="addr-neigh">Bairro</label>
                    <input
                      id="addr-neigh"
                      type="text"
                      placeholder="Ex: Cerqueira César"
                      value={newAddrNeighborhood}
                      onChange={(e) => setNewAddrNeighborhood(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="addr-city">Cidade / UF</label>
                    <input
                      id="addr-city"
                      type="text"
                      placeholder="São Paulo - SP"
                      value={`${newAddrCity} - ${newAddrState}`}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowAddAddress(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 7: ADICIONAR CARTÃO */}
      {/* ============================================================ */}
      {showAddPayment && (
        <div className="profile-modal-backdrop" role="dialog" aria-modal="true">
          <div className="profile-modal-card">
            <div className="modal-header-bar">
              <h3>Adicionar Cartão de Crédito</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAddPayment(false)}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePayment}>
              <div className="modal-scroll-body">
                <div className="modal-form-grid">
                  <div className="form-group-field span-2">
                    <label htmlFor="pay-card-num">Número do Cartão *</label>
                    <input
                      id="pay-card-num"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field span-2">
                    <label htmlFor="pay-card-holder">Nome Impresso no Cartão *</label>
                    <input
                      id="pay-card-holder"
                      type="text"
                      placeholder="Como está no cartão"
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pay-card-exp">Validade (MM/AA)</label>
                    <input
                      id="pay-card-exp"
                      type="text"
                      placeholder="12/28"
                      maxLength={5}
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="form-group-field">
                    <label htmlFor="pay-card-brand">Bandeira</label>
                    <select
                      id="pay-card-brand"
                      value={newCardBrand}
                      onChange={(e) => setNewCardBrand(e.target.value)}
                    >
                      <option value="Mastercard">Mastercard</option>
                      <option value="Visa">Visa</option>
                      <option value="Elo">Elo</option>
                      <option value="Hipercard">Hipercard</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowAddPayment(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Salvar Cartão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfilePage;
