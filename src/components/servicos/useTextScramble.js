import { useEffect, useRef } from "react";

/* ===== INÍCIO: Text Scramble dos títulos ===== */
// Embaralha os títulos uma única vez, quando o componente é revelado.
// - Só no desktop com mouse e sem movimento reduzido (no celular: só fade).
// - Sem re-render do React: o texto embaralhado vai para uma camada própria
//   (aria-hidden, vazia no JSX) sobreposta ao título real.
// - Sem mudança de layout: o título real continua no lugar (só fica
//   transparente durante o efeito), definindo largura, quebra e altura;
//   leitores de tela leem sempre o título real.
// - Troca de caracteres a cada ~50ms (não a cada quadro): sem cintilação.
const CONSULTA_DESKTOP =
  "(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_#";
const DURACAO_MS = 700;
const DEFASAGEM_MS = 90;
const INTERVALO_TROCA_MS = 50;

function caractereAleatorio() {
  return CARACTERES[Math.floor(Math.random() * CARACTERES.length)];
}

// Momento (0 a 1 da duração) em que cada caractere se fixa: da esquerda para
// a direita, com um pouco de variação
function criarRevelacoes(texto) {
  return Array.from(texto, (_, indice) =>
    Math.min(0.35 + (indice / Math.max(texto.length, 1)) * 0.55 + Math.random() * 0.1, 1),
  );
}

/**
 * @param {import("react").RefObject<HTMLElement>} raizRef raiz do componente
 * @param {boolean} revelado true quando o componente entrou na viewport
 */
export function useTextScramble(raizRef, revelado) {
  const executou = useRef(false);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!revelado || executou.current || !raiz) return undefined;
    if (!window.matchMedia(CONSULTA_DESKTOP).matches) {
      executou.current = true;
      return undefined;
    }

    const titulos = Array.from(raiz.querySelectorAll(".servico-titulo"), (titulo) => {
      const texto = titulo.querySelector(".servico-titulo-texto")?.textContent ?? "";
      return {
        camada: titulo.querySelector(".servico-titulo-embaralhado"),
        texto,
        revelacoes: criarRevelacoes(texto),
      };
    }).filter(({ camada }) => camada);

    let quadro = 0;
    let inicio = 0;
    let ultimaTroca = -Infinity;

    const limpar = () => {
      cancelAnimationFrame(quadro);
      for (const { camada } of titulos) camada.textContent = "";
      raiz.removeAttribute("data-embaralhando");
    };

    const passo = (agora) => {
      if (!inicio) inicio = agora;
      const decorrido = agora - inicio;
      const fim = DURACAO_MS + (titulos.length - 1) * DEFASAGEM_MS;
      if (decorrido >= fim) {
        // Só marca como executado ao terminar: se o efeito for interrompido
        // (ex.: StrictMode desmonta e remonta), ele roda de novo do início
        executou.current = true;
        limpar();
        return;
      }

      if (agora - ultimaTroca >= INTERVALO_TROCA_MS) {
        ultimaTroca = agora;
        titulos.forEach(({ camada, texto, revelacoes }, indice) => {
          const progresso = (decorrido - indice * DEFASAGEM_MS) / DURACAO_MS;
          camada.textContent = Array.from(texto, (letra, i) =>
            letra === " " || progresso >= revelacoes[i] ? letra : caractereAleatorio(),
          ).join("");
        });
      }
      quadro = requestAnimationFrame(passo);
    };

    // Camada preenchida antes de esconder o título real: nenhum quadro vazio
    for (const { camada, texto } of titulos) {
      camada.textContent = Array.from(texto, (letra) => (letra === " " ? letra : caractereAleatorio())).join("");
    }
    raiz.setAttribute("data-embaralhando", "");
    quadro = requestAnimationFrame(passo);
    return limpar;
  }, [raizRef, revelado]);
}
/* ===== FIM: Text Scramble dos títulos ===== */
