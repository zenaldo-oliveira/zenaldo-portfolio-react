import { useEffect } from "react";

/* ===== INÍCIO: parallax do fundo ===== */
// Deslocamento máximo da imagem, em px, em cada eixo. A camada da imagem é
// maior que a janela (FundoPagina.css) para as bordas nunca aparecerem.
const DESLOCAMENTO_MAXIMO = 10;
// Fração do caminho percorrida a cada quadro: movimento suave, sem saltos
const SUAVIZACAO = 0.08;
// Abaixo disso (em px) o movimento para e o laço de quadros é encerrado
const PRECISAO = 0.05;

// Só em telas grandes com mouse e sem preferência por movimento reduzido.
// No celular e com reduced motion o fundo fica estático.
const CONSULTA_PARALLAX =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Move a camada (ref) em sentido oposto ao mouse. Sem setState: a posição
// fica em variáveis locais e o transform é aplicado em requestAnimationFrame.
// Pausa com a aba oculta e remove tudo ao desmontar.
export function useParallaxFundo(ref, ativo) {
  useEffect(() => {
    const camada = ref.current;
    if (!ativo || !camada) return;

    const consulta = window.matchMedia(CONSULTA_PARALLAX);
    const alvo = { x: 0, y: 0 };
    const atual = { x: 0, y: 0 };
    let quadro = 0;

    const aplicar = () => {
      camada.style.transform = `translate3d(${atual.x.toFixed(2)}px, ${atual.y.toFixed(2)}px, 0)`;
    };

    const passo = () => {
      atual.x += (alvo.x - atual.x) * SUAVIZACAO;
      atual.y += (alvo.y - atual.y) * SUAVIZACAO;
      aplicar();

      const parado =
        Math.abs(alvo.x - atual.x) < PRECISAO &&
        Math.abs(alvo.y - atual.y) < PRECISAO;
      quadro = parado ? 0 : requestAnimationFrame(passo);
    };

    const iniciar = () => {
      if (!quadro && !document.hidden) quadro = requestAnimationFrame(passo);
    };

    const parar = () => {
      cancelAnimationFrame(quadro);
      quadro = 0;
    };

    const aoMover = (evento) => {
      if (!consulta.matches) return;
      // -1 a 1 a partir do centro da janela, invertido (efeito de profundidade)
      alvo.x = -((evento.clientX / window.innerWidth) * 2 - 1) * DESLOCAMENTO_MAXIMO;
      alvo.y = -((evento.clientY / window.innerHeight) * 2 - 1) * DESLOCAMENTO_MAXIMO;
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
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    consulta.addEventListener("change", aoMudarConsulta);

    return () => {
      parar();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      consulta.removeEventListener("change", aoMudarConsulta);
      camada.style.transform = "";
    };
  }, [ref, ativo]);
}
/* ===== FIM: parallax do fundo ===== */
