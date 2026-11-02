import { useEffect, useState } from "react";

/* ===== INÍCIO: tema (claro/escuro) ===== */
// Estado único do tema, compartilhado pelo menu de três pontinhos e pelo
// painel de Configurações. Salvo em localStorage ("tema") e aplicado em
// <html data-tema>. Mesmo comportamento de antes (o estado vivia dentro de
// Configuracoes.jsx).
export const TEMAS = ["escuro", "claro"];

export function useTema() {
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem("tema");
    return TEMAS.includes(salvo) ? salvo : "escuro";
  });

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  return [tema, setTema];
}
/* ===== FIM: tema ===== */
