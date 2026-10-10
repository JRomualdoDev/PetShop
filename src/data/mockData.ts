import type { CategoryItem, ProductItem, OfferBannerData } from '../types';

export const USER_PROFILE = {
  name: 'João',
  avatarUrl: '',
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'produtos',
    label: 'Produtos',
    iconSrc: '/images/cat-produtos.png',
    bgColor: '#e5eefb',
    iconColor: '#3a86ff',
  },
  {
    id: 'servicos',
    label: 'Serviços',
    iconSrc: '/images/cat-servicos.png',
    bgColor: '#e0f6f1',
    iconColor: '#00bfa5',
  },
  {
    id: 'adote',
    label: 'Adote',
    iconSrc: '/images/cat-adote.png',
    bgColor: '#f9e9eb',
    iconColor: '#fe6c70',
  },
  {
    id: 'apoie',
    label: 'Apoie',
    iconSrc: '/images/cat-apoie.png',
    bgColor: '#f9f3e1',
    iconColor: '#ffb800',
  },
];

export const SEARCH_CATEGORIES = [
  'Todos',
  'Ração',
  'Brinquedos',
  'Higiene',
  'Acessórios',
];

export const ALL_PRODUCTS: ProductItem[] = [
  {
    id: 'shampoo-neutro',
    name: 'Shampoo Neutro Pet',
    category: 'Higiene',
    price: 45.00,
    rating: 4.8,
    reviewsCount: 86,
    imageUrl: '/images/shampoo-neutro.png',
    isFavorite: false,
    description: 'Shampoo suave hipoalergênico com extrato natural para cães e gatos de todas as raças. Limpeza profunda que respeita o pH da pele do animal.',
    specs: {
      'Capacidade': '500ml',
      'Material': 'Fórmula Vegana',
    },
  },
  {
    id: 'varinha-gatos',
    name: 'Varinha para Gatos',
    category: 'Brinquedos',
    price: 19.90,
    rating: 4.9,
    reviewsCount: 215,
    imageUrl: '/images/varinha-gatos.png',
    isFavorite: true,
    description: 'Varinha interativa com penas coloridas e guizo para estimular os instintos de caça, agilidade e exercícios diários do seu felino.',
    specs: {
      'Capacidade': 'Haste 60cm',
      'Material': 'Madeira e Penas Naturais',
    },
  },
  {
    id: 'cama-conforto',
    name: 'Cama Conforto M',
    category: 'Acessórios',
    price: 129.90,
    rating: 4.6,
    reviewsCount: 94,
    imageUrl: '/images/cama-conforto.png',
    isFavorite: false,
    description: 'Cama circular ultra macia com enchimento ortopédico respirável. Proporciona alívio nas articulações e máximo aconchego para cães e gatos.',
    specs: {
      'Capacidade': 'Porte Pequeno e Médio',
      'Material': 'Algodão e Espuma Soft',
    },
  },
  {
    id: 'fonte-agua',
    name: 'Fonte de Água Bivolt',
    category: 'Acessórios',
    price: 89.90,
    rating: 4.7,
    reviewsCount: 142,
    imageUrl: '/images/fonte-agua-large.png',
    isFavorite: false,
    description: 'Fonte de água automática com filtro de carvão ativado. Mantém a água do seu pet sempre fresca, limpa e oxigenada, estimulando um maior consumo de água diário para cães e gatos.',
    specs: {
      'Capacidade': '2.5 Litros',
      'Material': 'Plástico BPA-Free',
    },
  },
  {
    id: 'racao-premium',
    name: 'Ração Premium Cães',
    category: 'Ração',
    price: 149.90,
    rating: 4.9,
    reviewsCount: 310,
    imageUrl: '/images/racao-premium.png',
    isFavorite: true,
    description: 'Alimento completo super premium para cães adultos de médio e grande porte, com ômega 3 e 6 para pelos brilhantes e digestão equilibrada.',
    specs: {
      'Capacidade': '15kg',
      'Material': 'Frango e Arroz Integral',
    },
  },
  {
    id: 'brinquedo-mordedor',
    name: 'Brinquedo Mordedor',
    category: 'Brinquedos',
    price: 29.90,
    rating: 4.7,
    reviewsCount: 78,
    imageUrl: '/images/brinquedo-mordedor.png',
    isFavorite: false,
    description: 'Mordedor espiralado com textura massageadora de gengiva. Auxilia na higiene bucal e combate o estresse do pet com material resistente.',
    specs: {
      'Capacidade': 'Diâmetro 8cm',
      'Material': 'Borracha Atóxica',
    },
  },
];

export const FEATURED_PRODUCTS: ProductItem[] = [
  ALL_PRODUCTS[4], // Ração Premium
  ALL_PRODUCTS[5], // Brinquedo Mordedor
];

export const OFFER_BANNER: OfferBannerData = {
  discountBadge: '30% OFF',
  title: 'Rações & Petiscos',
  description: 'Todo o setor com descontos especiais hoje',
  imageUrl: '/images/banner-petiscos.png',
  linkText: 'Ver tudo',
};
