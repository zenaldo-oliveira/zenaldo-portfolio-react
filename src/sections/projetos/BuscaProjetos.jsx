import { Search } from "lucide-react";

/* ===== INÍCIO: busca por nome ===== */
function BuscaProjetos({ valor, onBuscar, t }) {
  return (
    <div className="projetos-busca">
      <label className="sr-only" htmlFor="projetos-busca">
        {t.buscaRotulo}
      </label>
      <Search className="projetos-busca-icone" size={16} aria-hidden="true" />
      <input
        id="projetos-busca"
        type="search"
        value={valor}
        onChange={(evento) => onBuscar(evento.target.value)}
        placeholder={t.buscaDica}
        autoComplete="off"
      />
    </div>
  );
}
/* ===== FIM: busca por nome ===== */

export default BuscaProjetos;
