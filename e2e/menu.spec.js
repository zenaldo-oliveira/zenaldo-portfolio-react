import { expect, test } from "@playwright/test";

import { abrirPagina, botaoMenu, esperarPainel, tituloPagina } from "./apoio";

const html = (page) => page.locator("html");

// Celular: o hambúrguer abre um painel sobreposto (modal), com fundo
// escurecido e o resto da página inerte.
test.describe("menu lateral no celular (painel sobreposto)", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile, "o painel sobreposto só existe no celular");
    await abrirPagina(page, "sobre");
  });

  test("abre, anuncia o estado, trava o fundo e fecha com Esc", async ({ page }) => {
    const botao = botaoMenu(page, true);
    await expect(botao).toHaveAttribute("aria-expanded", "false");

    await botao.click();

    const fechar = page.locator("#sidebar-principal").getByRole("button", { name: "Fechar menu" });
    await expect(fechar).toHaveAttribute("aria-expanded", "true");
    await expect(fechar).toBeFocused();
    await expect(html(page)).toHaveAttribute("data-menu-aberto", "");
    await expect(page.locator(".area-principal")).toHaveAttribute("inert", "");

    await page.keyboard.press("Escape");

    await expect(html(page)).not.toHaveAttribute("data-menu-aberto");
    await expect(page.locator(".area-principal")).not.toHaveAttribute("inert");
    await expect(botaoMenu(page, true)).toBeFocused();
  });

  test("fecha ao tocar fora do painel", async ({ page }) => {
    await botaoMenu(page, true).click();
    await expect(page.locator(".sidebar-fundo")).toHaveClass(/aberto/);

    const { width, height } = page.viewportSize();
    await page.mouse.click(width - 8, height / 2);

    await expect(page.locator(".sidebar-fundo")).not.toHaveClass(/aberto/);
    await expect(html(page)).not.toHaveAttribute("data-menu-aberto");
  });

  test("fecha ao escolher uma página", async ({ page }) => {
    await botaoMenu(page, true).click();

    await page.locator("#sidebar-principal").getByRole("link", { name: "Projetos" }).click();

    await expect(page).toHaveURL(/#projetos$/);
    await expect(tituloPagina(page, "projetos")).toBeVisible();
    await expect(html(page)).not.toHaveAttribute("data-menu-aberto");
  });

  test("abre pelo teclado e mantém o foco no painel", async ({ page, browserName }) => {
    // No WebKit, Tab só passa por botões com a opção do sistema ativada
    test.skip(browserName === "webkit", "Tab do WebKit não foca botões por padrão");
    await botaoMenu(page, true).focus();
    await page.keyboard.press("Enter");
    await expect(html(page)).toHaveAttribute("data-menu-aberto", "");

    await page.keyboard.press("Tab");

    const dentroDoPainel = await page.evaluate(
      () => !!document.activeElement?.closest("#sidebar-principal"),
    );
    expect(dentroDoPainel).toBe(true);
  });

  // Fechado, nenhuma camada invisível pode ficar sobre o título
  test("fechado, nada cobre o título nem intercepta toques", async ({ page }) => {
    await botaoMenu(page, true).click();
    await page.keyboard.press("Escape");
    await expect(html(page)).not.toHaveAttribute("data-menu-aberto");
    await esperarPainel(page);

    const titulo = tituloPagina(page, "sobre");
    const b = await titulo.boundingBox();
    const alvo = await page.evaluate(
      ([x, y]) => document.elementFromPoint(x, y)?.id,
      [b.x + 8, b.y + b.height / 2],
    );
    expect(alvo).toBe("sobre-titulo");
  });
});

test("celular: menu fechado fica fora da leitura e do Tab", async ({ page, isMobile }) => {
  test.skip(!isMobile, "só no celular");
  await abrirPagina(page);
  await expect(page.locator("#sidebar-principal")).toHaveAttribute("inert", "");
});

// Desktop: o layout reserva a largura da sidebar aberta. Expandida ou
// recolhida, ela não cobre o conteúdo e a página continua utilizável.
test.describe("sidebar no desktop (faixa reservada)", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(isMobile, "a faixa reservada só existe no desktop");
    await abrirPagina(page, "sobre");
  });

  test("expandida não cobre o título nem trava a página", async ({ page }) => {
    const botao = botaoMenu(page, false);
    await expect(botao).toHaveAttribute("aria-expanded", "false");

    await botao.click();
    await expect(page.locator("#sidebar-principal")).toHaveClass(/aberta/);
    await esperarPainel(page);

    const sidebar = await page.locator("#sidebar-principal").boundingBox();
    const titulo = tituloPagina(page, "sobre");
    const b = await titulo.boundingBox();
    expect(b.x, "o título começa depois da sidebar aberta").toBeGreaterThanOrEqual(sidebar.x + sidebar.width);

    const alvo = await page.evaluate(
      ([x, y]) => document.elementFromPoint(x, y)?.id,
      [b.x + 4, b.y + b.height / 2],
    );
    expect(alvo).toBe("sobre-titulo");
    await expect(html(page)).not.toHaveAttribute("data-menu-aberto");
    await expect(page.locator(".area-principal")).not.toHaveAttribute("inert");
    await expect(page.locator(".sidebar-fundo")).toHaveCount(0);

    // Escolher uma página não recolhe a sidebar
    await page.locator("#sidebar-principal").getByRole("link", { name: "Contato" }).click();
    await expect(tituloPagina(page, "contato")).toBeVisible();
    await expect(page.locator("#sidebar-principal")).toHaveClass(/aberta/);

    await botaoMenu(page, false).click();
    await expect(page.locator("#sidebar-principal")).not.toHaveClass(/aberta/);
  });

  test("expande e recolhe pelo teclado", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Tab do WebKit não foca botões por padrão");
    const botao = botaoMenu(page, false);
    await botao.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#sidebar-principal")).toHaveClass(/aberta/);
    await expect(botao).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#sidebar-principal")).not.toHaveClass(/aberta/);
  });
});
