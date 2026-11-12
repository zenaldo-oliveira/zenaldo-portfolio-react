import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Button } from "@/components/ui/button";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import ImagemProjeto from "./ImagemProjeto";
import LinksProjeto from "./LinksProjeto";

/* ===== INÍCIO: seções opcionais do diálogo ===== */
// Só aparecem quando o projeto tem o campo cadastrado (src/data/projetos.js).
function SecaoTexto({ titulo, texto, idioma }) {
  if (!texto) return null;

  return (
    <>
      <h3 className="dialogo-subtitulo">{titulo}</h3>
      <p className="dialogo-descricao dialogo-paragrafo">{traduzir(texto, idioma)}</p>
    </>
  );
}

function SecaoLista({ titulo, itens, idioma }) {
  if (!itens?.length) return null;

  return (
    <>
      <h3 className="dialogo-subtitulo">{titulo}</h3>
      <ul className="dialogo-lista">
        {itens.map((item) => (
          <li key={traduzir(item, "pt")}>{traduzir(item, idioma)}</li>
        ))}
      </ul>
    </>
  );
}
/* ===== FIM: seções opcionais do diálogo ===== */

/* ===== INÍCIO: detalhes do projeto em diálogo ===== */
// Dialog do Base UI: prende o foco, fecha com Esc ou clique fora
// e devolve o foco ao botão "Ver detalhes".
// compacto: botão menor (mini cards da grade).
// O gatilho renderiza o próprio ShimmerButton (um único <button>).
// onAbrirFechar: avisa quem precisa reagir (ex.: pausar o carrossel).
// variante: "principal" quando "Ver detalhes" é a única ação do projeto.
function DetalhesProjeto({
  projeto,
  nome,
  idioma,
  compacto = false,
  variante = "secundaria",
  onAbrirFechar,
  t,
}) {

  return (
    <Dialog.Root onOpenChange={(aberto) => onAbrirFechar?.(aberto)}>
      <Dialog.Trigger
        render={
          <ShimmerButton
            variante={variante}
            tamanho={compacto ? "pequeno" : "padrao"}
            className="projeto-detalhes-botao"
          />
        }
      >
        {t.detalhes}
        <span className="sr-only"> — {nome}</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="dialogo-fundo" />
        <Dialog.Popup className="dialogo">
          <div className="dialogo-topo">
            <div>
              <p className="dialogo-apoio">
                {[t.categorias[projeto.categoria], t.status[projeto.status]]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <Dialog.Title className="dialogo-titulo">{nome}</Dialog.Title>
            </div>

            <Dialog.Close
              render={<Button variant="ghost" size="icon-lg" />}
              aria-label={t.fechar}
            >
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>

          {/* Captura real, quando cadastrada (os cartões da grade não têm imagem) */}
          {projeto.imagem && (
            <div className="dialogo-imagem">
              <ImagemProjeto imagem={projeto.imagem} idioma={idioma} t={t} />
            </div>
          )}

          <Dialog.Description className="dialogo-descricao">
            {traduzir(projeto.descricao, idioma)}
          </Dialog.Description>

          <SecaoTexto titulo={t.contexto} texto={projeto.contexto} idioma={idioma} />
          <SecaoTexto
            titulo={t.participacao}
            texto={projeto.participacao}
            idioma={idioma}
          />
          <SecaoLista
            titulo={t.funcionalidades}
            itens={projeto.destaques}
            idioma={idioma}
          />
          {/* Separação entre o que foi conferido no ar e o que só está no código */}
          <SecaoLista
            titulo={t.validadoEmProducao}
            itens={projeto.validadoEmProducao}
            idioma={idioma}
          />
          <SecaoLista
            titulo={t.somenteNoCodigo}
            itens={projeto.somenteNoCodigo}
            idioma={idioma}
          />
          <SecaoLista titulo={t.decisoes} itens={projeto.decisoes} idioma={idioma} />

          {projeto.imagemComplementar && (
            <div className="dialogo-imagem">
              <ImagemProjeto
                imagem={projeto.imagemComplementar}
                idioma={idioma}
                t={t}
              />
            </div>
          )}

          <h3 className="dialogo-subtitulo">{t.tecnologias}</h3>
          <ListaEtiquetas
            itens={nomesTecnologias(projeto.tecnologias)}
            rotulo={t.tecnologias}
          />

          <LinksProjeto projeto={projeto} nome={nome} t={t} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
/* ===== FIM: detalhes do projeto em diálogo ===== */

export default DetalhesProjeto;
