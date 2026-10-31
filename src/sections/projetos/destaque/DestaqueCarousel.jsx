import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { traduzir } from "@/i18n/traduzir";

import CartaoDestaque from "./CartaoDestaque";

const TECLAS_DO_CARROSSEL = ["ArrowLeft", "ArrowRight", "Home", "End"];
// Intervalo do avanço automático
const INTERVALO_AUTOMATICO_MS = 5000;

/* ===== INÍCIO: carrossel de destaques (shadcn/ui Carousel + Embla) ===== */
// Setas, indicadores, teclado (← → Home End), arraste e avanço automático suave.
// O avanço pausa com mouse sobre o carrossel, foco dentro dele, diálogo aberto
// ou pelo botão pausar; com prefers-reduced-motion ele fica desativado.
// loop: true — o Embla desliga o loop sozinho quando não há slides suficientes
// para a largura atual (1, 2 ou 3 cards por vez, definidos em Destaque.css).
function DestaqueCarousel({ projetos, idioma, t }) {
  const [api, setApi] = useState(null);
  const [pontos, setPontos] = useState([]);
  const [selecionado, setSelecionado] = useState(0);
  // Com movimento reduzido, as trocas acontecem sem animação (jump)
  const reduzir = useReducedMotion() ?? false;

  // Motivos de pausa do avanço automático
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);
  const [mouseSobre, setMouseSobre] = useState(false);
  const [focoDentro, setFocoDentro] = useState(false);
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const areaRef = useRef(null);

  // Mouse sobre o carrossel: eventos nativos do DOM. Os eventos do React seguem a
  // árvore de componentes e contariam o diálogo (portal) como "dentro"; ao fechar,
  // a pausa ficaria presa sem um mouseleave.
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

  const sincronizar = useCallback((carrossel) => {
    setPontos(carrossel.scrollSnapList());
    setSelecionado(carrossel.selectedScrollSnap());
  }, []);

  // Recebe a API do Embla quando o carrossel é criado
  const aoIniciar = useCallback(
    (carrossel) => {
      setApi(carrossel);
      sincronizar(carrossel);
    },
    [sincronizar],
  );

  useEffect(() => {
    if (!api) return;
    api.on("select", sincronizar);
    api.on("reInit", sincronizar);
    return () => {
      api.off("select", sincronizar);
      api.off("reInit", sincronizar);
    };
  }, [api, sincronizar]);

  const irPara = (indice) => api?.scrollTo(indice, reduzir);
  const anterior = () => api?.scrollPrev(reduzir);
  const proximo = () => api?.scrollNext(reduzir);

  const temNavegacao = pontos.length > 1;
  const automaticoDisponivel = temNavegacao && !reduzir;
  const automaticoAtivo =
    automaticoDisponivel &&
    !pausadoPeloUsuario &&
    !mouseSobre &&
    !focoDentro &&
    !dialogoAberto;

  /* ===== INÍCIO: avanço automático ===== */
  // Sem loop (poucos slides para a largura), volta ao início ao chegar no fim
  useEffect(() => {
    if (!api || !automaticoAtivo) return;

    const temporizador = window.setInterval(() => {
      if (document.hidden) return;
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, INTERVALO_AUTOMATICO_MS);

    return () => window.clearInterval(temporizador);
  }, [api, automaticoAtivo]);
  /* ===== FIM: avanço automático ===== */

  // Foco entrando/saindo (inclui o diálogo, que é filho na árvore React)
  function aoSairFoco(evento) {
    if (!evento.currentTarget.contains(evento.relatedTarget)) setFocoDentro(false);
  }

  // Captura antes do Carousel do shadcn (que trata ← →):
  // - teclas vindas do diálogo (portal) não movem o carrossel por trás;
  // - Home/End e o modo de movimento reduzido são tratados aqui.
  function aoTeclar(evento) {
    if (!TECLAS_DO_CARROSSEL.includes(evento.key)) return;

    if (!evento.currentTarget.contains(evento.target)) {
      evento.stopPropagation();
      return;
    }

    const acoes = {
      Home: () => irPara(0),
      End: () => irPara(pontos.length - 1),
      ...(reduzir && { ArrowLeft: anterior, ArrowRight: proximo }),
    };
    const acao = acoes[evento.key];
    if (!acao) return;

    evento.preventDefault();
    evento.stopPropagation();
    acao();
  }

  return (
    <div
      className="destaque-carrossel"
      // Estado do avanço automático (útil para estilos e para depuração)
      data-automatico={automaticoAtivo ? "ativo" : "pausado"}
      ref={areaRef}
      onKeyDownCapture={aoTeclar}
      onFocus={() => setFocoDentro(true)}
      onBlur={aoSairFoco}
    >
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={aoIniciar}
        aria-roledescription={t.carrossel}
        aria-labelledby="destaque-titulo"
      >
        <CarouselContent>
          {projetos.map((projeto, indice) => (
            <CarouselItem
              key={projeto.id}
              className="destaque-item"
              aria-roledescription={t.slide}
              aria-label={t.posicao(indice + 1, projetos.length)}
            >
              <CartaoDestaque
                projeto={projeto}
                idioma={idioma}
                prioridade={indice < 3}
                vertical
                onAbrirFechar={setDialogoAberto}
                t={t}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ===== INÍCIO: controles ===== */}
        {temNavegacao && (
          <div className="carrossel-controles">
            {/* Pausar/retomar: só existe quando o avanço automático está disponível */}
            {automaticoDisponivel && (
              <Button
                variant="outline"
                size="icon-lg"
                className="size-10 rounded-full"
                aria-label={
                  pausadoPeloUsuario ? t.retomarAutomatico : t.pausarAutomatico
                }
                aria-pressed={pausadoPeloUsuario}
                onClick={() => setPausadoPeloUsuario((pausado) => !pausado)}
              >
                {pausadoPeloUsuario ? (
                  <Play aria-hidden="true" />
                ) : (
                  <Pause aria-hidden="true" />
                )}
              </Button>
            )}

            <CarouselPrevious
              className="static size-10"
              size="icon-lg"
              aria-label={t.anterior}
              onClick={anterior}
            />

            <div className="carrossel-indicadores">
              {pontos.map((_, indice) => (
                <button
                  key={indice}
                  type="button"
                  className="carrossel-indicador"
                  aria-label={t.irPara(
                    indice + 1,
                    traduzir(projetos[indice].nome, idioma),
                  )}
                  aria-current={indice === selecionado ? "true" : undefined}
                  onClick={() => irPara(indice)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>

            <CarouselNext
              className="static size-10"
              size="icon-lg"
              aria-label={t.proximo}
              onClick={proximo}
            />
          </div>
        )}
        {/* ===== FIM: controles ===== */}

        {/* Anuncia a posição para leitores de tela; durante o avanço
            automático fica em silêncio para não interromper a leitura */}
        <p className="sr-only" aria-live={automaticoAtivo ? "off" : "polite"}>
          {temNavegacao &&
            `${t.posicao(selecionado + 1, pontos.length)}: ${traduzir(
              projetos[selecionado]?.nome,
              idioma,
            )}`}
        </p>
      </Carousel>
    </div>
  );
}
/* ===== FIM: carrossel de destaques ===== */

export default DestaqueCarousel;
