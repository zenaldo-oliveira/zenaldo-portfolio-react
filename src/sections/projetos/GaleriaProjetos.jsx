import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Monitor, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { traduzir } from "@/i18n/traduzir";

import DetalhesProjeto from "./DetalhesProjeto";
import "./GaleriaProjetos.css";

// Arraste horizontal mínimo (px) para trocar de projeto (mouse ou toque)
const ARRASTE_MINIMO_PX = 48;

// Tamanho real dos arquivos de dispositivos (public/projetos/dispositivos/)
const MONITOR = { largura: 748, altura: 554 };
const CELULAR = { largura: 296, altura: 610 };

const modulo = (valor, total) => ((valor % total) + total) % total;

/* ===== INÍCIO: mockup do projeto ===== */
// Monitor (versão desktop) como imagem principal e o celular ao lado. Em
// áreas estreitas (CSS) só uma das duas aparece, conforme "vista". Sem
// mockup de dispositivo, usa a captura cadastrada em "imagem".
function MockupProjeto({ projeto, idioma, vista, t }) {
  const { dispositivos, imagem } = projeto;

  if (!dispositivos) {
    if (!imagem) return <p className="galeria-sem-imagem">{t.imagemPendente}</p>;
    return (
      <div className="galeria-mockup">
        <img
          className="galeria-captura"
          src={imagem.src}
          alt={traduzir(imagem.alt, idioma)}
          width={imagem.largura}
          height={imagem.altura}
          decoding="async"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="galeria-mockup"
      data-vista={vista}
      role="img"
      aria-label={traduzir(dispositivos.alt, idioma)}
    >
      <img
        className="galeria-monitor"
        src={dispositivos.monitor}
        alt=""
        width={MONITOR.largura}
        height={MONITOR.altura}
        decoding="async"
        draggable={false}
      />
      <img
        className="galeria-celular"
        src={dispositivos.celular}
        alt=""
        width={CELULAR.largura}
        height={CELULAR.altura}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
/* ===== FIM: mockup do projeto ===== */

/* ===== INÍCIO: galeria de projetos ===== */
// Um projeto por vez, sem moldura: mockup → nome → descrição → botões.
// "Ver projeto" (demonstração pública) é a ação principal quando existe;
// senão, "Ver detalhes" assume o destaque. Tecnologias, capturas extras e
// contexto ficam no diálogo de detalhes. Navegação discreta: setas e
// contador ("3 de 11"), setas do teclado e arraste (mouse ou toque).
function GaleriaProjetos({ projetos, idioma, t }) {
  const total = projetos.length;
  const [ativo, setAtivo] = useState(0);
  const [vista, setVista] = useState("computador");
  const arrasteRef = useRef(null);
  const arrastouRef = useRef(false);

  const projeto = projetos[ativo];
  const nome = traduzir(projeto.nome, idioma);
  const demonstracao = projeto.links?.demonstracao;
  const idNome = `galeria-${projeto.id}`;

  function avancar(passos) {
    setAtivo((atual) => modulo(atual + passos, total));
  }

  function aoTeclar(evento) {
    if (evento.key === "ArrowLeft") avancar(-1);
    else if (evento.key === "ArrowRight") avancar(1);
    else return;
    evento.preventDefault();
  }

  /* ===== arraste ===== */
  // O palco não seleciona texto nem inicia drag-and-drop nativo (que
  // cancelava o ponteiro e travava a troca, como na antiga roda 3D)
  function aoPressionar(evento) {
    if (!evento.isPrimary || evento.button > 0) return;
    arrasteRef.current = { x: evento.clientX, y: evento.clientY, id: evento.pointerId };
    arrastouRef.current = false;
  }

  function aoSoltar(evento) {
    const arraste = arrasteRef.current;
    arrasteRef.current = null;
    if (!arraste || arraste.id !== evento.pointerId) return;
    const dx = evento.clientX - arraste.x;
    const dy = evento.clientY - arraste.y;
    if (Math.abs(dx) < ARRASTE_MINIMO_PX || Math.abs(dx) <= Math.abs(dy)) return;
    arrastouRef.current = true;
    avancar(dx < 0 ? 1 : -1);
  }

  // O clique que encerra um arraste não aciona nada dentro do palco
  function aoClicarCaptura(evento) {
    if (!arrastouRef.current) return;
    arrastouRef.current = false;
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <div
      className="galeria"
      role="region"
      aria-roledescription={t.carrossel}
      aria-labelledby="projetos-titulo"
      onKeyDown={aoTeclar}
    >
      <div
        className="galeria-palco"
        // Focável: com foco no palco, ← → trocam de projeto
        tabIndex={0}
        aria-label={t.instrucaoGaleria}
        onPointerDown={aoPressionar}
        onPointerUp={aoSoltar}
        onPointerCancel={() => (arrasteRef.current = null)}
        onDragStart={(evento) => evento.preventDefault()}
        onClickCapture={aoClicarCaptura}
      >
        <MockupProjeto
          key={projeto.id}
          projeto={projeto}
          idioma={idioma}
          vista={vista}
          t={t}
        />

        {/* Áreas estreitas: uma imagem por vez (computador ou celular) */}
        {projeto.dispositivos && (
          <div className="galeria-vistas" role="group" aria-label={t.vistas}>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={t.vistaComputador}
              aria-pressed={vista === "computador"}
              onClick={() => setVista("computador")}
            >
              <Monitor aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={t.vistaCelular}
              aria-pressed={vista === "celular"}
              onClick={() => setVista("celular")}
            >
              <Smartphone aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <div className="galeria-info">
        <article className="galeria-textos" key={projeto.id} aria-labelledby={idNome}>
          <h2 id={idNome} className="galeria-nome">
            {nome}
          </h2>
          <p className="galeria-descricao">{traduzir(projeto.descricao, idioma)}</p>

          <div className="galeria-acoes">
            {demonstracao && (
              <ShimmerButton
                href={demonstracao}
                target="_blank"
                rel="noopener noreferrer"
                className="galeria-ver-projeto"
              >
                {t.verProjeto}
                <ExternalLink aria-hidden="true" />
                <span className="sr-only">
                  {" "}
                  — {nome} ({t.novaAba})
                </span>
              </ShimmerButton>
            )}
            <DetalhesProjeto
              projeto={projeto}
              nome={nome}
              idioma={idioma}
              variante={demonstracao ? "secundaria" : "principal"}
              t={t}
            />
          </div>
        </article>

        {total > 1 && (
          <div className="galeria-navegacao">
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={t.anterior}
              onClick={() => avancar(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <p className="galeria-contador" aria-hidden="true">
              {t.posicao(ativo + 1, total)}
            </p>
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-11 rounded-full"
              aria-label={t.proximo}
              onClick={() => avancar(1)}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      {/* Posição para leitores de tela */}
      <p className="sr-only" aria-live="polite">
        {`${t.posicao(ativo + 1, total)}: ${nome}`}
      </p>
    </div>
  );
}
/* ===== FIM: galeria de projetos ===== */

export default GaleriaProjetos;
