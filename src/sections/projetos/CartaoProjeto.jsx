import { ItemAnimado } from "@/components/pagina/animacao";
import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { Badge } from "@/components/ui/badge";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import DetalhesProjeto from "./DetalhesProjeto";
import IconeProjeto from "./IconeProjeto";
import LinksProjeto from "./LinksProjeto";

// Etiquetas de tecnologia visíveis no mini card
const LIMITE_TECNOLOGIAS = 3;

/* ===== INÍCIO: mini card de projeto ===== */
// Referência: lista de projetos da Vercel. Ícone de 28px ao lado do nome,
// categoria/status, descrição de até 2 linhas, até 3 tecnologias pequenas e
// ações compactas (Detalhes, Ver site, GitHub, API) — links só quando cadastrados.
function CartaoProjeto({ projeto, idioma, t }) {
  const nome = traduzir(projeto.nome, idioma);
  const idTitulo = `projeto-${projeto.id}`;

  return (
    <ItemAnimado>
      <article
        className="cartao cartao-interativo projeto-cartao"
        aria-labelledby={idTitulo}
      >
        <header className="projeto-cabecalho">
          <IconeProjeto icone={projeto.icone} categoria={projeto.categoria} />

          <div className="projeto-identificacao">
            <h3 id={idTitulo}>{nome}</h3>
            <div className="projeto-meta">
              <span className="projeto-categoria">
                {t.categorias[projeto.categoria]}
              </span>
              {/* Status é opcional: só aparece quando confirmado no cadastro */}
              {projeto.status && (
                <Badge variant="secondary" className="projeto-status">
                  {t.status[projeto.status]}
                </Badge>
              )}
            </div>
          </div>
        </header>

        <p className="projeto-descricao">{traduzir(projeto.descricao, idioma)}</p>

        {/* Até 3 tecnologias + "+N"; a lista completa fica em "Ver detalhes" */}
        <ListaEtiquetas
          itens={nomesTecnologias(projeto.tecnologias)}
          rotulo={t.tecnologias}
          limite={LIMITE_TECNOLOGIAS}
          rotuloRestantes={t.maisTecnologias}
        />

        <footer className="projeto-rodape">
          <DetalhesProjeto
            projeto={projeto}
            nome={nome}
            idioma={idioma}
            compacto
            t={t}
          />
          <LinksProjeto
            projeto={projeto}
            nome={nome}
            compacto
            ocultarSemLinks
            grade
            t={t}
          />
        </footer>
      </article>
    </ItemAnimado>
  );
}
/* ===== FIM: mini card de projeto ===== */

export default CartaoProjeto;
