import { expect, test } from "@playwright/test";

import { abrirPagina } from "./apoio";

// Regressão: na composição radial (desktop e tablet) a grade dos cartões
// ocupava também a coluna do meio e ficava por cima do QR Code, que não
// recebia o clique (reproduzido em 1366 × 768).
test("desktop: o QR Code da órbita de serviços recebe o clique", async ({ page, isMobile }) => {
  test.skip(isMobile, "no celular o QR Code fica fora da composição radial");
  await abrirPagina(page, "inicio");
  const qr = page.locator(".servicos-orbita-qr");
  await qr.scrollIntoViewIfNeeded();
  const b = await qr.boundingBox();

  const alvo = await page.evaluate(
    ([x, y]) => !!document.elementFromPoint(x, y)?.closest(".servicos-orbita-qr"),
    [b.x + b.width / 2, b.y + b.height / 2],
  );
  expect(alvo, "o centro do QR Code precisa ser o próprio link").toBe(true);
});

// Regressão: em notebooks as letras do círculo animado ficavam a ~25px do
// fim das linhas de texto da entrada (1280 × 720).
// (tamanho via test.use: page.setViewportSize trava no Firefox do Playwright
// para Windows)
for (const tamanho of [
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
]) {
  test.describe(`entrada ${tamanho.width}×${tamanho.height}`, () => {
  test.use({ viewport: tamanho });

  test("círculo afastado do texto e botão visível", async ({ page, isMobile }) => {
    test.skip(isMobile, "o círculo só aparece a partir de 1200px");
    await page.goto("/");
    const botao = page.getByRole("button", { name: "Entrar no portfólio" });
    await expect(botao).toBeInViewport({ ratio: 1 });

    const folga = await page.evaluate(() => {
      const letras = [...document.querySelectorAll(".entrada-circulo span")]
        .map((s) => s.getBoundingClientRect())
        .filter((r) => r.width > 0);
      const linhas = [];
      const percurso = document.createTreeWalker(
        document.querySelector(".entrada-conteudo"),
        NodeFilter.SHOW_TEXT,
      );
      for (let no = percurso.nextNode(); no; no = percurso.nextNode()) {
        if (!no.textContent.trim()) continue;
        const intervalo = document.createRange();
        intervalo.selectNodeContents(no);
        linhas.push(...intervalo.getClientRects());
      }
      let menor = Infinity;
      for (const a of letras) {
        for (const t of linhas) {
          const dx = Math.max(t.left - a.right, a.left - t.right, 0);
          const dy = Math.max(t.top - a.bottom, a.top - t.bottom, 0);
          menor = Math.min(menor, Math.hypot(dx, dy));
        }
      }
      return menor;
    });

    expect(folga).toBeGreaterThanOrEqual(40);
  });
  });
}

// Notebook: todas as páginas cabem na altura útil, sem rolagem no documento
// nem no <main>, e o rodapé fica visível. 1366 × 650 é a janela de
// referência do notebook (área útil do navegador).
for (const tamanho of [
  { width: 1366, height: 650 },
  { width: 1366, height: 768 },
]) {
  test.describe(`notebook ${tamanho.width}×${tamanho.height}`, () => {
    test.use({ viewport: tamanho });

    test("todas as páginas cabem sem rolagem", async ({ page, isMobile }) => {
      test.skip(isMobile, "tamanhos de notebook");
      await abrirPagina(page);
      for (const pagina of ["inicio", "sobre", "trajetoria", "projetos", "contato"]) {
        await page.evaluate((hash) => (location.hash = hash), pagina);
        await expect(page.locator(`#${pagina}-titulo`)).toBeVisible();
        const sobra = await page.evaluate(() => {
          const main = document.querySelector(".area-principal > main");
          const raiz = document.documentElement;
          return {
            mainV: main.scrollHeight - main.clientHeight,
            mainH: main.scrollWidth - main.clientWidth,
            docV: raiz.scrollHeight - raiz.clientHeight,
          };
        });
        expect(sobra, pagina).toEqual({ mainV: 0, mainH: 0, docV: 0 });
        await expect(page.locator(".area-principal > .footer")).toBeInViewport({ ratio: 1 });
      }
    });
  });
}

// Linha do Tempo em grupos: os controles dão acesso a todas as etapas
test("linha do tempo: anterior/próximo percorrem todas as etapas", async ({ page }) => {
  await abrirPagina(page, "trajetoria");
  const total = await page.locator(".linha-tempo-item").count();
  const proximas = page.getByRole("button", { name: "Próximas etapas" });
  const vistas = new Set();

  for (let passo = 0; passo <= total; passo++) {
    const visiveis = await page
      .locator(".linha-tempo-item:not([hidden]) h2")
      .allTextContents();
    visiveis.forEach((titulo) => vistas.add(titulo));
    if (await proximas.isDisabled()) break;
    await proximas.click();
  }

  expect(vistas.size).toBe(total);
  await expect(page.getByRole("button", { name: "Etapas anteriores" })).toBeEnabled();
});
