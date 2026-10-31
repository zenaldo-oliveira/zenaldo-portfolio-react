import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { CATEGORIAS, CATEGORIA_TODOS } from "./filtro";

/* ===== INÍCIO: filtro por categoria ===== */
// Seleção única, com o total de projetos de cada categoria.
// Desmarcar a opção ativa volta para "Todos".
function FiltroCategorias({ categoria, contagem, onFiltrar, t }) {
  const classeOpcao = cn(
    buttonVariants({ variant: "ghost", size: "lg" }),
    "categoria-opcao",
  );

  return (
    <ToggleGroup
      className="filtro-categorias"
      aria-label={t.categoriaRotulo}
      value={[categoria]}
      onValueChange={(valores) => onFiltrar(valores[0] ?? CATEGORIA_TODOS)}
    >
      {[CATEGORIA_TODOS, ...CATEGORIAS].map((valor) => {
        const nome = t.categorias[valor];
        const total = contagem[valor];

        return (
          <Toggle
            key={valor}
            className={classeOpcao}
            value={valor}
            aria-label={t.totalCategoria(nome, total)}
          >
            {nome}
            <span className="categoria-total" aria-hidden="true">
              {total}
            </span>
          </Toggle>
        );
      })}
    </ToggleGroup>
  );
}
/* ===== FIM: filtro por categoria ===== */

export default FiltroCategorias;
