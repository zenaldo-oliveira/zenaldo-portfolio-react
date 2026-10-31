import { Badge } from "@/components/ui/badge";

/* ===== INÍCIO: lista de etiquetas ===== */
// limite (opcional): mostra só as primeiras etiquetas e um "+N" com as demais
// (nomes no title e texto completo para leitores de tela via rotuloRestantes).
function ListaEtiquetas({ itens, rotulo, limite, rotuloRestantes }) {
  const visiveis = limite ? itens.slice(0, limite) : itens;
  const restantes = itens.slice(visiveis.length);

  return (
    <ul className="etiquetas" aria-label={rotulo}>
      {visiveis.map((item) => (
        <li key={item}>
          <Badge variant="outline" className="etiqueta">
            {item}
          </Badge>
        </li>
      ))}

      {restantes.length > 0 && (
        <li>
          <Badge
            variant="outline"
            className="etiqueta etiqueta-restantes"
            title={restantes.join(", ")}
          >
            <span aria-hidden="true">+{restantes.length}</span>
            <span className="sr-only">
              {rotuloRestantes?.(restantes.length, restantes.join(", ")) ??
                restantes.join(", ")}
            </span>
          </Badge>
        </li>
      )}
    </ul>
  );
}
/* ===== FIM: lista de etiquetas ===== */

export default ListaEtiquetas;
