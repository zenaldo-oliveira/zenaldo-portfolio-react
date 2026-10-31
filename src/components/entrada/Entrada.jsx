import "./Entrada.css";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SpinningText } from "@/components/ui/spinning-text";

function Entrada({ onEntrar }) {
  return (
    <main className="entrada">
      {/* ===== INÍCIO: vídeo de fundo ===== */}
      <video
        className="entrada-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/fundo-tecnologia.jpg"
        aria-hidden="true"
      >
        <source src="/fundo-entrada.mp4" type="video/mp4" />
      </video>
      {/* ===== FIM: vídeo de fundo ===== */}

      {/* ===== INÍCIO: círculo entre os dedos ===== */}
      <div className="entrada-circulo" aria-hidden="true">
        <SpinningText duration={20} radius={10}>
          React • JavaScript • Next.js •
        </SpinningText>
      </div>
      {/* ===== FIM: círculo entre os dedos ===== */}

      {/* ===== INÍCIO: conteúdo da entrada ===== */}
      <div className="entrada-conteudo">
        <h1>
          <TypingAnimation className="entrada-nome" typeSpeed={90} loop={false}>
            Zenaldo Oliveira
          </TypingAnimation>
        </h1>

        <p className="entrada-subtitulo">
          Desenvolvedor Front-end · React · Next.js · JavaScript
        </p>

        <div className="entrada-descricao">
          <p>Bem-vindo ao meu portfólio!</p>

          <p>
            Sou Zenaldo Oliveira, desenvolvedor em transição de carreira.
            Construo interfaces web com React, Next.js e JavaScript, com foco em
            responsividade e organização de componentes.
          </p>

          <p>
            Explore meus projetos, conheça as tecnologias que utilizo e
            acompanhe minha evolução no desenvolvimento web. Estou aberto a
            oportunidades como desenvolvedor Front-end Júnior.
          </p>
        </div>

        {/* ===== INÍCIO: redes sociais ===== */}
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
        {/* ===== FIM: redes sociais ===== */}

        <button className="entrada-botao" type="button" onClick={onEntrar}>
          Entrar no portfólio →
        </button>
      </div>
      {/* ===== FIM: conteúdo da entrada ===== */}
    </main>
  );
}

export default Entrada;
