import { ListaAnimada } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import { contatos, perfil } from "@/data/perfil";

import CartaoContato from "./CartaoContato";
import { traducoesContato } from "./traducoes";
import "./Contato.css";

function Contato({ idioma }) {
  const t = traducoesContato[idioma];

  return (
    <section className="pagina contato" aria-labelledby="contato-titulo">
      <CabecalhoPagina
        id="contato-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      <ListaAnimada className="grade-cartoes">
        {contatos.map((contato) => (
          <CartaoContato key={contato.id} contato={contato} t={t} />
        ))}
      </ListaAnimada>

      <dl className="contato-local">
        <dt>{t.localizacao}</dt>
        <dd>{perfil.local}</dd>
      </dl>
    </section>
  );
}

export default Contato;
