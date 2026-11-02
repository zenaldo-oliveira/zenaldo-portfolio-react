import { Popover } from "@base-ui/react/popover";

import "./Configuracoes.css";

/* ===== INÍCIO: configurações de idioma e tema ===== */
// Painel aberto pelo item "Configurações" do menu de três pontinhos no canto
// superior direito (navegacao/MenuOpcoes), sem gatilho próprio. Popover do Base UI controlado pela
// sidebar: fecha com Esc ou clique fora, devolve o foco ao botão do menu
// (ancora) e reposiciona o painel para não ser cortado.
// Idioma: estado no Portfolio (salvo em localStorage "idioma").
// Tema: estado em useTema (compartilhado com o menu de três pontinhos).
function Configuracoes({
  idioma,
  setIdioma,
  tema,
  setTema,
  textos,
  aberto,
  onAbertoChange,
  ancoraRef,
}) {
  return (
    <Popover.Root open={aberto} onOpenChange={(abrir) => onAbertoChange(abrir)}>
      <Popover.Portal>
        <Popover.Positioner
          className="config-posicao"
          anchor={ancoraRef}
          side="bottom"
          align="end"
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
