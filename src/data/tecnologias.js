/* ===== INÍCIO: tecnologias do portfólio ===== */
// id: identificador usado em projetos.js
// icone: nome do ícone em cdn.simpleicons.org
// categoria: agrupamento usado na página de Habilidades
export const tecnologias = [
  { id: "html", nome: "HTML", icone: "html5", categoria: "frontend" },
  { id: "css", nome: "CSS", icone: "css", categoria: "frontend" },
  { id: "javascript", nome: "JavaScript", icone: "javascript", categoria: "frontend" },
  { id: "react", nome: "React", icone: "react", categoria: "frontend" },
  { id: "nextjs", nome: "Next.js", icone: "nextdotjs", categoria: "frontend" },
  { id: "tailwindcss", nome: "Tailwind CSS", icone: "tailwindcss", categoria: "frontend" },
  { id: "nodejs", nome: "Node.js", icone: "nodedotjs", categoria: "backend" },
  { id: "postgresql", nome: "PostgreSQL", icone: "postgresql", categoria: "dados" },
  { id: "mongodb", nome: "MongoDB", icone: "mongodb", categoria: "dados" },
  { id: "git", nome: "Git", icone: "git", categoria: "ferramentas" },
  { id: "github", nome: "GitHub", icone: "github", categoria: "ferramentas" },
  { id: "vite", nome: "Vite", icone: "vite", categoria: "ferramentas" },
  { id: "typescript", nome: "TypeScript", icone: "typescript", categoria: "frontend" },
  { id: "react-native", nome: "React Native", icone: "react", categoria: "mobile" },
  { id: "expo", nome: "Expo", icone: "expo", categoria: "mobile" },
  { id: "express", nome: "Express", icone: "express", categoria: "backend" },
  { id: "docker", nome: "Docker", icone: "docker", categoria: "ferramentas" },
  { id: "styled-components", nome: "Styled Components", icone: "styledcomponents", categoria: "frontend" },
  { id: "prisma", nome: "Prisma", icone: "prisma", categoria: "backend" },
  { id: "vercel", nome: "Vercel", icone: "vercel", categoria: "ferramentas" },
  { id: "npm", nome: "npm", icone: "npm", categoria: "ferramentas" },
  { id: "n8n", nome: "n8n", icone: "n8n", categoria: "ferramentas" },
  { id: "python", nome: "Python", icone: "python", categoria: "backend" },
  { id: "redis", nome: "Redis", icone: "redis", categoria: "dados" },
  { id: "nestjs", nome: "NestJS", icone: "nestjs", categoria: "backend" },
  { id: "mysql", nome: "MySQL", icone: "mysql", categoria: "dados" },
];

// Ordem de exibição das áreas na página de Habilidades
export const categoriasTecnologia = [
  "frontend",
  "backend",
  "dados",
  "mobile",
  "ferramentas",
];

const tecnologiasPorId = new Map(tecnologias.map((item) => [item.id, item]));

// Converte ids (de projetos e certificados) nos nomes exibidos
export function nomesTecnologias(ids) {
  return ids.map((id) => tecnologiasPorId.get(id)?.nome ?? id);
}

export function urlIconeTecnologia(icone) {
  return ["https:", "", "cdn.simpleicons.org", icone].join("/");
}
/* ===== FIM: tecnologias do portfólio ===== */
