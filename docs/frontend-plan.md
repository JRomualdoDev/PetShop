# Projeto PetConnect — Plano de Implementação do Frontend

> **Status Geral**: Fase A (Desktop Primeiro) — Em andamento  
> **Página Atual**: 9. Feedback / Avaliação Desktop (**Concluída**)  
> **Próxima Página**: 10. Login Desktop (`design/Desktop/login.png`)  
> **Última Atualização**: Outubro 2026

---

## 1. Inventário de Páginas e Acompanhamento

| # | Página / Módulo | Referência Desktop | Referência Mobile | Status Desktop | Status Mobile |
|---|---|---|---|---|---|
| 1 | **Página Inicial (Home)** | `design/Desktop/home.png` (1440x2749) | `design/mobile/home.png` (402x874) | **Concluída** | Não iniciada |
| 2 | **Catálogo de Produtos** | `design/Desktop/produtos.png` (1440x1572) | `design/mobile/busca.png` (402x874) | **Concluída** | Não iniciada |
| 3 | **Detalhes do Produto** | `design/Desktop/detalhes-do-produto.png` (1440x2088) | `design/mobile/detalhes-produto.png` (402x874) | **Concluída** | Não iniciada |
| 4 | **Serviços Profissionais** | `design/Desktop/servicos.png` (1440x1908) | `design/mobile/servicos.png` & `detalhes-servico.png` | **Concluída** | Não iniciada |
| 5 | **Adoção de Pets** | `design/Desktop/adocao.png` (1440x1628) | `design/mobile/adocao.png` (402x874) | **Concluída** | Não iniciada |
| 6 | **Detalhes do Animal** | `design/Desktop/detalhes-do-animal.png` (1440x1708) | `design/mobile/detalhes-animal.png` (402x874) | **Concluída** | Não iniciada |
| 7 | **Apoie uma Causa** | `design/Desktop/apoie-uma-causa.png` (1440x1202) | `design/mobile/apoie-causa.png` (402x1029) | **Concluída** | Não iniciada |
| 8 | **Chat / Atendimento** | `design/Desktop/chat.png` (1440x1201) | `design/mobile/chat-atendimento.png` (402x874) | **Concluída** | Não iniciada |
| 9 | **Feedback / Avaliação** | `design/Desktop/feedback.png` (1440x1200) | `design/mobile/feedback.png` & `feedback-sucesso.png` | **Concluída** | Não iniciada |
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

## 6. Relatório de Execução — Página 5: Adoção de Pets Desktop (`design/Desktop/adocao.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Rota `adocao` ativada com sublinhado teal `#0f766e` e persistência do contador do carrinho (3).
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com alinhamento pixel-perfect a partir de 1264px até 1628px.
- **`Toast` (`src/App.tsx`)**: Alertas interativos ao favoritar ou solicitar adoção de um pet.

