import { defineConfig, devices } from "@playwright/test";

// Testes de regressão da navegação (e2e/). Sobem o Vite numa porta própria
// para não disputar com um `npm run dev` aberto.
const PORTA = 5199;
const DESKTOP = { width: 1366, height: 768 };

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // A roda 3D e o vídeo de fundo pesam: com mais navegadores em paralelo, os
  // testes estouram o tempo nesta máquina
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORTA}/`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run dev -- --port ${PORTA} --strictPort`,
    url: `http://localhost:${PORTA}/`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], viewport: DESKTOP } },
    { name: "desktop-firefox", use: { ...devices["Desktop Firefox"], viewport: DESKTOP } },
    { name: "desktop-webkit", use: { ...devices["Desktop Safari"], viewport: DESKTOP } },
    { name: "celular-chromium", use: { ...devices["Pixel 7"] } },
    { name: "celular-webkit", use: { ...devices["iPhone 14"] } },
  ],
});
