import {
  AppWindow,
  Code,
  Database,
  Globe,
  Layers,
  LayoutTemplate,
  Monitor,
  Server,
} from "lucide-react";

/* ===== INÍCIO: ícone do projeto ===== */
// Chaves aceitas no campo "icone" de src/data/projetos.js
export const ICONES_PROJETO = {
  monitor: Monitor,
  janela: AppWindow,
  layout: LayoutTemplate,
  codigo: Code,
  servidor: Server,
  banco: Database,
  web: Globe,
  camadas: Layers,
};

// Sem ícone cadastrado, usa um ícone pela categoria
const ICONE_POR_CATEGORIA = {
  frontend: "monitor",
  backend: "servidor",
  fullstack: "camadas",
};

// Decorativo: o nome do projeto ao lado já identifica o cartão
function IconeProjeto({ icone, categoria }) {
  if (icone?.startsWith("/")) {
    return (
      <span className="projeto-icone" aria-hidden="true">
        <img src={icone} alt="" width="16" height="16" />
      </span>
    );
  }

  const Icone =
    ICONES_PROJETO[icone] ?? ICONES_PROJETO[ICONE_POR_CATEGORIA[categoria]] ?? Code;

  return (
    <span className="projeto-icone" aria-hidden="true">
      <Icone size={15} />
    </span>
  );
}
/* ===== FIM: ícone do projeto ===== */

export default IconeProjeto;
