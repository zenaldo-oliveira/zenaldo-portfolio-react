import { useEffect, useState } from "react";
function Apresentacao() {
  const nomeCompleto = "Zenaldo Pereira de Oliveira";
  const [nomeDigitado, setNomeDigitado] = useState(nomeCompleto);

  useEffect(() => {
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let quantidade = 0;

    const intervalo = window.setInterval(() => {
      quantidade = reduzirMovimento ? nomeCompleto.length : quantidade + 1;

      setNomeDigitado(nomeCompleto.slice(0, quantidade));

      if (quantidade >= nomeCompleto.length) {
        window.clearInterval(intervalo);
      }
    }, 90);

    return () => window.clearInterval(intervalo);
  }, []);
  return (
    <div className="inicio-apresentacao">
      <h1 className="inicio-nome" aria-label={nomeCompleto}>
        <span className="inicio-nome-digitado" aria-hidden="true">
          {nomeDigitado}
        </span>
      </h1>

      <p className="inicio-profissao">
        Desenvolvimento web com React e JavaScript.
      </p>

      <div className="inicio-acoes">
        <a className="inicio-botao-principal" href="#projetos">
          Ver projetos
        </a>

        <a
          className="inicio-botao-secundario"
          href="/curriculo.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir currículo
        </a>
      </div>

      <p className="inicio-local">Cuiabá, MT · Brasil</p>
    </div>
  );
}

export default Apresentacao;
