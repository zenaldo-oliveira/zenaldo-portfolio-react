/* ===== INÍCIO: fundo de cada página ===== */
// Imagem fixa atrás de toda a interface. Páginas sem entrada aqui ficam com
// a cor var(--fundo) sob o vídeo (videosPorPagina) ou a rede de partículas
// (inicial). O componente FundoPagina confere se o arquivo existe.
// posicao: valor de background-position, para ajustar o enquadramento
// de cada imagem (ex.: "center", "top", "70% 30%").
// pelicula (opcional): "marinho" para a máscara azul-marinho com vinheta
// (tema escuro); sem ela, a película do tema (--pelicula). opacidade ajusta
// a máscara marinho (0 a 1).
// retrato (opcional): enquadramento em telas verticais (celular e tablet em
// pé). Com cover centralizado, uma imagem horizontal mostra só a faixa do
// meio. retrato.posicao escolhe a região; retrato.fracao limita a parte da
// largura da imagem que aparece (0 a 1); proporcao é largura ÷ altura do
// arquivo. A imagem continua cobrindo a tela, sem distorção.
// A tela de Entrada tem o próprio fundo e não usa este mapeamento.
export const fundosPorPagina = {
  sobre: {
    imagem: "/images/ztech-solutions.png",
    posicao: "center",
    pelicula: "marinho",
    opacidade: 0.7,
    // Os textos da imagem ("ZTECH SOLUTIONS", "Desenvolvimento de Soluções
    // Digitais") ficam entre ~31% e 76% da largura; em retrato, a lateral
    // esquerda (0–29%: monitor com código, planta) aparece sem texto cortado
    retrato: { posicao: "0% 75%", fracao: 0.29, proporcao: 1672 / 941 },
  },
};
/* ===== FIM: fundo de cada página ===== */

/* ===== INÍCIO: vídeo de fundo de cada página ===== */
// Versões web em public/videos/ (originais em midia-original/videos-paginas/,
// fora do Git). poster: primeiro quadro, usado como fallback e com reduced
// motion. A máscara sobre o vídeo é a mesma em todas as páginas
// (--mascara-fundo-opacidade, index.css). Páginas sem entrada aqui (Sobre)
// ficam só com o FundoPagina; a inicial usa a rede de partículas.
export const videosPorPagina = {
  projetos: {
    video: "/videos/Projetos.mp4",
    poster: "/videos/Projetos.jpg",
  },
  trajetoria: {
    video: "/videos/Trajetoria.mp4",
    poster: "/videos/Trajetoria.jpg",
  },
  contato: {
    video: "/videos/Contato.mp4",
    poster: "/videos/Contato.jpg",
  },
};
/* ===== FIM: vídeo de fundo de cada página ===== */
