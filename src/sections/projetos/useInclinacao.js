import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Grava a posição do mouse (de -1 a 1) e se ele está se movendo
function aplicar(elemento, ix, iy, movendo) {
  elemento.style.setProperty("--ix", ix.toFixed(3));
  elemento.style.setProperty("--iy", iy.toFixed(3));
  if (movendo) elemento.dataset.inclinando = "";
  else delete elemento.dataset.inclinando;
}

const limitar = (valor) => Math.max(-1, Math.min(1, valor));

/* ===== INÍCIO: inclinação 3D da imagem ao mover o mouse ===== */
// Devolve os eventos para o elemento do palco. Ele recebe --ix e --iy
// (posição do mouse em relação ao centro, de -1 a 1); o CSS converte em
// rotação (até ~6°) e na sombra que acompanha.
// - só com mouse: toque e caneta não inclinam (pointerType !== "mouse");
// - desativado com prefers-reduced-motion (o CSS também zera a rotação);
// - ao sair, volta a 0 e o CSS faz o retorno suave;
// - escreve direto no estilo (sem re-renderizar), no máximo uma vez por
//   quadro (requestAnimationFrame).
export function useInclinacao(ativo = true) {
  const quadro = useRef(0);
  const reduzir = useReducedMotion() ?? false;

  useEffect(() => {
    const atual = quadro;
    return () => cancelAnimationFrame(atual.current);
  }, []);

  if (!ativo || reduzir) return {};

  function aoMover(evento) {
    if (evento.pointerType !== "mouse") return;
    const { clientX, clientY, currentTarget } = evento;
    cancelAnimationFrame(quadro.current);
    quadro.current = requestAnimationFrame(() => {
      const caixa = currentTarget.getBoundingClientRect();
      const ix = ((clientX - caixa.left) / caixa.width) * 2 - 1;
      const iy = ((clientY - caixa.top) / caixa.height) * 2 - 1;
      aplicar(currentTarget, limitar(ix), limitar(iy), true);
    });
  }

  function aoSair(evento) {
    cancelAnimationFrame(quadro.current);
    aplicar(evento.currentTarget, 0, 0, false);
  }

  return { onPointerMove: aoMover, onPointerLeave: aoSair };
}
/* ===== FIM: inclinação 3D da imagem ===== */
