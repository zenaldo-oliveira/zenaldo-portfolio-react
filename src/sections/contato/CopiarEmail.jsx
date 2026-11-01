import { useEffect, useState } from "react";

import { ShimmerButton } from "@/components/ui/shimmer-button";

const TEMPO_AVISO_MS = 3000;

/* ===== INÍCIO: copiar e-mail ===== */
function CopiarEmail({ email, t }) {
  const [situacao, setSituacao] = useState("parado");

  // Some com o aviso depois de alguns segundos
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

  const aviso = { parado: "", copiando: "", copiado: t.copiado, erro: t.erroCopiar }[
    situacao
  ];

  return (
    <div className="contato-copiar">
      <ShimmerButton
        variante="secundaria"
        type="button"
        carregando={situacao === "copiando"}
        onClick={copiar}
      >
        {t.copiar}
      </ShimmerButton>
      <p className="contato-aviso" role="status">
        {aviso}
      </p>
    </div>
  );
}
/* ===== FIM: copiar e-mail ===== */

export default CopiarEmail;
