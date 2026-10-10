export type CategoryId = 'produtos' | 'servicos' | 'adote' | 'apoie';

export interface CategoryItem {
  id: CategoryId;
  label: string;
  iconSrc: string;
  bgColor: string;
  iconColor: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  imageUrl: string;
  isFavorite: boolean;
  description?: string;
  specs?: {
    capacity?: string;
    material?: string;
    [key: string]: string | undefined;
  };
}

export interface OfferBannerData {
  discountBadge: string;
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
}

export type NavTabId = 'inicio' | 'buscar' | 'favoritos' | 'perfil';

export interface NavItem {
  id: NavTabId;
  label: string;
  icon: string;
}
