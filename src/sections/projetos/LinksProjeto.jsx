import { BookOpen, ExternalLink, FolderGit2 } from "lucide-react";

import { ShimmerButton } from "@/components/ui/shimmer-button";

/* ===== INÍCIO: links reais do projeto ===== */
// Documentação da API só faz sentido em projetos com back-end
const CATEGORIAS_COM_API = ["backend", "fullstack"];

function linksDisponiveis(projeto, t) {
  const { repositorio, demonstracao, documentacao } = projeto.links ?? {};
  const permiteApi = CATEGORIAS_COM_API.includes(projeto.categoria);

  return [
    { url: repositorio, texto: t.repositorio, curto: t.curtoCodigo, Icone: FolderGit2, variante: "principal" },
    { url: demonstracao, texto: t.demonstracao, curto: t.curtoDemo, Icone: ExternalLink, variante: "secundaria" },
    permiteApi && { url: documentacao, texto: t.documentacao, curto: t.curtoApi, Icone: BookOpen, variante: "secundaria" },
  ].filter((link) => link && link.url);
}

// Ações do cartão no carrossel: "Demo" e "GitHub", só quando cadastrados.
// "GitHub" só quando o repositório é do github.com; outro endereço recebe o
// rótulo genérico de código. A documentação da API fica no diálogo de detalhes.
function linksDoCarrossel(projeto, t) {
  const { repositorio, demonstracao } = projeto.links ?? {};
  const ehGithub = /^https:\/\/github\.com\//.test(repositorio ?? "");

  return [
    { url: demonstracao, texto: t.demonstracao, curto: t.curtoDemo, Icone: ExternalLink },
    { url: repositorio, texto: t.repositorio, curto: ehGithub ? "GitHub" : t.curtoCodigo, Icone: FolderGit2 },
  ].filter((link) => link.url);
}

// compacto: links discretos no cartão; senão, botões (diálogo de detalhes)
// ocultarSemLinks: não mostra o aviso de "não publicados" (usado no destaque)
// carrossel: rótulos e ordem do cartão do carrossel (Demo, GitHub)
function LinksProjeto({
  projeto,
  nome,
  compacto = false,
  ocultarSemLinks = false,
  carrossel = false,
  t,
}) {
  const links = carrossel
    ? linksDoCarrossel(projeto, t)
    : linksDisponiveis(projeto, t);

  if (links.length === 0) {
    if (ocultarSemLinks) return null;
    return <p className="projeto-links-pendentes">{t.linksPendentes}</p>;
  }

  const contexto = (
    <span className="sr-only">
      {" "}
      — {nome} ({t.novaAba})
    </span>
  );

  // Compacto: rótulo curto visível (Código, Demo, API) e nome completo
  // para leitores de tela (ex.: "Documentação da API — Projeto")
  if (compacto) {
    return (
      <ul className="projeto-links">
        {links.map(({ url, texto, curto, Icone }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer" title={texto}>
              <Icone size={14} aria-hidden="true" />
              <span aria-hidden="true">{curto}</span>
              <span className="sr-only">{texto}</span>
              {contexto}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="pagina-acoes">
      {links.map(({ url, texto, Icone, variante }) => (
        <ShimmerButton
          key={url}
          variante={variante}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icone aria-hidden="true" />
          {texto}
          {contexto}
        </ShimmerButton>
      ))}
    </div>
  );
}
/* ===== FIM: links reais do projeto ===== */

export default LinksProjeto;
