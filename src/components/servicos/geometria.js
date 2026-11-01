/* ===== INÍCIO: geometria das conexões ===== */
// Raio do anel externo como fração do lado do palco. O SVG das órbitas usa
// viewBox 200x200, então o anel externo tem r = 200 * RAIO_ANEL_EXTERNO.
export const RAIO_ANEL_EXTERNO = 0.47;

// Quanto a curva "sai" na horizontal do cartão antes de virar para o centro
const ALCANCE_CURVA = 0.55;

function arredondar(valor) {
  return Math.round(valor * 10) / 10;
}

/**
 * Curva SVG (cúbica) que sai do cartão na horizontal e chega ao anel externo
 * na direção do centro. O traçado vai do serviço para a logo: é o sentido em
 * que as partículas percorrem a conexão.
 *
 * @param {{ x: number, y: number }} ancora ponto da borda interna do cartão
 * @param {{ x: number, y: number }} centro centro do palco (logo)
 * @param {number} raio raio do anel externo, em px
 * @returns {string} atributo "d" do caminho
 */
export function caminhoConexao(ancora, centro, raio) {
  const dx = ancora.x - centro.x;
  const dy = ancora.y - centro.y;
  const distancia = Math.hypot(dx, dy) || 1;
  const ux = dx / distancia;
  const uy = dy / distancia;

  const fim = { x: centro.x + ux * raio, y: centro.y + uy * raio };
  const sentido = Math.sign(centro.x - ancora.x) || 1;
  const alcance = Math.abs(ancora.x - fim.x) * ALCANCE_CURVA;

  const controle1 = { x: ancora.x + sentido * alcance, y: ancora.y };
  const controle2 = {
    x: fim.x + ux * alcance * 0.6,
    y: fim.y + uy * alcance * 0.6,
  };

  const p = (ponto) => `${arredondar(ponto.x)} ${arredondar(ponto.y)}`;
  return `M ${p(ancora)} C ${p(controle1)}, ${p(controle2)}, ${p(fim)}`;
}
/* ===== FIM: geometria das conexões ===== */
