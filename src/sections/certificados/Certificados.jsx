import { ListaAnimada } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import EstadoVazio from "@/components/pagina/EstadoVazio";
import { certificados } from "@/data/certificados";

import CartaoCertificado from "./CartaoCertificado";
import { traducoesCertificados } from "./traducoes";
import "./Certificados.css";

function Certificados({ idioma }) {
  const t = traducoesCertificados[idioma];

  // Mais recentes primeiro ("AAAA-MM" ordena corretamente como texto)
  const ordenados = [...certificados].sort((a, b) =>
    (b.conclusao ?? "").localeCompare(a.conclusao ?? ""),
  );

  return (
    <section
      className="pagina certificados"
      aria-labelledby="certificados-titulo"
    >
      <CabecalhoPagina
        id="certificados-titulo"
        apoio={t.apoio}
        titulo={t.titulo}
        introducao={t.introducao}
      />

      {ordenados.length === 0 ? (
        <EstadoVazio>{t.vazio}</EstadoVazio>
      ) : (
        <ListaAnimada className="grade-cartoes">
          {ordenados.map((certificado) => (
            <CartaoCertificado
              key={certificado.id}
              certificado={certificado}
              idioma={idioma}
              t={t}
            />
          ))}
        </ListaAnimada>
      )}
    </section>
  );
}

export default Certificados;
