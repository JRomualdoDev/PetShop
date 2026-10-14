export type NavPageId = 
  | 'inicio' 
  | 'produtos' 
  | 'servicos' 
  | 'adocao' 
  | 'apoie' 
  | 'chat' 
  | 'feedback' 
  | 'login' 
  | 'cadastro'
  | 'buscar' 
  | 'favoritos' 
  | 'perfil';

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
}

export interface AdoptionCampaignData {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
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
}
