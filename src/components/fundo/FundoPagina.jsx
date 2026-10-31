import { useRef } from "react";

import { fundosPorPagina } from "@/data/fundos";
import { useArquivoDisponivel } from "@/hooks/useArquivoDisponivel";
import { useParallaxFundo } from "@/hooks/useParallaxFundo";

import "./FundoPagina.css";

/* ===== INÍCIO: fundo da página atual ===== */
// Camada fixa atrás de toda a interface (inclusive da sidebar): não rola com
// o conteúdo. A imagem só é aplicada se o arquivo existir e for uma imagem;
// senão fica var(--fundo). A película (::after) garante a legibilidade.
// Com imagem, a camada interna acompanha o mouse em até 10px (parallax),
// só no desktop e sem reduced motion.
function FundoPagina({ pagina }) {
  const fundo = fundosPorPagina[pagina];
  const temImagem = useArquivoDisponivel(fundo?.imagem, "image/");
  const refImagem = useRef(null);

  useParallaxFundo(refImagem, temImagem);

  const estilo = temImagem
    ? {
        backgroundImage: `url("${fundo.imagem}")`,
        backgroundPosition: fundo.posicao ?? "center",
      }
    : undefined;

  return (
    <div
      className="fundo-pagina"
      data-pagina={pagina}
      data-imagem={temImagem ? "sim" : "nao"}
      aria-hidden="true"
    >
      {temImagem && (
        <div ref={refImagem} className="fundo-pagina-imagem" style={estilo} />
      )}
    </div>
  );
}
/* ===== FIM: fundo da página atual ===== */

export default FundoPagina;
