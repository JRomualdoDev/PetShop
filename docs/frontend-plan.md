# Projeto PetConnect — Plano de Implementação do Frontend

> **Status Geral**: Fase A (Desktop Primeiro) — Em andamento  
> **Página Atual**: 1. Página Inicial Desktop (**Concluída**)  
> **Próxima Página**: 2. Produtos Desktop (`design/Desktop/produtos.png`)  
> **Última Atualização**: Outubro 2026

---

## 1. Inventário de Páginas e Acompanhamento

| # | Página / Módulo | Referência Desktop | Referência Mobile | Status Desktop | Status Mobile |
|---|---|---|---|---|---|
| 1 | **Página Inicial (Home)** | `design/Desktop/home.png` (1440x2749) | `design/mobile/home.png` (402x874) | **Concluída** | Não iniciada |
| 2 | **Catálogo de Produtos** | `design/Desktop/produtos.png` (1440x1572) | `design/mobile/busca.png` (402x874) | **Próxima (Aguardando aprovação)** | Não iniciada |
| 3 | **Detalhes do Produto** | `design/Desktop/detalhes-do-produto.png` (1440x2088) | `design/mobile/detalhes-produto.png` (402x874) | Não iniciada | Não iniciada |
| 4 | **Serviços Profissionais** | `design/Desktop/servicos.png` (1440x1908) | `design/mobile/servicos.png` & `detalhes-servico.png` | Não iniciada | Não iniciada |
| 5 | **Adoção de Pets** | `design/Desktop/adocao.png` (1440x1628) | `design/mobile/adocao.png` (402x874) | Não iniciada | Não iniciada |
| 6 | **Detalhes do Animal** | `design/Desktop/detalhes-do-animal.png` (1440x1708) | `design/mobile/detalhes-animal.png` (402x874) | Não iniciada | Não iniciada |
| 7 | **Apoie uma Causa** | `design/Desktop/apoie-uma-causa.png` (1440x1202) | `design/mobile/apoie-causa.png` (402x1029) | Não iniciada | Não iniciada |
| 8 | **Chat / Atendimento** | `design/Desktop/chat.png` (1440x1201) | `design/mobile/chat-atendimento.png` (402x874) | Não iniciada | Não iniciada |
| 9 | **Feedback / Avaliação** | `design/Desktop/feedback.png` (1440x1200) | `design/mobile/feedback.png` & `feedback-sucesso.png` | Não iniciada | Não iniciada |
| 10 | **Login** | `design/Desktop/login.png` (1440x900) | `design/mobile/login.png` (402x874) | Não iniciada | Não iniciada |
| 11 | **Criar Conta / Cadastro** | `design/Desktop/criar-conta.png` (1440x900) | `design/mobile/cadastro.png` (402x874) | Não iniciada | Não iniciada |

### Telas Complementares Exclusivas do Fluxo Mobile (Fase B)
- **Carrinho**: `design/mobile/carrinho.png`
- **Checkout**: `design/mobile/checkout.png`
- **Pedido Confirmado**: `design/mobile/pedido-confirmado.png`
- **Splash Screen**: `design/mobile/splash-screen.png`
- **Onboarding (Passos 1, 2 e 3)**: `design/mobile/onboarding-step-1.png`, `step-2.png`, `step-3.png`

---

## 2. Relatório de Execução — Página 1: Página Inicial Desktop

### Componentes Existentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`, `Navbar.css`)**:
  - Reutilizado e reformulado para espelhar com exatidão o cabeçalho desktop do Figma: logotipo oficial PetConnect (ícone com patinha e tipografia verde petróleo `#0f766e`), links de navegação (`Início`, `Produtos`, `Serviços`, `Adoção`, `Apoie`, `Chat`) com indicador ativo de sublinhado, botões de ação (busca, favoritos, carrinho com badge `3`), e perfil da usuária Mariana com foto original.
- **`Footer` (`src/components/common/Footer.tsx`, `Footer.css`)**:
  - Reestruturado para o padrão de alta fidelidade: fundo escuro premium (`#0f172a`), 4 colunas semânticas (*PetConnect*, *SERVIÇOS*, *PRODUTOS*, *INSTITUCIONAL*), textos oficiais e ícones sociais nativos (Instagram, Facebook, Twitter).
- **`SectionHeader` (`src/components/home/SectionHeader.tsx`, `SectionHeader.css`)**:
  - Ajustado para suportar links estilizados com seta interativa (`Ver todos os produtos →`, `Ver no mapa →`).
- **`ProductCard` (`src/components/home/ProductCard.tsx`, `ProductCard.css`)**:
  - Reestruturado para as dimensões e proporções do Figma Desktop (largura de grid de 4 colunas, imagem com botão de favoritar interativo sobreposto, nota de avaliação com estrelas, preço em destaque e botão pill `Ver produto`).

### Componentes Novos Criados
- **`HeroBanner` (`src/components/home/HeroBanner.tsx`, `HeroBanner.css`)**:
  - Banner imersivo com imagem fotográfica do cão e gato na sala, gradiente de contraste à esquerda, título em tipografia expressiva ("Tudo para cuidar melhor do seu pet"), descrição e botão de ação ("Explorar agora").
- **`QuickActionCards` (`src/components/home/QuickActionCards.tsx`, `QuickActionCards.css`)**:
  - Grade de 4 cards de atalhos ("O que você precisa hoje?") com ícones em caixas coloridas suaves (Produtos, Serviços, Adote, Apoie).
- **`ServiceCard` (`src/components/home/ServiceCard.tsx`, `ServiceCard.css`)**:
  - Card de serviço profissional com foto de capa, badge da categoria (*Veterinário*, *Banho & Tosa*), avaliação média e contagem de reviews, distância com ícone de pin, tag "Atendimento domiciliar" e botão "Agendar".
- **`AdoptionBannerCard` (`src/components/home/AdoptionBannerCard.tsx`, `AdoptionBannerCard.css`)**:
  - Card com imagem do animal no abrigo, selo "Campanha de Adoção", título "Mude uma vida, adote um amigo", descrição de responsabilidade e botão "Conheça os pets".

### Tokens e Estilos Globais
- **`variables.css`**: Definidos os tokens oficiais do PetConnect: `--color-primary: #0f766e`, `--color-accent: #14b8a6`, `--color-slate-900: #0f172a`, `--color-primary-light: #ccfbf1`, além de sombras, raios de borda e largura máxima de container (`1280px`).

### Dados e Tipagens
- **`src/types/index.ts`**: Tipagens estritas para todas as entidades e navegações do sistema.
- **`src/data/mockData.ts`**: Dados mock enriquecidos contendo os itens reais do Figma Desktop.

---

## 3. Próximos Passos (Fase A)
Após a aprovação desta primeira entrega, iniciaremos a implementação da **Página 2: Catálogo de Produtos Desktop (`design/Desktop/produtos.png`)**.
