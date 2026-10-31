import { Revelar } from "./animacao";
import "./Pagina.css";

/* ===== INÍCIO: cabeçalho padrão das páginas ===== */
// Mesmo formato do cabeçalho de Tecnologias: linha de apoio, título e introdução.
function CabecalhoPagina({ id, apoio, titulo, introducao }) {
  return (
    <Revelar>
      <header className="pagina-cabecalho">
        <p className="pagina-apoio">{apoio}</p>
        <h1 id={id}>{titulo}</h1>
        {introducao && <p className="pagina-introducao">{introducao}</p>}
      </header>
    </Revelar>
  );
}
/* ===== FIM: cabeçalho padrão das páginas ===== */

export default CabecalhoPagina;
