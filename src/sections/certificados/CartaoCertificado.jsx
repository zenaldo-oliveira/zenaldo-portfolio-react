import { ItemAnimado } from "@/components/pagina/animacao";
import { classeBotao, propsLinkBotao } from "@/components/pagina/botao";
import ListaEtiquetas from "@/components/pagina/ListaEtiquetas";
import { nomesTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

/* ===== INÍCIO: data de conclusão ===== */
// "2026-05" → "maio de 2026" no idioma atual
function formatarMesAno(valor, localidade) {
  const [ano, mes] = valor.split("-").map(Number);
  if (!ano || !mes) return valor;

  return new Intl.DateTimeFormat(localidade, {
    month: "long",
    year: "numeric",
  }).format(new Date(ano, mes - 1));
}
/* ===== FIM: data de conclusão ===== */

/* ===== INÍCIO: cartão de certificado ===== */
function CartaoCertificado({ certificado, idioma, t }) {
  const nome = traduzir(certificado.nome, idioma);
  const idTitulo = `certificado-${certificado.id}`;
  const tecnologias = certificado.tecnologias ?? [];

  return (
    <ItemAnimado>
      <article
        className="cartao cartao-interativo certificado-cartao"
        aria-labelledby={idTitulo}
      >
        <p className="certificado-instituicao">{certificado.instituicao}</p>
        <h2 id={idTitulo}>{nome}</h2>

        <dl className="certificado-dados">
          {certificado.conclusao && (
            <div>
              <dt>{t.conclusao}</dt>
              <dd>{formatarMesAno(certificado.conclusao, t.localidade)}</dd>
            </div>
          )}
          {certificado.cargaHoraria && (
            <div>
              <dt>{t.cargaHoraria}</dt>
              <dd>{t.horas(certificado.cargaHoraria)}</dd>
            </div>
          )}
        </dl>

        {tecnologias.length > 0 && (
          <ListaEtiquetas
            itens={nomesTecnologias(tecnologias)}
            rotulo={t.tecnologias}
          />
        )}

        {certificado.url && (
          <a
            className={classeBotao("outline", "certificado-link")}
            href={certificado.url}
            target="_blank"
            rel="noopener noreferrer"
            {...propsLinkBotao}
          >
            {t.verCertificado}
            <span className="sr-only">
              {" "}
              — {nome} ({t.novaAba})
            </span>
          </a>
        )}
      </article>
    </ItemAnimado>
  );
}
/* ===== FIM: cartão de certificado ===== */

export default CartaoCertificado;
