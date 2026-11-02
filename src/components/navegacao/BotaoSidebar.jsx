import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

/* ===== INÍCIO: botão de abrir/fechar a sidebar ===== */
// aberta: sidebar visível (computador: expandida; celular: painel aberto).
// O nome acessível diz a ação ("Recolher menu", "Abrir menu"...) e
// aria-expanded informa o estado. Área de toque de 44 × 44 px.
function BotaoSidebar({ aberta, celular, textos, onClick, ref, id }) {
  const rotulo = celular
    ? aberta
      ? textos.fecharMenu
      : textos.abrirMenu
    : aberta
      ? textos.recolherMenu
      : textos.expandirMenu;
  const Icone = aberta ? PanelLeftClose : PanelLeftOpen;

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
/* ===== FIM: botão de abrir/fechar a sidebar ===== */

export default BotaoSidebar;
