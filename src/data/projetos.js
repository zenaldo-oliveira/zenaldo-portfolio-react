/* ===== INÍCIO: projetos do portfólio ===== */
// Cadastro único dos projetos. Cadastre apenas projetos reais; cada novo item
// entra automaticamente no carrossel de Projetos. Textos aceitam { pt, en, es }.
// A ordem do array é a ordem do carrossel.
//
// PENDENTE: "participacao" dos projetos ZTech ainda não foi informada; o
// campo fica ausente (e a seção oculta) até ser confirmado.
//
// {
//   id: "identificador-unico",
//   categoria: "frontend" | "backend" | "fullstack",
//   nome: { pt, en, es },
//   descricao: { pt, en, es },              // curta: aparece inteira no cartão do carrossel
//   status: "desenvolvimento" | "concluido" | "publicado", // opcional: omita se não confirmado
//                                            // "publicado": só com demonstração pública funcionando
//   contexto: { pt, en, es },                // opcional: contexto e finalidade (diálogo)
//   participacao: { pt, en, es },            // opcional: minha participação (diálogo)
//   validadoEmProducao: [{ pt, en, es }],    // opcional: conferido no site publicado
//   somenteNoCodigo: [{ pt, en, es }],       // opcional: encontrado no código, não validado em produção
//   decisoes: [{ pt, en, es }],              // opcional: decisões técnicas (diálogo)
//   icone: "monitor",                        // chave de ICONES_PROJETO (CartaoProjeto)
//                                            // ou caminho de imagem em public/ ("/projetos/logo.svg")
//   tecnologias: ["react", "css"],           // ids de src/data/tecnologias.js
//                                            // (tecnologias ou tecnologiasSoEmProjetos)
//   links: {                                 // null enquanto não houver
//     repositorio: "https://github.com/...",
//     demonstracao: "https://...",
//     documentacao: "https://...",           // documentação da API (back-end e full stack)
//   },
//   destaques: [{ pt, en, es }],             // funcionalidades exibidas em "Ver detalhes"
//   imagem: {                                // captura real; aparece só em "Ver detalhes"
//     src: "/projetos/arquivo.webp",         // arquivo em public/projetos/
//     largura: 1280,
//     altura: 800,
//     alt: { pt, en, es },
//     legenda: { pt, en, es },               // opcional: ex. "dados de demonstração"
//     ajuste: "conter",                      // opcional: mostra a imagem inteira (mockups);
//                                            // sem ele, a captura é recortada pelo topo
//   },
//   imagemComplementar: { ... },             // opcional: mesma forma de "imagem" (diálogo)
//   dispositivos: {                          // opcional: composição do card (monitor à
//     monitor: "/projetos/dispositivos/x-monitor.webp", // esquerda, celular à direita),
//     celular: "/projetos/dispositivos/x-celular.webp", // capturas reais com transparência
//     alt: { pt, en, es },                   // descrição da composição
//   },                                       // sem ele, o card usa "imagem"
//   emDestaque: true,                        // usado pela seção "Em destaque" (fora da página)
// }
export const projetos = [
  {
    id: "ztech-platform",
    // Conferido no código (apps/api, apps/web, apps/admin, prisma) e em execução
    // local com banco descartável e dados fictícios (out/2026). Repositório não
    // confirmado como público: sem link. Sem demonstração pública.
    categoria: "fullstack",
    nome: {
      pt: "ZTech Platform",
      en: "ZTech Platform",
      es: "ZTech Platform",
    },
    descricao: {
      pt: "Base multi-tenant para os produtos SaaS da ZTech Solutions, com API em Node.js e painéis em Next.js.",
      en: "Multi-tenant foundation for ZTech Solutions' SaaS products, with a Node.js API and Next.js dashboards.",
      es: "Base multitenant para los productos SaaS de ZTech Solutions, con API en Node.js y paneles en Next.js.",
    },
    status: "desenvolvimento",
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): monitor: painel com dados fictícios (captura local já usada); celular: login do admin (build local, campos vazios)
    dispositivos: {
      monitor: "/projetos/dispositivos/ztech-platform-monitor.webp",
      celular: "/projetos/dispositivos/ztech-platform-celular.webp",
      alt: {
        pt: "ZTech Platform: painel administrativo com dados fictícios no computador e tela de login do admin no celular.",
        en: "ZTech Platform: admin dashboard with fictitious data on the computer and the admin login screen on the phone.",
        es: "ZTech Platform: panel administrativo con datos ficticios en la computadora y pantalla de inicio de sesión del admin en el celular.",
      },
    },
    contexto: {
      pt: "Plataforma para centralizar o que todo SaaS da ZTech precisa — autenticação, empresas (tenants), usuários e permissões — e evitar reconstruir essa base a cada novo produto. Módulos de negócio, assinaturas e pagamentos ainda não estão implementados.",
      en: "A platform that centralizes what every ZTech SaaS needs — authentication, companies (tenants), users and permissions — so this foundation isn't rebuilt for each new product. Business modules, subscriptions and payments are not implemented yet.",
      es: "Plataforma para centralizar lo que todo SaaS de ZTech necesita — autenticación, empresas (tenants), usuarios y permisos — y evitar reconstruir esa base en cada nuevo producto. Los módulos de negocio, suscripciones y pagos aún no están implementados.",
    },
    imagem: {
      src: "/projetos/ztech-platform.webp",
      largura: 1440,
      altura: 840,
      alt: {
        pt: "Dashboard do painel administrativo da ZTech Platform com indicadores de tenants, papéis, permissões e latência da API e o gráfico de crescimento de tenants, preenchido com dados de demonstração.",
        en: "ZTech Platform admin dashboard with tenant, role, permission and API latency indicators and a tenant growth chart, filled with demo data.",
        es: "Dashboard del panel administrativo de ZTech Platform con indicadores de tenants, roles, permisos y latencia de la API y el gráfico de crecimiento de tenants, con datos de demostración.",
      },
      legenda: {
        pt: "Ambiente local com dados de demonstração (fictícios).",
        en: "Local environment with demo (fictitious) data.",
        es: "Entorno local con datos de demostración (ficticios).",
      },
    },
    imagemComplementar: {
      src: "/projetos/ztech-platform-swagger.webp",
      largura: 1440,
      altura: 900,
      alt: {
        pt: "Documentação da API da ZTech Platform no Swagger UI, com a descrição da API e as rotas de autenticação.",
        en: "ZTech Platform API documentation in Swagger UI, with the API description and authentication routes.",
        es: "Documentación de la API de ZTech Platform en Swagger UI, con la descripción de la API y las rutas de autenticación.",
      },
      legenda: {
        pt: "Documentação da API (Swagger UI) em ambiente local.",
        en: "API documentation (Swagger UI) in a local environment.",
        es: "Documentación de la API (Swagger UI) en entorno local.",
      },
    },
    tecnologias: ["nodejs", "express", "typescript", "nextjs", "react", "prisma", "postgresql", "tailwindcss", "docker"],
    links: {
      repositorio: null,
      demonstracao: null,
      documentacao: null,
    },
    destaques: [
      {
        pt: "API REST em Express e TypeScript com login, logout e renovação de sessão por refresh token (JWT).",
        en: "REST API in Express and TypeScript with login, logout and session renewal via refresh token (JWT).",
        es: "API REST en Express y TypeScript con inicio y cierre de sesión y renovación por refresh token (JWT).",
      },
      {
        pt: "Login com Google e GitHub (OAuth) na aplicação do cliente.",
        en: "Google and GitHub sign-in (OAuth) in the client application.",
        es: "Inicio de sesión con Google y GitHub (OAuth) en la aplicación del cliente.",
      },
      {
        pt: "Controle de acesso por papéis e permissões (RBAC), verificado no back-end.",
        en: "Role- and permission-based access control (RBAC), enforced on the back end.",
        es: "Control de acceso por roles y permisos (RBAC), verificado en el back-end.",
      },
      {
        pt: "Cadastro de empresas (tenants), organizações, usuários e produtos.",
        en: "Management of companies (tenants), organizations, users and products.",
        es: "Registro de empresas (tenants), organizaciones, usuarios y productos.",
      },
      {
        pt: "Painel administrativo com indicadores de tenants, papéis, permissões e saúde da API.",
        en: "Admin dashboard with tenant, role, permission and API health indicators.",
        es: "Panel administrativo con indicadores de tenants, roles, permisos y salud de la API.",
      },
      {
        pt: "Documentação da API em OpenAPI, com Swagger UI fora do ambiente de produção.",
        en: "API documentation in OpenAPI, with Swagger UI outside the production environment.",
        es: "Documentación de la API en OpenAPI, con Swagger UI fuera del entorno de producción.",
      },
      {
        pt: "Proteções da API: Helmet, CORS, limite de requisições e validação de entrada com Zod.",
        en: "API protections: Helmet, CORS, rate limiting and input validation with Zod.",
        es: "Protecciones de la API: Helmet, CORS, límite de solicitudes y validación de entrada con Zod.",
      },
    ],
    decisoes: [
      {
        pt: "Monorepo com npm workspaces e Turborepo: aplicações api, web e admin e pacotes database e ui.",
        en: "Monorepo with npm workspaces and Turborepo: api, web and admin apps and database and ui packages.",
        es: "Monorepo con npm workspaces y Turborepo: aplicaciones api, web y admin y paquetes database y ui.",
      },
      {
        pt: "Prisma e PostgreSQL em um pacote compartilhado entre as aplicações.",
        en: "Prisma and PostgreSQL in a package shared across the apps.",
        es: "Prisma y PostgreSQL en un paquete compartido entre las aplicaciones.",
      },
      {
        pt: "As aplicações Next.js chamam a API por um BFF no servidor; os tokens ficam em cookies httpOnly, fora do alcance do JavaScript da página.",
        en: "The Next.js apps call the API through a server-side BFF; tokens live in httpOnly cookies, out of reach of page JavaScript.",
        es: "Las aplicaciones Next.js llaman a la API mediante un BFF en el servidor; los tokens quedan en cookies httpOnly, fuera del alcance del JavaScript de la página.",
      },
      {
        pt: "Usuários da plataforma separados dos usuários das empresas clientes.",
        en: "Platform users kept separate from client-company users.",
        es: "Usuarios de la plataforma separados de los usuarios de las empresas clientes.",
      },
      {
        pt: "Testes automatizados da API com Vitest.",
        en: "Automated API tests with Vitest.",
        es: "Pruebas automatizadas de la API con Vitest.",
      },
    ],
  },
  {
    id: "ztech-solutions",
    // Site publicado (Vercel) em www.zenaldodev.com.br. "validadoEmProducao":
    // conferido no site no ar em out/2026 (páginas respondendo e rota de
    // contato rejeitando dados inválidos, sem enviar mensagens). O commit exato
    // em produção não foi confirmado na Vercel. Front-end: a gravação dos
    // contatos (back-end) não foi validada em produção.
    categoria: "frontend",
    nome: {
      pt: "Site ZTech Solutions",
      en: "ZTech Solutions website",
      es: "Sitio ZTech Solutions",
    },
    descricao: {
      pt: "Site comercial da ZTech Solutions, com serviços, planos, projetos e pedido de orçamento.",
      en: "ZTech Solutions' business website, with services, plans, projects and quote requests.",
      es: "Sitio comercial de ZTech Solutions, con servicios, planes, proyectos y solicitud de presupuesto.",
    },
    status: "publicado",
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): site publicado (zenaldodev.com.br)
    dispositivos: {
      monitor: "/projetos/dispositivos/ztech-solutions-monitor.webp",
      celular: "/projetos/dispositivos/ztech-solutions-celular.webp",
      alt: {
        pt: "Site da ZTech Solutions, página inicial no computador e no celular.",
        en: "ZTech Solutions website, home page on the computer and on the phone.",
        es: "Sitio de ZTech Solutions, página de inicio en la computadora y en el celular.",
      },
    },
    contexto: {
      pt: "Site da ZTech Solutions, empresa da qual sou fundador, para apresentar sites, sistemas e automações a pequenas e médias empresas e receber pedidos de orçamento.",
      en: "Website of ZTech Solutions, the company I founded, presenting websites, systems and automations to small and medium businesses and receiving quote requests.",
      es: "Sitio de ZTech Solutions, empresa que fundé, para presentar sitios, sistemas y automatizaciones a pequeñas y medianas empresas y recibir solicitudes de presupuesto.",
    },
    imagem: {
      src: "/projetos/ztech-solutions.webp",
      largura: 1440,
      altura: 900,
      alt: {
        pt: "Página inicial publicada da ZTech Solutions, com o título “Sites para apresentar sua empresa. Sistemas para facilitar sua operação.”, os botões Solicitar proposta e Ver projetos reais e prévias de projetos.",
        en: "Published ZTech Solutions home page, with the headline “Sites para apresentar sua empresa. Sistemas para facilitar sua operação.”, buttons to request a proposal and see projects, and project previews.",
        es: "Página de inicio publicada de ZTech Solutions, con el título “Sites para apresentar sua empresa. Sistemas para facilitar sua operação.”, botones para solicitar propuesta y ver proyectos y vistas previas de proyectos.",
      },
    },
    tecnologias: ["nextjs", "react", "typescript", "tailwindcss", "vercel"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/ztech-solutions",
      demonstracao: "https://www.zenaldodev.com.br/",
      documentacao: null,
    },
    validadoEmProducao: [
      {
        pt: "Páginas de início, soluções, planos, como funciona, projetos, sobre e contato publicadas.",
        en: "Home, solutions, plans, how it works, projects, about and contact pages are live.",
        es: "Páginas de inicio, soluciones, planes, cómo funciona, proyectos, sobre y contacto publicadas.",
      },
      {
        pt: "Página do configurador de pedido de orçamento (“Montar meu projeto”) publicada.",
        en: "Quote request builder page (“Montar meu projeto”) is live.",
        es: "Página del configurador de solicitud de presupuesto (“Montar meu projeto”) publicada.",
      },
      {
        pt: "Rota de contato no servidor ativa: rejeita dados inválidos (conferido sem enviar mensagens).",
        en: "Server-side contact route is active: it rejects invalid data (checked without sending messages).",
        es: "Ruta de contacto en el servidor activa: rechaza datos inválidos (verificado sin enviar mensajes).",
      },
    ],
    somenteNoCodigo: [
      {
        pt: "Registro dos contatos do formulário no Supabase, com limite de envios por IP.",
        en: "Contact form submissions stored in Supabase, with per-IP rate limiting.",
        es: "Registro de los contactos del formulario en Supabase, con límite de envíos por IP.",
      },
      {
        pt: "Resumo do pedido de orçamento enviado pelo WhatsApp.",
        en: "Quote request summary sent via WhatsApp.",
        es: "Resumen de la solicitud de presupuesto enviado por WhatsApp.",
      },
      {
        pt: "Conteúdo em português, inglês e espanhol e temas claro e escuro.",
        en: "Content in Portuguese, English and Spanish and light and dark themes.",
        es: "Contenido en portugués, inglés y español y temas claro y oscuro.",
      },
      {
        pt: "Testes de ponta a ponta com Playwright.",
        en: "End-to-end tests with Playwright.",
        es: "Pruebas de extremo a extremo con Playwright.",
      },
    ],
    decisoes: [
      {
        pt: "Catálogo comercial como fonte única de ofertas e preços; preço sem valor confirmado aparece como “Solicitar proposta”.",
        en: "Business catalog as the single source of offers and prices; a price without a confirmed value shows as “Request a proposal”.",
        es: "Catálogo comercial como fuente única de ofertas y precios; un precio sin valor confirmado aparece como “Solicitar propuesta”.",
      },
      {
        pt: "Next.js com App Router, com canonical, sitemap e robots gerados pela própria aplicação.",
        en: "Next.js with the App Router, with canonical, sitemap and robots generated by the app itself.",
        es: "Next.js con App Router, con canonical, sitemap y robots generados por la propia aplicación.",
      },
      {
        pt: "Publicação na Vercel.",
        en: "Deployed on Vercel.",
        es: "Publicación en Vercel.",
      },
    ],
  },
  {
    id: "ztech-oficina",
    // Repositório público github.com/zenaldo-oliveira/ztech-mecanica (o README
    // usa o nome provisório "AutoForge ERP"; a interface exibe "ZTECH OFICINA").
    // Tecnologias conferidas nos package.json de apps/frontend e apps/backend.
    // Captura: tela de login do build local (o painel exige autenticação).
    // Sem demonstração publicada.
    categoria: "fullstack",
    nome: {
      pt: "ZTech Oficina",
      en: "ZTech Oficina",
      es: "ZTech Oficina",
    },
    descricao: {
      pt: "Plataforma SaaS em desenvolvimento para gestão de oficinas mecânicas, com CRM, checklists, orçamentos e ordens de serviço.",
      en: "SaaS platform in development for auto repair shop management, with CRM, checklists, quotes and work orders.",
      es: "Plataforma SaaS en desarrollo para la gestión de talleres mecánicos, con CRM, checklists, presupuestos y órdenes de servicio.",
    },
    status: "desenvolvimento",
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): build local; tela de login (o painel exige autenticação)
    dispositivos: {
      monitor: "/projetos/dispositivos/ztech-oficina-monitor.webp",
      celular: "/projetos/dispositivos/ztech-oficina-celular.webp",
      alt: {
        pt: "ZTech Oficina, tela de login no computador e no celular.",
        en: "ZTech Oficina, login screen on the computer and on the phone.",
        es: "ZTech Oficina, pantalla de inicio de sesión en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/ztech-oficina.webp",
      largura: 1920,
      altura: 900,
      alt: {
        pt: "Tela de login da ZTech Oficina, com o formulário de e-mail e senha sobre a imagem de um motor.",
        en: "ZTech Oficina login screen, with the email and password form over an image of an engine.",
        es: "Pantalla de inicio de sesión de ZTech Oficina, con el formulario de correo y contraseña sobre la imagen de un motor.",
      },
    },
    tecnologias: ["nextjs", "react", "typescript", "tailwindcss", "nodejs", "fastify", "prisma", "postgresql"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/ztech-mecanica",
      demonstracao: null,
      documentacao: null,
    },
  },
  {
    id: "site-restaurante",
    // Tecnologias conferidas no código publicado (index.html, style.css e
    // script.js em zenaldo.netlify.app). Repositório não identificado: nenhum
    // repositório público corresponde ao HTML publicado. Status não informado.
    categoria: "frontend",
    nome: {
      pt: "Site de restaurante",
      en: "Restaurant website",
      es: "Sitio de restaurante",
    },
    descricao: {
      pt: "Página de apresentação de restaurante, com cardápio e canais de contato.",
      en: "Restaurant landing page, with menu and contact channels.",
      es: "Página de presentación de restaurante, con menú y canales de contacto.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): site publicado (zenaldo.netlify.app)
    dispositivos: {
      monitor: "/projetos/dispositivos/site-restaurante-monitor.webp",
      celular: "/projetos/dispositivos/site-restaurante-celular.webp",
      alt: {
        pt: "Site de restaurante, página inicial com o título “O sabor que vai até você” no computador e no celular.",
        en: "Restaurant website, home page with the heading “O sabor que vai até você” on the computer and on the phone.",
        es: "Sitio de restaurante, página de inicio con el título “O sabor que vai até você” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/restaurante.webp",
      largura: 1902,
      altura: 909,
      alt: {
        pt: "Página inicial do site de restaurante, com o título “O sabor que vai até você” e pratos de comida à direita.",
        en: "Restaurant website home page, with the headline “O sabor que vai até você” and food dishes on the right.",
        es: "Página de inicio del sitio de restaurante, con el título “O sabor que vai até você” y platos de comida a la derecha.",
      },
    },
    tecnologias: ["html", "css", "javascript"],
    links: {
      repositorio: null,
      demonstracao: "https://zenaldo.netlify.app",
      documentacao: null,
    },
    // Somente o que está no código publicado; os botões de pedido e de
    // contato não foram testados e por isso não entram aqui.
    destaques: [
      {
        pt: "Animações de entrada ao rolar a página, com a biblioteca ScrollReveal.",
        en: "Entrance animations on scroll, using the ScrollReveal library.",
        es: "Animaciones de entrada al desplazarse, con la biblioteca ScrollReveal.",
      },
      {
        pt: "Folha de estilos com media queries para diferentes larguras de tela.",
        en: "Stylesheet with media queries for different screen widths.",
        es: "Hoja de estilos con media queries para distintos anchos de pantalla.",
      },
    ],
  },
  {
    id: "barbearia-edenilson",
    // Repositório: github.com/zenaldo-oliveira/BARBER — o próprio repositório
    // aponta para o projeto barbearia-edenilson no Netlify e o index.html é o
    // mesmo publicado. Tecnologias conferidas no código. Status não informado.
    categoria: "frontend",
    nome: {
      pt: "Barbearia Edenilson",
      en: "Barbearia Edenilson",
      es: "Barbearia Edenilson",
    },
    descricao: {
      pt: "Página de apresentação de barbearia, com serviços e chamada para agendamento.",
      en: "Barbershop landing page, with services and a call to book an appointment.",
      es: "Página de presentación de barbería, con servicios y llamada para reservar.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): site publicado (barbearia-edenilson.netlify.app)
    dispositivos: {
      monitor: "/projetos/dispositivos/barbearia-edenilson-monitor.webp",
      celular: "/projetos/dispositivos/barbearia-edenilson-celular.webp",
      alt: {
        pt: "Barbearia Edenilson, página inicial com o logotipo Barber no computador e no celular.",
        en: "Barbearia Edenilson, home page with the Barber logo on the computer and on the phone.",
        es: "Barbearia Edenilson, página de inicio con el logotipo Barber en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/barbearia-edenilson.webp",
      largura: 1895,
      altura: 909,
      alt: {
        pt: "Página inicial da barbearia, com o logotipo Barber, a frase “Estilo é um reflexo da sua atitude e sua personalidade” e o horário de funcionamento.",
        en: "Barbershop home page, with the Barber logo, the phrase “Estilo é um reflexo da sua atitude e sua personalidade” and opening hours.",
        es: "Página de inicio de la barbería, con el logotipo Barber, la frase “Estilo é um reflexo da sua atitude e sua personalidade” y el horario de atención.",
      },
    },
    tecnologias: ["html", "css", "javascript"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/BARBER",
      demonstracao: "https://barbearia-edenilson.netlify.app",
      documentacao: null,
    },
    // Somente o que está no código; o botão de agendamento não foi testado.
    destaques: [
      {
        pt: "Animações ao rolar a página, com a biblioteca AOS.",
        en: "Scroll animations, using the AOS library.",
        es: "Animaciones al desplazarse, con la biblioteca AOS.",
      },
      {
        pt: "Estilos escritos em SCSS, com media queries para diferentes larguras de tela.",
        en: "Styles written in SCSS, with media queries for different screen widths.",
        es: "Estilos escritos en SCSS, con media queries para distintos anchos de pantalla.",
      },
    ],
  },
  {
    id: "fujii-advocacia",
    // Site publicado na Vercel; dados (descrição, tecnologias e links)
    // informados pelo autor. Imagem: mockup real do site (computador e celular),
    // de C:/projetos/Fujiiadvogados/src/assets/fujii-mockup-v2.png.
    // Status e funcionalidades não informados: campos ausentes.
    categoria: "frontend",
    nome: {
      pt: "Fujii Advocacia & Consultoria Jurídica",
      en: "Fujii Advocacia & Consultoria Jurídica",
      es: "Fujii Advocacia & Consultoria Jurídica",
    },
    descricao: {
      pt: "Site institucional com áreas de atuação, navegação responsiva e canais de contato.",
      en: "Institutional website with practice areas, responsive navigation and contact channels.",
      es: "Sitio institucional con áreas de actuación, navegación adaptable y canales de contacto.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): site publicado (fujiiadvogados.vercel.app)
    dispositivos: {
      monitor: "/projetos/dispositivos/fujii-advocacia-monitor.webp",
      celular: "/projetos/dispositivos/fujii-advocacia-celular.webp",
      alt: {
        pt: "Fujii Advocacia, página inicial com o título “Advocacia e consultoria jurídica” no computador e no celular.",
        en: "Fujii Advocacia, home page with the heading “Advocacia e consultoria jurídica” on the computer and on the phone.",
        es: "Fujii Advocacia, página de inicio con el título “Advocacia e consultoria jurídica” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/fujii-advocacia.webp",
      largura: 1729,
      altura: 814,
      ajuste: "conter",
      alt: {
        pt: "Mockup do site Fujii Advocacia em um monitor e em um celular, com o logotipo, o título “Advocacia e consultoria jurídica” e os botões “Conheça nossas áreas de atuação” e “Entre em contato”.",
        en: "Mockup of the Fujii Advocacia website on a monitor and a phone, with the logo, the heading “Advocacia e consultoria jurídica” and the buttons “Conheça nossas áreas de atuação” and “Entre em contato”.",
        es: "Mockup del sitio Fujii Advocacia en un monitor y en un celular, con el logotipo, el título “Advocacia e consultoria jurídica” y los botones “Conheça nossas áreas de atuação” y “Entre em contato”.",
      },
    },
    tecnologias: ["react", "typescript", "tanstack-start", "tailwindcss"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/fujii-advocacia",
      demonstracao: "https://fujiiadvogados.vercel.app/",
      documentacao: null,
    },
  },
  {
    id: "ideal-tecnica",
    // Repositório público github.com/zenaldo-oliveira/AXION-ENGENHARIA-SOLU-ES
    // (o README fala em AXION; a versão final, commit "release: Ideal Tecnica
    // MVP", exibe a marca Ideal Técnica). Tecnologias do README e do package.json.
    // A demonstração cadastrada no GitHub (ideal-tecnica.vercel.app) está fora
    // do ar (DEPLOYMENT_NOT_FOUND): sem link de Demo. Captura: build local (dist).
    categoria: "frontend",
    nome: {
      pt: "Ideal Técnica",
      en: "Ideal Técnica",
      es: "Ideal Técnica",
    },
    descricao: {
      pt: "Landing page de serviços de elétrica, automação, ar-condicionado e reformas, com pedidos de orçamento pelo WhatsApp.",
      en: "Landing page for electrical, automation, air conditioning and renovation services, with quote requests via WhatsApp.",
      es: "Landing page de servicios de electricidad, automatización, aire acondicionado y reformas, con solicitudes de presupuesto por WhatsApp.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): build local (dist)
    dispositivos: {
      monitor: "/projetos/dispositivos/ideal-tecnica-monitor.webp",
      celular: "/projetos/dispositivos/ideal-tecnica-celular.webp",
      alt: {
        pt: "Ideal Técnica, página inicial com o título “Serviços para sua casa, empresa ou comércio” no computador e no celular.",
        en: "Ideal Técnica, home page with the heading “Serviços para sua casa, empresa ou comércio” on the computer and on the phone.",
        es: "Ideal Técnica, página de inicio con el título “Serviços para sua casa, empresa ou comércio” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/ideal-tecnica.webp",
      largura: 1920,
      altura: 900,
      alt: {
        pt: "Página inicial da Ideal Técnica, com o título “Serviços para sua casa, empresa ou comércio” sobre a foto de um painel elétrico e o botão de orçamento pelo WhatsApp.",
        en: "Ideal Técnica home page, with the heading “Serviços para sua casa, empresa ou comércio” over a photo of an electrical panel and the WhatsApp quote button.",
        es: "Página de inicio de Ideal Técnica, con el título “Serviços para sua casa, empresa ou comércio” sobre la foto de un tablero eléctrico y el botón de presupuesto por WhatsApp.",
      },
    },
    tecnologias: ["react", "typescript", "vite", "tailwindcss", "framer-motion"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/AXION-ENGENHARIA-SOLU-ES",
      demonstracao: null,
      documentacao: null,
    },
  },
  {
    id: "clinic-beauty",
    // Repositório público github.com/zenaldo-oliveira/clinic-beauty; descrição
    // do próprio repositório no GitHub. Tecnologias do package.json (apps/web).
    // A demonstração cadastrada (clinic-beauty-web.vercel.app) está fora do ar.
    // Captura: build local (dist/apps/web).
    categoria: "frontend",
    nome: {
      pt: "Clinic Beauty",
      en: "Clinic Beauty",
      es: "Clinic Beauty",
    },
    descricao: {
      pt: "Site institucional de clínica de estética, com procedimentos, resultados e agendamento de avaliação.",
      en: "Institutional website for an aesthetics clinic, with procedures, results and appointment booking.",
      es: "Sitio institucional de clínica de estética, con procedimientos, resultados y agendamiento de evaluación.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): build local (dist/apps/web)
    dispositivos: {
      monitor: "/projetos/dispositivos/clinic-beauty-monitor.webp",
      celular: "/projetos/dispositivos/clinic-beauty-celular.webp",
      alt: {
        pt: "Clinic Beauty, página inicial com o título “Realce sua beleza com naturalidade e cuidado” no computador e no celular.",
        en: "Clinic Beauty, home page with the heading “Realce sua beleza com naturalidade e cuidado” on the computer and on the phone.",
        es: "Clinic Beauty, página de inicio con el título “Realce sua beleza com naturalidade e cuidado” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/clinic-beauty.webp",
      largura: 1920,
      altura: 900,
      alt: {
        pt: "Página inicial da Clinic Beauty, com o título “Realce sua beleza com naturalidade e cuidado”, o botão “Agendar Avaliação” e a foto da Dra. Wanessa Pirota Hof.",
        en: "Clinic Beauty home page, with the heading “Realce sua beleza com naturalidade e cuidado”, the “Agendar Avaliação” button and a photo of Dr. Wanessa Pirota Hof.",
        es: "Página de inicio de Clinic Beauty, con el título “Realce sua beleza com naturalidade e cuidado”, el botón “Agendar Avaliação” y la foto de la Dra. Wanessa Pirota Hof.",
      },
    },
    tecnologias: ["react", "javascript", "vite", "tailwindcss"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/clinic-beauty",
      demonstracao: null,
      documentacao: null,
    },
  },
  {
    id: "studio-blessed",
    // Repositório público github.com/zenaldo-oliveira/ztech-salon-site (projeto
    // "ZTech Salon"; a marca exibida no site é Studio Blessed). Descrição do
    // GitHub e do README; tecnologias do package.json (apps/web).
    // Sem demonstração publicada. Captura: servidor local (Vite).
    categoria: "frontend",
    nome: {
      pt: "Studio Blessed",
      en: "Studio Blessed",
      es: "Studio Blessed",
    },
    descricao: {
      pt: "Site institucional de salão de beleza, com serviços, galeria, perguntas frequentes e agendamento pelo WhatsApp.",
      en: "Institutional website for a beauty salon, with services, gallery, FAQ and booking via WhatsApp.",
      es: "Sitio institucional de salón de belleza, con servicios, galería, preguntas frecuentes y reservas por WhatsApp.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): servidor local (Vite)
    dispositivos: {
      monitor: "/projetos/dispositivos/studio-blessed-monitor.webp",
      celular: "/projetos/dispositivos/studio-blessed-celular.webp",
      alt: {
        pt: "Studio Blessed, página inicial com o título “Seu Momento de Beleza, Cuidado e Autoestima” no computador e no celular.",
        en: "Studio Blessed, home page with the heading “Seu Momento de Beleza, Cuidado e Autoestima” on the computer and on the phone.",
        es: "Studio Blessed, página de inicio con el título “Seu Momento de Beleza, Cuidado e Autoestima” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/studio-blessed.webp",
      largura: 1920,
      altura: 900,
      alt: {
        pt: "Página inicial do Studio Blessed, com o título “Seu Momento de Beleza, Cuidado e Autoestima” sobre a foto do salão e os botões “Agendar Agora” e “Conhecer Serviços”.",
        en: "Studio Blessed home page, with the heading “Seu Momento de Beleza, Cuidado e Autoestima” over a photo of the salon and the “Agendar Agora” and “Conhecer Serviços” buttons.",
        es: "Página de inicio de Studio Blessed, con el título “Seu Momento de Beleza, Cuidado e Autoestima” sobre la foto del salón y los botones “Agendar Agora” y “Conhecer Serviços”.",
      },
    },
    tecnologias: ["react", "javascript", "vite", "tailwindcss"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/ztech-salon-site",
      demonstracao: null,
      documentacao: null,
    },
  },
  {
    id: "climatech",
    // Repositório público github.com/zenaldo-oliveira/climatech-fullstack.
    // O site é HTML, CSS e JavaScript (a pasta backend/ está vazia), por isso
    // categoria front-end. A demonstração cadastrada
    // (climatech-fullstack.vercel.app) está fora do ar. Captura: servidor local.
    categoria: "frontend",
    nome: {
      pt: "Climatech",
      en: "Climatech",
      es: "Climatech",
    },
    descricao: {
      pt: "Site de empresa de climatização residencial e comercial, com serviços, depoimentos e contato pelo WhatsApp.",
      en: "Website for a residential and commercial air conditioning company, with services, testimonials and WhatsApp contact.",
      es: "Sitio de empresa de climatización residencial y comercial, con servicios, testimonios y contacto por WhatsApp.",
    },
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): servidor local
    dispositivos: {
      monitor: "/projetos/dispositivos/climatech-monitor.webp",
      celular: "/projetos/dispositivos/climatech-celular.webp",
      alt: {
        pt: "Climatech, página inicial com o título “Climatização Residencial e Comercial com Atendimento Profissional” no computador e no celular.",
        en: "Climatech, home page with the heading “Climatização Residencial e Comercial com Atendimento Profissional” on the computer and on the phone.",
        es: "Climatech, página de inicio con el título “Climatização Residencial e Comercial com Atendimento Profissional” en la computadora y en el celular.",
      },
    },
    imagem: {
      src: "/projetos/climatech.webp",
      largura: 1920,
      altura: 900,
      alt: {
        pt: "Página inicial da Climatech, com o título “Climatização Residencial e Comercial com Atendimento Profissional” e os botões “Solicitar orçamento” e “WhatsApp”.",
        en: "Climatech home page, with the heading “Climatização Residencial e Comercial com Atendimento Profissional” and the “Solicitar orçamento” and “WhatsApp” buttons.",
        es: "Página de inicio de Climatech, con el título “Climatização Residencial e Comercial com Atendimento Profissional” y los botones “Solicitar orçamento” y “WhatsApp”.",
      },
    },
    tecnologias: ["html", "css", "javascript"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/climatech-fullstack",
      demonstracao: null,
      documentacao: null,
    },
  },
  {
    id: "portfolio-pessoal",
    // Aplicação React sem back-end próprio
    categoria: "frontend",
    icone: "monitor",
    nome: {
      pt: "Portfólio pessoal",
      en: "Personal portfolio",
      es: "Portafolio personal",
    },
    descricao: {
      pt: "Aplicação em React com navegação lateral, layout responsivo, temas claro e escuro e conteúdo em três idiomas.",
      en: "React application with side navigation, responsive layout, light and dark themes and content in three languages.",
      es: "Aplicación en React con navegación lateral, diseño adaptable, temas claro y oscuro y contenido en tres idiomas.",
    },
    status: "desenvolvimento",
    emDestaque: true,
    // Capturas reais em monitor e celular (arquivos separados): site publicado (zenaldo-portfolio-react.vercel.app)
    dispositivos: {
      monitor: "/projetos/dispositivos/portfolio-pessoal-monitor.webp",
      celular: "/projetos/dispositivos/portfolio-pessoal-celular.webp",
      alt: {
        pt: "Portfólio pessoal, tela de entrada com o nome Zenaldo Oliveira no computador e no celular.",
        en: "Personal portfolio, entry screen with the name Zenaldo Oliveira on the computer and on the phone.",
        es: "Portafolio personal, pantalla de entrada con el nombre Zenaldo Oliveira en la computadora y en el celular.",
      },
    },
    // Captura real da tela de entrada deste portfólio
    imagem: {
      src: "/projetos/portfolio-pessoal.webp",
      largura: 1917,
      altura: 897,
      alt: {
        pt: "Tela de entrada do portfólio, com o nome Zenaldo Oliveira, apresentação, botões do LinkedIn e do GitHub e a imagem de uma mão humana e uma mão robótica.",
        en: "Portfolio entry screen, with the name Zenaldo Oliveira, an introduction, LinkedIn and GitHub buttons and an image of a human hand and a robotic hand.",
        es: "Pantalla de entrada del portafolio, con el nombre Zenaldo Oliveira, presentación, botones de LinkedIn y GitHub y la imagen de una mano humana y una mano robótica.",
      },
    },
    tecnologias: ["react", "javascript", "css", "tailwindcss", "vite"],
    links: {
      repositorio: "https://github.com/zenaldo-oliveira/zenaldo-portfolio-react",
      demonstracao: "https://zenaldo-portfolio-react.vercel.app/",
      documentacao: null,
    },
    // Funcionalidades presentes no código deste repositório
    destaques: [
      {
        pt: "Navegação entre páginas com suporte aos botões voltar e avançar do navegador.",
        en: "Page navigation that supports the browser's back and forward buttons.",
        es: "Navegación entre páginas compatible con los botones atrás y adelante del navegador.",
      },
      {
        pt: "Menu lateral recolhível no computador e menu sobreposto no celular.",
        en: "Collapsible side menu on desktop and overlay menu on mobile.",
        es: "Menú lateral plegable en computadora y menú superpuesto en el móvil.",
      },
      {
        pt: "Temas claro e escuro e conteúdo em português, inglês e espanhol.",
        en: "Light and dark themes and content in Portuguese, English and Spanish.",
        es: "Temas claro y oscuro y contenido en portugués, inglés y español.",
      },
      {
        pt: "Globo interativo com as tecnologias que utilizo ou estudo.",
        en: "Interactive globe with the technologies I use or study.",
        es: "Globo interactivo con las tecnologías que utilizo o estudio.",
      },
      {
        pt: "Foco levado ao conteúdo ao trocar de página, para quem navega pelo teclado.",
        en: "Focus moves to the content when the page changes, for keyboard users.",
        es: "El foco pasa al contenido al cambiar de página, para quien navega con el teclado.",
      },
    ],
  },
];
/* ===== FIM: projetos do portfólio ===== */
