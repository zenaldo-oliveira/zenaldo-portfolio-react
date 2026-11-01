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

// Rodapé dos mini cards da grade: "Ver site", "GitHub" e, em back-end/full
// stack com documentação, "API". "GitHub" só quando o repositório é do
// github.com; outro endereço recebe o rótulo genérico de código.
function linksDaGrade(projeto, t) {
  const { repositorio, demonstracao, documentacao } = projeto.links ?? {};
  const permiteApi = CATEGORIAS_COM_API.includes(projeto.categoria);
  const ehGithub = /^https:\/\/github\.com\//.test(repositorio ?? "");

  return [
    { url: demonstracao, texto: t.demonstracao, curto: t.verSite, Icone: ExternalLink },
    { url: repositorio, texto: t.repositorio, curto: ehGithub ? "GitHub" : t.curtoCodigo, Icone: FolderGit2 },
    permiteApi && { url: documentacao, texto: t.documentacao, curto: t.curtoApi, Icone: BookOpen },
  ].filter((link) => link && link.url);
}

// compacto: links discretos no cartão; senão, botões (diálogo de detalhes)
// ocultarSemLinks: não mostra o aviso de "não publicados" (usado no destaque)
// grade: rótulos e ordem dos mini cards (Ver site, GitHub, API)
function LinksProjeto({
  projeto,
  nome,
  compacto = false,
  ocultarSemLinks = false,
  grade = false,
  t,
}) {
  const links = grade ? linksDaGrade(projeto, t) : linksDisponiveis(projeto, t);

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
