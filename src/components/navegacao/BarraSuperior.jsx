import { useTema } from "../configuracoes/useTema";
import BotaoSidebar from "./BotaoSidebar";
import MenuOpcoes from "./MenuOpcoes";
import "./BarraSuperior.css";

/* ===== INÍCIO: barra superior da área principal ===== */
// Faixa própria no topo (espaço reservado, sem sobrepor títulos):
// - celular: botão de abrir a sidebar à esquerda;
// - sempre: menu de três pontinhos no canto superior direito.
function BarraSuperior({ textos, idioma, setIdioma, celular, sidebarAberta, alternarSidebar }) {
  // Tema (claro/escuro), aplicado em <html data-tema> e escolhido no menu
  const [tema, setTema] = useTema();

  return (
    <header className="barra-superior">
      {celular && (
        <BotaoSidebar
          id="botao-abrir-sidebar"
          aberta={sidebarAberta}
          celular
          textos={textos}
          onClick={alternarSidebar}
        />
      )}

      <div className="barra-superior-acoes">
        <MenuOpcoes
          textos={textos}
          idioma={idioma}
          setIdioma={setIdioma}
          tema={tema}
          setTema={setTema}
        />
      </div>
    </header>
  );
}
/* ===== FIM: barra superior ===== */

export default BarraSuperior;
