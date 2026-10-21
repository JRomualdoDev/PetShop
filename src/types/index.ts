export type NavPageId = 
  | 'inicio' 
  | 'produtos' 
  | 'detalhes-produto'
  | 'servicos' 
  | 'detalhes-servico'
  | 'adocao' 
  | 'detalhes-animal'
  | 'apoie' 
  | 'chat' 
  | 'feedback' 
  | 'login' 
  | 'cadastro'
  | 'splash'
  | 'onboarding'
  | 'carrinho'
  | 'checkout'
  | 'pedido-confirmado'
  | 'buscar' 
  | 'favoritos' 
  | 'perfil'
  | 'mobile-home'
  | 'mobile-busca'
  | 'mobile-detalhes-produto'
  | 'mobile-servicos'
  | 'mobile-adocao'
  | 'mobile-detalhes-animal'
  | 'mobile-apoie'
  | 'mobile-chat'
  | 'mobile-feedback'
  | 'mobile-feedback-sucesso'
  | 'mobile-login'
  | 'mobile-cadastro';

// Backwards compatibility alias for older mobile components
export type NavTabId = 'inicio' | 'buscar' | 'favoritos' | 'perfil';

export type CategoryId = 'produtos' | 'servicos' | 'adote' | 'apoie';

export interface CategoryItem {
  id: CategoryId;
  label: string;
  iconSrc?: string;
  bgColor?: string;
  iconColor?: string;
}

export interface QuickCategoryItem {
  id: CategoryId;
  label: string;
  description: string;
  iconName: 'ShoppingBag' | 'Scissors' | 'HeartHandshake' | 'Gift';
  bgLightColor: string;
  iconColor: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isFavorite: boolean;
  badge?: string;
  description?: string;
  specs?: Record<string, string>;
  petAge?: 'Filhote' | 'Adulto' | 'Sênior' | string;
  petSize?: 'Pequeno' | 'Médio' | 'Grande' | string;
}

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface ServiceProcedure {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface ServiceReviewItem {
  id: string;
  author: string;
  petName?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  isHomeService: boolean;
  imageUrl: string;
  buttonText: string;
  address?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  openingHours?: string;
  crmv?: string;
  procedures?: ServiceProcedure[];
  features?: string[];
  reviews?: ServiceReviewItem[];
}

export interface AdoptionCampaignData {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
}

export type PetSpecies = 'cachorros' | 'gatos' | 'outros';
export type PetGender = 'Macho' | 'Fêmea';

export interface PetItem {
  id: string;
  name: string;
  species: PetSpecies;
  gender: PetGender;
  age: string;
  location: string;
  imageUrl: string;
  detailImageUrl?: string;
  isFavorite?: boolean;
  breed?: string;
  description?: string;
  ageCategory?: string;
  rescueInfo?: string;
  healthBadges?: string[];
  galleryImages?: string[];
  aboutTitle?: string;
  longDescription?: string;
}

export interface OfferBannerData {
  discountBadge: string;
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  email?: string;
  phone?: string;
}

export interface PetVaccineRecord {
  id: string;
  name: string;
  date: string;
  nextDue: string;
  status: 'Em dia' | 'Vence em breve' | 'Atrasada';
  clinic?: string;
}

export interface TutorPet {
  id: string;
  name: string;
  species: 'Cachorro' | 'Gato' | 'Pássaro' | 'Outro';
  breed: string;
  gender: 'Macho' | 'Fêmea';
  age: string;
  weight: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  avatarUrl: string;
  isCastrated: boolean;
  microchipNumber?: string;
  allergies?: string;
  birthDate?: string;
  vaccines: PetVaccineRecord[];
}

export interface TutorOrderItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface TutorOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: TutorOrderItem[];
  totalPrice: number;
  status: 'Entregue' | 'Em Trânsito' | 'Preparando' | 'Cancelado';
  trackingCode?: string;
  deliveryDate?: string;
  paymentMethod: string;
}

export interface TutorAppointment {
  id: string;
  serviceTitle: string;
  professionalName: string;
  category: string;
  date: string;
  time: string;
  petName: string;
  isHomeService: boolean;
  address?: string;
  status: 'Confirmado' | 'Pendente' | 'Concluído' | 'Cancelado';
  price: number;
  imageUrl?: string;
}

export interface TutorAddress {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface TutorPaymentMethod {
  id: string;
  type: 'credit' | 'pix';
  brand?: string;
  lastFourDigits?: string;
  expiryDate?: string;
  holderName?: string;
  isDefault: boolean;
}

export interface FullTutorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  city: string;
  state: string;
  avatarUrl: string;
  memberTier: 'Bronze' | 'Silver' | 'Gold VIP';
  memberSince: string;
  petPoints: number;
  bio?: string;
  pets: TutorPet[];
  orders: TutorOrder[];
  appointments: TutorAppointment[];
  addresses: TutorAddress[];
  paymentMethods: TutorPaymentMethod[];
  notifications: {
    vaccineAlerts: boolean;
    orderUpdates: boolean;
    marketingPromos: boolean;
  };
}

export interface CauseItem {
  id: string;
  organization: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  imageUrl: string;
  category?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionPage?: NavPageId;
  actionLabel?: string;
}
