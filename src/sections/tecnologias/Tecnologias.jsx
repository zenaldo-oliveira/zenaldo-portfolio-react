import { IconCloud } from "@/components/ui/icon-cloud";
import { tecnologias, urlIconeTecnologia } from "@/data/tecnologias";
import { traducoesTecnologias } from "./traducoes";
import "./Tecnologias.css";

/* ===== INÍCIO: tecnologias exibidas ===== */
const imagens = tecnologias.map(({ icone }) => urlIconeTecnologia(icone));
/* ===== FIM: tecnologias exibidas ===== */

function Tecnologias({ idioma = "pt" }) {
  const t = traducoesTecnologias[idioma];

  return (
    <section id="inicio" className="tecnologias">
      {/* Fundo: camada única de todas as páginas (components/fundo/FundoPagina) */}
      {/* ===== INÍCIO: cabeçalho ===== */}
      <header className="tecnologias-cabecalho">
        <p>Meu ambiente de desenvolvimento</p>
        <h1>Tecnologias</h1>
      </header>
      {/* ===== FIM: cabeçalho ===== */}

      <div className="tecnologias-painel">
        {/* ===== INÍCIO: apresentação ===== */}
        <div className="tecnologias-conteudo">
          <h2>Ferramentas que transformam ideias em projetos.</h2>

          <p className="tecnologias-descricao">
            Utilizo React, Next.js e JavaScript para construir interfaces web.
            Também estudo ferramentas de back-end, bancos de dados e integração
            com APIs.
          </p>
        </div>
        {/* ===== FIM: apresentação ===== */}

        {/* ===== INÍCIO: globo interativo ===== */}
        <div
          className="tecnologias-globo"
          role="group"
          aria-label="Globo interativo das tecnologias listadas"
        >
          <IconCloud
            images={imagens}
            pauseLabel={t.pausarGlobo}
            playLabel={t.continuarGlobo}
          />
        </div>
        {/* ===== FIM: globo interativo ===== */}
      </div>

      {/* Legenda junto da faixa que ela descreve (antes ficava acima do globo) */}
      <p className="tecnologias-legenda">
        Tecnologias que utilizo ou estudo nos meus projetos:
      </p>

      {/* ===== INÍCIO: duas faixas de tecnologias ===== */}
      <div
        className="tecnologias-carrosseis"
        tabIndex={0}
        role="region"
        aria-label="Tecnologias utilizadas e estudadas"
      >
        {[1].map((linha) => {
          const itens = tecnologias;

          return (
            <div className="tecnologias-carrossel" key={linha}>
              <div
                className={`tecnologias-trilha ${
                  linha === 1 ? "tecnologias-trilha-reversa" : ""
                }`}
              >
                {[0, 1].map((copia) => (
                  <ul
                    className="tecnologias-faixa"
                    key={copia}
                    aria-hidden={copia === 1 ? true : undefined}
                  >
                    {itens.map(({ nome, icone }) => (
                      <li className="tecnologias-item" key={nome}>
                        <img
                          src={urlIconeTecnologia(icone)}
                          alt=""
                          width="28"
                          height="28"
                        />
                        <span>{nome}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* ===== FIM: duas faixas de tecnologias ===== */}
    </section>
  );
}

export default Tecnologias;
