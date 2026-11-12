import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { Button } from "@/components/ui/button";
import { trajetoria } from "@/data/trajetoria";

import ItemTrajetoria from "./ItemTrajetoria";
import { ordenarMarcos } from "./periodo";
import { traducoesTrajetoria } from "./traducoes";
import "./LinhaDoTempo.css";

// Etapas por grupo conforme a largura real da área (ao lado da sidebar, não
// a da janela): cada etapa precisa de ~360px para a descrição não virar uma
// coluna estreita e alta (a etapa mais longa define a altura do grupo)
const LARGURAS_POR_GRUPO = [
  { minimo: 1500, etapas: 4 },
  { minimo: 1080, etapas: 3 },
  { minimo: 620, etapas: 2 },
  { minimo: 0, etapas: 1 },
];

function etapasPorLargura(largura) {
  return LARGURAS_POR_GRUPO.find(({ minimo }) => largura >= minimo).etapas;
}

// Largura do elemento, atualizada ao redimensionar (ResizeObserver)
function useLargura(ref) {
  const [largura, setLargura] = useState(0);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return undefined;
    const observador = new ResizeObserver(([registro]) => {
      setLargura(registro.contentRect.width);
    });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [ref]);

  return largura;
}

/* ===== INÍCIO: página Linha do Tempo ===== */
// Estudos, formações e projetos (src/data/trajetoria.js), na "ordem"
// informada em cada registro. Linha horizontal com as etapas lado a lado,
// em grupos que cabem na tela (4, 3, 2 ou 1 por vez, pela largura). Todas
// as etapas continuam acessíveis: anterior/próximo, setas do teclado e o
// contador; as de outros grupos ficam no DOM com hidden.
function LinhaDoTempo({ idioma }) {
  const t = traducoesTrajetoria[idioma];
  const itens = ordenarMarcos(trajetoria);
  const areaRef = useRef(null);
  const largura = useLargura(areaRef);
  const porGrupo = largura ? etapasPorLargura(largura) : 1;
  const totalGrupos = Math.max(1, Math.ceil(itens.length / porGrupo));

  // Guarda a primeira etapa visível: ao mudar o tamanho do grupo
  // (redimensionar a janela), o grupo novo continua contendo essa etapa
  const [primeira, setPrimeira] = useState(0);
  const grupo = Math.min(Math.floor(primeira / porGrupo), totalGrupos - 1);
  const inicio = grupo * porGrupo;
  const fim = Math.min(inicio + porGrupo, itens.length);

  const irParaGrupo = (novo) =>
    setPrimeira(Math.max(0, Math.min(novo, totalGrupos - 1)) * porGrupo);

  function aoTeclar(evento) {
    if (evento.key === "ArrowLeft") irParaGrupo(grupo - 1);
    else if (evento.key === "ArrowRight") irParaGrupo(grupo + 1);
    else return;
    evento.preventDefault();
  }

  const descricaoGrupo = t.grupo(inicio + 1, fim, itens.length);

  return (
    <section className="pagina trajetoria" aria-labelledby="trajetoria-titulo">
      <CabecalhoPagina
        id="trajetoria-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      {itens.length === 0 ? (
        <EstadoVazio>{t.vazio}</EstadoVazio>
      ) : (
        <div
          className="linha-tempo-container"
          ref={areaRef}
          role="region"
          aria-label={t.navegacao}
          onKeyDown={aoTeclar}
          style={{ "--por-grupo": porGrupo }}
        >
          <ol className="linha-tempo" aria-label={t.lista}>
            {itens.map((item, indice) => (
              <ItemTrajetoria
                key={item.id}
                item={item}
                oculto={indice < inicio || indice >= fim}
                idioma={idioma}
                t={t}
              />
            ))}
          </ol>

          {totalGrupos > 1 && (
            <div className="linha-tempo-controles">
              <Button
                variant="outline"
                size="lg"
                className="linha-tempo-botao"
                onClick={() => irParaGrupo(grupo - 1)}
                disabled={grupo === 0}
              >
                <ChevronLeft aria-hidden="true" />
                <span className="linha-tempo-botao-texto">{t.anteriores}</span>
              </Button>

              <p className="linha-tempo-contador" aria-live="polite">
                {descricaoGrupo}
              </p>

              <Button
                variant="outline"
                size="lg"
                className="linha-tempo-botao"
                onClick={() => irParaGrupo(grupo + 1)}
                disabled={grupo === totalGrupos - 1}
              >
                <span className="linha-tempo-botao-texto">{t.proximas}</span>
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
/* ===== FIM: página Linha do Tempo ===== */

export default LinhaDoTempo;
