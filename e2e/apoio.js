import { expect } from "@playwright/test";

// Passa pela tela de entrada e abre a página pedida (navegação por hash)
export async function abrirPagina(page, pagina = "inicio") {
  await page.goto("/");
  await page.getByRole("button", { name: "Entrar no portfólio" }).click();
  await expect(page.locator("main h1")).toBeVisible();
  if (pagina !== "inicio") {
    await page.evaluate((hash) => (location.hash = hash), pagina);
    await expect(tituloPagina(page, pagina)).toBeVisible();
  }
}

// Título (h1) de cada página: id "<pagina>-titulo"
export function tituloPagina(page, pagina) {
  return page.locator(`#${pagina}-titulo`);
}

// Celular: hambúrguer na barra superior; desktop: botão no trilho
export function botaoMenu(page, isMobile) {
  return isMobile
    ? page.locator("#botao-abrir-sidebar")
    : page.locator(".sidebar .botao-sidebar");
}

// Espera as transições do painel terminarem antes de medir posições (só
// transições: a logo tem animação infinita, que nunca termina)
export function esperarPainel(page) {
  return page
    .locator("#sidebar-principal")
    .evaluate((el) =>
      Promise.all(
        el
          .getAnimations({ subtree: true })
          .filter((animacao) => animacao instanceof CSSTransition)
          .map((animacao) => animacao.finished),
      ),
    );
}
