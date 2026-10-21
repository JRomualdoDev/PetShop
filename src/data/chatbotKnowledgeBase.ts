export interface ChatbotQA {
  id: string;
  category: string;
  question: string;
  triggerKeywords: string[];
  sampleVariations: string[];
  answer: string;
  suggestedTopicChip?: string;
  targetPage?: 'produtos' | 'servicos' | 'adocao' | 'apoie' | 'perfil';
}

/**
 * Normaliza o texto removendo acentos, pontuação e convertendo para minúsculas
 * para garantir que perguntas como "qual ração e a melhor" ou "QUAL RAÇÃO É A MELHOR?"
 * correspondam perfeitamente.
 */
export function normalizeChatText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentuação
    .replace(/[^\w\s]/gi, ' ') // substitui pontuações por espaço
    .replace(/\s+/g, ' ') // unifica espaços múltiplos
    .trim();
}

/**
 * Base de conhecimento mockada com perguntas e respostas completas do PetConnect
 */
export const CHATBOT_KNOWLEDGE_BASE: ChatbotQA[] = [
  // 1. Nutrição e Rações
  {
    id: 'racao-melhor',
    category: 'Nutrição & Alimentação',
    question: 'Qual ração é a melhor?',
    suggestedTopicChip: 'Qual ração é a melhor?',
    sampleVariations: [
      'qual ração é a melhor',
      'qual racao e a melhor',
      'melhor racao',
      'qual a melhor racao para cachorro',
      'qual a melhor racao para gato',
      'que racao escolher',
      'marcas de racao boas',
      'racao super premium recomendada',
    ],
    triggerKeywords: [
      'melhor racao',
      'racao e a melhor',
      'qual racao',
      'qual a racao',
      'marca de racao',
      'super premium',
      'royal canin',
      'premier',
      'golden',
      'racao filhote',
      'racao adulto',
      'racao boa',
    ],
    answer:
      `A melhor ração depende da espécie, idade, porte e eventuais sensibilidades do seu pet! 🐶🐱\n\nNo PetConnect trabalhamos com as 3 principais categorias:\n\n1. 🌟 **Super Premium** (Ex: *Royal Canin*, *PremieR Pet*, *Hill's Science Diet*):\nMáxima digestibilidade, fontes nobres de proteína, ômegas 3 e 6 para pelagem brilhante e formulações sob medida por raça ou pets castrados.\n\n2. 🥩 **Premium Especial** (Ex: *Golden Seleção Natural*, *GranPlus Gourmet*):\nExcelente custo-benefício, com alta absorção nutricional e livre de corantes artificiais.\n\n3. 🩺 **Rações Medicamentosas / Terapêuticas**:\nFórmulas para suporte renal, hepático, urinário ou controle de alergias alimentares.\n\n💡 **Dica de ouro**: Filhotes precisam de mais cálcio e DHA para desenvolvimento cognitivo, enquanto pets idosos ou castrados precisam de menos calorias e suporte articular. Você pode conferir todas as ofertas no nosso catálogo de **Produtos**!`,
    targetPage: 'produtos',
  },

  // 2. Veterinários e Clínicas
  {
    id: 'encontrar-veterinario',
    category: 'Saúde & Veterinária',
    question: 'Onde encontro um veterinário?',
    suggestedTopicChip: 'Onde encontro um veterinário?',
    sampleVariations: [
      'onde encontro um veterinario',
      'onde acho veterinario',
      'onde tem veterinario',
      'clinica veterinaria perto de mim',
      'veterinario 24h',
      'agendar veterinario',
      'preciso de uma consulta veterinaria',
      'veterinarios credenciados',
    ],
    triggerKeywords: [
      'onde encontro um veterinario',
      'onde acho veterinario',
      'onde tem veterinario',
      'encontro veterinario',
      'clinica veterinaria',
      'consulta veterinaria',
      'veterinario 24h',
      'agendar veterinario',
      'doutor pet',
      'dra carolina',
      'vetvida',
      'hospital veterinario',
      'veterinario',
    ],
    answer:
      `Você encontra os melhores veterinários e clínicas credenciadas na aba **Serviços** do PetConnect! 🩺🐾\n\nNossos principais parceiros recomendados:\n\n• 🏥 **Clínica Veterinária VetVida 24 Horas**:\nPronto-atendimento para emergências, cirurgias, UTI e exames laboratoriais completos (Av. Brasil, 1500 - Centro).\n\n• 👩‍⚕️ **Dra. Carolina Castro (CRMV 42.198)**:\nEspecialista em Medicina Felina e Dermatologia Veterinária, com atendimento humanizado e sem estresse.\n\n• 🐕 **Centro Veterinário PetCare**:\nEspecializado em oftalmologia, cardiologia e consultas preventivas com agendamento online.\n\n📅 Acesse a aba **Serviços** para escolher o profissional, filtrar por proximidade e agendar com confirmação imediata!`,
    targetPage: 'servicos',
  },

  // 3. Adoção de Pets
  {
    id: 'como-adotar',
    category: 'Adoção de Animais',
    question: 'Como posso adotar um pet?',
    suggestedTopicChip: 'Como posso adotar um pet?',
    sampleVariations: [
      'como posso adotar um pet',
      'como adotar um pet',
      'como adotar um cachorro',
      'como adotar um gato',
      'quero adotar um pet',
      'processo de adocao',
      'requisitos para adocao',
      'adotar animal',
    ],
    triggerKeywords: [
      'como posso adotar um pet',
      'como adotar um pet',
      'como adotar',
      'adotar cachorro',
      'adotar gato',
      'quero adotar',
      'processo de adocao',
      'requisitos adocao',
      'adocao responsavel',
      'adotar',
      'adocao',
      'luna',
      'fred',
    ],
    answer:
      `Adotar é salvar uma vida e transformar a sua! ❤️🐶🐱 O processo no PetConnect é simples e responsável:\n\n1. 🔍 **Escolha o Pet**: Visite a aba **Adoção** no menu superior para ver os cães e gatos resgatados (como a Luna, o Fred e o Thor).\n\n2. 📋 **Requisitos Obrigatórios**:\n• Ter mais de 21 anos;\n• Apresentar RG, CPF e comprovante de residência atualizado;\n• Ter residência segura (telas em janelas para gatos, muros fechados para cães).\n\n3. 📝 **Formulário de Adoção**: Clique em 'Quero Adotar' no perfil do animal e responda ao breve questionário sobre sua rotina e espaço familiar.\n\n4. 🤝 **Entrevista e Visita**: Nossa equipe agenda um encontro presencial para você conhecer seu novo companheiro.\n\n✨ **Garantia de Amor e Saúde**: Todos os animais são entregues vacinados, castrados e vermifugados!`,
    targetPage: 'adocao',
  },

  // 4. Vacinação
  {
    id: 'vacinas-pet',
    category: 'Saúde & Vacinação',
    question: 'Quais vacinas meu pet precisa tomar?',
    suggestedTopicChip: 'Vacinas obrigatórias para pets',
    sampleVariations: [
      'quais vacinas meu pet precisa tomar',
      'vacinas cachorro',
      'vacinas gato',
      'calendario de vacinacao',
      'quando vacinar filhote',
      'vacina de raiva',
      'v8 ou v10',
    ],
    triggerKeywords: [
      'vacina',
      'vacinas',
      'calendario de vacinacao',
      'v8',
      'v10',
      'antirrabica',
      'vacina de raiva',
      'vacinar',
      'v4',
      'v5',
      'imunizacao',
    ],
    answer:
      `A vacinação preventiva é o escudo de saúde do seu animal! 💉🐾\n\n🐶 **Para Cães**:\n• **45 dias de vida**: 1ª dose da vacina múltipla (V8 ou V10 - protege contra cinomose, parvovirose, hepatite e leptospirose).\n• **65 e 85 dias**: 2ª e 3ª doses da V8/V10 + Gripe Canina + Giárdia.\n• **12 semanas (3 meses)**: Vacina Antirrábica (Dose única).\n• **Adultos**: Reforço ANUAL obrigatório de V8/V10 e Antirrábica.\n\n🐱 **Para Gatos**:\n• **60 dias de vida**: 1ª dose da Quádrupla (V4) ou Quíntupla (V5 - protege contra panleucopenia, rinotraqueíte, calicivirose e leucemia felina FeLV).\n• **90 dias**: 2ª dose de reforço da V4/V5.\n• **12 semanas**: Vacina Antirrábica.\n• **Adultos**: Reforço ANUAL.\n\nVocê pode agendar a vacinação com veterinário a domicílio ou na clínica pela aba **Serviços**!`,
    targetPage: 'servicos',
  },

  // 5. Banho e Tosa
  {
    id: 'banho-tosa',
    category: 'Estética & Cuidados',
    question: 'Como agendar banho e tosa?',
    suggestedTopicChip: 'Como agendar banho e tosa?',
    sampleVariations: [
      'como agendar banho e tosa',
      'agendar banho',
      'quanto custa banho e tosa',
      'tosa higienica',
      'tosa na tesoura',
      'tem servico de taxi dog',
      'banho para cachorro',
    ],
    triggerKeywords: [
      'banho e tosa',
      'agendar banho',
      'agendar tosa',
      'banho',
      'tosa',
      'taxi dog',
      'corte de unha',
      'hidratacao',
      'estetica pet',
    ],
    answer:
      `Deixar seu pet limpinho e cheiroso é muito fácil! 🛁✂️\n\n1. Acesse a aba **Serviços** no topo do site e selecione a categoria 'Banho & Tosa'.\n2. Escolha o pacote ideal para a pelagem:\n   • **Banho Completo**: Água morna, shampoo neutro/hipoalergênico, secagem suave e limpeza de ouvidos.\n   • **Tosa Higiênica**: Higienização íntima, almofadinhas das patas e corte de unhas.\n   • **Tosa na Máquina ou Tesoura**: Específica para a raça (Poodle, Shih Tzu, Spitz Alemão, etc.).\n3. **Pet Táxi Opcional**: Se não tiver tempo de levar, nosso transporte busca e entrega com total segurança.\n4. Escolha o dia e selecione o horário livre na agenda.\n\nValores a partir de R$ 45,00. Seu amigo peludo vai adorar o dia de spa! 🧼`,
    targetPage: 'servicos',
  },

  // 6. Prazos de Entrega e Frete
  {
    id: 'frete-entrega',
    category: 'Entregas & Pedidos',
    question: 'Qual o prazo e valor do frete para entrega?',
    suggestedTopicChip: 'Prazo e valor do frete',
    sampleVariations: [
      'qual o prazo de entrega',
      'quanto custa o frete',
      'tem frete gratis',
      'tempo de entrega',
      'entrega rapida',
      'rastrear pedido',
      'meu pedido',
    ],
    triggerKeywords: [
      'prazo de entrega',
      'valor do frete',
      'frete',
      'entrega',
      'frete gratis',
      'rastrear',
      'rastreamento',
      'rastreio',
      'tempo de entrega',
      'pedido',
    ],
    answer:
      `Entregamos com agilidade para seu pet nunca ficar sem os produtos favoritos! 🚚📦\n\n• ⚡ **Entrega Expressa (Same-Day)**: Pedidos confirmados até as 13h chegam na sua casa em até 3 a 4 horas (regiões cobertas).\n• 📦 **Entrega Padrão**: De 1 a 2 dias úteis via transportadora parceira.\n• 🎁 **Frete Grátis**: Em compras acima de **R$ 149,00** para toda a cidade e região metropolitana!\n• 🔍 **Rastreamento**: Você pode acompanhar cada etapa do pacote acessando seu **Perfil > Meus Pedidos**.`,
    targetPage: 'perfil',
  },

  // 7. Formas de Pagamento
  {
    id: 'formas-pagamento',
    category: 'Pagamentos & Finanças',
    question: 'Quais formas de pagamento são aceitas?',
    suggestedTopicChip: 'Formas de pagamento aceitas',
    sampleVariations: [
      'quais formas de pagamento sao aceitas',
      'formas de pagamento',
      'aceita pix',
      'posso parcelar no cartao',
      'aceita boleto',
      'pagamento',
      'desconto a vista',
    ],
    triggerKeywords: [
      'formas de pagamento',
      'forma de pagamento',
      'como pagar',
      'aceita pix',
      'pix',
      'parcelar',
      'cartao de credito',
      'cartao',
      'boleto',
      'desconto',
    ],
    answer:
      `Aceitamos as formas de pagamento mais seguras e convenientes do mercado: 💳✨\n\n• ⚡ **Pix**: Confirmação instantânea com **5% de desconto automático** em todo o pedido!\n• 💳 **Cartão de Crédito**: Aceitamos Visa, Mastercard, Elo, Hipercard e Amex. Parcele em até **6x sem juros** (parcela mínima de R$ 30,00).\n• 🏧 **Cartão de Débito**: Pagamento direto via checkout seguro.\n• 📄 **Boleto Bancário**: Vencimento em 3 dias úteis (compensação em até 48h úteis).`,
  },

  // 8. Antipulgas e Carrapatos
  {
    id: 'antipulgas-carrapatos',
    category: 'Medicamentos & Prevenção',
    question: 'Qual o melhor remédio para pulgas e carrapatos?',
    suggestedTopicChip: 'Melhor antipulgas e carrapatos',
    sampleVariations: [
      'qual o melhor remedio para pulgas e carrapatos',
      'melhor antipulgas',
      'bravecto ou simparic',
      'remedio contra carrapato',
      'qual antipulgas dura mais',
      'como eliminar pulgas',
      'coleira seresto',
    ],
    triggerKeywords: [
      'pulga',
      'pulgas',
      'carrapato',
      'carrapatos',
      'antipulgas',
      'bravecto',
      'simparic',
      'nexgard',
      'seresto',
      'advocate',
      'revolution',
      'parasita',
    ],
    answer:
      `Os antipulgas orais em comprimido mastigável são os mais recomendados por veterinários devido à alta eficácia e praticidade: 🛡️🐶🐱\n\n1. 🥇 **Bravecto**: O mais duradouro do mercado! Uma única dose protege por até **12 semanas (quase 3 meses)** contra pulgas e carrapatos. Tem versão para cães e pipeta para gatos.\n\n2. 🥈 **Simparic**: Ação rápida que começa a matar pulgas em apenas 3 horas. Eficaz contra pulgas, carrapatos e 3 tipos de sarnas, com duração de **35 dias**.\n\n3. 🥉 **NexGard / NexGard Spectra**: Comprimido sabor carne muito palatável. A versão Spectra combate também vermes intestinais (duração mensal).\n\n4. 🟡 **Coleira Seresto**: Excelente para quem prefere proteção contínua de longa duração (até **8 meses**) e proteção contra mosquito transmissor da leishmaniose.\n\n⚠️ **Importante**: Sempre selecione a dosagem exata de acordo com a faixa de peso do seu pet!`,
    targetPage: 'produtos',
  },

  // 9. Emergência e Primeiros Socorros
  {
    id: 'emergencia-socorro',
    category: 'Emergências & Socorro',
    question: 'O que fazer em caso de emergência ou intoxicação?',
    suggestedTopicChip: 'Emergência veterinária 24h',
    sampleVariations: [
      'o que fazer em caso de emergencia',
      'meu cachorro comeu veneno',
      'pet intoxicado o que fazer',
      'comeu chocolate',
      'socorro pet passando mal',
      'emergencia 24h veterinario',
    ],
    triggerKeywords: [
      'emergencia',
      'intoxicacao',
      'veneno',
      'chocolate',
      'socorro',
      'passando mal',
      'vomitando',
      'atropelado',
      'engasgou',
      'veneno de rato',
      'urgente',
    ],
    answer:
      `🚨 **ATENÇÃO - PROTOCOLO DE EMERGÊNCIA VETERINÁRIA**:\n\nSe o seu pet ingeriu substância tóxica (como chocolate, veneno, plantas venenosas, produtos químicos ou remédios humanos) ou sofreu trauma:\n\n1. ⛔ **NÃO provoque vômito** e **NÃO dê leite ou azeite**. Isso pode queimar o esôfago ou causar asfixia pulmonar grave.\n2. 📦 **Identifique o produto**: Tire foto ou leve a embalagem da substância até o hospital.\n3. 🏥 **Encaminhe-se imediatamente a uma clínica 24 Horas**:\n   • **Pronto-Socorro VetVida 24h**: Av. Brasil, 1500 - Tel: (11) 98765-4321 / (11) 3344-5566\n   • **Plantão Emergencial PetConnect**: Chame a equipe pelo chat ou dirija-se à clínica mais próxima listada em **Serviços**!`,
    targetPage: 'servicos',
  },

  // 10. Castração
  {
    id: 'castracao-idade',
    category: 'Saúde & Cuidados',
    question: 'Quando devo castrar meu pet?',
    suggestedTopicChip: 'Quando devo castrar meu pet?',
    sampleVariations: [
      'quando devo castrar meu pet',
      'qual a idade certa para castrar',
      'beneficios da castracao',
      'castrar cachorro macho',
      'castrar gato',
      'castracao valor',
    ],
    triggerKeywords: [
      'quando devo castrar',
      'quando castrar',
      'castracao',
      'castrar',
      'idade para castrar',
      'beneficios da castracao',
      'cio',
      'castrar femea',
      'castrar macho',
    ],
    answer:
      `A castração é um ato de amor que aumenta comprovadamente a expectativa de vida do seu companheiro! 🩺✨\n\n• 🗓️ **Idade Recomendada**: A partir dos **5 a 6 meses de idade** (para cães de grande porte, alguns veterinários indicam esperar até 9-12 meses para consolidação óssea).\n\n• 💖 **Benefícios para Fêmeas**: Reduz em até 95% o risco de câncer de mama quando realizada antes do primeiro cio, e elimina totalmente o risco de piometra (infecção uterina grave).\n\n• 🐾 **Benefícios para Machos**: Previne tumores de próstata e testículos, reduz fugas, brigas com outros machos e demarcação excessiva de xixi em móveis.\n\nVocê pode consultar um cirurgião veterinário na aba **Serviços** para fazer os exames pré-operatórios de sangue e coração!`,
    targetPage: 'servicos',
  },

  // 11. Quantidade de Ração
  {
    id: 'quantidade-racao',
    category: 'Nutrição & Alimentação',
    question: 'Qual a quantidade diária de ração devo dar?',
    suggestedTopicChip: 'Quantidade diária de ração',
    sampleVariations: [
      'qual a quantidade diaria de racao',
      'quantas gramas de racao por dia',
      'dosagem de racao pet',
      'quanto meu cachorro deve comer',
      'quanto dar de racao',
    ],
    triggerKeywords: [
      'quantidade de racao',
      'quantas gramas',
      'dosagem de racao',
      'quanto dar de racao',
      'quanto come',
      'porcao de racao',
      'refeicoes por dia',
    ],
    answer:
      `A quantidade exata de ração é baseada no **peso ideal**, idade e nível de atividade física do pet! ⚖️🥣\n\n• 📊 **Consulte a tabela na embalagem**: Cada fabricante calcula a densidade calórica do seu alimento. A tabela traseira do pacote indica as gramas diárias recomendadas.\n• ⏱️ **Divisão de Refeições**:\n  - Filhotes (até 6 meses): Dividir em **3 a 4 refeições** ao dia;\n  - Adultos: Dividir em **2 refeições** (manhã e noite);\n  - Evite deixar a ração exposta o dia todo para não oxidar ou perder o aroma.\n• ⚖️ **Use balança culinária**: O uso de copinhos medidores pode errar em até 30% a porção, levando à obesidade ou desnutrição!`,
  },

  // 12. Adaptação de Novo Pet
  {
    id: 'adaptacao-pet',
    category: 'Comportamento & Dicas',
    question: 'Como adaptar um pet novo em casa?',
    suggestedTopicChip: 'Dicas para adaptar novo pet',
    sampleVariations: [
      'como adaptar um pet novo em casa',
      'como adaptar um gato novo',
      'como adaptar um cachorro adotado',
      'socializar cachorro e gato',
      'pet assustado recem chegado',
    ],
    triggerKeywords: [
      'adaptar',
      'adaptacao',
      'novo pet',
      'recem chegado',
      'socializacao',
      'adaptar gato',
      'adaptar cachorro',
      'pet assustado',
      'feliway',
    ],
    answer:
      `Receber um novo amigo é emocionante, mas exige paciência e respeito ao tempo dele! 🏡🐾\n\n1. 🚪 **Espaço de Acolhimento**: Nos primeiros 2 ou 3 dias, reserve um cômodo calmo e seguro com cama, água, comida e brinquedos.\n2. 👃 **Troca de Odores**: Antes de apresentar animais que já vivem na casa, esfregue uma toalhinha em cada um e coloque perto do pratinho de comida para associar o cheiro a algo bom.\n3. 🐱 **Para Gatos**: Tenha sempre arranhadores e posições verticais (prateleiras). O uso de difusores de feromônio (Feliway) reduz muito o estresse da mudança.\n4. 🐕 **Para Cães**: Mantenha uma rotina fixa de passeios e alimentação. Não force carinhos se ele se esconder; deixe-o vir até você!`,
  },

  // 13. Trocas e Devoluções
  {
    id: 'trocas-devolucoes',
    category: 'Políticas & Garantia',
    question: 'Como funciona a política de trocas e devoluções?',
    suggestedTopicChip: 'Trocas e garantia de 100%',
    sampleVariations: [
      'como funciona a politica de trocas',
      'como trocar produto',
      'politica de devolucao',
      'comprei tamanho errado de roupinha',
      'meu pet nao gostou da racao',
      'garantia de satisfacao',
    ],
    triggerKeywords: [
      'troca',
      'trocar',
      'devolucao',
      'devolver',
      'tamanho errado',
      'arrependimento',
      'garantia',
      'garantia de satisfacao',
      'reembolso',
    ],
    answer:
      `No PetConnect você tem compra 100% garantida e sem dor de cabeça! 🔄📦\n\n• 🗓️ **Prazo de Arrependimento**: Até 7 dias corridos após o recebimento para devolver qualquer item com embalagem intacta e receber estorno integral.\n• 👕 **Tamanho Errado de Acessórios**: A primeira troca de coleiras, peitorais ou caminhas por motivo de tamanho é **grátis** em até 30 dias!\n• 🥣 **Garantia 100% de Satisfação em Rações**: Se o seu pet não se adaptar ao sabor da ração Super Premium (Premier, Royal Canin, Hill's, Golden), acionamos a troca direta pelo programa de satisfação do fabricante!`,
  },

  // 14. Apoio a Causas e ONGs
  {
    id: 'apoie-causas',
    category: 'Solidariedade & Comunidade',
    question: 'Como funciona a doação para ONGs no PetConnect?',
    suggestedTopicChip: 'Como ajudar ONGs e animais',
    sampleVariations: [
      'como funciona a doacao para ongs',
      'como doar para ongs',
      'como ajudar animais de rua',
      'apoie uma causa',
      'doar racao para abrigo',
    ],
    triggerKeywords: [
      'doar',
      'doacao',
      'ong',
      'ongs',
      'apoie uma causa',
      'ajudar abrigo',
      'resgate',
      'animais de rua',
      'solidariedade',
    ],
    answer:
      `Você pode transformar a realidade de centenas de animais abandonados! 🐾❤️\n\nNa aba **Apoie uma Causa** do PetConnect você pode doar:\n• 🥣 Cestas de alimentação para abrigos parceiros;\n• 🩹 Fundo para cirurgias e atendimentos de resgate de emergência;\n• 💉 Vacinas e medicamentos essenciais para feiras comunitárias.\n\n100% das arrecadações são auditadas e acompanhadas com fotos e relatórios de prestação de contas direto no aplicativo!`,
    targetPage: 'apoie',
  },

  // 15. Atendimento Humano
  {
    id: 'falar-humano',
    category: 'Suporte & Atendimento',
    question: 'Como posso falar com um atendente humano?',
    suggestedTopicChip: 'Falar com atendente humano',
    sampleVariations: [
      'como posso falar com um atendente humano',
      'falar com atendente',
      'suporte humano',
      'falar com uma pessoa',
      'qual o whatsapp',
      'telefone de contato',
      'falar com atendente humano',
    ],
    triggerKeywords: [
      'atendente humano',
      'falar com atendente',
      'falar com humano',
      'suporte humano',
      'pessoa',
      'whatsapp',
      'telefone',
      'contato',
      'sac',
      'humano',
    ],
    answer:
      `Nossa equipe de especialistas humanos está pronta para te atender com o maior carinho! 👨‍💼💬\n\n• 📱 **WhatsApp Oficial**: (11) 99999-8888 (Atendimento rápido de Seg a Sáb das 08h às 20h)\n• 📧 **E-mail de Suporte**: atendimento@petconnect.com.br\n• ☎️ **Central Telefônica**: 0800 777 2200\n\nSe preferir, pode detalhar seu caso aqui no chat mesmo que ele ficará registrado no seu histórico de atendimento!`,
  },

  // 16. Saudações e Boas-Vindas
  {
    id: 'saudacao-inicial',
    category: 'Geral',
    question: 'Olá! Quem é você e como pode me ajudar?',
    suggestedTopicChip: 'Como o assistente funciona?',
    sampleVariations: [
      'ola',
      'oi',
      'bom dia',
      'boa tarde',
      'boa noite',
      'quem e voce',
      'o que voce faz',
      'ajuda',
      'menu de perguntas',
    ],
    triggerKeywords: [
      'ola',
      'oi',
      'bom dia',
      'boa tarde',
      'boa noite',
      'quem e voce',
      'o que voce faz',
      'ajuda',
      'menu',
      'comecar',
    ],
    answer:
      `Olá! Eu sou o **Assistente Virtual Inteligente do PetConnect** 🐾✨\n\nEstou aqui 24 horas para te orientar sobre tudo no universo pet! Você pode me perguntar sobre:\n\n• 🥘 **Alimentação**: 'Qual ração é a melhor?' ou 'Qual a quantidade diária de ração?'\n• 🩺 **Veterinários**: 'Onde encontro um veterinário?' ou 'Quais vacinas meu pet precisa tomar?'\n• ❤️ **Adoção**: 'Como posso adotar um pet?'\n• ✂️ **Serviços**: 'Como agendar banho e tosa?'\n• 🚚 **Loja & Pedidos**: 'Qual o prazo e valor do frete?' ou 'Quais formas de pagamento aceitam?'\n• 🛡️ **Saúde & Emergência**: 'Melhor remédio para pulgas' ou 'O que fazer em emergência?'\n\nComo posso ajudar você e seu bichinho hoje? Escolha uma sugestão ou escreva sua pergunta!`,
  },
];

