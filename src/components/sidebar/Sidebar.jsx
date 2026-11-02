import { Folder, House, Mail, Milestone, User } from "lucide-react";
import { useEffect, useRef } from "react";

import BotaoSidebar from "../navegacao/BotaoSidebar";
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

/* ===== INÍCIO: sidebar ===== */
// aberta — computador: expandida (false = recolhida em trilho de ícones);
//          celular: painel sobreposto visível.
// O botão de recolher/expandir fica no canto superior esquerdo da própria
// sidebar. No celular, o mesmo botão (na barra superior) abre o painel, e o
// painel fecha pelo botão, pela tecla Esc ou tocando fora.
function Sidebar({ textos, paginaAtual, paginasDisponiveis, celular, aberta, alternar, fechar }) {
  const botaoRef = useRef(null);
  const painelAberto = celular && aberta;

  /* ===== INÍCIO: painel do celular (foco e Esc) ===== */
  // Ao abrir, o foco vai para o botão de fechar; ao fechar, volta ao botão
  // que abriu (barra superior), se o foco estava dentro do painel.
  useEffect(() => {
    if (!painelAberto) return;

    botaoRef.current?.focus();

    function aoTeclar(evento) {
      if (evento.key === "Escape") fechar();
    }
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      const ativo = document.activeElement;
      const focoPerdido =
        !ativo ||
        ativo === document.body ||
        document.getElementById("sidebar-principal")?.contains(ativo);
      if (focoPerdido) document.getElementById("botao-abrir-sidebar")?.focus();
    };
  }, [painelAberto, fechar]);
  /* ===== FIM: painel do celular ===== */

  const classes = [
    "sidebar",
    !celular && !aberta ? "recolhida" : "",
    painelAberto ? "aberta" : "",
  ].join(" ");

  return (
    <>
      {/* Toque fora do painel (celular) fecha o menu */}
      {painelAberto && <div className="sidebar-fundo" aria-hidden="true" onClick={fechar} />}

      <aside
        id="sidebar-principal"
        className={classes}
        // Celular com o painel fechado: fora da leitura e do Tab
        inert={celular && !aberta ? true : undefined}
      >
        {/* ===== Início: topo (botão + logo) ===== */}
        <div className="sidebar-cabecalho">
          <BotaoSidebar
            ref={botaoRef}
            aberta={aberta}
            celular={celular}
            textos={textos}
            onClick={alternar}
          />
        </div>

        <div className="sidebar-topo">
          <a className="sidebar-logo" href="#inicio" onClick={celular ? fechar : undefined}>
            <img src="/logo.png" alt="Zenaldo Oliveira — início" />
          </a>
        </div>
        {/* ===== Fim: topo ===== */}

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
                title={!celular && !aberta ? texto : undefined}
                onClick={celular ? fechar : undefined}
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
/* ===== FIM: sidebar ===== */

export default Sidebar;
