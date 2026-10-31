import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { FILTRO_TODAS } from "./filtro";

/* ===== INÍCIO: filtro por tecnologia ===== */
// ToggleGroup de seleção única: setas movem o foco, Enter/Espaço selecionam.
// Desmarcar a opção ativa volta para "Todas".
function FiltroTecnologias({ opcoes, filtro, onFiltrar, t }) {
  const classeOpcao = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "filtro-opcao",
  );

  return (
    <ToggleGroup
      className="filtro-tecnologias"
      aria-label={t.filtroRotulo}
      value={[filtro]}
      onValueChange={(valores) => onFiltrar(valores[0] ?? FILTRO_TODAS)}
    >
      <Toggle className={classeOpcao} value={FILTRO_TODAS}>
        {t.filtroTodas}
      </Toggle>

      {opcoes.map((tecnologia) => (
        <Toggle className={classeOpcao} value={tecnologia.id} key={tecnologia.id}>
          {tecnologia.nome}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
/* ===== FIM: filtro por tecnologia ===== */

export default FiltroTecnologias;
