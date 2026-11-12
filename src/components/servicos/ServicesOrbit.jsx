import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { useParallaxFundo } from "@/hooks/useParallaxFundo";

import { caminhoConexao, RAIO_ANEL_EXTERNO } from "./geometria";
import { useTextScramble } from "./useTextScramble";
import "./ServicesOrbit.css";

/* ===== INÍCIO: constantes da composição ===== */
// QR Code: correção de erro "M" e margem livre (quiet zone) de 4 módulos,
// o mínimo da especificação. Módulos escuros sobre branco, nos dois temas.
const QR_NIVEL_CORRECAO = "M";
const QR_MARGEM_MODULOS = 4;
const QR_COR_MODULOS = "#0b0b0f";
const QR_COR_FUNDO = "#ffffff";

const PARTICULA_DURACAO_S = 4.8;
// Atraso entre as partículas das seis conexões, para não saírem juntas
const PARTICULA_DEFASAGEM_S = 0.8;
const CONSULTA_MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";
// Fração visível que dispara a entrada (uma única vez)
const LIMIAR_REVELACAO = 0.15;
// Parallax dos pontos de luz: 0.4 x 10px = no máximo 4px, bem macio
const PARALLAX_DECORACAO = { intensidade: 0.4, suavizacao: 0.05 };

// Pontos de luz fixos entre o anel interno e o externo (viewBox 200x200),
// sempre fora da área do QR Code
const PONTOS_DE_LUZ = [
  { x: 28, y: 46, atraso: "0s" },
  { x: 172, y: 38, atraso: "1.2s" },
  { x: 184, y: 128, atraso: "2.4s" },
  { x: 150, y: 182, atraso: "0.6s" },
  { x: 40, y: 168, atraso: "1.8s" },
  { x: 12, y: 104, atraso: "3s" },
];
/* ===== FIM: constantes da composição ===== */

/* ===== INÍCIO: medidas das conexões ===== */
// Lê a posição real dos cartões e do palco (o layout é todo CSS) e devolve o
// traçado das conexões. Roda só quando o tamanho muda, nunca por quadro.
function medirConexoes(raiz, palco, lista) {
  const base = raiz.getBoundingClientRect();
  const areaPalco = palco.getBoundingClientRect();
  const centro = {
    x: areaPalco.left - base.left + areaPalco.width / 2,
    y: areaPalco.top - base.top + areaPalco.height / 2,
  };
  const raio = areaPalco.width * RAIO_ANEL_EXTERNO;

  const caminhos = Array.from(lista.children, (item) => {
    const area = item.getBoundingClientRect();
    const aEsquerda = area.left + area.width / 2 < base.left + centro.x;
    const ancora = {
      x: (aEsquerda ? area.right : area.left) - base.left,
      y: area.top - base.top + area.height / 2,
    };
    return caminhoConexao(ancora, centro, raio);
  });

  return {
    largura: Math.round(base.width),
    altura: Math.round(base.height),
    caminhos,
  };
}
/* ===== FIM: medidas das conexões ===== */

/* ===== INÍCIO: QR Code em pixels inteiros ===== */
// Centralizado com translate(-50%), o QR pode cair em meio pixel (ex.: 99px
// de largura) e o layout acima dele também pode ter frações. Aqui ele é
// deslocado até a borda alinhar com um pixel do dispositivo: cada módulo fica
// com pixels inteiros (nítido) e a margem branca não perde nenhum pixel.
function alinharQrAoPixel(qr) {
  qr.style.removeProperty("--qr-ajuste-x");
  qr.style.removeProperty("--qr-ajuste-y");

  const area = qr.getBoundingClientRect();
  const densidade = window.devicePixelRatio || 1;
  const ajuste = (valor) => Math.round(valor * densidade) / densidade - valor;

  qr.style.setProperty("--qr-ajuste-x", `${ajuste(area.left).toFixed(3)}px`);
  qr.style.setProperty("--qr-ajuste-y", `${ajuste(area.top).toFixed(3)}px`);
}
/* ===== FIM: QR Code em pixels inteiros ===== */

/* ===== INÍCIO: conteúdo de um serviço ===== */
function ConteudoServico({ servico, idioma }) {
  const Icone = servico.icone;

  return (
    <>
      <span className="servico-icone" aria-hidden="true">
        <Icone size={20} strokeWidth={1.75} />
      </span>
      <span className="servico-textos">
        {/* Título real (lido e medido) + camada do Text Scramble, vazia no
            JSX e preenchida só durante o efeito (useTextScramble) */}
        <span className="servico-titulo">
          <span className="servico-titulo-texto">{servico.titulo[idioma]}</span>
          <span className="servico-titulo-embaralhado" aria-hidden="true" />
        </span>
        <span className="servico-descricao">{servico.descricao[idioma]}</span>
        {servico.destino && (
          <span className="servico-destino">
            {/* No celular o rótulo fica só para leitores de tela e a seta
                vai para o canto do cartão (o cartão inteiro é o link) */}
            <span className="servico-destino-texto">
              {servico.destino.rotulo[idioma]}
            </span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        )}
      </span>
    </>
  );
}
/* ===== FIM: conteúdo de um serviço ===== */

