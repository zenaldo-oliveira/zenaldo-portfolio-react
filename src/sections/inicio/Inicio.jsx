import "./inicio.css";

import Apresentacao from "./Apresentacao";
import ProjetoDestaque from "./ProjetoDestaque";
import Tecnologias from "./Tecnologias";

function Inicio() {
  return (
    <section id="inicio" className="inicio">
      {/* ===== INÍCIO: fundo da tela ===== */}
      <div className="inicio-fundo" aria-hidden="true" />
      {/* ===== FIM: fundo da tela ===== */}

      {/* ===== INÍCIO: conteúdo em duas colunas ===== */}
      <div className="inicio-grade">
        <Apresentacao />

        <div className="inicio-coluna-projeto">
          <ProjetoDestaque />
        </div>
      </div>
      {/* ===== FIM: conteúdo em duas colunas ===== */}

      <Tecnologias />
    </section>
  );
}

export default Inicio;
