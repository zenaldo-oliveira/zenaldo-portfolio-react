import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/* ===== INÍCIO: visual de botão do shadcn em links ===== */
// Altura de 40px para toque confortável no celular
export function classeBotao(variante = "default", className) {
  return cn(buttonVariants({ variant: variante, size: "lg" }), "h-10 px-4", className);
}

// Marca o link para receber o anel de foco do botão, e não o contorno padrão
export const propsLinkBotao = { "data-slot": "button" };
/* ===== FIM: visual de botão do shadcn em links ===== */
