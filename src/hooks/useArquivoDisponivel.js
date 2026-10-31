import { useEffect, useState } from "react";

/* ===== INÍCIO: verificar arquivo em public/ ===== */
// O servidor de desenvolvimento e muitas hospedagens devolvem o index.html
// para caminhos inexistentes, então o tipo do conteúdo também é conferido.
export function useArquivoDisponivel(caminho, tipoEsperado) {
  const [disponivel, setDisponivel] = useState(false);

  useEffect(() => {
    if (!caminho) return;
    const controle = new AbortController();

    fetch(caminho, { method: "HEAD", signal: controle.signal })
      .then((resposta) => {
        const tipo = resposta.headers.get("content-type") ?? "";
        setDisponivel(resposta.ok && tipo.includes(tipoEsperado));
      })
      .catch((erro) => {
        if (erro.name !== "AbortError") setDisponivel(false);
      });

    return () => controle.abort();
  }, [caminho, tipoEsperado]);

  return disponivel;
}
/* ===== FIM: verificar arquivo em public/ ===== */
