/* ===== INÍCIO: evolução na tecnologia (página Linha do Tempo) ===== */
// Estudos, formações e projetos. Cadastre SOMENTE informações confirmadas:
// sem datas, instituições, status ou certificados estimados. Campos opcionais
// ausentes simplesmente não aparecem no card.
//
// A página apresenta os itens pela "ordem" (crescente), não pelas datas:
// assim um marco sem data confirmada mantém o lugar certo na sequência.
// Textos traduzíveis aceitam { pt, en, es }.
//
// {
//   id: "identificador-estavel",          // não mude depois de publicado
//   ordem: 4,                             // posição na sequência (1, 2, 3...)
//   categoria: "curso" | "formacao" | "estudo" | "projeto",
//   titulo: { pt, en, es },
//   instituicao: "DIO",                   // opcional; texto ou { pt, en, es }
//   inicio: "2024-03",                    // opcional: "AAAA" ou "AAAA-MM"
//   fim: "2025-01",                       // opcional: "AAAA" ou "AAAA-MM"
//   status: "em-andamento" | "concluido", // opcional: só se confirmado
//   descricao: { pt, en, es },            // curta: uma ou duas frases
//   tecnologias: ["html", "css"],         // opcional: ids de src/data/tecnologias.js
//   link: {                               // opcional: certificado ou projeto
//     tipo: "certificado" | "projeto",
//     href: "https://..." ou "#projetos", // link externo (https) ou página interna
//   },
// }
//
// Curso que termina: atualize o MESMO registro (status: "concluido", fim e,
// se houver, link do certificado), sem criar outro item.

// DIO: certificados de cursos e módulos de maio de 2021 a abril de 2024,
// agrupados por etapa (não é um estudo contínuo nem uma formação única).
// Certificados de boas-vindas e de módulos não comprovam a conclusão de um
// bootcamp completo: por isso nenhuma etapa tem status. Datas = intervalo dos
// registros de cada grupo. Sem links nem carga horária até que sejam
// informados. Tecnologias sem id no cadastro (SQL Server, .NET, Linux,
// GitLab, Kotlin, Java, Android) ficam só na descrição, para não alterar a
// faixa de tecnologias da página inicial.
const DIO = "DIO";

