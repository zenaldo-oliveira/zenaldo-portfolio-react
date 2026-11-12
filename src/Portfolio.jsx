import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import ParticleNetworkBackground from "./components/fundo/ParticleNetworkBackground";

import Tecnologias from "./sections/tecnologias/Tecnologias";
import Sobre from "./sections/sobre/Sobre";
import LinhaDoTempo from "./sections/trajetoria/LinhaDoTempo";
import Projetos from "./sections/projetos/Projetos";
import Contato from "./sections/contato/Contato";
import FundoPagina from "./components/fundo/FundoPagina";
import InteractiveVideoBackground from "./components/fundo/InteractiveVideoBackground";
import BarraSuperior from "./components/navegacao/BarraSuperior";
import { useCelular } from "./components/navegacao/useCelular";
import Sidebar from "./components/sidebar/Sidebar";
import LogoLoop from "./components/ui/LogoLoop";

import { videosPorPagina } from "./data/fundos";
import { perfil } from "./data/perfil";
import { useArquivoDisponivel } from "./hooks/useArquivoDisponivel";
import { traducoes } from "./i18n/traducoes";
import "./components/Whatsapp.css";

/* ===== INÍCIO: páginas disponíveis ===== */
// Mesma ordem da sidebar. Habilidades e Certificados ficaram fora da
// navegação, mas os componentes continuam em src/sections/.
const paginas = {
  inicio: Tecnologias,
  sobre: Sobre,
  trajetoria: LinhaDoTempo,
  projetos: Projetos,
  contato: Contato,
};

const paginaInicial = "inicio";

function lerPaginaDoHash() {
  const pagina = window.location.hash.slice(1);
  return pagina in paginas ? pagina : null;
}

// Leva o foco ao título da página, para teclado e leitor de tela continuarem
// a partir do conteúdo
function focarTitulo(main) {
  const titulo = main?.querySelector("h1");
  if (!titulo) return;

  titulo.setAttribute("tabindex", "-1");
  titulo.focus({ preventScroll: true });
}
/* ===== FIM: páginas disponíveis ===== */

