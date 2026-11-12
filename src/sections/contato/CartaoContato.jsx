import { ExternalLink, Mail, Send } from "lucide-react";

import { ItemAnimado } from "@/components/pagina/animacao";
import { ShimmerButton } from "@/components/ui/shimmer-button";

import CopiarEmail from "./CopiarEmail";

/* ===== INÍCIO: cartão de um canal de contato ===== */
// Ícone, título, descrição curta, endereço real e ação explícita.
// A ação é o próprio ShimmerButton renderizado como <a> (sem botão dentro de
// link). No e-mail, "Enviar e-mail" e "Copiar e-mail" ficam lado a lado.
// Em áreas estreitas (Contato.css) o cartão vira uma linha compacta: as ações
// mostram só o ícone e o rótulo fica como nome acessível (.contato-acao-texto).
function CartaoContato({ contato, t }) {
  const canal = t.canais[contato.id];
  const idTitulo = `contato-${contato.id}`;

  return (
    <ItemAnimado className="cartao cartao-interativo contato-cartao">
      <article className="contato-corpo" aria-labelledby={idTitulo}>
        <div className="contato-topo">
          <span className="contato-icone" aria-hidden="true">
            {contato.icone ? (
              <img src={contato.icone} alt="" width="24" height="24" />
            ) : (
              <Mail size={24} />
            )}
          </span>
          <div className="contato-textos">
            <h2 id={idTitulo} className="contato-canal">
              {canal.titulo}
            </h2>
            <p className="contato-valor">{contato.valor}</p>
          </div>
        </div>

        <p className="contato-descricao">{canal.descricao}</p>

        <div className="contato-acoes">
          <ShimmerButton
            variante={contato.id === "email" ? "principal" : "secundaria"}
            href={contato.url}
            target={contato.externo ? "_blank" : undefined}
            rel={contato.externo ? "noopener noreferrer" : undefined}
          >
            {contato.externo ? <ExternalLink aria-hidden="true" /> : <Send aria-hidden="true" />}
            <span className="contato-acao-texto">{canal.acao}</span>
            {contato.externo && <span className="sr-only"> ({t.novaAba})</span>}
          </ShimmerButton>

          {contato.id === "email" && <CopiarEmail email={contato.valor} t={t} />}
        </div>
      </article>
    </ItemAnimado>
  );
}
/* ===== FIM: cartão de um canal de contato ===== */

export default CartaoContato;
