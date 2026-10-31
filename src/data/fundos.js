/* ===== INÍCIO: fundo de cada página ===== */
// Imagens locais em public/fundos/. Enquanto o arquivo não existir, a página
// usa a cor var(--fundo) (o componente FundoPagina confere antes de aplicar).
// posicao: valor de background-position, para ajustar o enquadramento
// de cada imagem (ex.: "center", "top", "70% 30%").
// A tela de Entrada tem o próprio fundo e não usa este mapeamento.
export const fundosPorPagina = {
  inicio: { imagem: "/fundos/tecnologias.webp", posicao: "center" },
  sobre: { imagem: "/fundos/sobre.webp", posicao: "center" },
  trajetoria: { imagem: "/fundos/linha-do-tempo.webp", posicao: "center" },
  projetos: { imagem: "/fundos/projetos.webp", posicao: "center" },
  contato: { imagem: "/fundos/contato.webp", posicao: "center" },
};
/* ===== FIM: fundo de cada página ===== */
