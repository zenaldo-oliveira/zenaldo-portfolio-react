import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const TEMPO_AVISO_MS = 3000;

/* ===== INÍCIO: copiar e-mail ===== */
function CopiarEmail({ email, t }) {
  const [situacao, setSituacao] = useState("parado");

  // Some com o aviso depois de alguns segundos
  useEffect(() => {
    if (situacao === "parado") return;

    const temporizador = window.setTimeout(
      () => setSituacao("parado"),
      TEMPO_AVISO_MS,
    );
    return () => window.clearTimeout(temporizador);
  }, [situacao]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
      setSituacao("copiado");
    } catch {
      setSituacao("erro");
    }
  }

  const aviso = { parado: "", copiado: t.copiado, erro: t.erroCopiar }[
    situacao
  ];

  return (
    <div className="contato-copiar">
      <Button variant="outline" size="lg" type="button" onClick={copiar}>
        {t.copiar}
      </Button>
      <p className="contato-aviso" role="status">
        {aviso}
      </p>
    </div>
  );
}
/* ===== FIM: copiar e-mail ===== */

export default CopiarEmail;
