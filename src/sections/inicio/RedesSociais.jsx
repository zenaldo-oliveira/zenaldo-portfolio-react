import { Mail } from "lucide-react";

function RedesSociais() {
  return (
    <nav className="inicio-redes" aria-label="Redes sociais e contato">
      <a
        className="rede-email"
        href="mailto:zenaldo.221@hotmail.com"
        aria-label="Enviar e-mail"
      >
        <Mail size={28} aria-hidden="true" />
      </a>

      <a
        className="rede-linkedin"
        href="https://www.linkedin.com/in/zenaldo-pereira-oliveira/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img src="/linkedin.png" alt="" width="28" height="28" />
      </a>

      <a
        className="rede-github"
        href="https://github.com/zenaldo-oliveira"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <img src="/github.png" alt="" width="28" height="28" />
      </a>

      <a
        className="rede-instagram"
        href="https://www.instagram.com/SEU_USUARIO/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img src="/instagram.png" alt="" width="28" height="28" />
      </a>
    </nav>
  );
}

export default RedesSociais;
