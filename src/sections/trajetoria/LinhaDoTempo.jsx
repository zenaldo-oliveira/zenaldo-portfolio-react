import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { trajetoria } from "@/data/trajetoria";

import ItemTrajetoria from "./ItemTrajetoria";
import { ordenarMarcos } from "./periodo";
import { traducoesTrajetoria } from "./traducoes";
import "./LinhaDoTempo.css";

/* ===== INÍCIO: página Linha do Tempo ===== */
// Estudos, formações e projetos (src/data/trajetoria.js), na "ordem"
// informada em cada registro (marcos sem data mantêm o lugar). Desktop: linha
// central e cards alternados (só visual: o HTML segue a sequência). Celular:
// linha à esquerda, uma coluna.
function LinhaDoTempo({ idioma }) {
  const t = traducoesTrajetoria[idioma];
  const itens = ordenarMarcos(trajetoria);

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
        <div className="linha-tempo-container">
          <ol className="linha-tempo" aria-label={t.lista}>
            {itens.map((item, indice) => (
              <ItemTrajetoria
                key={item.id}
                item={item}
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
