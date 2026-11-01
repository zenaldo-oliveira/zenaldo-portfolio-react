import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";

/* ===== INÍCIO: tecnologias em grupos ===== */
// Badges sem níveis ou porcentagens. Só tecnologias confirmadas nos projetos
// ou no uso descrito na página (lista em traducoes.js).
function GruposTecnologias({ t }) {
  return (
    <section className="sobre-bloco" aria-labelledby="sobre-tecnologias">
      <h2 id="sobre-tecnologias">{t.tecnologiasTitulo}</h2>

      <div className="sobre-grupos">
        {t.gruposTecnologias.map(({ id, titulo, itens }) => (
          <div className="sobre-grupo" key={id}>
            <h3>{titulo}</h3>
            <ListaEtiquetas itens={itens} rotulo={titulo} />
          </div>
        ))}
      </div>
    </section>
  );
}
/* ===== FIM: tecnologias em grupos ===== */

export default GruposTecnologias;
