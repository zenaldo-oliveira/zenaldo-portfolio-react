/* ===== INÍCIO: texto no idioma atual ===== */
// Aceita texto simples ou { pt, en, es }; usa português quando faltar tradução.
export function traduzir(valor, idioma) {
  if (valor == null || typeof valor === "string") return valor;

  return valor[idioma] ?? valor.pt;
}
/* ===== FIM: texto no idioma atual ===== */
