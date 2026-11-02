import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { ShimmerButton } from "@/components/ui/shimmer-button";

const TEMPO_AVISO_MS = 3000;

/* ===== INÍCIO: copiar e-mail ===== */
// Feedback no próprio botão ("E-mail copiado." por 3 s), sem deslocar o
// layout; o mesmo texto é anunciado aos leitores de tela (role="status").
// Se a cópia falhar, a orientação aparece como texto abaixo dos botões.
function CopiarEmail({ email, t }) {
  const [situacao, setSituacao] = useState("parado");

  useEffect(() => {
    if (situacao === "parado" || situacao === "copiando") return;

    const temporizador = window.setTimeout(
      () => setSituacao("parado"),
      TEMPO_AVISO_MS,
    );
    return () => window.clearTimeout(temporizador);
  }, [situacao]);

  // "copiando": botão em carregamento até a área de transferência responder,
  // o que impede cliques repetidos
  async function copiar() {
    setSituacao("copiando");
    try {
      await navigator.clipboard.writeText(email);
      setSituacao("copiado");
    } catch {
      setSituacao("erro");
    }
  }

  const copiado = situacao === "copiado";
  const aviso = { copiado: t.copiado, erro: t.erroCopiar }[situacao] ?? "";

  return (
    <>
      <ShimmerButton
        variante="secundaria"
        type="button"
        carregando={situacao === "copiando"}
        onClick={copiar}
      >
        {copiado ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span aria-hidden={copiado || undefined}>{copiado ? t.copiado : t.copiar}</span>
        {copiado && <span className="sr-only">{t.copiar}</span>}
      </ShimmerButton>
      <p
        className={situacao === "erro" ? "contato-aviso" : "contato-aviso sr-only"}
        role="status"
      >
        {aviso}
      </p>
    </>
  );
}
/* ===== FIM: copiar e-mail ===== */

export default CopiarEmail;
