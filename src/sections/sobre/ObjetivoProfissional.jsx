import { MapPin } from "lucide-react";

import { Revelar } from "@/components/pagina/animacao";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

/* ===== INÍCIO: objetivo e próximos passos ===== */
// Links de navegação (Projetos, Contato, currículo) como <a> via ShimmerButton.
function ObjetivoProfissional({ t, curriculo }) {
  return (
    <Revelar className="sobre-objetivo" atraso={0.1}>
      <aside aria-labelledby="sobre-objetivo">
        <Card className="sobre-card">
          <CardHeader>
            <CardTitle>
              <h2 id="sobre-objetivo">{t.objetivoTitulo}</h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="sobre-card-conteudo">
            <p>{t.objetivo}</p>

            <dl className="sobre-local">
              <dt>{t.localizacao}</dt>
              <dd>
                <MapPin size={16} aria-hidden="true" />
                {t.local}
              </dd>
            </dl>

            <div className="sobre-acoes">
              <ShimmerButton href="#projetos">{t.verProjetos}</ShimmerButton>
              <ShimmerButton variante="secundaria" href="#contato">
                {t.contato}
              </ShimmerButton>

              {/* Só aparece quando o PDF existe em public/ */}
              {curriculo && (
                <ShimmerButton
                  variante="secundaria"
                  href={curriculo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.curriculo}
                  <span className="sr-only"> ({t.novaAba})</span>
                </ShimmerButton>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>
    </Revelar>
  );
}
/* ===== FIM: objetivo e próximos passos ===== */

export default ObjetivoProfissional;
