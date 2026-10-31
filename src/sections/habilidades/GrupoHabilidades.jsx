import { ItemAnimado } from "@/components/pagina/animacao";
import { traduzir } from "@/i18n/traduzir";

/* ===== INÍCIO: área de habilidades ===== */
// Cada tecnologia mostra os projetos em que foi usada, quando houver.
function GrupoHabilidades({ id, titulo, itens, projetos, idioma, t }) {
  return (
    <ItemAnimado>
      <section className="cartao habilidades-grupo" aria-labelledby={id}>
        <h2 id={id}>{titulo}</h2>

        <ul className="habilidades-lista">
          {itens.map((tecnologia) => {
            const usadaEm = projetos.filter((projeto) =>
              projeto.tecnologias.includes(tecnologia.id),
            );

            return (
              <li key={tecnologia.id}>
                <span className="habilidades-nome">{tecnologia.nome}</span>

                {usadaEm.length > 0 && (
                  <span className="habilidades-uso">
                    {t.usadaEm}:{" "}
                    {usadaEm.map((projeto, indice) => (
                      <span key={projeto.id}>
                        {indice > 0 && ", "}
                        <a href="#projetos">{traduzir(projeto.nome, idioma)}</a>
                      </span>
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </ItemAnimado>
  );
}
/* ===== FIM: área de habilidades ===== */

export default GrupoHabilidades;
