/* ── I18N (PT-BR / EN) ─────────────────────────────────────────────
   Detecta o idioma do navegador/SO e traduz o site automaticamente.
   - pt-BR é o idioma padrão/original do conteúdo.
   - Se o navegador não estiver em português, o site troca para inglês.
   - O usuário pode alternar manualmente pelo botão #lang-toggle; a
     escolha manual fica salva em localStorage e passa a ter prioridade
     sobre a detecção automática.
   Este script deve rodar DEPOIS de todo o HTML da página (por isso é
   o primeiro <script> do bloco no fim do <body>) e ANTES de typing.js
   e hero-easter-egg.js, que dependem de window.SITE_LANG / window.i18nPhrases. */
(function () {
  var STORAGE_KEY = 'igor_portfolio_lang';

  var DICT = {
    'doc.title': {
      pt: 'Igor Santos | Desenvolvedor Full Stack & Automação',
      en: 'Igor Santos | Full Stack Developer & Automation',
    },

    /* NAV */
    'nav.about':      { pt: 'Sobre',    en: 'About' },
    'nav.services':   { pt: 'Serviços', en: 'Services' },
    'nav.education':  { pt: 'Formação', en: 'Education' },
    'nav.projects':   { pt: 'Projetos', en: 'Projects' },
    'nav.contact':    { pt: 'Contato',  en: 'Contact' },
    'nav.cta':        { pt: 'Fale Comigo', en: 'Get in Touch' },

    /* HERO */
    'hero.badge': { pt: 'Disponível para projetos', en: 'Available for projects' },
    'hero.title': {
      pt: 'Olá, sou<br>\n          <span class="name-highlight">Igor Santos</span>',
      en: 'Hi, I\'m<br>\n          <span class="name-highlight">Igor Santos</span>',
    },
    'hero.desc': {
      pt: 'Desenvolvedor Full Stack e Analista de Qualidade. Do suporte técnico à automação residencial e desenvolvimento de software, entrego soluções que transformam o cotidiano de pessoas e empresas.',
      en: 'Full Stack Developer and Quality Assurance Analyst. From technical support to home automation and software development, I deliver solutions that transform everyday life for people and businesses.',
    },
    'hero.btn.services': { pt: 'Ver Serviços', en: 'View Services' },
    'hero.btn.contact':  { pt: 'Entrar em Contato', en: 'Get in Touch' },

    /* SOBRE / ABOUT */
    'about.tag': { pt: 'Sobre mim', en: 'About me' },
    'about.title': {
      pt: 'Tecnologia que <span class="accent">resolve</span>',
      en: 'Technology that <span class="accent">solves</span>',
    },
    'about.p1': {
      pt: 'Sou Igor Santos, graduado em <strong style="color:var(--silver-lt)">Ciências da Computação</strong> e pós-graduado em <strong style="color:var(--silver-lt)">Desenvolvimento Full Stack</strong>. Atuo como desenvolvedor e analista de qualidade de software — unindo visão técnica de ponta a ponta com entrega de valor real.',
      en: 'I\'m Igor Santos, graduated in <strong style="color:var(--silver-lt)">Computer Science</strong> and postgraduated in <strong style="color:var(--silver-lt)">Full Stack Development</strong>. I work as a software developer and quality analyst — combining end-to-end technical vision with real value delivery.',
    },
    'about.p2': {
      pt: 'Como <strong style="color:var(--silver-lt)">Analista de Qualidade</strong>, garanto que cada solução entregue seja testada, estável e dentro dos padrões exigidos. No desenvolvimento, trabalho com React, Node.js, TypeScript e arquiteturas modernas como microsserviços e clean architecture.',
      en: 'As a <strong style="color:var(--silver-lt)">Quality Assurance Analyst</strong>, I make sure every solution delivered is tested, stable and up to the required standards. In development, I work with React, Node.js, TypeScript and modern architectures like microservices and clean architecture.',
    },
    'about.p3': {
      pt: 'Tenho forte atuação em <strong style="color:var(--silver-lt)">automação de sistemas com Python</strong> — criando scripts, bots e integrações que eliminam tarefas repetitivas e conectam sistemas de forma inteligente, gerando economia de tempo real para empresas e profissionais.',
      en: 'I have strong experience in <strong style="color:var(--silver-lt)">systems automation with Python</strong> — building scripts, bots and integrations that eliminate repetitive tasks and connect systems intelligently, generating real time savings for companies and professionals.',
    },
    'about.p4': {
      pt: 'Além do mundo do software, ofereço consultoria de TI, manutenção de equipamentos e trabalho com <strong style="color:var(--silver-lt)">automação residencial com Home Assistant</strong> — transformando casas comuns em ambientes verdadeiramente inteligentes.',
      en: 'Beyond the software world, I offer IT consulting, equipment maintenance and work with <strong style="color:var(--silver-lt)">home automation using Home Assistant</strong> — turning ordinary houses into truly smart environments.',
    },
    'about.tag1': { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    'about.tag2': { pt: 'Analista de Qualidade (QA)', en: 'Quality Assurance (QA)' },
    'about.tag3': { pt: 'Ciências da Computação', en: 'Computer Science' },
    'about.tag4': { pt: 'Automação Residencial', en: 'Home Automation' },
    'about.tag5': { pt: 'Automação com Python', en: 'Python Automation' },
    'about.tag6': { pt: 'Consultoria em TI', en: 'IT Consulting' },
    'about.tag7': { pt: 'Manutenção de Hardware', en: 'Hardware Maintenance' },

    /* SERVICES */
    'services.tag': { pt: 'O que faço', en: 'What I do' },
    'services.title': {
      pt: 'Serviços que <span class="accent">transformam</span>',
      en: 'Services that <span class="accent">transform</span>',
    },
    'services.badge': { pt: 'Principal foco', en: 'Main focus' },

    'services.s1.title': { pt: 'Desenvolvimento Web & Mobile', en: 'Web & Mobile Development' },
    'services.s1.desc': {
      pt: 'Do site institucional ao app na loja — crio experiências digitais completas. Sites, sistemas, e-commerces e aplicativos com React, Next.js e React Native.',
      en: 'From a company website to an app in the store — I build complete digital experiences. Websites, systems, e-commerces and apps with React, Next.js and React Native.',
    },
    'services.s1.li1': { pt: 'Sites, landing pages e e-commerces', en: 'Websites, landing pages and e-commerces' },
    'services.s1.li2': { pt: 'Sistemas e dashboards web', en: 'Web systems and dashboards' },
    'services.s1.li3': { pt: 'Apps iOS e Android (React Native)', en: 'iOS and Android apps (React Native)' },
    'services.s1.li5': { pt: 'Do conceito ao deploy — entrega completa', en: 'From concept to deploy — full delivery' },

    'services.s2.title': { pt: 'Manutenção de Computadores', en: 'Computer Maintenance' },
    'services.s2.desc': {
      pt: 'Diagnóstico e reparo completo de desktops e notebooks. Formatação, limpeza, upgrade de hardware e otimização de desempenho.',
      en: 'Complete diagnostics and repair for desktops and laptops. Formatting, cleaning, hardware upgrades and performance optimization.',
    },
    'services.s2.li1': { pt: 'Formatação e reinstalação de sistema', en: 'System formatting and reinstallation' },
    'services.s2.li2': { pt: 'Troca de peças e componentes', en: 'Parts and components replacement' },
    'services.s2.li3': { pt: 'Limpeza interna e pasta térmica', en: 'Internal cleaning and thermal paste' },
    'services.s2.li4': { pt: 'Diagnóstico de falhas de hardware', en: 'Hardware failure diagnostics' },

    'services.s3.title': { pt: 'Consultoria em TI', en: 'IT Consulting' },
    'services.s3.desc': {
      pt: 'Assessoria completa para empresas e profissionais que precisam otimizar sua infraestrutura tecnológica com segurança e eficiência.',
      en: 'Complete advisory for companies and professionals who need to optimize their technology infrastructure with security and efficiency.',
    },
    'services.s3.li1': { pt: 'Análise e planejamento de infraestrutura', en: 'Infrastructure analysis and planning' },
    'services.s3.li2': { pt: 'Suporte técnico especializado', en: 'Specialized technical support' },
    'services.s3.li3': { pt: 'Gestão de redes e segurança', en: 'Network and security management' },
    'services.s3.li4': { pt: 'Treinamento e capacitação', en: 'Training and capacity building' },

    /* EDUCAÇÃO / EDUCATION */
    'edu.tag': { pt: 'Educação', en: 'Education' },
    'edu.title': {
      pt: 'Minha <span class="accent">formação</span>',
      en: 'My <span class="accent">education</span>',
    },

    'edu.e1.degree': { pt: 'Bacharelado em Ciências da Computação', en: 'Bachelor\'s Degree in Computer Science' },
    'edu.e1.institution': { pt: 'Graduação — Ensino Superior', en: 'Undergraduate Degree' },
    'edu.e1.year': { pt: 'Concluído', en: 'Completed' },
    'edu.e1.desc': {
      pt: 'Formação completa em fundamentos da computação: algoritmos, estrutura de dados, engenharia de software, redes, banco de dados e sistemas operacionais.',
      en: 'Complete education in computing fundamentals: algorithms, data structures, software engineering, networks, databases and operating systems.',
    },
    'edu.e1.subjectsTitle': { pt: 'Áreas de conhecimento', en: 'Areas of knowledge' },
    'edu.e1.sub1': { pt: 'Algoritmos', en: 'Algorithms' },
    'edu.e1.sub2': { pt: 'Estrutura de Dados', en: 'Data Structures' },
    'edu.e1.sub3': { pt: 'Engenharia de Software', en: 'Software Engineering' },
    'edu.e1.sub4': { pt: 'Redes de Computadores', en: 'Computer Networks' },
    'edu.e1.sub5': { pt: 'Banco de Dados', en: 'Databases' },
    'edu.e1.sub6': { pt: 'Sistemas Operacionais', en: 'Operating Systems' },
    'edu.e1.sub7': { pt: 'Computação em Nuvem', en: 'Cloud Computing' },
    'edu.e1.sub8': { pt: 'Segurança da Informação', en: 'Information Security' },

    'edu.e2.degree': { pt: 'Pós-Graduação em Full Stack Development', en: 'Postgraduate Degree in Full Stack Development' },
    'edu.e2.year': { pt: '2025 — Aprovado em todas as disciplinas', en: '2025 — Passed all courses' },
    'edu.e2.subjectsTitle': { pt: 'Disciplinas cursadas e aprovadas', en: 'Courses completed and passed' },
    'edu.e2.sub7':  { pt: 'Microsserviços', en: 'Microservices' },
    'edu.e2.sub10': { pt: 'Arquitetura Cloud', en: 'Cloud Architecture' },
    'edu.e2.sub11': { pt: 'Banco de Dados', en: 'Databases' },
    'edu.e2.sub16': { pt: 'Qualidade de Software', en: 'Software Quality' },
    'edu.e2.sub17': { pt: 'UI/UX para Dev', en: 'UI/UX for Devs' },
    'edu.e2.sub20': { pt: 'React Native Câmeras', en: 'React Native Cameras' },
    'edu.e2.sub21': { pt: 'Introdução a APIs', en: 'Introduction to APIs' },
    'edu.e2.sub22': { pt: 'Node.js + Banco', en: 'Node.js + Database' },

    /* PROJETOS / PROJECTS */
    'projects.tag': { pt: 'Portfólio', en: 'Portfolio' },
    'projects.title': {
      pt: 'Projetos em <span class="accent">destaque</span>',
      en: 'Featured <span class="accent">projects</span>',
    },
    'projects.viewAll': { pt: 'Ver todos os projetos no GitHub', en: 'View all projects on GitHub' },

    'projects.p1.title': { pt: 'Loja de Moda Online', en: 'Online Fashion Store' },
    'projects.p1.desc': {
      pt: 'Loja virtual completa para moda feminina. Catálogo de produtos, carrinho e sistema de pedidos — desenvolvida com Next.js e design responsivo.',
      en: 'Complete online store for women\'s fashion. Product catalog, cart and order system — built with Next.js and responsive design.',
    },

    'projects.p2.title': { pt: 'Orbe Nerd', en: 'Orbe Nerd' },
    'projects.p2.desc': {
      pt: 'Plataforma para descobrir e acompanhar filmes, séries, animes e games num só lugar. Frontend em Next.js, backend em Flask (Python) com PostgreSQL e autenticação JWT, integrando as APIs do TMDB, Anilist e IGDB. UI Pulp Gráfico.',
      en: 'Platform to discover and track movies, TV shows, anime and games in one place. Frontend in Next.js, backend in Flask (Python) with PostgreSQL and JWT authentication, integrating the TMDB, Anilist and IGDB APIs. Pulp graphic UI.',
    },

    'projects.p3.badge': { pt: 'Sistema Web', en: 'Web System' },
    'projects.p3.title': { pt: 'AgendaPsi', en: 'AgendaPsi' },
    'projects.p3.desc': {
      pt: 'Plataforma de agendamento online para profissional de saúde mental, com portal do paciente, faturamento com PDF, relatórios e assinatura digital de documentos. Formulários validados com Zod e React Hook Form, persistência via Prisma/Supabase e testes end-to-end com Cypress. Em evolução: lembretes por WhatsApp e telemedicina.',
      en: 'Online scheduling platform for a mental health professional, with patient portal, PDF billing, reports and digital document signing. Forms validated with Zod and React Hook Form, persistence via Prisma/Supabase and end-to-end tests with Cypress. Coming next: WhatsApp reminders and telemedicine.',
    },

    'projects.p4.title': { pt: 'App Fit (HunterFit)', en: 'App Fit (HunterFit)' },
    'projects.p4.desc': {
      pt: 'Aplicativo de fitness gamificado (HunterFit). Acompanhamento de treinos, metas pessoais e evolução física com frontend Next.js e backend .NET.',
      en: 'Gamified fitness app (HunterFit). Workout tracking, personal goals and physical progress with Next.js frontend and .NET backend.',
    },

    'projects.p5.title': { pt: 'Planejamento Financeiro', en: 'Financial Planning' },
    'projects.p5.desc': {
      pt: 'Dashboard de controle financeiro pessoal. Acompanhamento de receitas, despesas e metas — para tomar melhores decisões com seu dinheiro.',
      en: 'Personal finance control dashboard. Track income, expenses and goals — to make better decisions with your money.',
    },

    'projects.p6.title': { pt: 'Home Assistant', en: 'Home Assistant' },
    'projects.p6.desc': {
      pt: 'Automação residencial com dashboards Lovelace, Docker e integrações — transformando a casa em um ambiente inteligente.',
      en: 'Home automation with Lovelace dashboards, Docker and integrations — turning a house into a truly smart environment.',
    },

    'projects.p7.title': { pt: 'Gmail Inbox Automation', en: 'Gmail Inbox Automation' },
    'projects.p7.desc': {
      pt: 'Automação genérica de Gmail: classifica e-mails, aplica labels, limpa marketing e gera relatório HTML com links de unsubscribe.',
      en: 'Generic Gmail automation: classifies mail, applies labels, cleans marketing and generates an HTML report with unsubscribe links.',
    },

    'link.viewGithub': { pt: 'Ver no GitHub', en: 'View on GitHub' },
    'link.viewLive':   { pt: 'Ver ao vivo', en: 'View live' },
    'link.code':       { pt: 'Código', en: 'Code' },

    /* CONTATO / CONTACT */
    'contact.tag': { pt: 'Vamos construir juntos', en: "Let's build together" },
    'contact.title': {
      pt: 'Transforme sua <span class="accent">ideia em realidade</span>',
      en: 'Turn your <span class="accent">idea into reality</span>',
    },
    'contact.inspire.title': {
      pt: 'Você imaginou,<br>\n            <span class="accent-text">eu consigo construir.</span>',
      en: 'You imagined it,<br>\n            <span class="accent-text">I can build it.</span>',
    },
    'contact.inspire.sub': {
      pt: 'Não importa se é um site, um app, um sistema completo ou uma casa inteligente. Se você consegue imaginar, eu tenho o conhecimento para transformar isso em algo real, funcional e que encanta quem usa.\n            <br><br>\n            Compartilhe sua ideia — por mais ousada que pareça. Responderei em até 24 horas.',
      en: "It doesn't matter if it's a website, an app, a full system or a smart home. If you can imagine it, I have the know-how to turn it into something real, functional and delightful to use.\n            <br><br>\n            Share your idea — no matter how bold it sounds. I'll reply within 24 hours.",
    },
    'contact.form.name': { pt: 'Nome', en: 'Name' },
    'contact.form.name.ph': { pt: 'Seu nome completo', en: 'Your full name' },
    'contact.form.email': { pt: 'E-mail', en: 'Email' },
    'contact.form.subject': { pt: 'Assunto', en: 'Subject' },
    'contact.form.subject.ph': { pt: 'Site, app, automação, suporte...', en: 'Website, app, automation, support...' },
    'contact.form.message': { pt: 'Mensagem', en: 'Message' },
    'contact.form.message.ph': {
      pt: 'Fale sobre sua ideia ou projeto. Não precisa ser perfeito — estou aqui para ajudar a moldar juntos.',
      en: "Tell me about your idea or project. It doesn't have to be perfect — I'm here to help shape it together.",
    },
    'contact.form.submit': { pt: 'Enviar Mensagem', en: 'Send Message' },
    'contact.quote': {
      pt: '"Cada grande produto digital começou como uma ideia na cabeça de alguém. O que muda é encontrar quem tenha a técnica e a paixão para transformá-la em realidade. É exatamente isso que faço."',
      en: '"Every great digital product started as an idea in someone\'s head. What makes the difference is finding someone with the skill and passion to turn it into reality. That\'s exactly what I do."',
    },

    /* FOOTER */
    'footer.copy': {
      pt: '© 2025 Igor Santos — Todos os direitos reservados',
      en: '© 2025 Igor Santos — All rights reserved',
    },

    /* MISC (usado por outros scripts) */
    'toast.secret': {
      pt: '🛰️ sistema estabilizado — você achou o modo secreto',
      en: '🛰️ system stabilized — you found the secret mode',
    },
  };

  var PHRASES = {
    pt: [
      'Desenvolvedor Full Stack',
      'Analista de Qualidade (QA)',
      'Consultor de TI',
      'Entusiasta de Home Assistant',
      'Consultor de Automação',
    ],
    en: [
      'Full Stack Developer',
      'Quality Assurance Analyst',
      'IT Consultant',
      'Home Assistant Enthusiast',
      'Automation Consultant',
    ],
  };

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) { /* localStorage indisponível — segue pra detecção automática */ }

    var candidates = [];
    if (Array.isArray(navigator.languages)) candidates = candidates.concat(navigator.languages);
    if (navigator.language) candidates.push(navigator.language);
    if (navigator.userLanguage) candidates.push(navigator.userLanguage);
    if (!candidates.length) candidates.push('pt-BR');

    var primary = String(candidates[0] || 'pt-BR').toLowerCase();
    return primary.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  function translate(key, lang) {
    var entry = DICT[key];
    if (!entry) return null;
    return entry[lang] != null ? entry[lang] : entry.pt;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    var textEls = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textEls.length; i++) {
      var key = textEls[i].getAttribute('data-i18n');
      var val = translate(key, lang);
      if (val != null) textEls[i].textContent = val;
    }

    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var hKey = htmlEls[j].getAttribute('data-i18n-html');
      var hVal = translate(hKey, lang);
      if (hVal != null) htmlEls[j].innerHTML = hVal;
    }

    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var k = 0; k < phEls.length; k++) {
      var pKey = phEls[k].getAttribute('data-i18n-placeholder');
      var pVal = translate(pKey, lang);
      if (pVal != null) phEls[k].setAttribute('placeholder', pVal);
    }

    var titleVal = translate('doc.title', lang);
    if (titleVal) document.title = titleVal;

    var toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) toggleBtn.textContent = lang === 'pt' ? 'EN' : 'PT';

    window.SITE_LANG = lang;
    window.i18nPhrases = PHRASES;
    window.i18nDict = DICT;
    window.i18nT = function (key) { return translate(key, window.SITE_LANG); };

    var evt;
    try {
      evt = new CustomEvent('langchange', { detail: { lang: lang } });
    } catch (e) {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('langchange', false, false, { lang: lang });
    }
    document.dispatchEvent(evt);
  }

  var currentLang = detectLang();
  applyLang(currentLang);

  var btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) { /* ok, só não persiste */ }
      applyLang(currentLang);
    });
  }
})();
