import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { traduzir } from "@/i18n/traduzir";

import CartaoDestaque from "../destaque/CartaoDestaque";
import "./RodaProjetos.css";

// Avanço automático e distância mínima (px) para um arraste trocar o projeto
const INTERVALO_AUTOMATICO_MS = 5000;
const ARRASTE_MINIMO_PX = 40;

// Resto sempre positivo: posição (que cresce sem limite) → índice do projeto
const modulo = (valor, total) => ((valor % total) + total) % total;

/* ===== INÍCIO: roda 3D de projetos ===== */
// Os cards ficam em volta de um cilindro (rotateY + translateZ, em CSS). A roda
// gira inteira; o projeto ativo fica de frente, no centro.
// - posicao cresce/diminui sem limite: a roda sempre gira pelo caminho curto;
// - só o card ativo é interativo; os demais ficam inert (fora do Tab e do
//   leitor de tela) — clicar num card lateral o traz para a frente;
// - teclado (← → Home End), toque/arraste, setas, indicadores e avanço
//   automático (pausa com mouse, foco, diálogo aberto ou botão);
// - movimento reduzido: sem giro animado e sem avanço automático.
function RodaProjetos({ projetos, idioma, t }) {
  const total = projetos.length;
  const [posicao, setPosicao] = useState(0);
  const ativo = modulo(posicao, total);
  const reduzir = useReducedMotion() ?? false;

  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);
  const [mouseSobre, setMouseSobre] = useState(false);
  const [focoDentro, setFocoDentro] = useState(false);
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const areaRef = useRef(null);
  const arrasteRef = useRef(null);
  const arrastouRef = useRef(false);

  const automaticoDisponivel = total > 1 && !reduzir;
  const automaticoAtivo =
    automaticoDisponivel &&
    !pausadoPeloUsuario &&
    !mouseSobre &&
    !focoDentro &&
    !dialogoAberto;

  const avancar = (passos) => setPosicao((atual) => atual + passos);

  // Vai ao projeto pelo caminho mais curto da roda
  function irPara(indice) {
    setPosicao((atual) => {
      let diferenca = modulo(indice - atual, total);
      if (diferenca > total / 2) diferenca -= total;
      return atual + diferenca;
    });
  }

  // Mouse sobre a roda: eventos nativos (os do React contariam o diálogo,
  // que é um portal, como "dentro" e a pausa ficaria presa ao fechar)
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const entrar = () => setMouseSobre(true);
    const sair = () => setMouseSobre(false);
    area.addEventListener("mouseenter", entrar);
    area.addEventListener("mouseleave", sair);
    return () => {
      area.removeEventListener("mouseenter", entrar);
      area.removeEventListener("mouseleave", sair);
    };
  }, []);

  useEffect(() => {
    if (!automaticoAtivo) return;
    const temporizador = window.setInterval(() => {
      if (!document.hidden) setPosicao((atual) => atual + 1);
    }, INTERVALO_AUTOMATICO_MS);
    return () => window.clearInterval(temporizador);
  }, [automaticoAtivo]);

  /* ===== INÍCIO: teclado ===== */
  function aoTeclar(evento) {
    // Teclas vindas do diálogo (portal, filho na árvore React) não giram a roda.
    // Dentro do card ativo também não: ele ficaria inert e o foco se perderia.
    if (!evento.currentTarget.contains(evento.target)) return;
    if (evento.target.closest(".roda-face")) return;

    const acoes = {
      ArrowLeft: () => avancar(-1),
      ArrowRight: () => avancar(1),
      Home: () => irPara(0),
      End: () => irPara(total - 1),
    };
    const acao = acoes[evento.key];
    if (!acao) return;
    evento.preventDefault();
    acao();
  }
  /* ===== FIM: teclado ===== */

  /* ===== INÍCIO: toque e arraste ===== */
  // Arraste horizontal troca o projeto; a rolagem vertical continua livre
  // (touch-action: pan-y no palco). O clique que encerra um arraste é ignorado.
  function aoPressionar(evento) {
    if (!evento.isPrimary) return;
    arrasteRef.current = evento.clientX;
    arrastouRef.current = false;
  }

  function aoSoltar(evento) {
    if (arrasteRef.current === null) return;
    const distancia = evento.clientX - arrasteRef.current;
    arrasteRef.current = null;
    if (Math.abs(distancia) < ARRASTE_MINIMO_PX) return;
    arrastouRef.current = true;
    avancar(distancia < 0 ? 1 : -1);
  }

  function aoClicarCaptura(evento) {
    if (!arrastouRef.current) return;
    arrastouRef.current = false;
    evento.preventDefault();
    evento.stopPropagation();
  }
  /* ===== FIM: toque e arraste ===== */

  function aoSairFoco(evento) {
    if (!evento.currentTarget.contains(evento.relatedTarget)) setFocoDentro(false);
  }

  const nomeAtivo = traduzir(projetos[ativo].nome, idioma);

  return (
    <div
      className="roda"
      ref={areaRef}
      role="region"
      aria-roledescription={t.carrossel}
      aria-labelledby="projetos-titulo"
      data-automatico={automaticoAtivo ? "ativo" : "pausado"}
      data-movimento={reduzir ? "reduzido" : "normal"}
      onKeyDown={aoTeclar}
      onFocus={() => setFocoDentro(true)}
      onBlur={aoSairFoco}
      style={{ "--total": total, "--posicao": posicao }}
    >
      {/* ===== INÍCIO: palco 3D ===== */}
      <div
        className="roda-palco"
        // Focável: com foco no palco, ← → Home End giram a roda
        tabIndex={0}
        aria-label={t.instrucaoRoda}
        onPointerDown={aoPressionar}
        onPointerUp={aoSoltar}
        onPointerCancel={() => (arrasteRef.current = null)}
        onClickCapture={aoClicarCaptura}
      >
        <ul className="roda-anel">
          {projetos.map((projeto, indice) => {
            const ehAtivo = indice === ativo;
            // Distância (em passos) até o ativo: -1/1 laterais, demais atrás
            let distancia = modulo(indice - ativo, total);
            if (distancia > total / 2) distancia -= total;

            return (
              <li
                key={projeto.id}
                className="roda-item"
                style={{ "--indice": indice }}
                data-ativo={ehAtivo ? "" : undefined}
                data-distancia={Math.abs(distancia)}
                aria-roledescription={t.slide}
                aria-label={t.posicao(indice + 1, total)}
                onClick={ehAtivo ? undefined : () => irPara(indice)}
              >
                <div className="roda-face" inert={!ehAtivo}>
                  <CartaoDestaque
                    projeto={projeto}
                    idioma={idioma}
                    prioridade={Math.abs(distancia) <= 1}
                    vertical
                    onAbrirFechar={setDialogoAberto}
                    t={t}
                  />
                </div>
                {/* Verso: o que aparece quando o card está de costas na roda */}
                <div className="roda-verso" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </div>
      {/* ===== FIM: palco 3D ===== */}

      {/* ===== INÍCIO: controles ===== */}
      {total > 1 && (
        <div className="carrossel-controles">
          {automaticoDisponivel && (
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={pausadoPeloUsuario ? t.retomarAutomatico : t.pausarAutomatico}
              aria-pressed={pausadoPeloUsuario}
              onClick={() => setPausadoPeloUsuario((pausado) => !pausado)}
            >
              {pausadoPeloUsuario ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </Button>
          )}

          <Button
            variant="outline"
            size="icon-lg"
            className="size-11 rounded-full"
            aria-label={t.anterior}
            onClick={() => avancar(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>

          <div className="carrossel-indicadores">
            {projetos.map((projeto, indice) => (
              <button
                key={projeto.id}
                type="button"
                className="carrossel-indicador"
                aria-label={t.irPara(indice + 1, traduzir(projeto.nome, idioma))}
                aria-current={indice === ativo ? "true" : undefined}
                onClick={() => irPara(indice)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon-lg"
            className="size-11 rounded-full"
            aria-label={t.proximo}
            onClick={() => avancar(1)}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      )}
      {/* ===== FIM: controles ===== */}

      {/* Posição para leitores de tela; em silêncio durante o avanço automático */}
      <p className="sr-only" aria-live={automaticoAtivo ? "off" : "polite"}>
        {`${t.posicao(ativo + 1, total)}: ${nomeAtivo}`}
      </p>
    </div>
  );
}
/* ===== FIM: roda 3D de projetos ===== */

export default RodaProjetos;
