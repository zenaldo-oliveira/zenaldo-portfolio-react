import { ImageOff } from "lucide-react";

import { traduzir } from "@/i18n/traduzir";

/* ===== INÍCIO: imagem do projeto ===== */
// Sem captura cadastrada, mostra um espaço neutro em vez de uma imagem inventada.
// Estilos em Projetos.css (.projeto-imagem), usados pela grade e pelo destaque.
function ImagemProjeto({ imagem, idioma, prioridade, t }) {
  if (!imagem) {
    return (
      <div className="projeto-imagem projeto-imagem-vazia">
        <ImageOff size={24} aria-hidden="true" />
        <span>{t.imagemPendente}</span>
      </div>
    );
  }

  const conteudo = (
    <div className="projeto-imagem">
      <img
        src={imagem.src}
        alt={traduzir(imagem.alt, idioma)}
        width={imagem.largura}
        height={imagem.altura}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </div>
  );

  // Legenda opcional (ex.: captura com dados de demonstração)
  if (!imagem.legenda) return conteudo;

  return (
    <figure className="projeto-figura">
      {conteudo}
      <figcaption className="projeto-legenda">
        {traduzir(imagem.legenda, idioma)}
      </figcaption>
    </figure>
  );
}
/* ===== FIM: imagem do projeto ===== */

export default ImagemProjeto;