/**
 * QR Code central (link para o site) com órbitas e os serviços conectados
 * ao redor (três de cada lado no desktop; lista abaixo do código no celular).
 *
 * @param {{
 *   servicos: Array<{ id: string, icone: import("react").ElementType,
 *     titulo: Record<string, string>, descricao: Record<string, string>,
 *     destino?: { href: string, rotulo: Record<string, string> } }>,
 *   idioma?: "pt" | "en" | "es",
 *   qrCode: { url: string, legenda: string, rotuloLink: string,
 *     textoLink: string },
 *   rotulo: string,
 * }} props
 */
function ServicesOrbit({ servicos, idioma = "pt", qrCode, rotulo }) {
  const raizRef = useRef(null);
  const palcoRef = useRef(null);
  const listaRef = useRef(null);
  const conexoesRef = useRef(null);
  const qrRef = useRef(null);
  const decoracaoRef = useRef(null);
  const [geometria, setGeometria] = useState(null);
  // Entrada (linhas, cartões e títulos): uma única vez, ao entrar na viewport
  const [revelado, setRevelado] = useState(false);

  useTextScramble(raizRef, revelado);
  useParallaxFundo(decoracaoRef, true, PARALLAX_DECORACAO);

  /* ===== INÍCIO: recalcula as conexões quando o tamanho muda ===== */
  // O ResizeObserver dispara ao observar e a cada mudança de tamanho (inclusive
  // quando o idioma troca o texto e a altura dos cartões muda). Também realinha
  // o QR Code aos pixels, pois a posição dele muda junto.
  useEffect(() => {
    const raiz = raizRef.current;
    const lista = listaRef.current;
    if (!raiz || !lista) return undefined;

    const observador = new ResizeObserver(() => {
      if (qrRef.current) alinharQrAoPixel(qrRef.current);

      const svg = conexoesRef.current;
      // No celular as conexões ficam ocultas: nada a medir
      if (!svg || getComputedStyle(svg).display === "none") {
        setGeometria(null);
        return;
      }
      setGeometria(medirConexoes(raiz, palcoRef.current, lista));
    });

    observador.observe(raiz);
    for (const item of lista.children) observador.observe(item);

    return () => observador.disconnect();
  }, [servicos, idioma]);
  /* ===== FIM: recalcula as conexões quando o tamanho muda ===== */

  /* ===== INÍCIO: pausa fora da tela e com movimento reduzido ===== */
  // data-pausado congela as animações CSS (órbitas e pontos de luz);
  // pauseAnimations() congela as partículas SMIL das conexões.
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return undefined;

    const movimentoReduzido = window.matchMedia(CONSULTA_MOVIMENTO_REDUZIDO);
    let visivel = false;

    function sincronizar() {
      const pausar = !visivel || movimentoReduzido.matches;
      raiz.toggleAttribute("data-pausado", pausar);

      const svg = conexoesRef.current;
      if (!svg) return;
      if (pausar) svg.pauseAnimations();
      else svg.unpauseAnimations();
    }

    const observador = new IntersectionObserver(
      ([registro]) => {
        visivel = registro.isIntersecting;
        if (visivel) setRevelado(true);
        sincronizar();
      },
      { threshold: [0, LIMIAR_REVELACAO] },
    );

    sincronizar();
    observador.observe(raiz);
    movimentoReduzido.addEventListener("change", sincronizar);

    return () => {
      observador.disconnect();
      movimentoReduzido.removeEventListener("change", sincronizar);
    };
  }, []);
  /* ===== FIM: pausa fora da tela e com movimento reduzido ===== */

  /* ===== INÍCIO: spotlight dos cartões ===== */
  // Um único listener na lista: a posição do mouse vira --spot-x/--spot-y
  // no cartão sob o ponteiro, aplicada em requestAnimationFrame (sem setState)
  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return undefined;

    let quadro = 0;
    let pendente = null;

    const aplicar = () => {
      quadro = 0;
      if (!pendente) return;
      const { cartao, x, y } = pendente;
      cartao.style.setProperty("--spot-x", `${x}px`);
      cartao.style.setProperty("--spot-y", `${y}px`);
    };

    const aoMover = (evento) => {
      if (evento.pointerType !== "mouse") return;
      const cartao = evento.target.closest?.(".servico-cartao");
      if (!cartao) return;
      const area = cartao.getBoundingClientRect();
      pendente = { cartao, x: evento.clientX - area.left, y: evento.clientY - area.top };
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    };

    lista.addEventListener("pointermove", aoMover, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      lista.removeEventListener("pointermove", aoMover);
    };
  }, []);
  /* ===== FIM: spotlight dos cartões ===== */


  const caminhos = geometria?.caminhos ?? [];

  return (
    <div
      className="servicos-orbita"
      ref={raizRef}
      data-revelado={revelado ? "sim" : "nao"}
    >
      <div className="servicos-orbita-composicao">
        {/* ===== INÍCIO: conexões (decorativas) ===== */}
        <svg
          ref={conexoesRef}
          className="servicos-orbita-conexoes"
          aria-hidden="true"
          focusable="false"
          width={geometria?.largura ?? 0}
          height={geometria?.altura ?? 0}
          viewBox={`0 0 ${geometria?.largura ?? 0} ${geometria?.altura ?? 0}`}
        >
          {caminhos.map((d, indice) => (
            <path
              key={`linha-${servicos[indice]?.id ?? indice}`}
              className="servicos-orbita-linha"
              data-indice={indice}
              d={d}
              pathLength="1"
              style={{ "--i": indice }}
            />
          ))}

          {/* Partículas aparecem depois do desenho das linhas (CSS) */}
          <g className="servicos-orbita-particulas">
          {caminhos.map((d, indice) => {
            const inicio = `-${(indice * PARTICULA_DEFASAGEM_S).toFixed(1)}s`;
            const duracao = `${PARTICULA_DURACAO_S}s`;

            return (
              <circle
                key={`particula-${servicos[indice]?.id ?? indice}`}
                className="servicos-orbita-particula"
                r="2.5"
              >
                <animateMotion
                  path={d}
                  dur={duracao}
                  begin={inicio}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.8;1"
                  dur={duracao}
                  begin={inicio}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
          </g>
        </svg>
        {/* ===== FIM: conexões (decorativas) ===== */}

        {/* ===== INÍCIO: QR Code com órbitas ===== */}
        {/* Os anéis ficam fora do quadrado do QR Code (r do anel interno maior
            que a meia-diagonal do código): nada passa sobre a margem branca */}
        <div className="servicos-orbita-centro">
          <div className="servicos-orbita-palco" ref={palcoRef}>
            <svg
              className="servicos-orbita-aneis"
              viewBox="0 0 200 200"
              aria-hidden="true"
              focusable="false"
            >
              <circle className="anel anel-externo" cx="100" cy="100" r="94" />
              <circle className="anel anel-medio" cx="100" cy="100" r="82" />
              <circle className="anel anel-interno" cx="100" cy="100" r="70" />

              <g className="orbita orbita-externa">
                <circle className="orbita-brilho" cx="100" cy="6" r="5" />
                <circle className="orbita-ponto" cx="100" cy="6" r="2" />
                <circle className="orbita-ponto" cx="100" cy="194" r="1.4" />
              </g>
              <g className="orbita orbita-media">
                <circle className="orbita-brilho" cx="182" cy="100" r="4" />
                <circle className="orbita-ponto" cx="182" cy="100" r="1.6" />
              </g>
              <g className="orbita orbita-interna">
                <circle className="orbita-ponto" cx="100" cy="30" r="1.4" />
              </g>

            </svg>

            {/* Pontos de luz numa camada própria, a única com parallax (até
                4px): anéis, linhas, cartões e QR Code ficam parados */}
            <div className="servicos-orbita-decoracao" ref={decoracaoRef}>
              <svg
                className="servicos-orbita-aneis"
                viewBox="0 0 200 200"
                aria-hidden="true"
                focusable="false"
              >
                {PONTOS_DE_LUZ.map(({ x, y, atraso }) => (
                  <circle
                    key={`${x}-${y}`}
                    className="ponto-de-luz"
                    cx={x}
                    cy={y}
                    r="1"
                    style={{ animationDelay: atraso }}
                  />
                ))}
              </svg>
            </div>

            {/* Estático e frontal (sem inclinação), para não prejudicar a leitura */}
            <a
              ref={qrRef}
              className="servicos-orbita-qr"
              href={qrCode.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={qrCode.rotuloLink}
            >
              <QRCodeSVG
                value={qrCode.url}
                level={QR_NIVEL_CORRECAO}
                marginSize={QR_MARGEM_MODULOS}
                fgColor={QR_COR_MODULOS}
                bgColor={QR_COR_FUNDO}
                size={264}
                aria-hidden="true"
                focusable="false"
              />
            </a>
          </div>

          <p className="servicos-orbita-qr-legenda">{qrCode.legenda}</p>

          {/* Celular: quem já está no próprio aparelho não consegue escanear */}
          <a
            className="servicos-orbita-qr-texto"
            href={qrCode.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={qrCode.rotuloLink}
          >
            {qrCode.textoLink}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        {/* ===== FIM: QR Code com órbitas ===== */}

        {/* ===== INÍCIO: serviços ===== */}
        <ul className="servicos-orbita-lista" ref={listaRef} aria-label={rotulo}>
          {servicos.map((servico, indice) => (
            <li className="servico" key={servico.id} style={{ "--i": indice }}>
              {servico.destino ? (
                <a className="servico-cartao" href={servico.destino.href}>
                  <ConteudoServico servico={servico} idioma={idioma} />
                </a>
              ) : (
                <div className="servico-cartao">
                  <ConteudoServico servico={servico} idioma={idioma} />
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* ===== FIM: serviços ===== */}
      </div>
    </div>
  );
}

export default ServicesOrbit;
