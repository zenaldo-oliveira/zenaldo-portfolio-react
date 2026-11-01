import "./Entrada.css";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SpinningText } from "@/components/ui/spinning-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

function Entrada({ onEntrar }) {
  // Atalhos: definem o hash antes de abrir o portfólio, que já lê o hash ao
  // montar e abre direto na página escolhida (mesma navegação da sidebar).
  function irPara(evento, pagina) {
    evento.preventDefault();
    window.location.hash = pagina;
    onEntrar();
  }

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
          Desenvolvedor Full Stack Júnior · React · Next.js · JavaScript ·
          Node.js
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
            oportunidades como desenvolvedor Full Stack Júnior.
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

        {/* Mesmo arredondamento em pílula de antes */}
        <ShimmerButton
          className="entrada-botao"
          tamanho="grande"
          borderRadius="999px"
          type="button"
          onClick={onEntrar}
        >
          Entrar no portfólio →
        </ShimmerButton>

        {/* ===== INÍCIO: atalhos ===== */}
        <nav className="entrada-atalhos" aria-label="Ir direto para">
          <span aria-hidden="true">Ir direto para:</span>
          <a href="#projetos" onClick={(evento) => irPara(evento, "projetos")}>
            Projetos →
          </a>
          <a href="#contato" onClick={(evento) => irPara(evento, "contato")}>
            Contato →
          </a>
        </nav>
        {/* ===== FIM: atalhos ===== */}
      </div>
      {/* ===== FIM: conteúdo da entrada ===== */}
    </main>
  );
}

export default Entrada;
