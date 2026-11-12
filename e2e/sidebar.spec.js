import { expect, test } from "@playwright/test";

import { abrirPagina, botaoMenu, esperarPainel, tituloPagina } from "./apoio";

// Desktop: o layout reserva a largura da sidebar aberta, então expandir e
// recolher não mexe no conteúdo (0px). Celular: o painel sobreposto também
// não pode mover o conteúdo. Mede o <main> e o título nos três estados.
for (const pagina of ["inicio", "sobre", "trajetoria", "projetos", "contato"]) {
  test(`"${pagina}" não se desloca ao abrir e fechar o menu`, async ({ page, isMobile }) => {
    await abrirPagina(page, pagina);
    const titulo = tituloPagina(page, pagina);
    const main = page.locator(".area-principal > main");
    const medir = async () => [await main.boundingBox(), await titulo.boundingBox()];
    const [mainAntes, antes] = await medir();

    await botaoMenu(page, isMobile).click();
    await expect(botaoMenu(page, isMobile)).toHaveAttribute("aria-expanded", "true");
    await esperarPainel(page);
    const [mainAberto, aberto] = await medir();

    // Celular: Esc fecha o painel; desktop: o mesmo botão recolhe
    if (isMobile) await page.keyboard.press("Escape");
    else await botaoMenu(page, false).click();
    await expect(botaoMenu(page, isMobile)).toHaveAttribute("aria-expanded", "false");
    await esperarPainel(page);
    const [mainDepois, depois] = await medir();

    for (const [a, b] of [[mainAntes, mainAberto], [mainAntes, mainDepois], [antes, aberto], [antes, depois]]) {
      expect(Math.abs(b.x - a.x)).toBe(0);
      expect(Math.abs(b.width - a.width)).toBe(0);
    }
  });
}

test("nenhuma página rola na horizontal", async ({ page }) => {
  await abrirPagina(page);
  for (const pagina of ["inicio", "sobre", "trajetoria", "projetos", "contato"]) {
    await page.evaluate((hash) => (location.hash = hash), pagina);
    await expect(tituloPagina(page, pagina)).toBeVisible();
    const sobra = await page.evaluate(() => {
      const main = document.querySelector("main");
      const raiz = document.documentElement;
      return Math.max(main.scrollWidth - main.clientWidth, raiz.scrollWidth - raiz.clientWidth);
    });
    expect(sobra, pagina).toBeLessThanOrEqual(0);
  }
});
