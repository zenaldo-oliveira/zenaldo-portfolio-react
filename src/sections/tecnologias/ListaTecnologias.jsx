import { tecnologias, urlIconeTecnologia } from "@/data/tecnologias";

function ItensTecnologia({ ocultar }) {
  return (
    <ul className="tecnologias-faixa" aria-hidden={ocultar || undefined}>
      {tecnologias.map(({ nome, icone, iconeEscuro }) => (
        <li className="tecnologias-item" key={nome}>
          <img
            src={urlIconeTecnologia(icone)}
            alt=""
            width="24"
            height="24"
            loading="lazy"
            data-escuro={iconeEscuro || undefined}
          />
          <span>{nome}</span>
        </li>
      ))}
    </ul>
  );
}

/* ===== INÍCIO: lista de tecnologias ===== */
// estatica (celular): grade compacta com ícone e nome, sem animação.
// Senão: faixa em movimento contínuo (duas cópias para o laço; a segunda
// fica fora da leitura). Pausa com mouse ou foco; com movimento reduzido,
// vira uma faixa rolável à mão (Tecnologias.css).
function ListaTecnologias({ estatica, rotulo }) {
  if (estatica) {
    return (
      <div className="tecnologias-grade">
        <ItensTecnologia />
      </div>
    );
  }

  return (
    <div className="tecnologias-carrossel" tabIndex={0} role="region" aria-label={rotulo}>
      <div className="tecnologias-trilha">
        <ItensTecnologia />
        <ItensTecnologia ocultar />
      </div>
    </div>
  );
}
/* ===== FIM: lista de tecnologias ===== */

export default ListaTecnologias;
