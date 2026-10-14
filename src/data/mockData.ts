import type {
  QuickCategoryItem,
  CategoryItem,
  ProductItem,
  ServiceItem,
  AdoptionCampaignData,
  OfferBannerData,
  UserProfile,
} from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Mariana',
  avatarUrl: '/images/desktop/avatar-mariana.png',
};

export const QUICK_CATEGORIES: QuickCategoryItem[] = [
  {
    id: 'produtos',
    label: 'Produtos',
    description: 'Tudo que seu pet ama',
    iconName: 'ShoppingBag',
    bgLightColor: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    id: 'servicos',
    label: 'Serviços',
    description: 'Profissionais confiáveis',
    iconName: 'Scissors',
    bgLightColor: '#fce7f3',
    iconColor: '#db2777',
  },
  {
    id: 'adote',
    label: 'Adote',
    description: 'Seu novo melhor amigo',
    iconName: 'HeartHandshake',
    bgLightColor: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    id: 'apoie',
    label: 'Apoie',
    description: 'Ajude ONGs locais',
    iconName: 'Gift',
    bgLightColor: '#fef3c7',
    iconColor: '#d97706',
  },
];

export const CATEGORIES: CategoryItem[] = [
  { id: 'produtos', label: 'Produtos', bgColor: '#e5eefb', iconColor: '#3a86ff' },
  { id: 'servicos', label: 'Serviços', bgColor: '#e0f6f1', iconColor: '#00bfa5' },
  { id: 'adote', label: 'Adote', bgColor: '#f9e9eb', iconColor: '#fe6c70' },
  { id: 'apoie', label: 'Apoie', bgColor: '#f9f3e1', iconColor: '#ffb800' },
];

export const HOME_FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'racao-premium-caes-15kg',
    name: 'Ração Premium Cães Adultos 15kg',
    category: 'Rações',
    price: 249.90,
    rating: 4.9,
    reviewsCount: 120,
    imageUrl: '/images/desktop/prod-racao.png',
    isFavorite: false,
    description: 'Formulada cientificamente para cães adultos de porte médio a grande. Contém proteínas selecionadas de alta digestibilidade, antioxidantes naturais para suporte imunológico e ômega 3 e 6 para uma pelagem brilhante e saudável. Sem corantes artificiais.',
    specs: {
      'Peso da Embalagem': '15 kg',
      'Idade Recomendada': 'Cães Adultos de 1 a 7 anos',
      'Porte': 'Médio, Grande, Gigante',
      'Sabor': 'Frango, Arroz e Vegetais selecionados',
      'Marca': 'PetConnect BioCuidado',
    },
  },
  {
    id: 'brinquedo-mordedor-borracha',
    name: 'Brinquedo Mordedor Interativo de Borracha',
    category: 'Brinquedos',
    price: 49.90,
    rating: 4.8,
    reviewsCount: 85,
    imageUrl: '/images/desktop/prod-brinquedo.png',
    isFavorite: false,
    description: 'Brinquedo mordedor com textura texturizada que massageia gengivas e alivia o estresse e a ansiedade de separação de cães de todas as idades.',
    specs: {
      'Material': 'Borracha Atóxica Ultra-Resistente',
      'Porte Indicado': 'Todos os portes',
    },
  },
  {
    id: 'arranhador-torre-gatos',
    name: 'Arranhador Torre Moderno para Gatos',
    category: 'Acessórios',
    price: 189.90,
    rating: 4.7,
    reviewsCount: 42,
    imageUrl: '/images/desktop/prod-arranhador.png',
    isFavorite: false,
    description: 'Torre de arranhar em madeira maciça e sisal premium com múltiplos níveis e mirante acolchoado para descanso e diversão dos felinos.',
    specs: {
      'Material': 'Madeira de Reflorestamento e Sisal',
      'Altura': '110 cm',
    },
  },
  {
    id: 'cama-ortopedica-comfort-grande',
    name: 'Cama Ortopédica Comfort Grande',
    category: 'Acessórios',
    price: 299.90,
    rating: 5.0,
    reviewsCount: 98,
    imageUrl: '/images/desktop/prod-cama.png',
    isFavorite: false,
    description: 'Cama com espuma viscoelástica que alivia pontos de pressão nas articulações, tecido impermeável e capa removível e lavável.',
    specs: {
      'Dimensões': '100 x 80 x 20 cm',
      'Porte Indicado': 'Médio e Grande',
    },
  },
];

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'racao-premium-caes-15kg',
    name: 'Ração Premium Cães Adultos 15kg',
    category: 'Rações',
    price: 249.90,
    rating: 4.9,
    reviewsCount: 120,
    imageUrl: '/images/desktop/prod-racao-catalog.png',
    isFavorite: false,
    petAge: 'Adulto',
    petSize: 'Grande',
    description: 'Formulada cientificamente para cães adultos de porte médio a grande. Contém proteínas selecionadas de alta digestibilidade, antioxidantes naturais para suporte imunológico e ômega 3 e 6 para uma pelagem brilhante e saudável. Sem corantes artificiais.',
    specs: {
      'Peso da Embalagem': '15 kg',
      'Idade Recomendada': 'Cães Adultos de 1 a 7 anos',
      'Porte': 'Médio, Grande, Gigante',
      'Sabor': 'Frango, Arroz e Vegetais selecionados',
      'Marca': 'PetConnect BioCuidado',
    },
  },
  {
    id: 'brinquedo-mordedor-borracha',
    name: 'Brinquedo Mordedor Interativo de Borracha',
    category: 'Brinquedos',
    price: 49.90,
    rating: 4.8,
    reviewsCount: 85,
    imageUrl: '/images/desktop/prod-brinquedo-catalog.png',
    isFavorite: false,
    petAge: 'Filhote',
    petSize: 'Pequeno',
    description: 'Brinquedo mordedor com textura texturizada que massageia gengivas e alivia o estresse e a ansiedade de separação de cães de todas as idades.',
    specs: {
      'Material': 'Borracha Atóxica Ultra-Resistente',
      'Porte Indicado': 'Todos os portes',
    },
  },
  {
    id: 'arranhador-torre-gatos',
    name: 'Arranhador Torre Moderno para Gatos',
    category: 'Acessórios',
    price: 189.90,
    rating: 4.7,
    reviewsCount: 42,
    imageUrl: '/images/desktop/prod-arranhador-catalog.png',
    isFavorite: false,
    petAge: 'Adulto',
    petSize: 'Médio',
    description: 'Torre de arranhar em madeira maciça e sisal premium com múltiplos níveis e mirante acolchoado para descanso e diversão dos felinos.',
    specs: {
      'Material': 'Madeira de Reflorestamento e Sisal',
      'Altura': '110 cm',
    },
  },
  {
    id: 'cama-ortopedica-comfort-grande',
    name: 'Cama Ortopédica Comfort Grande',
    category: 'Acessórios',
    price: 299.90,
    rating: 5.0,
    reviewsCount: 98,
    imageUrl: '/images/desktop/prod-cama-catalog.png',
    isFavorite: false,
    petAge: 'Sênior',
    petSize: 'Grande',
    description: 'Cama com espuma viscoelástica que alivia pontos de pressão nas articulações, tecido impermeável e capa removível e lavável.',
    specs: {
      'Dimensões': '100 x 80 x 20 cm',
      'Porte Indicado': 'Médio e Grande',
    },
  },
  {
    id: 'coleira-peitoral-ergonomica',
    name: 'Coleira Peitoral Ergonômica Ajustável',
    category: 'Acessórios',
    price: 89.90,
    rating: 4.6,
    reviewsCount: 73,
    imageUrl: '/images/desktop/prod-coleira-catalog.png',
    isFavorite: false,
    petAge: 'Adulto',
    petSize: 'Médio',
    description: 'Coleira peitoral ergonômica com fitas acolchoadas respiráveis, travas de segurança em metal e pontos refletivos para passeios noturnos seguros.',
    specs: {
      'Material': 'Nylon Balístico e Aço Inox',
      'Ajuste': '4 pontos de regulagem anatômica',
      'Tamanho': 'M (peito 50-70cm)',
    },
  },
  {
    id: 'petiscos-saudaveis-naturais',
    name: 'Petiscos Saudáveis Naturais de Frango',
    category: 'Rações',
    price: 18.90,
    rating: 4.9,
    reviewsCount: 310,
    imageUrl: '/images/desktop/prod-petiscos-catalog.png',
    isFavorite: false,
    petAge: 'Filhote',
    petSize: 'Pequeno',
    description: 'Snacks 100% naturais desidratados lentamente com filé de frango selecionado. Ricos em proteínas, sem conservantes, aromatizantes ou subprodutos artificiais.',
    specs: {
      'Peso': '100 g',
      'Ingredientes': '100% Peito de Frango Desidratado',
      'Indicação': 'Cães e Gatos de todos os portes',
    },
  },
];