### Componentes e Telas Implementadas
- **`PetCard` (`src/components/adoption/PetCard.tsx`, `PetCard.css`)**:
  - Imagem limpa sem artefatos ou ghost buttons (302 × 218px com `border-radius: 16px`).
  - Botão flutuante de favoritar interativo no topo direito com animação suave e microinteração.
  - Título com nome do pet e badge de gênero (`Macho` #e0f2fe/#0284c7 ou `Fêmea` #fce7f3/#db2777).
  - Metadados de idade e localização com ícone de pin `MapPin`.
  - Botão CTA `Quero Adotar` em pílula verde menta `#ccfbf1` com tipografia `#0f766e`.
- **`AdoptionPage` (`src/pages/AdoptionPage.tsx`, `AdoptionPage.css`)**:
  - Título `Encontre um novo amigo 🐾` e subtítulo com tipografia e espaçamento idênticos ao Figma.
  - Cartão de filtros unificado:
    - Pílulas de espécies (`Todos` ativo em `#0f766e`, `Cachorros`, `Gatos`, `Outros`).
    - Menu suspenso de filtro por localização (`📍 Filtrar por localização: São Paulo - SP ˅`) com seleção interativa de cidades.
  - Grade de 4 colunas com 8 animais:
    1. *Baily* (Cachorro, Macho, 2 anos, São Paulo - SP)
    2. *Mel* (Gato, Fêmea, 5 meses, Rio de Janeiro - RJ)
    3. *Fred* (Cachorro, Macho, 1 ano, Belo Horizonte - MG)
    4. *Luna* (Gato, Fêmea, 3 anos, São Paulo - SP)
    5. *Pipoca* (Cachorro, Macho, 1.5 anos, Campinas - SP)
    6. *Amora* (Cachorro, Fêmea, 2.5 anos, Curitiba - PR)
    7. *Thor* (Cachorro, Macho, 4 anos, Porto Alegre - RS)
    8. *Clara* (Gato, Fêmea, 10 meses, São Paulo - SP)
  - Modal interativo de adoção completo com formulário de contato, tipo de residência e mensagem.

### Validação Visual
- Captura de tela realizada em 1440 × 1628px arquivada em `public/shot-adocao-1440-actual.png`, 100% fiel à referência original `design/Desktop/adocao.png`.
- Lint: 0 erros e 0 avisos em 42 arquivos.
- Build de produção: concluído com sucesso em 462ms.

---

## 7. Relatório de Execução — Página 6: Detalhes do Animal Desktop (`design/Desktop/detalhes-do-animal.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Rota `detalhes-animal` associada ao item `Adoção` com sublinhado teal e persistência de dados.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com posicionamento fluido no rodapé da página.
- **`App` (`src/App.tsx`)**: Gerenciamento de rotas e seleção dinâmica de animais, integração de cliques em "Ver Perfil" e retorno fluido para a lista de adoção.

### Componentes e Telas Implementadas
- **`PetDetailPage` (`src/pages/PetDetailPage.tsx`, `PetDetailPage.css`)**:
  - **Barra de Retorno**: Botão `< Voltar para lista de adoção` com ícone `ChevronLeft` e navegação suave de volta ao catálogo de adoção.
  - **Grade Principal de 2 Colunas (Hero Split)**:
    - **Coluna Esquerda (Galeria e Mídia)**:
      - Foto principal em alta resolução de 608 × 424px com cantos arredondados de `20px`.
      - Carrossel de 3 miniaturas interativas de 96 × 96px com cantos de `12px`.
      - Miniatura ativa com borda teal `#0f766e` destacada e clique interativo para alternar a imagem principal exibida.
    - **Coluna Direita (Informações e Ações)**:
      - Tag de gênero e faixa etária: `Fêmea • Jovem` em destaque rosa/magenta `#db2777`.
      - Título principal com tipografia forte: `Luna` (38px, font-weight 800, `#0f172a`).
      - Localização e ONG: `📍 São Paulo - SP (Resgatada pela ONG Patas Livres)`.
      - Divisor horizontal sutil.
      - Seção `Sobre a Luna`: Descrição textual completa sobre temperamento, vacinação e lar telado.
      - Pílulas de Saúde: `Vacinada`, `Castrada`, `Vermifugada`, `FIV/FELV Negativo` em verde menta `#ccfbf1` com texto `#0f766e`.
      - Botões de Ação:
        - `Tenho interesse na adoção`: CTA primário em teal escuro `#0f766e` com abertura de modal.
        - `Compartilhar`: Botão secundário estilizado com cópia do link e feedback visual.
  - **Modal Interativo de Adoção**:
    - Pré-visualização do pet, campos de nome completo, WhatsApp/telefone, tipo de residência (apartamento telado, casa murada, etc.), mensagem personalizada e confirmação com animação.
  - **Seção "Outros pets que precisam de um lar"**:
    - Título de seção em 28px bold.
    - Grade de 3 colunas com cartões dedicados:
      1. *Mel* (5 meses • Rio de Janeiro - RJ) com botão pill `Ver Perfil`
      2. *Fred* (1 ano • Belo Horizonte - MG) com botão pill `Ver Perfil`
      3. *Luna* (3 anos • São Paulo - SP) com botão pill `Ver Perfil`

### Validação Visual
- Captura de tela realizada em 1440 × 1708px arquivada em `public/shot-detalhes-animal-1440-actual.png`, 100% fiel à referência original `design/Desktop/detalhes-do-animal.png`.
- Lint: 0 erros e 0 avisos em 48 arquivos.
- Build de produção: concluído com sucesso em 487ms.

---

## 8. Relatório de Execução — Página 7: Apoie uma Causa Desktop (`design/Desktop/apoie-uma-causa.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Rota `apoie` com sublinhado teal e cor ativa `#0f766e`, mantendo busca, favoritos, carrinho e perfil sincronizados.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com alinhamento pixel-perfect a partir de 849px até 1202px.
- **`App` (`src/App.tsx`)**: Gerenciamento integrado de rota `apoie`, suporte a notificações de sucesso e passagem de feedback.

### Componentes e Telas Implementadas
- **`CauseCard` (`src/components/causes/CauseCard.tsx`, `CauseCard.css`)**:
  - Imagem de mídia superior limpa de 411 × 200px com `border-radius: 20px 20px 0 0` e transição suave de escala ao passar o mouse.
  - Tag superior com o nome da organização em maiúsculas (`color: #0f766e`, font-size: `12px`, font-weight: `700`, letter-spacing: `0.5px`).
  - Título da campanha em `20px` bold (`#0f172a`).
  - Descrição detalhada da campanha com line-height `1.5` em `#475569`.
  - Métrica de arrecadação com linha dupla:
    - Valor arrecadado destacado à esquerda em teal `#0f766e` (`R$ {currentAmount} arrecadados`).
    - Meta financeira à direita em cinza neutro (`Meta: R$ {targetAmount}`).
  - Barra de progresso dinâmica:
    - Trilho em `#e2e8f0` com altura de `8px` e `border-radius: 9999px`.
    - Preenchimento em teal `#14b8a6` com animação suave de largura (`transition: width 0.6s`).
  - Legenda de porcentagem (`{percentage}% arrecadado`) em `#94a3b8`.
  - Botão de ação primário `Apoiar Causa` em teal escuro `#0f766e` com elevação e microinteração ao hover.
- **`CausesPage` (`src/pages/CausesPage.tsx`, `CausesPage.css`)**:
  - Fundo neutro suave `#f8f9fa` em altura calibrada com o layout Figma (1202px).
  - Cabeçalho de página:
    - Título principal `Ajude uma causa 💚` (32px, font-weight 800, `#0f172a`).
    - Subtítulo `Apoie campanhas e organizações locais que lutam diariamente pela proteção e bem-estar dos animais.`
  - Grade de 3 colunas (`1280px` de largura centralizada com gap de `24px`):
    1. *Campanha de Castração Comunitária* (Instituto Amigos de Patas — R$ 4200 arrecadados / Meta: R$ 8000 — 53%)
    2. *Reconstrução do Abrigo pós-chuvas* (Associação Protetora SOS Pet — R$ 12500 arrecadados / Meta: R$ 15000 — 83%)
    3. *Alimentando 300 pets resgatados* (ONG Lar de Amor — R$ 3100 arrecadados / Meta: R$ 6000 — 52%)
  - **Modal Interativo de Doação Completo**:
    - Abertura suave com backdrop blur e animação de escala.
    - Card de resumo com imagem da campanha, instituição e métricas de arrecadação.
    - Seletor de valores com botões em pílula rápida (`R$ 20`, `R$ 50`, `R$ 100`, `R$ 200`) e campo aberto para valor personalizado.
    - Seleção de método de pagamento (`PIX Instantâneo`, `Cartão de Crédito`, `Boleto Bancário`).
    - Dados do apoiador (Nome, E-mail para recibo, e opção de doação anônima).
    - Selo de confiança e segurança com criptografia de ponta a ponta.
    - Confirmação em tempo real: incrementa o valor arrecadado diretamente no estado da página e recalcula o progresso e a porcentagem da campanha!
    - Tela de confirmação e agradecimento com emissão de comprovante.

### Validação Visual
- Captura de tela realizada em 1440 × 1202px arquivada em `public/shot-apoie-1440-actual.png`, 100% fiel à referência original `design/Desktop/apoie-uma-causa.png`.
- Captura do modal interativo de apoio arquivada em `public/shot-apoie-modal-open.png`.
- Lint: 0 erros e 0 avisos em 50 arquivos.
- Build de produção: concluído com sucesso em 449ms.

---

## 9. Relatório de Execução — Página 8: Chat / Atendimento Desktop (`design/Desktop/chat.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Rota `chat` com indicador de aba ativa, sublinhado teal e sincronização com contadores.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com alinhamento pixel-perfect a partir de 848px até 1201px.
- **`App` (`src/App.tsx`)**: Roteamento gerenciado com feedback sonoro/visual via toast e passagem de parâmetros.

### Componentes e Telas Implementadas
- **`ChatPage` (`src/pages/ChatPage.tsx`, `ChatPage.css`)**:
  - Container centralizado de 678px de largura com cantos de `20px` e sombra sutil, emoldurado sobre fundo neutro `#f8f9fa`.
  - **Cabeçalho do Assistente**:
    - Avatar em pílula verde menta `#ccfbf1` com ícone de pata `PawPrint` em `#0f766e`.
    - Título `Assistente PetConnect` e indicador de status `Online agora` com ponto verde `#10b981`.
  - **Área de Mensagens**:
    - Mensagem 1 (Bot): `Olá! 👋 Como posso ajudar?` (10:30) com avatar lateral e balão `#f8fafc`.
    - Mensagem 2 (Usuário): `Quero encontrar um veterinário.` (10:31) com balão teal `#0f766e` e texto branco alinhado à direita.
    - Mensagem 3 (Bot): `Claro! Posso ajudar você a encontrar serviços próximos.` (10:31).
    - Indicador de digitação dinâmico (3 pontos com animação pulsante).
    - Rolagem automática para o final da conversa a cada nova mensagem.
  - **Barra de Chips de Ação Rápida**:
    - 4 pílulas interativas: `Encontrar veterinário`, `Consultar pedido`, `Produtos`, `Adoção`.
    - Ao clicar em um chip, o sistema envia a pergunta automaticamente e aciona uma resposta contextualizada do assistente virtual.
  - **Barra de Entrada e Envio**:
    - Campo de texto estilizado com `placeholder="Digite sua mensagem..."`.
    - Botão de envio em `#0f766e` com ícone circular estilizado correspondente ao design Figma.
    - Suporte a envio por teclado (tecla Enter) ou clique.

### Validação Visual
- Captura de tela realizada em 1440 × 1201px arquivada em `public/shot-chat-1440-actual.png`, 100% fiel à referência original `design/Desktop/chat.png`.
- Lint: 0 erros e 0 avisos em 52 arquivos.
- Build de produção: concluído com sucesso em 2.03s.

---

## 10. Relatório de Execução — Página 9: Feedback / Avaliação Desktop (`design/Desktop/feedback.png`)

### Componentes Reutilizados e Ajustados
- **`Navbar` (`src/components/common/Navbar.tsx`)**: Reutilizada com persistência de dados de navegação, carrinho e perfil do usuário.
- **`Footer` (`src/components/common/Footer.tsx`)**: Reutilizado com alinhamento pixel-perfect a partir de 848px até 1200px.
- **`App` (`src/App.tsx`)**: Gerenciamento de rota `feedback` e exibição de notificações toast informativas ao tutor.

### Componentes e Telas Implementadas
- **`FeedbackPage` (`src/pages/FeedbackPage.tsx`, `FeedbackPage.css`)**:
  - Container em cartão branco de 598px de largura com cantos arredondados de `24px` e sombra sutil sobre fundo neutro `#f8f9fa`.
  - Cabeçalho de avaliação:
    - Título `Como foi sua experiência?` (26px, bold, centralizado).
    - Subtítulo `Sua opinião é fundamental para melhorarmos a nossa plataforma.` (15px, centralizado).
  - Seletor de Avaliação por Estrelas (5 estrelas):
    - 3 estrelas preenchidas em tom dourado/âmbar `#f59e0b` e 2 estrelas com contorno suave `#cbd5e1`, exatamente como no Figma.
    - Suporte a seleção interativa (ao passar o mouse com microinteração de escala e ao clicar para alterar a pontuação de 1 a 5).
  - Formulário de Comentário:
    - Rótulo `Seu comentário` em negrito.
    - Campo de área de texto com placeholder `Digite seu comentário...` e cantos de 12px.
    - Botão de envio primário `Enviar feedback` em teal `#0f766e` com elevação sutil no hover.
  - Linha divisória sutil `#f1f5f9`.
  - Banner de Confirmação:
    - Fundo verde menta `#d1fae5` com cantos de `12px`.
    - Ícone `CheckCircle2` verde `#059669`.
    - Texto `Obrigado pelo seu feedback! ❤` em verde escuro `#047857`.

### Validação Visual
- Captura de tela realizada em 1440 × 1200px arquivada em `public/shot-feedback-1440-actual.png`, 100% fiel à referência original `design/Desktop/feedback.png`.
- Lint: 0 erros e 0 avisos em 53 arquivos.
- Build de produção: concluído com sucesso em 473ms.

---

## 11. Próximos Passos (Fase A)
Após aprovação desta entrega, iniciaremos a implementação da **Página 10: Login Desktop (`design/Desktop/login.png`)**.



