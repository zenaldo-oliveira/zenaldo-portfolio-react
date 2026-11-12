import { Folder, House, Mail, Milestone, User } from "lucide-react";
import { useEffect, useRef } from "react";

import BotaoSidebar from "../navegacao/BotaoSidebar";
import "./Sidebar.css";

/* ===== Itens da navegação ===== */
// Habilidades e Certificados ficaram fora do menu; os componentes continuam
// em src/sections/habilidades e src/sections/certificados.
const itensMenu = [
  { nome: "inicio", icone: House },
  { nome: "sobre", icone: User },
  { nome: "trajetoria", icone: Milestone },
  { nome: "projetos", icone: Folder },
  { nome: "contato", icone: Mail },
];

/* ===== INÍCIO: sidebar ===== */
// Desktop: o layout reserva a largura da sidebar ABERTA (260px + margem).
// Recolhida, só o trilho de 72px aparece; expandida, ela ocupa a faixa
// reservada: não cobre títulos nem cards e o conteúdo não se desloca. Não é
// modal (sem fundo escurecido, página utilizável); o mesmo botão expande e
// recolhe, e escolher uma página não a recolhe.
// Celular: sem trilho; o hambúrguer da barra superior abre um painel
// sobreposto com fundo escurecido, o resto da página fica inerte, e o painel
// fecha pelo X, pela tecla Esc, tocando fora ou ao escolher uma página. O
// foco vai para o X ao abrir e volta ao hambúrguer ao fechar.
function Sidebar({ textos, paginaAtual, celular, aberta, alternar, fechar }) {
  const botaoRef = useRef(null);
  const modal = celular && aberta;

  useEffect(() => {
    if (!modal) return;

    const botao = botaoRef.current;
    botao?.focus();

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
      if (!focoPerdido) return;
      // Volta ao hambúrguer da barra superior
      document.getElementById("botao-abrir-sidebar")?.focus();
    };
  }, [modal, fechar]);

  const recolhida = !celular && !aberta;
  // Celular: escolher uma página fecha o painel; desktop: a sidebar
  // continua como o usuário deixou
  const aoEscolher = celular ? fechar : undefined;

  return (
    <>
      {/* Fundo do painel sobreposto: só existe no celular. No desktop não há
          camada nenhuma sobre a página. */}
      {celular && (
        <div
          className={`sidebar-fundo${modal ? " aberto" : ""}`}
          aria-hidden="true"
          onClick={modal ? fechar : undefined}
        />
      )}

      <aside
        id="sidebar-principal"
        className={`sidebar${aberta ? " aberta" : ""}`}
        // Celular com o painel fechado: fora da leitura e do Tab
        inert={celular && !aberta ? true : undefined}
      >
        <div className="sidebar-cabecalho">
          <BotaoSidebar
            ref={botaoRef}
            aberta={aberta}
            textos={textos}
            onClick={alternar}
          />
        </div>

        <a className="sidebar-logo" href="#inicio" onClick={aoEscolher}>
          <img src="/logo.png" alt="Zenaldo Oliveira — início" width="373" height="483" />
        </a>

        <nav aria-label={textos.navegacaoPrincipal}>
          {itensMenu.map(({ nome, icone: Icone }) => {
            const texto = textos[nome];

            return (
              <a
                key={nome}
                href={`#${nome}`}
                aria-current={nome === paginaAtual ? "page" : undefined}
                // No trilho só o ícone aparece: o nome fica no title
                title={recolhida ? texto : undefined}
                onClick={aoEscolher}
              >
                <Icone size={20} aria-hidden="true" />
                <span className="sidebar-texto">{texto}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
/* ===== FIM: sidebar ===== */

export default Sidebar;
