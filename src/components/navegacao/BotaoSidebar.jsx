import { Menu, X } from "lucide-react";

/* ===== INÍCIO: botão hambúrguer do menu ===== */
// Mesmo botão no trilho da sidebar (desktop), na barra superior (celular) e
// dentro do painel aberto (fechar). O nome acessível diz a ação e
// aria-expanded informa o estado. Área de toque de 44 × 44 px.
function BotaoSidebar({ aberta, textos, onClick, ref, id }) {
  const rotulo = aberta ? textos.fecharMenu : textos.abrirMenu;
  const Icone = aberta ? X : Menu;

  return (
    <button
      ref={ref}
      id={id}
      className="botao-sidebar"
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      title={rotulo}
      aria-controls="sidebar-principal"
      aria-expanded={aberta}
    >
      <Icone size={20} aria-hidden="true" />
    </button>
  );
}
/* ===== FIM: botão hambúrguer do menu ===== */

export default BotaoSidebar;
