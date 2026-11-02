import { Revelar } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import { Separator } from "@/components/ui/separator";
import { perfil } from "@/data/perfil";

import ExperienciaFormacao from "./ExperienciaFormacao";
import GruposTecnologias from "./GruposTecnologias";
import InteligenciaArtificial from "./InteligenciaArtificial";
import ObjetivoProfissional from "./ObjetivoProfissional";
import { traducoesSobre } from "./traducoes";
import "./Sobre.css";

// Intervalo entre a entrada de um bloco e o seguinte (segundos)
const INTERVALO_BLOCOS_S = 0.06;

// Revelar só anima opacidade/posição: o conteúdo está no DOM desde o início
// (leitores de tela e busca não dependem da animação).
function Bloco({ indice, separador = true, children }) {
  return (
    <Revelar className="sobre-item" atraso={indice * INTERVALO_BLOCOS_S}>
      {separador && <Separator className="sobre-separador" />}
      {children}
    </Revelar>
  );
}

function Sobre({ idioma, curriculoDisponivel }) {
  const t = traducoesSobre[idioma];

  // Dois grupos na ordem de leitura (DOM = ordem visual e do teclado):
  // A) apresentação e experiência/formação; B) IA, tecnologias e objetivo.
  // Com 1240px ou mais de conteúdo (largura real, sidebar aberta ou
  // recolhida) viram duas colunas; abaixo, o CSS desfaz os grupos
  // (display: contents): conteúdo + objetivo, ou uma coluna.
  return (
    <section className="pagina sobre" aria-labelledby="sobre-titulo">
      <CabecalhoPagina id="sobre-titulo" apoio={t.apoio} titulo={t.titulo} />

      <div className="sobre-grade">
        <div className="sobre-coluna sobre-coluna-a">
          <Bloco indice={0} separador={false}>
            <section className="sobre-bloco" aria-labelledby="sobre-apresentacao">
              <h2 id="sobre-apresentacao">{t.apresentacaoTitulo}</h2>
              {t.apresentacao.map((paragrafo) => (
                <p className="sobre-texto" key={paragrafo}>
                  {paragrafo}
                </p>
              ))}
            </section>
          </Bloco>

          <Bloco indice={1}>
            <ExperienciaFormacao t={t} />
          </Bloco>
        </div>

        <div className="sobre-coluna sobre-coluna-b">
          <Bloco indice={2}>
            <InteligenciaArtificial t={t} />
          </Bloco>

          <Bloco indice={3}>
            <GruposTecnologias t={t} />
          </Bloco>

          <ObjetivoProfissional
            t={t}
            curriculo={curriculoDisponivel ? perfil.curriculo : null}
          />
        </div>
      </div>
    </section>
  );
}

export default Sobre;
