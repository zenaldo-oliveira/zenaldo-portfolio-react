import "./Entrada.css";

import HyperspaceBackground from "./HyperspaceBackground";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SpinningText } from "@/components/ui/spinning-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function Entrada({ onEntrar }) {
  return (
    <main className="entrada">
      {/* ===== IMAGEM HUMANO + IA ===== */}
      <div className="entrada-imagem" aria-hidden="true" />

      {/* ===== FUNDO ESPACIAL INTERATIVO ===== */}
      <div className="entrada-fundo" aria-hidden="true">
        <HyperspaceBackground />
      </div>

      {/* ===== MÁSCARA DE CONTRASTE ===== */}
      <div className="entrada-mascara" aria-hidden="true" />

      {/* ===== CÍRCULO ANIMADO ===== */}
      <div className="entrada-circulo" aria-hidden="true">
        <SpinningText duration={20} radius={15}>
          React • JavaScript • Next.js •
        </SpinningText>
      </div>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="entrada-conteudo">
        <h1>
          <TypingAnimation className="entrada-nome" typeSpeed={90} loop={false}>
            Zenaldo Oliveira
          </TypingAnimation>
        </h1>

        <p className="entrada-subtitulo">
          Desenvolvedor Full Stack · React · Next.js · JavaScript · Node.js
        </p>

        <div className="entrada-descricao">
          <p>Bem-vindo ao meu portfólio!</p>

          <p>
            Sou Zenaldo Oliveira, desenvolvedor em transição de carreira.
            Desenvolvo interfaces e aplicações web com React, Next.js,
            JavaScript e Node.js, com foco em organização, responsividade e
            integração com APIs.
          </p>

          <p>
            Explore meus projetos, conheça as tecnologias que utilizo e
            acompanhe minha evolução no desenvolvimento web. Estou aberto a
            oportunidades profissionais e projetos de desenvolvimento.
          </p>
        </div>

        {/* ===== REDES SOCIAIS ===== */}
        <div className="entrada-redes">
          <a
            className="entrada-linkedin"
            href="https://www.linkedin.com/in/zenaldo-pereira-oliveira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/linkedin.png" alt="" width="20" height="20" />
            LinkedIn
          </a>

          <a
            className="entrada-github"
            href="https://github.com/zenaldo-oliveira"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github.png" alt="" width="20" height="20" />
            GitHub
          </a>
        </div>

        {/* ===== BOTÃO PRINCIPAL ===== */}
        <ShimmerButton
          className="entrada-botao"
          tamanho="grande"
          borderRadius="999px"
          type="button"
          onClick={onEntrar}
        >
          Entrar no portfólio
        </ShimmerButton>
      </div>
    </main>
  );
}

export default Entrada;
