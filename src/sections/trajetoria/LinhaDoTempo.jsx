import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { trajetoria } from "@/data/trajetoria";

import ItemTrajetoria from "./ItemTrajetoria";
import { ordenarCronologicamente } from "./periodo";
import { traducoesTrajetoria } from "./traducoes";
import "./LinhaDoTempo.css";

/* ===== INÍCIO: página Linha do Tempo ===== */
// Somente trajetória profissional (src/data/trajetoria.js).
// Desktop: linha central e cards alternados; celular: uma coluna com a linha à esquerda.
function LinhaDoTempo({ idioma }) {
  const t = traducoesTrajetoria[idioma];
  const experiencias = ordenarCronologicamente(trajetoria);

  return (
    <section className="pagina trajetoria" aria-labelledby="trajetoria-titulo">
      <CabecalhoPagina
        id="trajetoria-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      {experiencias.length === 0 ? (
        <EstadoVazio>{t.vazio}</EstadoVazio>
      ) : (
        <div className="linha-tempo-container">
          <ol className="linha-tempo" aria-label={t.lista}>
            {experiencias.map((experiencia, indice) => (
              <ItemTrajetoria
                key={experiencia.id}
                experiencia={experiencia}
                lado={indice % 2 === 0 ? "esquerda" : "direita"}
                idioma={idioma}
                t={t}
              />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
/* ===== FIM: página Linha do Tempo ===== */

export default LinhaDoTempo;
