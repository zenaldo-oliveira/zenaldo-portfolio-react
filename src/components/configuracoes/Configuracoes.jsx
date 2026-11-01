import { useEffect, useState } from "react";
import { Popover } from "@base-ui/react/popover";

import "./Configuracoes.css";

/* ===== INÍCIO: configurações de idioma e tema ===== */
// Painel aberto pelo item "Configurações" do menu de três pontinhos no rodapé
// da sidebar (sem gatilho próprio). Popover do Base UI controlado pela
// sidebar: fecha com Esc ou clique fora, devolve o foco ao botão do menu
// (ancora) e reposiciona o painel para não ser cortado.
// Fica sempre montado: o tema é aplicado ao <html> já ao carregar a página.
// Idioma: estado no Portfolio (salvo em localStorage "idioma").
// Tema: estado aqui (salvo em localStorage "tema" e aplicado em <html data-tema>).
function Configuracoes({ idioma, setIdioma, textos, aberto, onAbertoChange, ancoraRef }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "escuro";
  });

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <Popover.Root open={aberto} onOpenChange={(abrir) => onAbertoChange(abrir)}>
      <Popover.Portal>
        <Popover.Positioner
          className="config-posicao"
          anchor={ancoraRef}
          side="top"
          align="start"
          sideOffset={8}
          collisionPadding={12}
        >
          <Popover.Popup className="config-painel" finalFocus={ancoraRef}>
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
