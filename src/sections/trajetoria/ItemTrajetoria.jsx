import { BookOpen, FolderGit2, GraduationCap, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { tecnologias as catalogoTecnologias } from "@/data/tecnologias";
import { traduzir } from "@/i18n/traduzir";

import { STATUS, formatarData, linkValido, partesPeriodo } from "./periodo";

/* ===== INÍCIO: marco na linha do tempo ===== */
const ICONES = {
  curso: BookOpen,
  formacao: GraduationCap,
  estudo: Lightbulb,
  projeto: FolderGit2,
};

const NOMES_TECNOLOGIAS = Object.fromEntries(
  catalogoTecnologias.map(({ id, nome }) => [id, nome]),
);

// Período só com as datas válidas (<time dateTime>); sem datas, nada aparece
function Periodo({ periodo, t }) {
  const { inicio, fim } = periodo;

  return (
    <p className="linha-tempo-periodo">
      <span className="sr-only">{t.periodo}: </span>
      {inicio && <time dateTime={inicio}>{formatarData(inicio, t.localidade)}</time>}
      {inicio && fim && " – "}
      {fim && <time dateTime={fim}>{formatarData(fim, t.localidade)}</time>}
    </p>
  );
}

// Um único componente para todos os marcos: tudo vem de src/data/trajetoria.js.
// oculto: etapa de outro grupo (LinhaDoTempo mostra um grupo por vez). O
// card é informativo e não recebe foco; só o link opcional.
function ItemTrajetoria({ item, oculto, idioma, t }) {
  const idTitulo = `trajetoria-${item.id}`;
  const Icone = ICONES[item.categoria];
  const periodo = partesPeriodo(item);
  const status = STATUS.includes(item.status) ? item.status : null;
  const instituicao = item.instituicao ? traduzir(item.instituicao, idioma) : null;
  const descricao = item.descricao ? traduzir(item.descricao, idioma) : null;
  const nomesTecnologias = (item.tecnologias ?? [])
    .map((id) => NOMES_TECNOLOGIAS[id])
    .filter(Boolean);
  const link = linkValido(item.link);
  const rotuloLink = link ? t.links[link.tipo] ?? t.links.projeto : null;
  const temConteudo = descricao || nomesTecnologias.length > 0 || link;

  return (
    <li
      className="linha-tempo-item"
      hidden={oculto}
      data-categoria={item.categoria}
      data-status={status ?? undefined}
    >
      {/* Marcador sobre a linha, com o ícone da categoria (decorativo: a
          categoria também está escrita no badge) */}
      <span className="linha-tempo-marcador" aria-hidden="true">
        <Icone size={16} strokeWidth={2} />
      </span>

      <Card className="linha-tempo-cartao" aria-labelledby={idTitulo}>
        <CardHeader className="linha-tempo-cabecalho">
          <div className="linha-tempo-meta">
            {periodo && <Periodo periodo={periodo} t={t} />}
            <div className="linha-tempo-badges">
              <Badge variant="outline" className="etiqueta linha-tempo-categoria">
                <Icone aria-hidden="true" />
                {t.categorias[item.categoria]}
              </Badge>
              {/* Status só quando informado no cadastro */}
              {status && (
                <Badge
                  variant="secondary"
                  className="etiqueta linha-tempo-status"
                  data-status={status}
                >
                  {t.status[status]}
                </Badge>
              )}
            </div>
          </div>

          <CardTitle>
            <h2 id={idTitulo}>{traduzir(item.titulo, idioma)}</h2>
          </CardTitle>
          {instituicao && <p className="linha-tempo-instituicao">{instituicao}</p>}
        </CardHeader>

        {temConteudo && (
          <>
            <Separator className="linha-tempo-separador" />
            <CardContent className="linha-tempo-conteudo">
              {descricao && <p>{descricao}</p>}

              {nomesTecnologias.length > 0 && (
                <ul className="linha-tempo-tecnologias" aria-label={t.tecnologias}>
                  {nomesTecnologias.map((nome) => (
                    <li key={nome}>
                      <Badge variant="outline" className="etiqueta linha-tempo-tecnologia">
                        {nome}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}

              {link && (
                <ShimmerButton
                  variante="secundaria"
                  tamanho="pequeno"
                  className="linha-tempo-link"
                  href={link.href}
                  target={link.externo ? "_blank" : undefined}
                  rel={link.externo ? "noopener noreferrer" : undefined}
                >
                  {rotuloLink}
                  <span className="sr-only">
                    {" "}
                    — {traduzir(item.titulo, idioma)}
                    {link.externo && ` (${t.novaAba})`}
                  </span>
                </ShimmerButton>
              )}
            </CardContent>
          </>
        )}
      </Card>
    </li>
  );
}
/* ===== FIM: marco na linha do tempo ===== */

export default ItemTrajetoria;
