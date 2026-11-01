import {
  Ellipsis,
  Folder,
  House,
  Mail,
  Milestone,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  User,
} from "lucide-react";
import { Menu } from "@base-ui/react/menu";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Configuracoes from "../configuracoes/Configuracoes";
import "./Sidebar.css";

/* ===== Itens da navegação ===== */
// Habilidades, Certificados e Currículo saíram do menu; os arquivos continuam
// no projeto (src/sections/habilidades e src/sections/certificados).
const itensMenu = [
  { nome: "inicio", destino: "#inicio", icone: House },
  { nome: "sobre", destino: "#sobre", icone: User },
  { nome: "trajetoria", destino: "#trajetoria", icone: Milestone },
  { nome: "projetos", destino: "#projetos", icone: Folder },
  { nome: "contato", destino: "#contato", icone: Mail },
];

/* ===== Celular (mesmo limite do Sidebar.css) ===== */
// No celular a sidebar é um painel sobreposto e não recolhe: o menu de três
// pontinhos mostra só "Configurações".
const CONSULTA_CELULAR = "(max-width: 768px)";

function assinarCelular(avisar) {
  const consulta = window.matchMedia(CONSULTA_CELULAR);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

function ehCelular() {
  return window.matchMedia(CONSULTA_CELULAR).matches;
}

function Sidebar({ textos, paginaAtual, paginasDisponiveis, idioma, setIdioma }) {
  const [recolhida, setRecolhida] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [configAberta, setConfigAberta] = useState(false);
  const celular = useSyncExternalStore(assinarCelular, ehCelular);

  /* ===== INÍCIO: foco entre menu, configurações e recolher ===== */
  // O botão de três pontinhos é a âncora do painel de configurações e recebe
  // o foco de volta quando ele fecha. Ao recolher pelo menu, o foco vai para
  // o botão de expandir; ao expandir, volta para os três pontinhos.
  const botaoMenuRef = useRef(null);
  const botaoExpandirRef = useRef(null);
  // Item escolhido no menu ("configuracoes" | "recolher"); limpo ao reabrir
  const acaoMenu = useRef(null);
  const focarMenuAoExpandir = useRef(false);

  useEffect(() => {
    if (!recolhida && focarMenuAoExpandir.current) {
      focarMenuAoExpandir.current = false;
      botaoMenuRef.current?.focus();
    }
  }, [recolhida]);

  function recolher() {
    acaoMenu.current = "recolher";
    setRecolhida(true);
  }

  // O botão de expandir some ao expandir: o foco segue para os três pontinhos
  function expandir() {
    focarMenuAoExpandir.current = true;
    setRecolhida(false);
  }

  function aoMudarMenu(aberto) {
    if (aberto) acaoMenu.current = null;
  }

  // As configurações abrem depois que o menu termina de fechar, para o
  // retorno de foco do menu não competir com o painel.
  function aoTerminarMenu(aberto) {
    if (!aberto && acaoMenu.current === "configuracoes") {
      setConfigAberta(true);
    }
  }

  // Destino do foco quando o menu fecha: o botão de expandir (após recolher),
  // nenhum (o painel de configurações vai recebê-lo) ou o próprio gatilho.
  function focoAoFecharMenu() {
    if (acaoMenu.current === "recolher") return botaoExpandirRef.current ?? true;
    if (acaoMenu.current === "configuracoes") return false;
    return true;
  }
  /* ===== FIM: foco entre menu, configurações e recolher ===== */

  return (
    <>
      <button
        className="sidebar-abrir-mobile"
        type="button"
        onClick={() => setMenuAberto(true)}
        aria-label={textos.abrirMenu}
        aria-controls="sidebar-principal"
        aria-expanded={menuAberto}
      >
        ☰
      </button>

      <aside
        id="sidebar-principal"
        className={`sidebar ${recolhida ? "recolhida" : ""} ${menuAberto ? "aberta" : ""}`}
      >
        <button
          className="sidebar-fechar-mobile"
          type="button"
          onClick={() => setMenuAberto(false)}
          aria-label={textos.fecharMenu}
        >
          ✕
        </button>

        {/* ===== Início: logo ===== */}
        <div className="sidebar-topo">
          <a className="sidebar-logo" href="#inicio">
            <img src="/logo.png" alt="Zenaldo Oliveira — início" />
          </a>
        </div>
        {/* ===== Fim: logo ===== */}

        {/* ===== Início: navegação ===== */}
        <nav aria-label={textos.navegacaoPrincipal}>
          {itensMenu.map((item) => {
            const Icone = item.icone;
            const texto = textos[item.nome];
            const ativo = item.destino === `#${paginaAtual}`;
            const disponivel = paginasDisponiveis.includes(item.nome);

            /* ===== INÍCIO: item ainda sem página ===== */
            // Sem href o item não navega, não recebe foco e não muda o hash
            if (!disponivel) {
              const textoIndisponivel = `${texto} (${textos.emBreve})`;

              return (
                <a
                  key={item.destino}
                  aria-disabled="true"
                  aria-label={textoIndisponivel}
                  title={textoIndisponivel}
                >
                  <Icone size={20} aria-hidden="true" />
                  <span className="sidebar-texto">{texto}</span>
                </a>
              );
            }
            /* ===== FIM: item ainda sem página ===== */

            return (
              <a
                key={item.destino}
                href={item.destino}
                aria-label={texto}
                aria-current={ativo ? "page" : undefined}
                title={recolhida ? texto : undefined}
                target={item.externo ? "_blank" : undefined}
                rel={item.externo ? "noopener noreferrer" : undefined}
                onClick={() => setMenuAberto(false)}
              >
                <Icone size={20} aria-hidden="true" />
                <span className="sidebar-texto">{texto}</span>
              </a>
            );
          })}
        </nav>
        {/* ===== Fim: navegação ===== */}

        {/* ===== Início: rodapé da sidebar ===== */}
        {/* Três pontinhos: "Configurações" e, no computador com a sidebar
            aberta, "Recolher menu". Recolhida: botão visível para expandir. */}
        <div className="sidebar-rodape">
          {recolhida && !celular && (
            <button
              ref={botaoExpandirRef}
              className="sidebar-controle sidebar-expandir"
              type="button"
              onClick={expandir}
              aria-label={textos.expandirMenu}
              title={textos.expandirMenu}
            >
              <PanelLeftOpen size={20} aria-hidden="true" />
            </button>
          )}

          <Menu.Root onOpenChange={aoMudarMenu} onOpenChangeComplete={aoTerminarMenu}>
            <Menu.Trigger
              ref={botaoMenuRef}
              className="sidebar-controle sidebar-mais"
              aria-label={textos.maisOpcoes}
              title={textos.maisOpcoes}
            >
              <Ellipsis size={20} aria-hidden="true" />
            </Menu.Trigger>

            <Menu.Portal>
              <Menu.Positioner
                className="sidebar-menu-posicao"
                side="top"
                align="start"
                sideOffset={8}
                collisionPadding={12}
              >
                <Menu.Popup className="sidebar-menu" finalFocus={focoAoFecharMenu}>
                  <Menu.Item
                    className="sidebar-menu-item"
                    onClick={() => {
                      acaoMenu.current = "configuracoes";
                    }}
                  >
                    <Settings size={18} aria-hidden="true" />
                    {textos.configuracoes}
                  </Menu.Item>

                  {!recolhida && !celular && (
                    <Menu.Item className="sidebar-menu-item" onClick={recolher}>
                      <PanelLeftClose size={18} aria-hidden="true" />
                      {textos.recolherMenu}
                    </Menu.Item>
                  )}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Configuracoes
            idioma={idioma}
            setIdioma={setIdioma}
            textos={textos}
            aberto={configAberta}
            onAbertoChange={setConfigAberta}
            ancoraRef={botaoMenuRef}
          />
        </div>
        {/* ===== Fim: rodapé da sidebar ===== */}
      </aside>
    </>
  );
}

export default Sidebar;
