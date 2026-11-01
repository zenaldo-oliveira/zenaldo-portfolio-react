import {
  Bot,
  Building2,
  Cable,
  LayoutDashboard,
  MousePointerClick,
  Smartphone,
} from "lucide-react";

/* ===== INÍCIO: serviços da ZTech Solutions ===== */
// Ordem da composição: os três primeiros ficam à esquerda da logo e os três
// últimos à direita (no celular, viram uma lista nessa mesma ordem).
//
// destino: opcional. Só recebe link o serviço que tem página correspondente
// no portfólio — hoje, a página Projetos (#projetos), com sites, a ZTech
// Platform (sistema multi-tenant) e a API dela documentada no Swagger.
// Sem projeto publicado que demonstre o serviço, fica sem link.
const destinoProjetos = {
  href: "#projetos",
  rotulo: {
    pt: "Ver projetos",
    en: "See projects",
    es: "Ver proyectos",
  },
};

export const servicos = [
  {
    id: "sites-institucionais",
    icone: Building2,
    titulo: {
      pt: "Sites institucionais",
      en: "Business websites",
      es: "Sitios institucionales",
    },
    descricao: {
      pt: "Presença profissional para apresentar a empresa, os serviços e os canais de contato.",
      en: "A professional presence that presents the company, its services and contact channels.",
      es: "Presencia profesional para presentar la empresa, sus servicios y canales de contacto.",
    },
    destino: destinoProjetos,
  },
  {
    id: "landing-pages",
    icone: MousePointerClick,
    titulo: {
      pt: "Landing pages",
      en: "Landing pages",
      es: "Landing pages",
    },
    descricao: {
      pt: "Páginas focadas em uma oferta, com mensagem clara e chamada para ação.",
      en: "Pages focused on a single offer, with a clear message and call to action.",
      es: "Páginas enfocadas en una oferta, con mensaje claro y llamada a la acción.",
    },
  },
  {
    id: "sistemas-web",
    icone: LayoutDashboard,
    titulo: {
      pt: "Sistemas web",
      en: "Web systems",
      es: "Sistemas web",
    },
    descricao: {
      pt: "Painéis e plataformas SaaS com autenticação, permissões e banco de dados.",
      en: "Dashboards and SaaS platforms with authentication, permissions and databases.",
      es: "Paneles y plataformas SaaS con autenticación, permisos y base de datos.",
    },
    destino: destinoProjetos,
  },
  {
    id: "aplicativos",
    icone: Smartphone,
    titulo: {
      pt: "Aplicativos",
      en: "Apps",
      es: "Aplicaciones",
    },
    descricao: {
      pt: "Apps para celular e web conectados aos dados do seu negócio.",
      en: "Mobile and web apps connected to your business data.",
      es: "Apps para móvil y web conectadas a los datos de tu negocio.",
    },
  },
  {
    id: "automacoes-ia",
    icone: Bot,
    titulo: {
      pt: "Automações e IA",
      en: "Automation and AI",
      es: "Automatizaciones e IA",
    },
    descricao: {
      pt: "Fluxos que eliminam tarefas repetitivas e assistentes com IA no dia a dia.",
      en: "Workflows that remove repetitive tasks and AI assistants for daily work.",
      es: "Flujos que eliminan tareas repetitivas y asistentes con IA en el día a día.",
    },
  },
  {
    id: "apis-integracoes",
    icone: Cable,
    titulo: {
      pt: "APIs e integrações",
      en: "APIs and integrations",
      es: "APIs e integraciones",
    },
    descricao: {
      pt: "APIs documentadas e integração entre sistemas e serviços externos.",
      en: "Documented APIs and integration between systems and external services.",
      es: "APIs documentadas e integración entre sistemas y servicios externos.",
    },
    destino: destinoProjetos,
  },
];
/* ===== FIM: serviços da ZTech Solutions ===== */
