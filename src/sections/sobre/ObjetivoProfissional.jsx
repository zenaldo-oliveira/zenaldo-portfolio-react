import { Revelar } from "@/components/pagina/animacao";
import { classeBotao, propsLinkBotao } from "@/components/pagina/botao";

/* ===== INÍCIO: objetivo e próximos passos ===== */
function ObjetivoProfissional({ t, local, curriculo }) {
  return (
    <Revelar className="sobre-objetivo" atraso={0.1}>
      <aside className="cartao" aria-labelledby="sobre-objetivo">
        <h2 id="sobre-objetivo">{t.objetivoTitulo}</h2>
        <p>{t.objetivo}</p>

        <dl className="sobre-local">
          <dt>{t.localizacao}</dt>
          <dd>{local}</dd>
        </dl>

        <div className="pagina-acoes">
          <a className={classeBotao()} href="#projetos" {...propsLinkBotao}>
            {t.verProjetos}
          </a>
          <a
            className={classeBotao("outline")}
            href="#contato"
            {...propsLinkBotao}
          >
            {t.contato}
          </a>

          {/* Só aparece quando o PDF existe em public/ */}
          {curriculo && (
            <a
              className={classeBotao("outline")}
              href={curriculo}
              target="_blank"
              rel="noopener noreferrer"
              {...propsLinkBotao}
            >
              {t.curriculo}
              <span className="sr-only"> ({t.novaAba})</span>
            </a>
          )}
        </div>
      </aside>
    </Revelar>
  );
}
/* ===== FIM: objetivo e próximos passos ===== */

export default ObjetivoProfissional;
