/* ===== INÍCIO: formatação do período ===== */
// "2024-03" → "mar. de 2024" (no idioma atual); inválido → texto original
export function formatarMesAno(valor, localidade) {
  const [ano, mes] = String(valor).split("-").map(Number);
  if (!ano || !mes) return valor;

  return new Intl.DateTimeFormat(localidade, {
    month: "short",
    year: "numeric",
  }).format(new Date(ano, mes - 1));
}

// Início – fim; experiência atual mostra "atual"; sem fim informado, só o início
export function textoPeriodo(experiencia, t) {
  const inicio = formatarMesAno(experiencia.inicio, t.localidade);
  if (experiencia.atual) return `${inicio} – ${t.presente}`;
  if (!experiencia.fim) return inicio;
  return `${inicio} – ${formatarMesAno(experiencia.fim, t.localidade)}`;
}

// Mais antiga primeiro ("AAAA-MM" ordena corretamente como texto)
export function ordenarCronologicamente(experiencias) {
  return [...experiencias].sort((a, b) => a.inicio.localeCompare(b.inicio));
}
/* ===== FIM: formatação do período ===== */
