import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { Badge } from "@/components/ui/badge";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import DetalhesProjeto from "../DetalhesProjeto";
import ImagemProjeto from "../ImagemProjeto";
import LinksProjeto from "../LinksProjeto";

/* ===== INÍCIO: cartão do projeto em destaque ===== */
// vertical: formato do carrossel (imagem em cima). Sem vertical: destaque estático.
// Links aparecem só quando cadastrados (sem aviso de "não publicados").
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
        />

        <div className="destaque-acoes">
          <LinksProjeto
            projeto={projeto}
            nome={nome}
            compacto
            ocultarSemLinks
            t={t}
          />
          <DetalhesProjeto
            projeto={projeto}
            nome={nome}
            idioma={idioma}
            onAbrirFechar={onAbrirFechar}
            t={t}
          />
        </div>
      </div>
    </article>
  );
}
/* ===== FIM: cartão do projeto em destaque ===== */

export default CartaoDestaque;
