import { useMemo, useSyncExternalStore } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./ParticleNetworkBackground.css";

// @tsparticles/react 4.x: a engine é preparada pelo ParticlesProvider (não
// existe mais initParticlesEngine). O init precisa ser a MESMA função durante
// toda a vida do app (exigência do provider), por isso fica no módulo.
async function registrarPlugins(engine) {
  await loadSlim(engine);
}

// Cores por tema. Escuro: exatamente as de antes. Claro: partículas azuis e
// linhas azul-acinzentadas, visíveis sobre o fundo #f5f8fc (CSS).
const CORES = {
  escuro: { particula: "#82caff", opacidade: 0.35, linha: "#82caff", opacidadeLinha: 0.16 },
  claro: { particula: "#2f6fd0", opacidade: 0.55, linha: "#5a7391", opacidadeLinha: 0.32 },
};

// Tema atual lido do sistema existente (useTema aplica <html data-tema>).
// Só leitura: não cria outro estado de tema.
function assinarTema(avisar) {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-tema"],
  });
  return () => observador.disconnect();
}

function lerTema() {
  return document.documentElement.dataset.tema === "claro" ? "claro" : "escuro";
}

export default function ParticleNetworkBackground() {
  // Ao trocar o tema, as options mudam e o <Particles> recria a rede com as
  // cores novas (sem recarregar a página)
  const tema = useSyncExternalStore(assinarTema, lerTema);
  const cores = CORES[tema];

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 45,
      detectRetina: true,
      particles: {
        number: {
          value: 75,
          // v4: densidade por largura x altura de referência (area não existe)
          density: { enable: true, width: 1000, height: 1000 },
        },
        // v4: a cor da partícula fica em paint.color (particles.color foi
        // removido e era ignorado, desenhando as partículas em branco)
        paint: { color: { value: cores.particula } },
        opacity: { value: cores.opacidade },
        size: { value: { min: 1, max: 2 } },
        links: {
          enable: true,
          distance: 140,
          color: cores.linha,
          opacity: cores.opacidadeLinha,
          width: 0.7,
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.5,
            speed: 0.5,
          },
        },
      },
    }),
    [cores],
  );

  // O fundo escuro aparece já no primeiro quadro; o canvas entra quando o
  // provider termina de registrar os plugins
  return (
    <div className="particle-network-background" aria-hidden="true">
      <ParticlesProvider init={registrarPlugins}>
        <Particles id="tecnologias-particles" options={options} />
      </ParticlesProvider>
    </div>
  );
}
