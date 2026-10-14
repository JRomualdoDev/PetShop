# Projeto PetConnect — Plano de Implementação do Frontend

> **Status Geral**: Fase A (Desktop Primeiro) — Em andamento  
> **Página Atual**: 4. Serviços Profissionais Desktop (**Concluída**)  
> **Próxima Página**: 5. Adoção de Pets Desktop (`design/Desktop/adocao.png`)  
> **Última Atualização**: Outubro 2026

---

## 1. Inventário de Páginas e Acompanhamento

| # | Página / Módulo | Referência Desktop | Referência Mobile | Status Desktop | Status Mobile |
|---|---|---|---|---|---|
| 1 | **Página Inicial (Home)** | `design/Desktop/home.png` (1440x2749) | `design/mobile/home.png` (402x874) | **Concluída** | Não iniciada |
| 2 | **Catálogo de Produtos** | `design/Desktop/produtos.png` (1440x1572) | `design/mobile/busca.png` (402x874) | **Concluída** | Não iniciada |
| 3 | **Detalhes do Produto** | `design/Desktop/detalhes-do-produto.png` (1440x2088) | `design/mobile/detalhes-produto.png` (402x874) | **Concluída** | Não iniciada |
| 4 | **Serviços Profissionais** | `design/Desktop/servicos.png` (1440x1908) | `design/mobile/servicos.png` & `detalhes-servico.png` | **Concluída** | Não iniciada |
| 5 | **Adoção de Pets** | `design/Desktop/adocao.png` (1440x1628) | `design/mobile/adocao.png` (402x874) | **Próxima (Aguardando aprovação)** | Não iniciada |
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
(Documentado com Navbar, HeroBanner limpo e transparente, QuickActionCards, ProductCard, ServiceCard, AdoptionBannerCard, Footer).

---

## 3. Relatório de Execução — Página 2: Catálogo de Produtos Desktop (`design/Desktop/produtos.png`)
(Documentado com ProductSearchBar, ProductFilterSidebar, ProductsPage com grade de 3 colunas e ordenação funcional, Footer).

---

## 4. Relatório de Execução — Página 3: Detalhes do Produto Desktop (`design/Desktop/detalhes-do-produto.png`)
(Documentado com Galeria de miniaturas interativas, Buy Box com seletor numérico, Abas de especificações, Grade de recomendação de 4 produtos e retorno ao catálogo).

---

## 5. Relatório de Execução — Página 4: Serviços Profissionais Desktop (`design/Desktop/servicos.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Aba `Serviços` ativada com sublinhado teal e transição de rota fluida.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com o padrão de alta fidelidade em 4 colunas slate escuro.
- **`ServiceCard` (`src/components/home/ServiceCard.tsx`, `ServiceCard.css`)**: Reutilizado na grade principal de 3 colunas, com altura de mídia calibrada para 180px, selos de categoria pill, avaliação com estrela dourada, distância com pin e botão de agendamento integrado.

### Componentes e Telas Implementadas
- **`ServicesPage` (`src/pages/ServicesPage.tsx`, `ServicesPage.css`)**:
  - **Cabeçalho Principal**: Título `Serviços Profissionais` e subtítulo com espaçamento e pesos correspondentes ao Figma.
  - **Seletor de Região/Localização**: Dropdown interativo estilo pill (`Pinheiros, São Paulo ˅`) com menu suspenso de bairros e indicador de seleção ativa.
  - **Filtro em Pílulas (Category Pills)**:
    - 6 categorias: `Veterinários` (ativa com fundo `#0f766e` e texto branco), `Banho & Tosa`, `Pet Sitter`, `Dog Walker`, `Adestramento` e `Hospedagem`.
    - Filtragem dinâmica com persistência dos 6 serviços destacados e estado vazio elegante caso necessário.
  - **Grade de Serviços (3 Colunas)**:
    1. *Dr. Gustavo Silva - Clínica Geral* (★ 4.9 • 150 avaliações • 1.2 km)
    2. *Clínica VetVida 24 horas* (★ 4.7 • 380 avaliações • 3.4 km)
    3. *Dra. Carolina Castro - Dermatologista* (★ 5.0 • 65 avaliações • 2.1 km)
    4. *Pet Shop Amigo Fiel - Estética* (★ 4.8 • 210 avaliações • 2.5 km)
    5. *Hotel & Resort Pet Paradise* (★ 4.9 • 140 avaliações • 4.0 km)
    6. *Lucas Adestramento Educativo* (★ 4.8 • 92 avaliações • 1.8 km)
  - **Banner Promocional de Mapa ("Prefere visualizar os serviços no mapa?")**:
    - Fundo menta suave `#ccfbf1` com cantos de `24px`.
    - Texto explicativo em `#0f766e` e `#359088`.
    - Botão CTA `Abrir mapa interativo` com sombra suave e microinteração.
    - Ilustração do mapa isométrica de 400 × 240px com cantos arredondados e sombra suave.
  - **Modal Interativo do Mapa**:
    - Ao clicar em "Abrir mapa interativo", abre um modal moderno com pins ilustrados (Dr. Gustavo, VetVida, Amigo Fiel) e lista lateral de profissionais para agendamento direto.

### Validação Visual
- Captura de tela realizada em 1440px arquivada em `public/shot-servicos-1440-actual.png`.
- Lint: 0 erros e 0 avisos em 37 arquivos.
- Build de produção: concluído com sucesso em 468ms.

---

## 6. Próximos Passos (Fase A)
Após aprovação desta entrega, iniciaremos a implementação da **Página 5: Adoção de Pets Desktop (`design/Desktop/adocao.png`)**.

