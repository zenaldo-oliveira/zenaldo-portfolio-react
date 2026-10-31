import EstadoVazio from "@/components/pagina/EstadoVazio";
import { trajetoria } from "@/data/trajetoria";

/* ===== INÍCIO: chamada para a Linha do Tempo ===== */
// A trajetória completa fica na página Linha do Tempo (src/data/trajetoria.js);
// aqui só há o aviso enquanto não houver dados e o link para a página.
function Trajetoria({ textoVazio, textoLink }) {
  return (
    <div className="sobre-trajetoria-chamada">
      {trajetoria.length === 0 && <EstadoVazio>{textoVazio}</EstadoVazio>}
      <a className="sobre-trajetoria-link" href="#trajetoria">
        {textoLink}
      </a>
    </div>
  );
}
/* ===== FIM: chamada para a Linha do Tempo ===== */

export default Trajetoria;
