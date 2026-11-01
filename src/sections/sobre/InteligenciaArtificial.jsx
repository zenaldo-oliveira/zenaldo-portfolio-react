import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* ===== INÍCIO: inteligência artificial no desenvolvimento ===== */
// Um único cartão com duas partes bem separadas: ferramentas de apoio (uso
// do ChatGPT e do Claude, não das APIs deles) e integrações em aplicações
// (API da OpenAI, ainda em desenvolvimento — sem projeto publicado).
function InteligenciaArtificial({ t }) {
  return (
    <section className="sobre-bloco" aria-labelledby="sobre-ia">
      <h2 id="sobre-ia">{t.iaTitulo}</h2>

      <Card className="sobre-card sobre-ia">
        <CardContent className="sobre-ia-partes">
          <div className="sobre-ia-parte">
            <h3>{t.iaApoioTitulo}</h3>
            <p>{t.iaApoio}</p>
          </div>

          <div className="sobre-ia-parte">
            <div className="sobre-ia-titulo">
              <h3>{t.iaIntegracoesTitulo}</h3>
              <Badge variant="outline" className="etiqueta sobre-ia-status">
                {t.iaEmDesenvolvimento}
              </Badge>
            </div>
            <p>{t.iaIntegracoes}</p>
          </div>
        </CardContent>
      </Card>

      <p className="sobre-texto">{t.iaFoco}</p>
    </section>
  );
}
/* ===== FIM: inteligência artificial no desenvolvimento ===== */

export default InteligenciaArtificial;
