/* ===== INÍCIO: fundo de cada página ===== */
// Imagens locais em public/fundos/. Enquanto o arquivo não existir, a página
// usa a cor var(--fundo) (o componente FundoPagina confere antes de aplicar).
// posicao: valor de background-position, para ajustar o enquadramento
// de cada imagem (ex.: "center", "top", "70% 30%").
// pelicula (opcional): "marinho" para a máscara azul-marinho com vinheta
// (tema escuro); sem ela, a película do tema (--pelicula). opacidade ajusta
// a máscara marinho (0 a 1).
// A tela de Entrada tem o próprio fundo e não usa este mapeamento.
export const fundosPorPagina = {
  inicio: { imagem: "/fundos/tecnologias.webp", posicao: "center" },
  sobre: {
    imagem: "/images/ztech-solutions.png",
    posicao: "center",
    pelicula: "marinho",
    opacidade: 0.7,
  },
  trajetoria: { imagem: "/fundos/linha-do-tempo.webp", posicao: "center" },
  projetos: { imagem: "/fundos/projetos.webp", posicao: "center" },
  contato: { imagem: "/fundos/contato.webp", posicao: "center" },
};
/* ===== FIM: fundo de cada página ===== */

/* ===== INÍCIO: vídeo de fundo de cada página ===== */
// Versões web em public/videos/ (originais em midia-original/videos-paginas/,
// fora do Git). poster: primeiro quadro, usado como fallback e com reduced
// motion. overlayOpacity: opacidade da película sobre o vídeo (0 a 1);
// overlay e parallaxIntensity: ver InteractiveVideoBackground.
// Páginas sem entrada aqui (ex.: Sobre) ficam só com o FundoPagina.
export const videosPorPagina = {
  inicio: {
    video: "/videos/Tecnologias.mp4",
    poster: "/videos/Tecnologias.jpg",
    // Tela cheia (também atrás da sidebar), câmera lenta (0.5x), máscara
    // uniforme na cor dos cards (80%) e parallax de no máximo 4px, bem macio
    telaCheia: true,
    playbackRate: 0.5,
    overlay: "painel",
    overlayOpacity: 0.8,
    parallaxIntensity: 0.4,
    parallaxSuavizacao: 0.04,
  },
  projetos: {
    video: "/videos/Projetos.mp4",
    poster: "/videos/Projetos.jpg",
    overlayOpacity: 0.74,
  },
  trajetoria: {
    video: "/videos/Trajetoria.mp4",
    poster: "/videos/Trajetoria.jpg",
    overlayOpacity: 0.7,
  },
  contato: {
    video: "/videos/Contato.mp4",
    poster: "/videos/Contato.jpg",
    overlayOpacity: 0.68,
  },
};
/* ===== FIM: vídeo de fundo de cada página ===== */