/**
 * Sugestões rápidas para exibição nos chips do topo do chat
 */
export const QUICK_CHAT_SUGGESTIONS: string[] = [
  'Qual ração é a melhor?',
  'Onde encontro um veterinário?',
  'Como posso adotar um pet?',
  'Quais vacinas meu pet precisa tomar?',
  'Como agendar banho e tosa?',
  'Qual o prazo e valor do frete?',
  'Melhor remédio para pulgas e carrapatos',
  'Quando devo castrar meu pet?',
];

/**
 * Mecanismo de busca inteligente para encontrar a melhor resposta mockada
 */
export function getChatbotReply(userInput: string): {
  answer: string;
  matchedQA?: ChatbotQA;
  suggestedFollowUps: string[];
} {
  const cleanInput = normalizeChatText(userInput);

  if (!cleanInput) {
    return {
      answer: 'Por favor, digite uma dúvida ou selecione uma das opções recomendadas abaixo! 🐾',
      suggestedFollowUps: QUICK_CHAT_SUGGESTIONS.slice(0, 3),
    };
  }

  // 1. Procura por correspondência exata ou em variações de perguntas cadastradas
  for (const qa of CHATBOT_KNOWLEDGE_BASE) {
    for (const variation of qa.sampleVariations) {
      const cleanVariation = normalizeChatText(variation);
      if (cleanInput === cleanVariation || cleanInput.includes(cleanVariation) || cleanVariation.includes(cleanInput)) {
        return {
          answer: qa.answer,
          matchedQA: qa,
          suggestedFollowUps: getFollowUpSuggestions(qa.id),
        };
      }
    }
  }

  // 2. Pontuação por ocorrência de palavras-chave (keyword match scoring)
  let bestQA: ChatbotQA | null = null;
  let highestScore = 0;

  for (const qa of CHATBOT_KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of qa.triggerKeywords) {
      const cleanKeyword = normalizeChatText(keyword);
      if (cleanInput.includes(cleanKeyword)) {
        // Frases maiores contam mais pontos
        const wordCount = cleanKeyword.split(' ').length;
        score += wordCount * 3;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestQA = qa;
    }
  }

  // Se encontrou alguma correspondência com pontuação relevante
  if (bestQA && highestScore >= 3) {
    return {
      answer: bestQA.answer,
      matchedQA: bestQA,
      suggestedFollowUps: getFollowUpSuggestions(bestQA.id),
    };
  }

  // 3. Fallback amigável com orientação e sugestões claras
  return {
    answer:
      `Ainda estou aprendendo novas perguntas, mas posso te ajudar com muitas informações bacanas do PetConnect! 🐾\n\nVocê pode me perguntar por exemplo:\n• 🥘 *"Qual ração é a melhor?"*\n• 🩺 *"Onde encontro um veterinário?"*\n• ❤️ *"Como posso adotar um pet?"*\n• 💉 *"Quais vacinas meu pet precisa tomar?"*\n• 🛁 *"Como agendar banho e tosa?"*\n• 🚚 *"Qual o prazo e valor do frete?"*\n\nExperimente clicar em uma das opções abaixo ou reformular sua dúvida!`,
    suggestedFollowUps: QUICK_CHAT_SUGGESTIONS.slice(0, 4),
  };
}

function getFollowUpSuggestions(currentQAId: string): string[] {
  const available = QUICK_CHAT_SUGGESTIONS.filter((s) => {
    const matched = CHATBOT_KNOWLEDGE_BASE.find((q) => q.question === s || q.suggestedTopicChip === s);
    return matched?.id !== currentQAId;
  });
  return available.slice(0, 3);
}
