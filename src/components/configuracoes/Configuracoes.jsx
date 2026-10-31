import { useEffect, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Settings } from "lucide-react";

import "./Configuracoes.css";

/* ===== INÍCIO: configurações de idioma e tema ===== */
// Engrenagem no topo da sidebar (ao lado da seta de recolher; no celular,
// dentro da sidebar aberta). Popover do Base UI: fecha com Esc ou clique fora,
// devolve o foco à engrenagem e reposiciona o painel para não ser cortado.
// Idioma: estado no Portfolio (salvo em localStorage "idioma").
// Tema: estado aqui (salvo em localStorage "tema" e aplicado em <html data-tema>).
function Configuracoes({ idioma, setIdioma, textos, className }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "escuro";
  });

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={className}
        aria-label={textos.configuracoes}
        title={textos.configuracoes}
      >
        <Settings size={20} aria-hidden="true" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          className="config-posicao"
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
        >
          <Popover.Popup className="config-painel">
            <Popover.Title className="config-titulo">
              {textos.configuracoes}
            </Popover.Title>

            <label className="config-campo" htmlFor="idioma">
              {textos.idioma}
              <select
                id="idioma"
                value={idioma}
                onChange={(evento) => setIdioma(evento.target.value)}
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </label>

            <label className="config-campo" htmlFor="tema">
              {textos.aparencia}
              <select
                id="tema"
                value={tema}
                onChange={(evento) => setTema(evento.target.value)}
              >
                <option value="escuro">{textos.temaEscuro}</option>
                <option value="claro">{textos.temaClaro}</option>
              </select>
            </label>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
/* ===== FIM: configurações de idioma e tema ===== */

export default Configuracoes;
