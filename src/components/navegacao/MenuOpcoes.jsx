import { Menu } from "@base-ui/react/menu";
import { Check, Ellipsis, Languages, Moon, Palette, Sun } from "lucide-react";

// Idiomas disponíveis (cada um no próprio idioma, como no painel)
const IDIOMAS = [
  { valor: "pt", nome: "Português" },
  { valor: "en", nome: "English" },
  { valor: "es", nome: "Español" },
];

/* ===== INÍCIO: menu de três pontinhos (canto superior direito) ===== */
// Camada sobreposta (Base UI Menu em portal), ancorada ao botão: não move a
// página. Fecha com Escape ou clique fora e devolve o foco ao botão.
// Opções = preferências que já existem no portfólio:
// - Idioma (pt, en, es) e Aparência (escuro, claro): escolhas de rádio, com
//   marca no valor atual; o menu continua aberto para ver a mudança.
// Recolher/expandir a sidebar fica só no botão da própria sidebar. O painel
// de Configurações (components/configuracoes) não tem mais entrada aqui.
function MenuOpcoes({ textos, idioma, setIdioma, tema, setTema }) {

  const temas = [
    { valor: "escuro", nome: textos.temaEscuro, Icone: Moon },
    { valor: "claro", nome: textos.temaClaro, Icone: Sun },
  ];

  return (
    <Menu.Root>
      <Menu.Trigger
        className="barra-controle"
        aria-label={textos.maisOpcoes}
        title={textos.maisOpcoes}
      >
        <Ellipsis size={20} aria-hidden="true" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          className="menu-opcoes-posicao"
          side="bottom"
          align="end"
          sideOffset={8}
          collisionPadding={12}
        >
          <Menu.Popup className="menu-opcoes">
            {/* ===== Idioma ===== */}
            <Menu.Group className="menu-opcoes-grupo">
              <Menu.GroupLabel className="menu-opcoes-rotulo">
                <Languages size={14} aria-hidden="true" />
                {textos.idioma}
              </Menu.GroupLabel>
              <Menu.RadioGroup value={idioma} onValueChange={setIdioma}>
                {IDIOMAS.map(({ valor, nome }) => (
                  <Menu.RadioItem
                    key={valor}
                    value={valor}
                    className="menu-opcoes-item"
                    closeOnClick={false}
                  >
                    <span className="menu-opcoes-sigla" aria-hidden="true">
                      {valor}
                    </span>
                    <span className="menu-opcoes-texto" lang={valor}>
                      {nome}
                    </span>
                    <Menu.RadioItemIndicator className="menu-opcoes-marca">
                      <Check size={16} aria-hidden="true" />
                    </Menu.RadioItemIndicator>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Group>

            <Menu.Separator className="menu-opcoes-separador" />

            {/* ===== Aparência ===== */}
            <Menu.Group className="menu-opcoes-grupo">
              <Menu.GroupLabel className="menu-opcoes-rotulo">
                <Palette size={14} aria-hidden="true" />
                {textos.aparencia}
              </Menu.GroupLabel>
              <Menu.RadioGroup value={tema} onValueChange={setTema}>
                {temas.map(({ valor, nome, Icone }) => (
                  <Menu.RadioItem
                    key={valor}
                    value={valor}
                    className="menu-opcoes-item"
                    closeOnClick={false}
                  >
                    <Icone size={18} aria-hidden="true" className="menu-opcoes-icone" />
                    <span className="menu-opcoes-texto">{nome}</span>
                    <Menu.RadioItemIndicator className="menu-opcoes-marca">
                      <Check size={16} aria-hidden="true" />
                    </Menu.RadioItemIndicator>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
/* ===== FIM: menu de três pontinhos ===== */

export default MenuOpcoes;
