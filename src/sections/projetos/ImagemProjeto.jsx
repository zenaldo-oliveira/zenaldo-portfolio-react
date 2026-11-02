import { ImageOff } from "lucide-react";

import { traduzir } from "@/i18n/traduzir";

import { useInclinacao } from "./useInclinacao";

// Tamanho real dos PNG/WebP das molduras (public/projetos/dispositivos/) e
// proporção da composição: monitor + espaço + celular a 75% da altura.
const MONITOR = { largura: 748, altura: 554 };
const CELULAR = { largura: 296, altura: 610 };
const PROPORCAO_COMPOSICAO = 978 / 554;

/* ===== INÍCIO: composição monitor + celular ===== */
// Duas camadas independentes (arquivos separados, com transparência): o
// celular fica um pouco à frente (translateZ) e, ao inclinar, se desloca
// mais que o monitor. A descrição vale para a composição inteira.
function Composicao({ dispositivos, idioma, prioridade }) {
  const carregamento = prioridade ? "eager" : "lazy";

  return (
    <div
      className="projeto-composicao"
      role="img"
      aria-label={traduzir(dispositivos.alt, idioma)}
    >
      <img
        className="projeto-dispositivo projeto-dispositivo-monitor"
        src={dispositivos.monitor}
        alt=""
        width={MONITOR.largura}
        height={MONITOR.altura}
        loading={carregamento}
        decoding="async"
        draggable={false}
      />
      <img
        className="projeto-dispositivo projeto-dispositivo-celular"
        src={dispositivos.celular}
        alt=""
        width={CELULAR.largura}
        height={CELULAR.altura}
        loading={carregamento}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
/* ===== FIM: composição monitor + celular ===== */

/* ===== INÍCIO: imagem do projeto ===== */
// Sem captura cadastrada, mostra um espaço neutro em vez de uma imagem inventada.
// Estilos em Projetos.css (.projeto-imagem), usados pelo carrossel e pelo diálogo.
// ajuste "conter" (mockups): a imagem aparece inteira, sem recorte.
// palco (cards da roda): imagem inteira sobre o mesmo fundo do card,
// inclinando em 3D com o mouse (só a camada da imagem se move). Com
// "dispositivos", o palco mostra a composição monitor + celular.
function ImagemProjeto({
  imagem,
  idioma,
  prioridade,
  palco = false,
  dispositivos,
  t,
}) {
  const eventosInclinacao = useInclinacao(palco);

  if (!imagem) {
    return (
      <div className="projeto-imagem projeto-imagem-vazia">
        <ImageOff size={24} aria-hidden="true" />
        <span>{t.imagemPendente}</span>
      </div>
    );
  }

  const img = (
    <img
      src={imagem.src}
      alt={traduzir(imagem.alt, idioma)}
      width={imagem.largura}
      height={imagem.altura}
      loading={prioridade ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );

  const legenda = imagem.legenda && (
    <figcaption className="projeto-legenda">
      {traduzir(imagem.legenda, idioma)}
    </figcaption>
  );

  // Palco: com legenda, ele próprio é o <figure>; a legenda fica sobre a
  // base da imagem, fora da camada que inclina (não se move)
  if (palco) {
    const Elemento = legenda ? "figure" : "div";
    const comDispositivos = Boolean(dispositivos?.monitor && dispositivos?.celular);
    return (
      <Elemento
        className="projeto-imagem projeto-palco"
        data-composicao={comDispositivos ? "" : undefined}
        style={{
          // Proporção real do conteúdo
          "--proporcao": comDispositivos
            ? PROPORCAO_COMPOSICAO
            : imagem.largura / imagem.altura,
        }}
        {...eventosInclinacao}
      >
        <div className="projeto-palco-camada">
          {comDispositivos ? (
            <Composicao
              dispositivos={dispositivos}
              idioma={idioma}
              prioridade={prioridade}
            />
          ) : (
            img
          )}
        </div>
        {legenda}
      </Elemento>
    );
  }

  const conteudo = (
    <div className="projeto-imagem" data-ajuste={imagem.ajuste}>
      {img}
    </div>
  );

  // Legenda opcional (ex.: captura com dados de demonstração)
  if (!imagem.legenda) return conteudo;

  return (
    <figure className="projeto-figura">
      {conteudo}
      {legenda}
    </figure>
  );
}
/* ===== FIM: imagem do projeto ===== */

export default ImagemProjeto;
