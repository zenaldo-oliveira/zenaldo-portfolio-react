import { House, User, Milestone, Folder, Mail, PanelLeft } from "lucide-react";
import { useState } from "react";

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

function Sidebar({ textos, paginaAtual, paginasDisponiveis, idioma, setIdioma }) {
  const [recolhida, setRecolhida] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

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
        {/* ===== Início: logo e controles ===== */}
        <div className="sidebar-topo">
          <a className="sidebar-logo" href="#inicio">
            <img src="/logo.png" alt="Zenaldo Oliveira — início" />
          </a>

          {/* Configurações ao lado da seta de recolher; empilham quando recolhida */}
          <div className="sidebar-controles">
            <Configuracoes
              className="sidebar-controle sidebar-configuracoes"
              idioma={idioma}
              setIdioma={setIdioma}
              textos={textos}
            />

            <button
              className="sidebar-controle sidebar-recolher"
              type="button"
              onClick={() => setRecolhida(!recolhida)}
              aria-label={recolhida ? textos.expandirMenu : textos.recolherMenu}
            >
              <PanelLeft size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* ===== Fim: logo e controles ===== */}

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
      </aside>
    </>
  );
}

export default Sidebar;
