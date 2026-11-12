import { useEffect, useRef, useState } from "react";

import { useParallaxFundo } from "@/hooks/useParallaxFundo";

import "./InteractiveVideoBackground.css";

/* ===== INÍCIO: vídeo de fundo da área de conteúdo ===== */
// Ocupa a área principal (barra superior, conteúdo e rodapé), atrás do
// conteúdo, e não recebe cliques. Máscara única: --mascara-fundo-opacidade.
// - Sem áudio, em loop, com playsInline (autoplay também no iOS).
// - Com reduced motion ou economia de dados: só o poster, sem vídeo.
// - Se o vídeo falhar, continua o poster; se o poster faltar, var(--fundo).
// - Pausa com a aba oculta.
// - Parallax por useParallaxFundo: só com mouse, sem reduced motion, sem
//   setState durante o movimento.
const CONSULTA_MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";

function preferePoster() {
  const movimentoReduzido = window.matchMedia(CONSULTA_MOVIMENTO_REDUZIDO).matches;
  const economiaDeDados = navigator.connection?.saveData === true;
  return movimentoReduzido || economiaDeDados;
}

function InteractiveVideoBackground({ video, poster }) {
  const refCamada = useRef(null);
  const refVideo = useRef(null);
  const [somentePoster, setSomentePoster] = useState(preferePoster);
  // carregando | pronto | erro
  const [estado, setEstado] = useState("carregando");

  useParallaxFundo(refCamada, true);

  // Reduced motion ligado/desligado com a página aberta
  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_MOVIMENTO_REDUZIDO);
    const aoMudar = () => setSomentePoster(preferePoster());
    consulta.addEventListener("change", aoMudar);
    return () => consulta.removeEventListener("change", aoMudar);
  }, []);

  // Reprodução: inicia ao montar e pausa com a aba oculta. play() pode ser
  // recusado (ex.: modo de economia de energia); o poster continua visível.
  useEffect(() => {
    const elemento = refVideo.current;
    if (somentePoster || !elemento) return;

    const tocar = () => elemento.play().catch(() => {});
    const aoMudarVisibilidade = () => {
      if (document.hidden) elemento.pause();
      else tocar();
    };

    tocar();
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    return () => {
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      elemento.pause();
    };
  }, [somentePoster]);

  const estiloCamada = poster ? { backgroundImage: `url("${poster}")` } : undefined;

  return (
    <div
      className="video-fundo"
      data-estado={somentePoster ? "poster" : estado}
      aria-hidden="true"
    >
      <div ref={refCamada} className="video-fundo-camada" style={estiloCamada}>
        {!somentePoster && estado !== "erro" && (
          <video
            ref={refVideo}
            className="video-fundo-video"
            src={video}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            onPlaying={() => setEstado("pronto")}
            onError={() => setEstado("erro")}
          />
        )}
      </div>
    </div>
  );
}
/* ===== FIM: vídeo de fundo da área de conteúdo ===== */

export default InteractiveVideoBackground;
