import { useSyncExternalStore } from "react";

/* ===== INÍCIO: modo celular ===== */
// Mesmo limite usado nos CSS da sidebar e da barra superior: até 768px a
// sidebar vira um painel sobreposto aberto pelo botão da barra superior.
export const CONSULTA_CELULAR = "(max-width: 768px)";

function assinar(avisar) {
  const consulta = window.matchMedia(CONSULTA_CELULAR);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

const ler = () => window.matchMedia(CONSULTA_CELULAR).matches;

export function useCelular() {
  return useSyncExternalStore(assinar, ler, () => false);
}
/* ===== FIM: modo celular ===== */
