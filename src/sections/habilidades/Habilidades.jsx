import { ListaAnimada, Revelar } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { projetos } from "@/data/projetos";
import { categoriasTecnologia, tecnologias } from "@/data/tecnologias";

import GrupoHabilidades from "./GrupoHabilidades";
import { traducoesHabilidades } from "./traducoes";
import "./Habilidades.css";

function Habilidades({ idioma }) {
  const t = traducoesHabilidades[idioma];

  const grupos = categoriasTecnologia
    .map((categoria) => ({
      categoria,
      itens: tecnologias.filter((item) => item.categoria === categoria),
    }))
    .filter((grupo) => grupo.itens.length > 0);

  return (
    <section className="pagina habilidades" aria-labelledby="habilidades-titulo">
      <CabecalhoPagina
        id="habilidades-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      <ListaAnimada className="grade-cartoes">
        {grupos.map(({ categoria, itens }) => (
          <GrupoHabilidades
            key={categoria}
            id={`habilidades-${categoria}`}
            titulo={t.categorias[categoria]}
            itens={itens}
            projetos={projetos}
            idioma={idioma}
            t={t}
          />
        ))}
      </ListaAnimada>

      {/* ===== INÍCIO: práticas ===== */}
      <Revelar atraso={0.2}>
        <section
          className="pagina-secao habilidades-praticas"
          aria-labelledby="habilidades-praticas"
        >
          <h2 id="habilidades-praticas">{t.praticasTitulo}</h2>
          <ListaEtiquetas itens={t.praticas} rotulo={t.praticasTitulo} />
        </section>
      </Revelar>
      {/* ===== FIM: práticas ===== */}
    </section>
  );
}

export default Habilidades;
