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
| 2 | **Catálogo de Produtos** | `design/Desktop/produtos.png` (1440x1572) | `design/mobile/busca.png` (402x874) | **Concluída** | Não iniciada |
| 3 | **Detalhes do Produto** | `design/Desktop/detalhes-do-produto.png` (1440x2088) | `design/mobile/detalhes-produto.png` (402x874) | **Concluída** | Não iniciada |
| 4 | **Serviços Profissionais** | `design/Desktop/servicos.png` (1440x1908) | `design/mobile/servicos.png` & `detalhes-servico.png` | **Próxima (Aguardando aprovação)** | Não iniciada |
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
(Documentado com Navbar, HeroBanner limpo e transparente, QuickActionCards, ProductCard, ServiceCard, AdoptionBannerCard, Footer).

---

## 3. Relatório de Execução — Página 2: Catálogo de Produtos Desktop (`design/Desktop/produtos.png`)
(Documentado com ProductSearchBar, ProductFilterSidebar, ProductsPage com grade de 3 colunas e ordenação funcional, Footer).

---

## 4. Relatório de Execução — Página 3: Detalhes do Produto Desktop (`design/Desktop/detalhes-do-produto.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Ajustado para manter a aba `Produtos` ativa e com sublinhado teal durante a visualização de detalhes.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com o padrão de alta fidelidade em 4 colunas slate escuro.
- **`ProductCard` (`src/components/home/ProductCard.tsx`)**: Reutilizado na seção de produtos recomendados ("Quem viu este produto também comprou").

### Componentes e Telas Implementadas
- **`ProductDetailPage` (`src/pages/ProductDetailPage.tsx`, `ProductDetailPage.css`)**:
  - **Breadcrumb de retorno**: Botão `< Voltar para Rações` estilizado em verde petróleo.
  - **Galeria de Imagens**: Exibição principal de 608x480 com cantos arredondados (`20px`), mais 3 miniaturas interativas de 100x100 (embalagem, grãos em close e tigela).
  - **Buy Box / Informações**:
    - Selo pill da categoria `Ração Premium`.
    - Título oficial `Ração Premium Cães Adultos Sabores Selecionados 15kg`.
    - Avaliação com estrela dourada ★ 4.9 (120 avaliações de clientes).
    - Preço principal `R$ 249,90` com parcelamento `10x de R$ 24,99 sem juros`.
    - Parágrafo de descrição nutricional e características.
    - Seletor numérico de quantidade `[- 1 +]`.
    - Botão CTA `Adicionar ao carrinho` com integração ao contador do carrinho no cabeçalho e notificação Toast.
  - **Card de Abas de Conteúdo**:
    - Abas interativas: `Especificações` (com tabela completa de peso, idade, porte, sabor e marca), `Níveis de Garantia` e `Guia Alimentar`.
  - **Grade de Recomendação**:
    - Seção "Quem viu este produto também comprou" com 4 cards de produtos em grade proporcional.

### Validação Visual
- Captura de tela realizada em 1440px arquivada em `public/shot-detail-1440-actual.png`.
- Lint: 0 erros e 0 avisos.
- Build de produção: concluído com sucesso em 649ms.

---

## 5. Próximos Passos (Fase A)
Após aprovação desta entrega, iniciaremos a implementação da **Página 4: Serviços Profissionais Desktop (`design/Desktop/servicos.png`)**.

