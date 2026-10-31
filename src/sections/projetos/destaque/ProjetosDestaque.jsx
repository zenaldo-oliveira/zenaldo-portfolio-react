import { Revelar } from "@/components/pagina/animacao";

import CartaoDestaque from "./CartaoDestaque";
import DestaqueCarousel from "./DestaqueCarousel";
import "./Destaque.css";

// Com um único destaque, o cartão fica estático (sem carrossel)
const MINIMO_PARA_CARROSSEL = 2;
const MAXIMO_DE_DESTAQUES = 15;

/* ===== INÍCIO: seção de projetos em destaque ===== */
// Usa os projetos marcados com emDestaque: true em src/data/projetos.js,
// na ordem do cadastro. Eles continuam também na grade completa abaixo.
function ProjetosDestaque({ projetos, idioma, t }) {
  const destaques = projetos
    .filter((projeto) => projeto.emDestaque)
    .slice(0, MAXIMO_DE_DESTAQUES);

  if (destaques.length === 0) return null;

  return (
    <Revelar atraso={0.05}>
      <section className="pagina-secao destaque" aria-labelledby="destaque-titulo">
        <h2 id="destaque-titulo">{t.destaqueTitulo}</h2>

        {destaques.length >= MINIMO_PARA_CARROSSEL ? (
          <DestaqueCarousel projetos={destaques} idioma={idioma} t={t} />
        ) : (
          <CartaoDestaque
            projeto={destaques[0]}
            idioma={idioma}
            prioridade
            t={t}
          />
        )}
      </section>
    </Revelar>
  );
}
/* ===== FIM: seção de projetos em destaque ===== */

export default ProjetosDestaque;
