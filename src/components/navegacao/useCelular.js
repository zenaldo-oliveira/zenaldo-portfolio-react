import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ===== INÍCIO: modo celular ===== */
// Mesmo limite dos CSS (--bp-celular, 768px): abaixo dele a navegação vira
// um menu hambúrguer na barra superior, e projetos e tecnologias usam as
// versões estáticas em lista/grade.
export const CONSULTA_CELULAR = "(max-width: 768px)";

export function useCelular() {
  return useMediaQuery(CONSULTA_CELULAR);
}
/* ===== FIM: modo celular ===== */
