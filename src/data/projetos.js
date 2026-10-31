/* ===== INÍCIO: projetos do portfólio ===== */
// Cadastro único dos projetos. Cadastre apenas projetos reais; cada novo item
// entra automaticamente na grade de Projetos. Textos aceitam { pt, en, es }.
//
// {
//   id: "identificador-unico",
//   categoria: "frontend" | "backend" | "fullstack",
//   nome: { pt, en, es },
//   descricao: { pt, en, es },              // curta: o cartão mostra até 2 linhas
//   status: "desenvolvimento" | "concluido", // opcional: omita se não confirmado
//   icone: "monitor",                        // chave de ICONES_PROJETO (CartaoProjeto)
//                                            // ou caminho de imagem em public/ ("/projetos/logo.svg")
//   tecnologias: ["react", "css"],           // ids de src/data/tecnologias.js
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
//   },
//   emDestaque: true,                        // usado pela seção "Em destaque" (fora da página)
// }
export const projetos = [
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
      repositorio: null,
      demonstracao: null,
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
