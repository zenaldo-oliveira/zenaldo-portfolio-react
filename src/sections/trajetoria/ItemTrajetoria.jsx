import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { traduzir } from "@/i18n/traduzir";

import { textoPeriodo } from "./periodo";

/* ===== INÍCIO: experiência na linha do tempo ===== */
// Entra ao aparecer na tela (uma vez): opacidade + 12px na vertical.
// Vertical para nunca criar rolagem horizontal (ex.: celular, uma coluna).
const DESLOCAMENTO_PX = 12;

function ItemTrajetoria({ experiencia, lado, idioma, t }) {
  const idTitulo = `trajetoria-${experiencia.id}`;
  // Com movimento reduzido, nem o estado inicial fica deslocado
  const reduzir = useReducedMotion();
  const deslocamento = reduzir ? 0 : DESLOCAMENTO_PX;

  return (
    <motion.li
      className={`linha-tempo-item linha-tempo-${lado}`}
      data-atual={experiencia.atual ? "true" : undefined}
      initial={{ opacity: 0, y: deslocamento }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <article className="cartao linha-tempo-cartao" aria-labelledby={idTitulo}>
        <p className="linha-tempo-periodo">
          <span className="sr-only">{t.periodo}: </span>
          {textoPeriodo(experiencia, t)}
          {/* Só aparece quando atual: true foi confirmado no cadastro */}
          {experiencia.atual && (
            <Badge variant="secondary" className="linha-tempo-atual">
              {t.atual}
            </Badge>
          )}
        </p>

        <h2 id={idTitulo}>{traduzir(experiencia.cargo, idioma)}</h2>
        <p className="linha-tempo-empresa">{experiencia.empresa}</p>

        {experiencia.descricao && (
          <p className="linha-tempo-descricao">
            {traduzir(experiencia.descricao, idioma)}
          </p>
        )}
      </article>
    </motion.li>
  );
}
/* ===== FIM: experiência na linha do tempo ===== */

export default ItemTrajetoria;
