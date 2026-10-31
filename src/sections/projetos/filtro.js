import { tecnologias } from "@/data/tecnologias";

/* ===== INÍCIO: regras do filtro por categoria ===== */
export const CATEGORIA_TODOS = "todos";
export const CATEGORIAS = ["frontend", "backend", "fullstack"];

export function filtrarPorCategoria(projetos, categoria) {
  if (categoria === CATEGORIA_TODOS) return projetos;
  return projetos.filter((projeto) => projeto.categoria === categoria);
}

// { todos: 3, frontend: 2, backend: 1, fullstack: 0 }
export function contarPorCategoria(projetos) {
  const contagem = { [CATEGORIA_TODOS]: projetos.length };
  for (const categoria of CATEGORIAS) {
    contagem[categoria] = projetos.filter((p) => p.categoria === categoria).length;
  }
  return contagem;
}
/* ===== FIM: regras do filtro por categoria ===== */

/* ===== INÍCIO: regras do filtro por tecnologia ===== */
export const FILTRO_TODAS = "todas";

// Tecnologias presentes em pelo menos um projeto, na ordem de tecnologias.js
export function tecnologiasDosProjetos(projetos) {
  const usadas = new Set(projetos.flatMap((projeto) => projeto.tecnologias));
  return tecnologias.filter((tecnologia) => usadas.has(tecnologia.id));
}

export function filtrarProjetos(projetos, filtro) {
  if (filtro === FILTRO_TODAS) return projetos;
  return projetos.filter((projeto) => projeto.tecnologias.includes(filtro));
}
/* ===== FIM: regras do filtro por tecnologia ===== */

/* ===== INÍCIO: busca por nome ===== */
// Ignora maiúsculas e acentos: "portfolio" encontra "Portfólio"
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

// nomeDe: função que devolve o nome do projeto no idioma atual
export function buscarProjetos(projetos, termo, nomeDe) {
  const busca = normalizar(termo);
  if (!busca) return projetos;

  return projetos.filter((projeto) => normalizar(nomeDe(projeto)).includes(busca));
}
/* ===== FIM: busca por nome ===== */
