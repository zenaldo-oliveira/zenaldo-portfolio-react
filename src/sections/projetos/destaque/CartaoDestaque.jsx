import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { Badge } from "@/components/ui/badge";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import DetalhesProjeto from "../DetalhesProjeto";
import ImagemProjeto from "../ImagemProjeto";
import LinksProjeto from "../LinksProjeto";

/* ===== INÍCIO: cartão do projeto em destaque ===== */
// vertical: formato do carrossel (imagem em cima). Sem vertical: destaque estático.
// Ações: "Ver detalhes" e, quando cadastrados, "Demo" e "GitHub".
// No carrossel, as tecnologias mostram as primeiras e um "+N" (lista completa
// no title, para leitores de tela e no diálogo de detalhes).
const TECNOLOGIAS_NO_CARTAO = 5;

function CartaoDestaque({
  projeto,
  idioma,
  prioridade,
  vertical = false,
  onAbrirFechar,
  t,
}) {
  const nome = traduzir(projeto.nome, idioma);
  const idTitulo = `destaque-${projeto.id}`;
  const classe = vertical
    ? "cartao destaque-cartao destaque-cartao-vertical"
    : "cartao destaque-cartao";

  return (
    <article className={classe} aria-labelledby={idTitulo}>
      <ImagemProjeto
        imagem={projeto.imagem}
        idioma={idioma}
        prioridade={prioridade}
        palco={vertical}
        dispositivos={projeto.dispositivos}
        t={t}
      />

      <div className="destaque-conteudo">
        <div className="destaque-meta">
          <span>{t.categorias[projeto.categoria]}</span>
          {/* Status é opcional: só aparece quando confirmado no cadastro */}
          {projeto.status && (
            <Badge variant="secondary" className="projeto-status">
              {t.status[projeto.status]}
            </Badge>
          )}
        </div>

        <h3 id={idTitulo}>{nome}</h3>
        <p className="destaque-descricao">
          {traduzir(projeto.descricao, idioma)}
        </p>

        <ListaEtiquetas
          itens={nomesTecnologias(projeto.tecnologias)}
          rotulo={t.tecnologias}
          limite={TECNOLOGIAS_NO_CARTAO}
          rotuloRestantes={t.maisTecnologias}
        />

        <div className="destaque-acoes">
          <DetalhesProjeto
            projeto={projeto}
            nome={nome}
            idioma={idioma}
            onAbrirFechar={onAbrirFechar}
            t={t}
          />
          <LinksProjeto
            projeto={projeto}
            nome={nome}
            compacto
            carrossel
            ocultarSemLinks
            t={t}
          />
        </div>
      </div>
    </article>
  );
}
/* ===== FIM: cartão do projeto em destaque ===== */

export default CartaoDestaque;
