import ServicesOrbit from "@/components/servicos/ServicesOrbit";
import { useCelular } from "@/components/navegacao/useCelular";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { servicos } from "@/data/servicos";

import ListaTecnologias from "./ListaTecnologias";
import { traducoesTecnologias } from "./traducoes";
import "./Tecnologias.css";

// Endereço codificado no QR Code central (URL completa, sem rastreamento)
const URL_SITE = "https://zenaldodev.com.br/";

/* ===== INÍCIO: página inicial ===== */
// Serviços (cabeçalho + órbita) e tecnologias. Os projetos ficam só na
// página Projetos (o botão "Ver projetos" leva até ela).
function Tecnologias({ idioma = "pt" }) {
  const t = traducoesTecnologias[idioma];
  const celular = useCelular();

  return (
    <section id="inicio" className="pagina tecnologias" aria-labelledby="inicio-titulo">
      <header className="pagina-cabecalho tecnologias-cabecalho">
        <div className="tecnologias-cabecalho-textos">
          <p className="pagina-apoio">{t.servicosMarca}</p>
          <h1 id="inicio-titulo">{t.servicosTitulo}</h1>
          <p className="pagina-introducao">{t.servicosDescricao}</p>
        </div>

        <div className="tecnologias-chamadas">
          <ShimmerButton href="#contato">{t.servicosChamada}</ShimmerButton>
          <ShimmerButton variante="secundaria" href="#projetos">
            {t.verProjetos}
          </ShimmerButton>
        </div>
      </header>

      <div className="tecnologias-servicos">
        <ServicesOrbit
          servicos={servicos}
          idioma={idioma}
          qrCode={{
            url: URL_SITE,
            legenda: t.qrLegenda,
            rotuloLink: t.qrRotulo,
            textoLink: t.qrLink,
          }}
          rotulo={t.servicosLista}
        />
      </div>

      {/* Faixa de tecnologias: só a partir do tablet. No celular ela fica
          oculta (prioridade aos serviços na altura disponível). */}
      {!celular && (
        <section
          className="pagina-secao tecnologias-secao"
          aria-labelledby="inicio-tecnologias"
        >
          <h2 id="inicio-tecnologias">{t.tecnologiasTitulo}</h2>
          <ListaTecnologias rotulo={t.tecnologiasTitulo} />
        </section>
      )}
    </section>
  );
}
/* ===== FIM: página inicial ===== */

export default Tecnologias;