export const ALL_PRODUCTS: ProductItem[] = CATALOG_PRODUCTS;
export const FEATURED_PRODUCTS: ProductItem[] = HOME_FEATURED_PRODUCTS;

export const SEARCH_CATEGORIES: string[] = [
  'Todos',
  'Rações',
  'Brinquedos',
  'Higiene',
  'Acessórios',
  'Farmácia',
];

export const HOME_SERVICES: ServiceItem[] = [
  {
    id: 'dr-gustavo-silva',
    name: 'Dr. Gustavo Silva - Clínica Geral',
    category: 'veterinario',
    categoryLabel: 'Veterinário',
    rating: 4.9,
    reviewsCount: 150,
    distance: 'A 1.2 km de você',
    isHomeService: true,
    imageUrl: '/images/desktop/service-gustavo.png',
    buttonText: 'Agendar',
  },
  {
    id: 'petshop-amigo-fiel',
    name: 'Pet Shop Amigo Fiel - Estética',
    category: 'banho-tosa',
    categoryLabel: 'Banho & Tosa',
    rating: 4.8,
    reviewsCount: 210,
    distance: 'A 2.5 km de você',
    isHomeService: true,
    imageUrl: '/images/desktop/service-amigo-fiel.png',
    buttonText: 'Agendar',
  },
];

export const ADOPTION_CAMPAIGN: AdoptionCampaignData = {
  badge: 'Campanha de Adoção',
  title: 'Mude uma vida, adote um amigo',
  description: 'Milhares de cães e gatos em ONGs parceiras estão à procura de um lar amoroso. Todos os pets são vacinados, castrados e acompanhados por nossa equipe veterinária parceira.',
  imageUrl: '/images/desktop/adoption-dog.png',
  ctaText: 'Conheça os pets',
};

export const OFFER_BANNER: OfferBannerData = {
  discountBadge: '30% OFF',
  title: 'Rações & Petiscos',
  description: 'Todo o setor com descontos especiais hoje',
  imageUrl: '/images/desktop/prod-racao.png',
  linkText: 'Ver tudo',
};
