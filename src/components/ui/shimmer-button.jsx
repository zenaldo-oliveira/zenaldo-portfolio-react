import { cn } from "@/lib/utils";

import "./shimmer-button.css";

/* ===== INÍCIO: ShimmerButton (Magic UI, adaptado) ===== */
// Origem: registro oficial do Magic UI (magicui.design/r/shimmer-button).
// Mantém a estrutura do original — faísca girando atrás de um fundo recortado
// (--cut), destaque interno e fundo — com estas adaptações:
// - JSX e ref como prop (React 19);
// - elemento semântico correto: <a> com href, <button> nos demais casos
//   (nunca um dentro do outro). Também funciona no `render` do Base UI;
// - variantes do portfólio (principal, secundária, destrutiva) e tamanhos;
// - brilho discreto na cor de destaque, cores por tokens (temas claro/escuro);
// - disabled/carregando param o brilho e bloqueiam novas ações (carregando
//   mantém o foco: usa aria-disabled em vez de disabled);
// - camadas decorativas sem clique (pointer-events: none) e abaixo do texto;
// - sem animação com prefers-reduced-motion (estilos em shimmer-button.css).

/**
 * @param {{
 *   href?: string,
 *   variante?: "principal" | "secundaria" | "destrutiva",
 *   tamanho?: "padrao" | "pequeno" | "grande" | "icone" | "icone-pequeno",
 *   carregando?: boolean,
 *   disabled?: boolean,
 *   shimmerColor?: string,
 *   shimmerSize?: string,
 *   shimmerDuration?: string,
 *   borderRadius?: string,
 *   background?: string,
 *   className?: string,
 *   ref?: import("react").Ref<HTMLElement>,
 *   children?: import("react").ReactNode,
 * } & Record<string, unknown>} props
 */
export function ShimmerButton({
  href,
  variante = "principal",
  tamanho = "padrao",
  carregando = false,
  disabled = false,
  shimmerColor,
  shimmerSize,
  shimmerDuration,
  borderRadius,
  background,
  className,
  style,
  type,
  onClick,
  ref,
  children,
  ...props
}) {
  const inativo = disabled || carregando;

  // Só sobrescreve o que foi pedido; o padrão de cada variante vem do CSS
  const variaveis = {
    ...(shimmerColor && { "--shimmer-color": shimmerColor }),
    ...(shimmerSize && { "--cut": shimmerSize }),
    ...(shimmerDuration && { "--speed": shimmerDuration }),
    ...(borderRadius && { "--radius-botao": borderRadius }),
    ...(background && { "--bg": background }),
    ...style,
  };

  const comum = {
    ref,
    "data-slot": "shimmer-button",
    "data-variante": variante,
    "data-tamanho": tamanho,
    "data-inativo": inativo ? "" : undefined,
    "aria-busy": carregando || undefined,
    className: cn("shimmer-button", className),
    style: variaveis,
    ...props,
  };

  const conteudo = (
    <>
      {/* faísca: gira atrás do fundo e aparece só na borda recortada */}
      <span className="shimmer-button-faiscas" aria-hidden="true">
        <span className="shimmer-button-faisca">
          <span className="shimmer-button-faisca-giro" />
        </span>
      </span>

      {/* fundo, recuado --cut das bordas */}
      <span className="shimmer-button-fundo" aria-hidden="true" />

      {/* destaque interno (abaixo do texto) */}
      <span className="shimmer-button-destaque" aria-hidden="true" />

      <span className="shimmer-button-conteudo">{children}</span>
    </>
  );

  // Link: sem href enquanto inativo, para não navegar nem receber clique
  if (href !== undefined) {
    function aoClicarLink(evento) {
      if (inativo) {
        evento.preventDefault();
        return;
      }
      onClick?.(evento);
    }

    return (
      <a
        {...comum}
        href={inativo ? undefined : href}
        role={inativo ? "link" : undefined}
        aria-disabled={inativo || undefined}
        onClick={aoClicarLink}
      >
        {conteudo}
      </a>
    );
  }

  // Carregando: aria-disabled + clique bloqueado, sem `disabled` nativo — o
  // botão continua com o foco (o navegador tira o foco de um botão
  // desabilitado). Também barra o envio implícito de formulário (Enter), que
  // dispara este mesmo clique.
  function aoClicarBotao(evento) {
    if (carregando) {
      evento.preventDefault();
      return;
    }
    onClick?.(evento);
  }

  return (
    <button
      {...comum}
      type={type ?? "button"}
      disabled={disabled}
      aria-disabled={carregando || undefined}
      onClick={aoClicarBotao}
    >
      {conteudo}
    </button>
  );
}
/* ===== FIM: ShimmerButton ===== */

export default ShimmerButton;
