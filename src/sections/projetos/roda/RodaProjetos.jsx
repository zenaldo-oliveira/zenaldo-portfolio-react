import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { traduzir } from "@/i18n/traduzir";

import CartaoDestaque from "../destaque/CartaoDestaque";
import "./RodaProjetos.css";

// Avanço automático e regras do arraste
const INTERVALO_AUTOMATICO_MS = 5000;
// Troca o projeto ao arrastar 25% da largura do card...
const ARRASTE_FRACAO_TROCA = 0.25;
// ...ou num gesto rápido (px/ms) de pelo menos ARRASTE_MINIMO_RAPIDO_PX
const ARRASTE_VELOCIDADE_TROCA = 0.4;
const ARRASTE_MINIMO_RAPIDO_PX = 24;
// Deslocamento a partir do qual o gesto é classificado (horizontal/vertical)
const ARRASTE_DECISAO_PX = 8;

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
  const palcoRef = useRef(null);
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
  // Gesto horizontal gira a roda; vertical continua sendo rolagem da página
  // (touch-action: pan-y no palco). Enquanto arrasta, a roda acompanha o dedo
  // pela variável --arraste no palco (direto no DOM, sem re-render). Ao soltar,
  // troca o projeto com 25% da largura do card ou num gesto rápido; senão
  // volta ao lugar. O clique que encerra um arraste é ignorado.
  function definirArraste(fracao) {
    palcoRef.current?.style.setProperty("--arraste", String(fracao));
  }

  function encerrarArraste() {
    arrasteRef.current = null;
    definirArraste(0);
    areaRef.current?.removeAttribute("data-arrastando");
  }

  function aoPressionar(evento) {
    if (!evento.isPrimary) return;
    const card = palcoRef.current?.querySelector(".roda-item");
    arrasteRef.current = {
      x: evento.clientX,
      y: evento.clientY,
      inicio: evento.timeStamp,
      largura: card?.getBoundingClientRect().width || 300,
      horizontal: null,
      id: evento.pointerId,
    };
    arrastouRef.current = false;
  }

  function aoMover(evento) {
    const arraste = arrasteRef.current;
    if (!arraste || evento.pointerId !== arraste.id) return;
    const dx = evento.clientX - arraste.x;
    const dy = evento.clientY - arraste.y;

    if (arraste.horizontal === null) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < ARRASTE_DECISAO_PX) return;
      arraste.horizontal = Math.abs(dx) > Math.abs(dy);
      // Gesto vertical: é rolagem, a roda não participa
      if (!arraste.horizontal) {
        arrasteRef.current = null;
        return;
      }
      // Captura: o arraste continua mesmo se o dedo sair do palco. Pode falhar
      // se o ponteiro já foi liberado (gesto cancelado); o arraste segue sem ela.
      try {
        evento.currentTarget.setPointerCapture(evento.pointerId);
      } catch {
        /* sem captura */
      }
      areaRef.current?.setAttribute("data-arrastando", "");
    }

    // Movimento reduzido: sem acompanhar o dedo (só a troca ao soltar)
    if (reduzir) return;
    const fracao = Math.max(-1, Math.min(1, -dx / arraste.largura));
    definirArraste(fracao);
  }

  function aoSoltar(evento) {
    const arraste = arrasteRef.current;
    if (!arraste || evento.pointerId !== arraste.id) return;
    const dx = evento.clientX - arraste.x;
    const duracao = Math.max(evento.timeStamp - arraste.inicio, 1);
    const horizontal = arraste.horizontal;
    encerrarArraste();
    if (!horizontal) return;

    const longo = Math.abs(dx) >= arraste.largura * ARRASTE_FRACAO_TROCA;
    const rapido =
      Math.abs(dx) >= ARRASTE_MINIMO_RAPIDO_PX &&
      Math.abs(dx) / duracao >= ARRASTE_VELOCIDADE_TROCA;
    arrastouRef.current = true;
    if (longo || rapido) avancar(dx < 0 ? 1 : -1);
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
        ref={palcoRef}
        // Focável: com foco no palco, ← → Home End giram a roda
        tabIndex={0}
        aria-label={t.instrucaoRoda}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={encerrarArraste}
        // Drag-and-drop nativo (seleção, link) cancela o ponteiro e trava
        // o giro: no palco, arrastar é sempre girar a roda
        onDragStart={(evento) => evento.preventDefault()}
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

          {/* Áreas estreitas: contador no lugar dos indicadores (CSS). A
              posição já é anunciada pela região viva abaixo. */}
          <p className="carrossel-contador" aria-hidden="true">
            {ativo + 1} / {total}
          </p>

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
