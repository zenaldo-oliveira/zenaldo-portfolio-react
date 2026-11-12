import { expect, test } from "@playwright/test";

import { abrirPagina } from "./apoio";

// Página Projetos: galeria com um projeto em destaque por vez (mockup →
// nome → descrição → botões), setas e contador "3 de 11".
const dialogo = (page) => page.getByRole("dialog");
const contador = (page) => page.locator(".galeria-contador");
const detalhes = (page) => page.locator(".galeria .projeto-detalhes-botao");

async function clicar(locator, isMobile) {
  if (isMobile) await locator.tap();
  else await locator.click();
}

// Percorre todos os projetos pelo botão "Próximo projeto" e abre os detalhes
// de cada um no primeiro clique/toque; o foco volta ao botão ao fechar.
test("todos os projetos abrem os detalhes e devolvem o foco", async ({ page, isMobile }) => {
  test.setTimeout(120_000); // abre e fecha o diálogo de cada projeto
  await abrirPagina(page, "projetos");
  const total = Number((await contador(page).textContent()).split(" ").pop());
  expect(total).toBeGreaterThan(1);

  for (let i = 0; i < total; i++) {
    await expect(contador(page)).toHaveText(new RegExp(`^${i + 1} \\D+ ${total}$`));
    await clicar(detalhes(page), isMobile);
    await expect(dialogo(page)).toBeVisible();
    // force: com as animações infinitas do brilho dos botões no diálogo, a
    // verificação de estabilidade do Playwright no WebKit nunca termina
    await dialogo(page).getByRole("button", { name: /fechar/i }).click({ force: true });
    await expect(dialogo(page)).toBeHidden();
    await expect(detalhes(page)).toBeFocused();
    await clicar(page.getByRole("button", { name: "Próximo projeto" }), isMobile);
  }
  // Depois do último, volta ao primeiro
  await expect(contador(page)).toHaveText(new RegExp(`^1 \\D+ ${total}$`));
});

// "Ver projeto" (demonstração pública) é a ação principal quando existe;
// senão, "Ver detalhes" é a única ação e vem em destaque
test("ação principal segue a demonstração pública", async ({ page }) => {
  await abrirPagina(page, "projetos");
  const total = Number((await contador(page).textContent()).split(" ").pop());

  for (let i = 0; i < total; i++) {
    const verProjeto = page.locator(".galeria-ver-projeto");
    const primeiro = page.locator(".galeria-acoes > :first-child");
    if (await verProjeto.count()) {
      await expect(primeiro).toHaveClass(/galeria-ver-projeto/);
      await expect(verProjeto).toHaveAttribute("href", /^https:\/\//);
      await expect(verProjeto).toHaveAttribute("target", "_blank");
      await expect(detalhes(page)).toHaveAttribute("data-variante", "secundaria");
    } else {
      await expect(detalhes(page)).toHaveAttribute("data-variante", "principal");
    }
    await page.getByRole("button", { name: "Próximo projeto" }).click();
  }
});

// Regressão (roda 3D antiga): o arraste com mouse selecionava texto e o
// arraste seguinte virava drag-and-drop nativo, travando a troca. Arrastes
// seguidos nos dois sentidos sempre trocam o projeto, e "Ver detalhes" abre
// no primeiro clique depois deles.
test("desktop: arrastes seguidos nos dois sentidos e Ver detalhes no 1º clique", async ({ page, isMobile, browserName }) => {
  test.skip(isMobile, "arraste com mouse");
  test.skip(browserName === "webkit", "pointerup perdido no WebKit do Playwright (Windows)");
  await abrirPagina(page, "projetos");
  const palco = page.locator(".galeria-palco");

  for (const [indice, sentido] of [-1, -1, 1, 1, 1, -1, 1, -1].entries()) {
    const antes = await contador(page).textContent();
    const caixa = await palco.boundingBox();
    const x = caixa.x + caixa.width / 2 - sentido * 90;
    const y = caixa.y + caixa.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    for (let passo = 1; passo <= 9; passo++) await page.mouse.move(x + sentido * passo * 20, y);
    await page.mouse.up();
    await expect(contador(page)).not.toHaveText(antes);

    if (indice % 2 === 1) {
      await detalhes(page).click();
      await expect(dialogo(page)).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialogo(page)).toBeHidden();
      await expect(detalhes(page)).toBeFocused();
    }
  }
});

test("desktop: setas do teclado trocam o projeto", async ({ page, isMobile }) => {
  test.skip(isMobile, "teclado no desktop");
  await abrirPagina(page, "projetos");
  await page.locator(".galeria-palco").focus();
  const inicial = await contador(page).textContent();

  await page.keyboard.press("ArrowRight");
  await expect(contador(page)).not.toHaveText(inicial);
  await page.keyboard.press("ArrowLeft");
  await expect(contador(page)).toHaveText(inicial);
});

// Celular: uma imagem por vez, alternando entre computador e celular
test("celular: alterna a imagem entre computador e celular", async ({ page, isMobile }) => {
  test.skip(!isMobile, "alternância só nas áreas estreitas");
  await abrirPagina(page, "projetos");
  const visiveis = () =>
    page.locator(".galeria-mockup img").evaluateAll((imagens) =>
      imagens.filter((im) => getComputedStyle(im).display !== "none").map((im) => im.className),
    );

  expect(await visiveis()).toEqual(["galeria-monitor"]);
  await page.getByRole("button", { name: "Ver no celular" }).tap();
  expect(await visiveis()).toEqual(["galeria-celular"]);
  await expect(page.getByRole("button", { name: "Ver no celular" })).toHaveAttribute("aria-pressed", "true");
});
