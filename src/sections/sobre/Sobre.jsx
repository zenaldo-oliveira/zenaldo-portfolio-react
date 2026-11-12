import { Revelar } from "@/components/pagina/animacao";
import CabecalhoPagina from "@/components/pagina/CabecalhoPagina";
import { ShimmerButton } from "@/components/ui/shimmer-button";

import { traducoesSobre } from "./traducoes";
import "./Sobre.css";

/* ===== INÍCIO: página Sobre mim ===== */
// Versão enxuta: título, um parágrafo curto e o botão de contato. Os blocos
// detalhados saíram desta página e continuam onde já têm espaço próprio:
// experiência e formação na Linha do Tempo, tecnologias na faixa do Início,
// localização no Contato. Os componentes antigos (ExperienciaFormacao,
// GruposTecnologias, InteligenciaArtificial, ObjetivoProfissional) e os
// textos deles (traducoes.js) ficam no projeto, fora da página.
function Sobre({ idioma }) {
  const t = traducoesSobre[idioma];

  return (
    <section className="pagina sobre" aria-labelledby="sobre-titulo">
      <CabecalhoPagina id="sobre-titulo" apoio={t.apoio} titulo={t.titulo} />

      <Revelar className="sobre-resumo" atraso={0.06}>
        <p className="sobre-texto">{t.resumo}</p>
        {/* Navegação existente: o hash troca a página (Portfolio) */}
        <ShimmerButton href="#contato" tamanho="grande">
          {t.contato}
        </ShimmerButton>
      </Revelar>
    </section>
  );
}
/* ===== FIM: página Sobre mim ===== */

export default Sobre;
