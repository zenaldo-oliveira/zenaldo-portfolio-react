import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";

import Tecnologias from "./sections/tecnologias/Tecnologias";
import Sobre from "./sections/sobre/Sobre";
import LinhaDoTempo from "./sections/trajetoria/LinhaDoTempo";
import Projetos from "./sections/projetos/Projetos";
import Contato from "./sections/contato/Contato";
import FundoPagina from "./components/fundo/FundoPagina";
import Sidebar from "./components/sidebar/Sidebar";
import LogoLoop from "./components/ui/LogoLoop";

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

  // Ao trocar de página: volta ao topo e leva o foco ao título da nova página,
  // para teclado e leitor de tela continuarem a partir do conteúdo.
  useEffect(() => {
    if (paginaAnteriorRef.current === paginaAtual) return;
    paginaAnteriorRef.current = paginaAtual;

    const main = mainRef.current;
    if (!main) return;

    main.scrollTo(0, 0);

    const titulo = main.querySelector("h1");
    if (titulo) {
      titulo.setAttribute("tabindex", "-1");
      titulo.focus({ preventScroll: true });
    }
  }, [paginaAtual]);

  useEffect(() => {
    document.title = `${textos[paginaAtual]} · Zenaldo Oliveira`;
  }, [paginaAtual, textos]);

  const PaginaAtual = paginas[paginaAtual];
  // O currículo saiu do menu; a verificação do PDF segue para o botão em Sobre
  const paginasDisponiveis = Object.keys(paginas);
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
          paginasDisponiveis={paginasDisponiveis}
          idioma={idioma}
          setIdioma={setIdioma}
        />

        <div className="area-principal">
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
