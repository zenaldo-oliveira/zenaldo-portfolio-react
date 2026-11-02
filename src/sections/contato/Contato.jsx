import { ArrowUpRight } from "lucide-react";

import { ListaAnimada, Revelar } from "@/components/pagina/animacao";
import { contatos, perfil } from "@/data/perfil";

import CartaoContato from "./CartaoContato";
import { traducoesContato } from "./traducoes";
import "@/components/pagina/Pagina.css";
import "./Contato.css";

// Site da ZTech Solutions (serviços de desenvolvimento web)
const URL_SERVICOS = "https://zenaldodev.com.br/";

/* ===== INÍCIO: página Contato ===== */
// Desktop: apresentação à esquerda e grade de contatos à direita.
// Celular: uma coluna (apresentação, depois os cartões).
function Contato({ idioma }) {
  const t = traducoesContato[idioma];

  return (
    <section className="pagina contato" aria-labelledby="contato-titulo">
      <div className="contato-layout">
        {/* ===== INÍCIO: apresentação ===== */}
        <Revelar className="contato-apresentacao">
          {/* Mesmo padrão de cabeçalho das outras páginas (apoio + H1) */}
          <header className="contato-cabecalho">
            <p className="pagina-apoio">{t.apoio}</p>
            <h1 id="contato-titulo">{t.titulo}</h1>
          </header>

          <p className="contato-chamada">{t.chamada}</p>
          <p className="contato-introducao">{t.introducao}</p>

          <dl className="contato-local">
            <dt>{t.localizacao}</dt>
            <dd>{perfil.local}</dd>
          </dl>

          <a
            className="contato-servicos"
            href={URL_SERVICOS}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.servicos}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> ({t.novaAba})</span>
          </a>
        </Revelar>
        {/* ===== FIM: apresentação ===== */}

        {/* ===== INÍCIO: canais ===== */}
        <ListaAnimada className="contato-grade" aria-label={t.canaisRotulo}>
          {contatos.map((contato) => (
            <CartaoContato key={contato.id} contato={contato} t={t} />
          ))}
        </ListaAnimada>
        {/* ===== FIM: canais ===== */}
      </div>
    </section>
  );
}
/* ===== FIM: página Contato ===== */

export default Contato;
