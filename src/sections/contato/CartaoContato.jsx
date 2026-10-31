import { Mail } from "lucide-react";

import { ItemAnimado } from "@/components/pagina/animacao";

import CopiarEmail from "./CopiarEmail";

/* ===== INÍCIO: cartão de um canal de contato ===== */
function CartaoContato({ contato, t }) {
  const nomeCanal = t.canais[contato.id];

  return (
    <ItemAnimado className="cartao cartao-interativo contato-cartao">
      <a
        className="contato-link"
        href={contato.url}
        target={contato.externo ? "_blank" : undefined}
        rel={contato.externo ? "noopener noreferrer" : undefined}
      >
        <span className="contato-icone" aria-hidden="true">
          {contato.icone ? (
            <img src={contato.icone} alt="" width="28" height="28" />
          ) : (
            <Mail size={28} />
          )}
        </span>

        <span className="contato-textos">
          <span className="contato-canal">{nomeCanal}</span>
          <span className="contato-valor">{contato.valor}</span>
        </span>

        {contato.externo && <span className="sr-only"> ({t.novaAba})</span>}
      </a>

      {contato.id === "email" && <CopiarEmail email={contato.valor} t={t} />}
    </ItemAnimado>
  );
}
/* ===== FIM: cartão de um canal de contato ===== */

export default CartaoContato;
