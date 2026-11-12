import { useEffect } from "react";

/* ===== INÍCIO: parallax do fundo ===== */
// Deslocamento máximo da imagem, em px, em cada eixo. A camada da imagem é
// maior que a janela (FundoPagina.css) para as bordas nunca aparecerem.
const DESLOCAMENTO_MAXIMO = 10;
// Fração do caminho percorrida a cada quadro de 60 Hz: movimento suave, sem
// saltos. Corrigida pelo tempo real do quadro, para a mesma velocidade em
// telas de 60, 120 ou 144 Hz (sem tremor em quadros irregulares).
const SUAVIZACAO = 0.08;
const QUADRO_60HZ_MS = 1000 / 60;
// Abaixo disso (em px) o movimento para e o laço de quadros é encerrado
const PRECISAO = 0.05;

// Só em telas grandes com mouse e sem preferência por movimento reduzido.
// No celular e com reduced motion o fundo fica estático.
const CONSULTA_PARALLAX =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Move a camada (ref) em sentido oposto ao mouse. Sem setState: a posição
// fica em variáveis locais e o transform é aplicado em requestAnimationFrame.
// Pausa com a aba oculta e remove tudo ao desmontar.
// Opções: intensidade (multiplica o deslocamento máximo; 0.5 = metade) e
// suavizacao (fração por quadro; menor = mais lento e macio) e voltarAoSair
// (ao sair da janela, retorna gradualmente ao centro).
export function useParallaxFundo(
  ref,
  ativo,
  { intensidade = 1, suavizacao = SUAVIZACAO, voltarAoSair = false } = {},
) {
  useEffect(() => {
    const camada = ref.current;
    if (!ativo || !camada) return;

    const consulta = window.matchMedia(CONSULTA_PARALLAX);
    const alvo = { x: 0, y: 0 };
    const atual = { x: 0, y: 0 };
    const deslocamento = DESLOCAMENTO_MAXIMO * intensidade;
    let quadro = 0;
    let ultimoInstante = 0;

    const aplicar = () => {
      camada.style.transform = `translate3d(${atual.x.toFixed(2)}px, ${atual.y.toFixed(2)}px, 0)`;
    };

    const passo = (instante) => {
      const decorrido = ultimoInstante ? instante - ultimoInstante : QUADRO_60HZ_MS;
      ultimoInstante = instante;
      // Limite de 4 quadros: ao voltar de uma pausa, sem salto de posição
      const quadros = Math.min(decorrido / QUADRO_60HZ_MS, 4);
      const fator = 1 - Math.pow(1 - suavizacao, quadros);
      atual.x += (alvo.x - atual.x) * fator;
      atual.y += (alvo.y - atual.y) * fator;
      aplicar();

      const parado =
        Math.abs(alvo.x - atual.x) < PRECISAO &&
        Math.abs(alvo.y - atual.y) < PRECISAO;
      if (parado) {
        // Encaixa no alvo: sem resíduo de subpixel nem micro-oscilação
        atual.x = alvo.x;
        atual.y = alvo.y;
        aplicar();
        ultimoInstante = 0;
      }
      quadro = parado ? 0 : requestAnimationFrame(passo);
    };

    const iniciar = () => {
      if (!quadro && !document.hidden) quadro = requestAnimationFrame(passo);
    };

    const parar = () => {
      cancelAnimationFrame(quadro);
      quadro = 0;
      ultimoInstante = 0;
    };

    const aoMover = (evento) => {
      if (!consulta.matches) return;
      // -1 a 1 a partir do centro da janela, invertido (efeito de profundidade)
      alvo.x = -((evento.clientX / window.innerWidth) * 2 - 1) * deslocamento;
      alvo.y = -((evento.clientY / window.innerHeight) * 2 - 1) * deslocamento;
      iniciar();
    };

    const aoSairDaJanela = () => {
      alvo.x = alvo.y = 0;
      iniciar();
    };

    const aoMudarVisibilidade = () => {
      if (document.hidden) parar();
      else iniciar();
    };

    // Ao perder a condição (janela estreita, reduced motion ligado), volta
    // ao centro de uma vez e fica parado
    const aoMudarConsulta = () => {
      if (consulta.matches) return;
      parar();
      alvo.x = alvo.y = atual.x = atual.y = 0;
      camada.style.transform = "";
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    if (voltarAoSair) {
      document.documentElement.addEventListener("mouseleave", aoSairDaJanela);
    }
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    consulta.addEventListener("change", aoMudarConsulta);

    return () => {
      parar();
      window.removeEventListener("pointermove", aoMover);
      document.documentElement.removeEventListener("mouseleave", aoSairDaJanela);
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      consulta.removeEventListener("change", aoMudarConsulta);
      camada.style.transform = "";
    };
  }, [ref, ativo, intensidade, suavizacao, voltarAoSair]);
}
/* ===== FIM: parallax do fundo ===== */
