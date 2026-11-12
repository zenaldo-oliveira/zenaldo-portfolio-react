import { useCallback, useSyncExternalStore } from "react";

/* ===== INÍCIO: media query reativa ===== */
// Lê window.matchMedia e re-renderiza quando o resultado muda. Usado quando o
// componente precisa trocar de estrutura (não só de estilo) num breakpoint.
export function useMediaQuery(consulta) {
  const assinar = useCallback(
    (avisar) => {
      const lista = window.matchMedia(consulta);
      lista.addEventListener("change", avisar);
      return () => lista.removeEventListener("change", avisar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
/* ===== FIM: media query reativa ===== */
