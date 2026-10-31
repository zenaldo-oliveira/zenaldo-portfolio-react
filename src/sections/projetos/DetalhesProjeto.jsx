import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { classeBotao } from "@/components/pagina/botao";
import { Button } from "@/components/ui/button";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import ImagemProjeto from "./ImagemProjeto";
import LinksProjeto from "./LinksProjeto";

/* ===== INÍCIO: detalhes do projeto em diálogo ===== */
// Dialog do Base UI: prende o foco, fecha com Esc ou clique fora
// e devolve o foco ao botão "Ver detalhes".
// compacto: botão menor (mini cards da grade).
// onAbrirFechar: avisa quem precisa reagir (ex.: pausar o carrossel).
function DetalhesProjeto({ projeto, nome, idioma, compacto = false, onAbrirFechar, t }) {
  const classeGatilho = compacto
    ? classeBotao("outline", "projeto-detalhes-botao projeto-detalhes-compacto")
    : classeBotao("outline", "projeto-detalhes-botao");

  return (
    <Dialog.Root onOpenChange={(aberto) => onAbrirFechar?.(aberto)}>
      <Dialog.Trigger className={classeGatilho}>
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

          {projeto.destaques?.length > 0 && (
            <>
              <h3 className="dialogo-subtitulo">{t.funcionalidades}</h3>
              <ul className="dialogo-lista">
                {projeto.destaques.map((destaque) => (
                  <li key={traduzir(destaque, "pt")}>
                    {traduzir(destaque, idioma)}
                  </li>
                ))}
              </ul>
            </>
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
