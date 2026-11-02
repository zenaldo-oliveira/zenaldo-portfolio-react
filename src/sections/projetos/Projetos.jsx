import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { Revelar } from "@/components/pagina/animacao";
import { projetos } from "@/data/projetos";

import CartaoDestaque from "./destaque/CartaoDestaque";
import RodaProjetos from "./roda/RodaProjetos";
import { traducoesProjetos } from "./traducoes";
import "./Projetos.css";
import "./destaque/Destaque.css";

/* ===== INÍCIO: página Projetos ===== */
// Cabeçalho compacto e todos os projetos (src/data/projetos.js) numa roda 3D.
function Projetos({ idioma }) {
  const t = traducoesProjetos[idioma];

  function conteudo() {
    if (projetos.length === 0) return <EstadoVazio>{t.vazio}</EstadoVazio>;

    // Com um único projeto não há roda: o cartão fica estático
    if (projetos.length === 1) {
      return (
        <div className="projeto-unico">
          <CartaoDestaque projeto={projetos[0]} idioma={idioma} prioridade vertical t={t} />
        </div>
      );
    }

    return <RodaProjetos projetos={projetos} idioma={idioma} t={t} />;
  }

  return (
    <section className="pagina projetos" aria-labelledby="projetos-titulo">
      <CabecalhoPagina
        id="projetos-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      <Revelar atraso={0.05}>{conteudo()}</Revelar>
    </section>
  );
}
/* ===== FIM: página Projetos ===== */

export default Projetos;
