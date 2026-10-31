import { useState } from "react";

import { ListaAnimada } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { Button } from "@/components/ui/button";
import { projetos } from "@/data/projetos";
import { traduzir } from "@/i18n/traduzir";

import BuscaProjetos from "./BuscaProjetos";
import CartaoProjeto from "./CartaoProjeto";
import FiltroCategorias from "./FiltroCategorias";
import FiltroTecnologias from "./FiltroTecnologias";
import ProjetosDestaque from "./destaque/ProjetosDestaque";
import {
  CATEGORIA_TODOS,
  FILTRO_TODAS,
  buscarProjetos,
  contarPorCategoria,
  filtrarPorCategoria,
  filtrarProjetos,
  tecnologiasDosProjetos,
} from "./filtro";
import { traducoesProjetos } from "./traducoes";
import "./Projetos.css";

function Projetos({ idioma }) {
  const t = traducoesProjetos[idioma];
  const [categoria, setCategoria] = useState(CATEGORIA_TODOS);
  const [filtro, setFiltro] = useState(FILTRO_TODAS);
  const [busca, setBusca] = useState("");

  // Categoria, tecnologia e busca se combinam; a grade cresce com o cadastro
  const visiveis = buscarProjetos(
    filtrarProjetos(filtrarPorCategoria(projetos, categoria), filtro),
    busca,
    (projeto) => traduzir(projeto.nome, idioma),
  );

  function limpar() {
    setBusca("");
    setCategoria(CATEGORIA_TODOS);
    setFiltro(FILTRO_TODAS);
  }

  return (
    <section className="pagina projetos" aria-labelledby="projetos-titulo">
      <CabecalhoPagina
        id="projetos-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      {projetos.length === 0 ? (
        <EstadoVazio>{t.vazio}</EstadoVazio>
      ) : (
        <>
          {/* Destaques no topo; os mesmos registros seguem na grade completa */}
          <ProjetosDestaque projetos={projetos} idioma={idioma} t={t} />

          <section className="projetos-todos" aria-labelledby="projetos-todos">
            <h2 id="projetos-todos" className="projetos-todos-titulo">
              {t.todosTitulo}
            </h2>

            {/* ===== INÍCIO: busca e filtros ===== */}
            <div className="projetos-barra">
              <BuscaProjetos valor={busca} onBuscar={setBusca} t={t} />
              <FiltroCategorias
                categoria={categoria}
                contagem={contarPorCategoria(projetos)}
                onFiltrar={setCategoria}
                t={t}
              />
            </div>

            <div className="projetos-barra-tecnologias">
              <FiltroTecnologias
                opcoes={tecnologiasDosProjetos(projetos)}
                filtro={filtro}
                onFiltrar={setFiltro}
                t={t}
              />
            </div>

            <p className="projetos-resultado" role="status">
              {t.resultado(visiveis.length, projetos.length)}
            </p>
            {/* ===== FIM: busca e filtros ===== */}

            {/* ===== INÍCIO: grade ===== */}
            {visiveis.length === 0 ? (
              <div className="projetos-sem-resultado">
                <EstadoVazio>{t.semResultado}</EstadoVazio>
                <Button variant="outline" size="lg" onClick={limpar}>
                  {t.limparFiltros}
                </Button>
              </div>
            ) : (
              // A key reinicia a entrada dos cartões só ao trocar de filtro (não a cada tecla)
              <ListaAnimada
                className="projetos-grade"
                key={`${categoria}-${filtro}`}
              >
                {visiveis.map((projeto) => (
                  <CartaoProjeto
                    key={projeto.id}
                    projeto={projeto}
                    idioma={idioma}
                    t={t}
                  />
                ))}
              </ListaAnimada>
            )}
            {/* ===== FIM: grade ===== */}
          </section>
        </>
      )}
    </section>
  );
}

export default Projetos;
