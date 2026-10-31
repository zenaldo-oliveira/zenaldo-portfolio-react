import { Revelar } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import { perfil } from "@/data/perfil";

import ObjetivoProfissional from "./ObjetivoProfissional";
import Trajetoria from "./Trajetoria";
import { traducoesSobre } from "./traducoes";
import "./Sobre.css";

function Sobre({ idioma, curriculoDisponivel }) {
  const t = traducoesSobre[idioma];

  return (
    <section className="pagina sobre" aria-labelledby="sobre-titulo">
      <CabecalhoPagina id="sobre-titulo" apoio={t.apoio} titulo={t.titulo} />

      <div className="sobre-grade">
        <Revelar atraso={0.05}>
          {/* ===== INÍCIO: apresentação ===== */}
          <section className="pagina-secao" aria-labelledby="sobre-apresentacao">
            <h2 id="sobre-apresentacao">{t.apresentacaoTitulo}</h2>
            {t.apresentacao.map((paragrafo) => (
              <p className="sobre-texto" key={paragrafo}>
                {paragrafo}
              </p>
            ))}
          </section>
          {/* ===== FIM: apresentação ===== */}

          {/* ===== INÍCIO: trajetória ===== */}
          <section className="pagina-secao" aria-labelledby="sobre-trajetoria">
            <h2 id="sobre-trajetoria">{t.trajetoriaTitulo}</h2>
            <Trajetoria
              textoVazio={t.trajetoriaVazia}
              textoLink={t.verLinhaDoTempo}
            />
          </section>
          {/* ===== FIM: trajetória ===== */}
        </Revelar>

        <ObjetivoProfissional
          t={t}
          local={perfil.local}
          curriculo={curriculoDisponivel ? perfil.curriculo : null}
        />
      </div>
    </section>
  );
}

export default Sobre;