export const trajetoria = [
  {
    // Lógica de Programação Essencial (15/05/2021), Introdução ao Git e ao
    // GitHub (17/05/2021), Conceitos e Melhores Práticas com Bancos de Dados
    // PostgreSQL (23/05/2021)
    id: "dio-fundamentos-2021",
    ordem: 1,
    categoria: "curso",
    titulo: {
      pt: "Fundamentos da programação",
      en: "Programming fundamentals",
      es: "Fundamentos de la programación",
    },
    instituicao: DIO,
    inicio: "2021-05",
    descricao: {
      pt: "Lógica de programação, versionamento com Git e GitHub e conceitos e boas práticas de bancos de dados com PostgreSQL.",
      en: "Programming logic, version control with Git and GitHub, and database concepts and best practices with PostgreSQL.",
      es: "Lógica de programación, control de versiones con Git y GitHub, y conceptos y buenas prácticas de bases de datos con PostgreSQL.",
    },
    tecnologias: ["git", "github", "postgresql"],
  },
  {
    id: "dio-web-sistemas-2021",
    ordem: 2,
    categoria: "curso",
    titulo: {
      pt: "Desenvolvimento web e sistemas",
      en: "Web and systems development",
      es: "Desarrollo web y de sistemas",
    },
    instituicao: DIO,
    inicio: "2021-06",
    fim: "2021-12",
    descricao: {
      pt: "Fase de exploração: primeiras consultas em SQL Server, orientação a objetos em .NET, Linux e Shell Script, arquitetura de sistemas, HTML5, CSS3 e JavaScript, Git, GitHub e GitLab, além de introduções a Docker, qualidade de software, Kotlin e ambiente Node.js.",
      en: "An exploration phase: first SQL Server queries, object-oriented programming in .NET, Linux and Shell Script, systems architecture, HTML5, CSS3 and JavaScript, Git, GitHub and GitLab, plus introductions to Docker, software quality, Kotlin and the Node.js environment.",
      es: "Fase de exploración: primeras consultas en SQL Server, orientación a objetos en .NET, Linux y Shell Script, arquitectura de sistemas, HTML5, CSS3 y JavaScript, Git, GitHub y GitLab, además de introducciones a Docker, calidad de software, Kotlin y el entorno Node.js.",
    },
    tecnologias: ["html", "css", "javascript", "git", "github", "docker", "nodejs"],
  },
  {
    // Pensamento Computacional e Scrum (jan.), primeiro repositório no
    // GitHub (fev.), Android nativo (mai.), componentes frontend e métodos
    // Java (jul.), ambiente Python (nov.)
    id: "dio-continuidade-2022",
    ordem: 3,
    categoria: "curso",
    titulo: {
      pt: "Continuidade dos estudos",
      en: "Continued studies",
      es: "Continuidad de los estudios",
    },
    instituicao: DIO,
    inicio: "2022-01",
    fim: "2022-11",
    descricao: {
      pt: "Pensamento computacional, projetos ágeis com Scrum, primeiro repositório no GitHub, desenvolvimento mobile nativo para Android, arquitetura de componentes frontend, métodos em Java e preparação do ambiente Python.",
      en: "Computational thinking, agile projects with Scrum, my first GitHub repository, native Android mobile development, frontend component architecture, Java methods and setting up a Python environment.",
      es: "Pensamiento computacional, proyectos ágiles con Scrum, mi primer repositorio en GitHub, desarrollo móvil nativo para Android, arquitectura de componentes frontend, métodos en Java y preparación del entorno Python.",
    },
    tecnologias: ["github", "python"],
  },
  {
    id: "dio-python-2024",
    ordem: 4,
    categoria: "curso",
    titulo: {
      pt: "Python aplicado à prática",
      en: "Python in practice",
      es: "Python aplicado a la práctica",
    },
    instituicao: DIO,
    inicio: "2024-01",
    descricao: {
      pt: "Operadores, strings, condicionais, repetição, listas, tuplas, conjuntos, dicionários e funções, praticados nos desafios de estudo “Criando um Sistema Bancário com Python” e “Otimizando o Sistema Bancário com Funções Python”.",
      en: "Operators, strings, conditionals, loops, lists, tuples, sets, dictionaries and functions, practiced in the study challenges “Criando um Sistema Bancário com Python” and “Otimizando o Sistema Bancário com Funções Python” (building and optimizing a banking system).",
      es: "Operadores, strings, condicionales, repetición, listas, tuplas, conjuntos, diccionarios y funciones, practicados en los desafíos de estudio “Criando um Sistema Bancário com Python” y “Otimizando o Sistema Bancário com Funções Python” (crear y optimizar un sistema bancario).",
    },
    tecnologias: ["python"],
  },
  {
    // Janeiro: cliente-servidor, introdução ao HTML, primeiras páginas e
    // Git/GitHub. Abril: primeiros passos e funções em JavaScript.
    // inicio/fim = intervalo dos registros (não estudo contínuo).
    id: "dio-html-javascript-2024",
    ordem: 5,
    categoria: "curso",
    titulo: {
      pt: "HTML e JavaScript",
      en: "HTML and JavaScript",
      es: "HTML y JavaScript",
    },
    instituicao: DIO,
    inicio: "2024-01",
    fim: "2024-04",
    descricao: {
      pt: "Em janeiro, comunicação cliente-servidor, introdução ao HTML, primeiras páginas e Git/GitHub; em abril, primeiros passos e funções em JavaScript.",
      en: "In January, client-server communication, an introduction to HTML, first pages and Git/GitHub; in April, first steps and functions in JavaScript.",
      es: "En enero, comunicación cliente-servidor, introducción al HTML, primeras páginas y Git/GitHub; en abril, primeros pasos y funciones en JavaScript.",
    },
    tecnologias: ["html", "javascript", "git", "github"],
  },
  {
    // Status confirmado: em andamento. Período ainda não confirmado (sem
    // datas). Sem níveis/XP da plataforma nem percentuais de sprints; sem
    // tecnologias até conferir o conteúdo estudado.
    id: "devclub-full-stack",
    ordem: 6,
    categoria: "formacao",
    titulo: {
      pt: "Formação Desenvolvedor Full Stack",
      en: "Full Stack Developer Program",
      es: "Formación Desarrollador Full Stack",
    },
    instituicao: "DevClub",
    status: "em-andamento",
    descricao: {
      pt: "Formação em andamento, com estudos e atividades práticas voltados ao desenvolvimento Full Stack.",
      en: "Program in progress, with studies and hands-on activities focused on Full Stack development.",
      es: "Formación en curso, con estudios y actividades prácticas orientados al desarrollo Full Stack.",
    },
  },
  {
    // Instituição, período e situação ainda não confirmados
    id: "graduacao-ads",
    ordem: 7,
    categoria: "formacao",
    titulo: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
      es: "Análisis y Desarrollo de Sistemas",
    },
    descricao: {
      pt: "Avancei para a graduação em Análise e Desenvolvimento de Sistemas, ampliando minha formação em desenvolvimento de software.",
      en: "I moved on to a degree in Systems Analysis and Development, broadening my education in software development.",
      es: "Avancé a la carrera de Análisis y Desarrollo de Sistemas, ampliando mi formación en desarrollo de software.",
    },
  },
];
/* ===== FIM: evolução na tecnologia ===== */
