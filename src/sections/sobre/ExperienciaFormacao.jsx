import { CodeXml, GraduationCap, RadioTower } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ===== INÍCIO: experiência e formação ===== */
// Três cartões informativos (não focáveis). Só o link para Projetos é
// interativo. A cronologia completa fica na página Linha do Tempo.
function CartaoTrajetoria({ Icone, titulo, children }) {
  return (
    <Card className="sobre-card">
      <CardHeader className="sobre-card-cabecalho">
        <span className="sobre-card-icone" aria-hidden="true">
          <Icone size={20} strokeWidth={1.75} />
        </span>
        <CardTitle>
          <h3>{titulo}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="sobre-card-conteudo">{children}</CardContent>
    </Card>
  );
}

function ExperienciaFormacao({ t }) {
  return (
    <section className="sobre-bloco" aria-labelledby="sobre-trajetoria">
      <h2 id="sobre-trajetoria">{t.trajetoriaTitulo}</h2>

      <div className="sobre-cards">
        <CartaoTrajetoria Icone={RadioTower} titulo={t.experienciaTitulo}>
          <p>{t.experiencia}</p>
        </CartaoTrajetoria>

        <CartaoTrajetoria Icone={CodeXml} titulo={t.desenvolvimentoTitulo}>
          <p>{t.desenvolvimento}</p>
          <a className="sobre-link" href="#projetos">
            {/* espaço não separável: a seta não fica sozinha numa linha */}
            {t.verMeusProjetos}
            {"\u00a0"}
            <span aria-hidden="true">→</span>
          </a>
        </CartaoTrajetoria>

        {/* Só os nomes: status e instituições ainda não confirmados */}
        <CartaoTrajetoria Icone={GraduationCap} titulo={t.formacaoTitulo}>
          <ul className="sobre-formacoes" aria-label={t.formacaoRotulo}>
            {t.formacoes.map((formacao) => (
              <li key={formacao}>{formacao}</li>
            ))}
          </ul>
        </CartaoTrajetoria>
      </div>

      <a className="sobre-link" href="#trajetoria">
        {t.verLinhaDoTempo}
      </a>
    </section>
  );
}
/* ===== FIM: experiência e formação ===== */

export default ExperienciaFormacao;
