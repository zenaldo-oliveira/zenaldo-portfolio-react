import { ShimmerButton } from "@/components/ui/shimmer-button";
import ServicesOrbit from "@/components/servicos/ServicesOrbit";
import { servicos } from "@/data/servicos";
import { tecnologias, urlIconeTecnologia } from "@/data/tecnologias";
import { traducoesTecnologias } from "./traducoes";
import "./Tecnologias.css";

// Endereço codificado no QR Code central (URL completa, sem rastreamento)
const URL_SITE = "https://zenaldodev.com.br/";

function Tecnologias({ idioma = "pt" }) {
  const t = traducoesTecnologias[idioma];

  return (
    <section id="inicio" className="tecnologias" aria-labelledby="inicio-titulo">
      {/* Fundo: camada única de todas as páginas (components/fundo/FundoPagina) */}
      {/* ===== INÍCIO: cabeçalho do bloco de serviços (único H1) ===== */}
      <header className="tecnologias-cabecalho">
        <div className="tecnologias-cabecalho-textos">
          <p className="tecnologias-marca">{t.servicosMarca}</p>
          <h1 id="inicio-titulo">{t.servicosTitulo}</h1>
          <p className="tecnologias-descricao">{t.servicosDescricao}</p>
        </div>

        <ShimmerButton className="tecnologias-chamada" href="#contato">
          {t.servicosChamada}
        </ShimmerButton>
      </header>
      {/* ===== FIM: cabeçalho do bloco de serviços ===== */}

      {/* ===== INÍCIO: serviços da ZTech Solutions ===== */}
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
      {/* ===== FIM: serviços da ZTech Solutions ===== */}

      {/* Legenda e faixa juntas, no fim da página, logo acima do rodapé;
          a faixa vai até a borda direita e passa por trás do WhatsApp */}
      <div className="tecnologias-base">
        <p className="tecnologias-legenda">
          Tecnologias que utilizo ou estudo nos meus projetos:
        </p>

        {/* ===== INÍCIO: duas faixas de tecnologias ===== */}
        <div
          className="tecnologias-carrosseis"
          tabIndex={0}
          role="region"
          aria-label="Tecnologias utilizadas e estudadas"
        >
          {[1].map((linha) => {
            const itens = tecnologias;

            return (
              <div className="tecnologias-carrossel" key={linha}>
                <div
                  className={`tecnologias-trilha ${
                    linha === 1 ? "tecnologias-trilha-reversa" : ""
                  }`}
                >
                  {[0, 1].map((copia) => (
                    <ul
                      className="tecnologias-faixa"
                      key={copia}
                      aria-hidden={copia === 1 ? true : undefined}
                    >
                      {itens.map(({ nome, icone }) => (
                        <li className="tecnologias-item" key={nome}>
                          <img
                            src={urlIconeTecnologia(icone)}
                            alt=""
                            width="28"
                            height="28"
                          />
                          <span>{nome}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* ===== FIM: duas faixas de tecnologias ===== */}
      </div>
    </section>
  );
}

export default Tecnologias;