function Portfolio() {
  /* ===== INÍCIO: idioma ===== */
  const [idioma, setIdioma] = useState(() => {
    const salvo = localStorage.getItem("idioma");
    return ["pt", "en", "es"].includes(salvo) ? salvo : "pt";
  });

  const textos = traducoes[idioma];

  useEffect(() => {
    localStorage.setItem("idioma", idioma);

    const idiomasHTML = {
      pt: "pt-BR",
      en: "en",
      es: "es",
    };

    document.documentElement.lang = idiomasHTML[idioma];
  }, [idioma]);
  /* ===== FIM: idioma ===== */

  /* ===== INÍCIO: página atual ===== */
  const [paginaAtual, setPaginaAtual] = useState(
    () => lerPaginaDoHash() ?? paginaInicial,
  );
  const mainRef = useRef(null);
  const paginaAnteriorRef = useRef(paginaAtual);
  const curriculoDisponivel = useArquivoDisponivel(
    perfil.curriculo,
    "application/pdf",
  );

  // O hash é a fonte da verdade: links, voltar e avançar disparam hashchange.
  // Hash sem página correspondente mantém a página que já está na tela.
  useEffect(() => {
    function atualizarPagina() {
      const pagina = window.location.hash ? lerPaginaDoHash() : paginaInicial;

      if (pagina) {
        setPaginaAtual(pagina);
      }
    }

    window.addEventListener("hashchange", atualizarPagina);

    return () => {
      window.removeEventListener("hashchange", atualizarPagina);
    };
  }, []);

  // Ao abrir o portfólio (botão Entrar ou atalhos da Entrada), o foco vai ao
  // título da página aberta em vez de se perder no body.
  useEffect(() => {
    focarTitulo(mainRef.current);
  }, []);

  // Ao trocar de página: volta ao topo e leva o foco ao título da nova página.
  useEffect(() => {
    if (paginaAnteriorRef.current === paginaAtual) return;
    paginaAnteriorRef.current = paginaAtual;

    const main = mainRef.current;
    if (!main) return;

    main.scrollTo(0, 0);
    focarTitulo(main);
  }, [paginaAtual]);

  // Mesmo separador do título do index.html ("Zenaldo Oliveira | …")
  useEffect(() => {
    document.title = `${textos[paginaAtual]} | Zenaldo Oliveira`;
  }, [paginaAtual, textos]);

  /* ===== INÍCIO: menu (sidebar) ===== */
  // Um único estado: painel aberto ou fechado, nos dois tamanhos de tela.
  // Ao cruzar o breakpoint, o menu volta fechado (o estado guarda em qual
  // modo foi aberto).
  const celular = useCelular();
  const [menu, setMenu] = useState({ aberto: false, celular });
  const menuAberto = menu.aberto && menu.celular === celular;

  const alternarMenu = useCallback(
    () => setMenu((atual) => ({ aberto: !(atual.aberto && atual.celular === celular), celular })),
    [celular],
  );
  const fecharMenu = useCallback(
    () => setMenu((atual) => (atual.aberto ? { ...atual, aberto: false } : atual)),
    [],
  );

  // Só no celular o painel aberto é sobreposto (modal). No desktop a
  // sidebar aberta ocupa a faixa já reservada no layout: não cobre nada, e
  // a página continua utilizável ao lado dela.
  const menuModal = menuAberto && celular;

  // Trava a rolagem do conteúdo enquanto o painel sobreposto está aberto
  // (index.css)
  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-aberto", menuModal);
    return () => document.documentElement.removeAttribute("data-menu-aberto");
  }, [menuModal]);

  // Com o painel sobreposto aberto, o resto da página fica inerte (foco
  // preso no painel, sem leitura do conteúdo por trás)
  const fundoInerte = menuModal ? true : undefined;
  /* ===== FIM: menu ===== */

  const PaginaAtual = paginas[paginaAtual];
  const videoDaPagina = videosPorPagina[paginaAtual];
  /* ===== FIM: página atual ===== */

  // reducedMotion="user": com prefers-reduced-motion, o motion mantém só a
  // opacidade e remove deslocamentos das animações de entrada.
  return (
    <MotionConfig reducedMotion="user">
      {/* key: cada página confere a própria imagem, sem herdar a anterior */}
      <FundoPagina key={paginaAtual} pagina={paginaAtual} />

      <div className="layout">
        <Sidebar
          textos={textos}
          paginaAtual={paginaAtual}
          celular={celular}
          aberta={menuAberto}
          alternar={alternarMenu}
          fechar={fecharMenu}
        />

        <div className="area-principal" inert={fundoInerte}>
          {/* Vídeo só da página atual (key: troca e recomeça a cada página;
              nunca há dois vídeos carregando ao mesmo tempo) */}
          {/* Fundo interativo exclusivo da página Tecnologias */}
          {paginaAtual === "inicio" ? (
            <ParticleNetworkBackground />
          ) : (
            videoDaPagina && (
              <InteractiveVideoBackground
                key={paginaAtual}
                {...videoDaPagina}
              />
            )
          )}

          <BarraSuperior
            textos={textos}
            idioma={idioma}
            setIdioma={setIdioma}
            celular={celular}
            menuAberto={menuAberto}
            alternarMenu={alternarMenu}
          />

          {/* ===== INÍCIO: conteúdo da página ===== */}
          <main ref={mainRef}>
            <PaginaAtual
              idioma={idioma}
              curriculoDisponivel={curriculoDisponivel}
            />
          </main>
          {/* ===== FIM: conteúdo da página ===== */}

          {/* Faixa de tecnologias (LogoLoop): o componente é provisório e ainda
              não renderiza nada; a implementação será incluída depois. Até lá,
              a faixa atual da página Tecnologias continua ativa. */}
          <LogoLoop />

          <footer className="footer">
            <p>Desenvolvido por Zenaldo Oliveira</p>
          </footer>
        </div>

        {/* ===== INÍCIO: WhatsApp flutuante ===== */}
        <a
          className="whatsapp-fixo"
          inert={fundoInerte}
          href="https://wa.me/5565974009820"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar comigo pelo WhatsApp"
        >
          <img src="/whatsapp.png" alt="" width="32" height="32" />
        </a>
        {/* ===== FIM: WhatsApp flutuante ===== */}
      </div>
    </MotionConfig>
  );
}

export default Portfolio;
