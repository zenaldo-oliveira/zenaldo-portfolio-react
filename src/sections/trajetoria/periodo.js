/* ===== INÍCIO: regras dos marcos da linha do tempo ===== */
export const CATEGORIAS = ["curso", "formacao", "estudo", "projeto"];
export const STATUS = ["em-andamento", "concluido"];

// Formatos aceitos (também válidos no atributo dateTime de <time>):
// "AAAA" (ano) e "AAAA-MM" (ano e mês).
const FORMATO_DATA = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

export function dataValida(valor) {
  return typeof valor === "string" && FORMATO_DATA.test(valor);
}

// "2024-03" → "mar. de 2024"; "2024" → "2024" (no idioma atual)
export function formatarData(valor, localidade) {
  const [ano, mes] = valor.split("-").map(Number);
  if (!mes) return String(ano);

  return new Intl.DateTimeFormat(localidade, {
    month: "short",
    year: "numeric",
  }).format(new Date(ano, mes - 1));
}

// Só as datas válidas; null quando não há nenhuma (o card omite o período)
export function partesPeriodo(item) {
  const inicio = dataValida(item.inicio) ? item.inicio : null;
  const fim = dataValida(item.fim) ? item.fim : null;
  return inicio || fim ? { inicio, fim } : null;
}

// Link opcional: página interna ("#projetos") ou endereço http(s). Qualquer
// outra coisa (vazio, "javascript:", texto) é ignorada — o botão não aparece.
export function linkValido(link) {
  const href = typeof link?.href === "string" ? link.href.trim() : "";
  if (/^#[\w-]+$/.test(href)) return { ...link, href, externo: false };

  try {
    const url = new URL(href);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return { ...link, href, externo: true };
    }
  } catch {
    // href inválido: sem link
  }
  return null;
}

// Mantém todo marco real (com ou sem data) e apresenta pela "ordem"
// informada; empates ou ordem ausente seguem a posição no array. Só fica de
// fora um registro sem id, título ou categoria conhecida.
export function ordenarMarcos(itens) {
  return itens
    .map((item, posicao) => ({ item, posicao }))
    .filter(({ item }) => item?.id && item.titulo && CATEGORIAS.includes(item.categoria))
    .sort((a, b) => {
      const oa = Number.isFinite(a.item.ordem) ? a.item.ordem : Infinity;
      const ob = Number.isFinite(b.item.ordem) ? b.item.ordem : Infinity;
      return oa - ob || a.posicao - b.posicao;
    })
    .map(({ item }) => item);
}
/* ===== FIM: regras dos marcos da linha do tempo ===== */
