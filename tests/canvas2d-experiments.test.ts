import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  canvasVariants,
  easeCanvasTransition,
  getCanvasRenderPixelRatio,
  getNextCanvasComposition,
} from "../src/features/canvas2d-hero/canvas-config";

const canvasRoutes = [
  ["canvas-fluxo", "soft"],
  ["canvas-magnetico", "magnetic"],
  ["canvas-composicoes", "compositions"],
] as const;

describe("configuração dos experimentos Canvas 2D", () => {
  it("define três assinaturas autorais com intensidade crescente", () => {
    expect(Object.keys(canvasVariants)).toEqual([
      "soft",
      "magnetic",
      "compositions",
    ]);
    expect(canvasVariants.soft.pointerStrength).toBeLessThan(
      canvasVariants.magnetic.pointerStrength,
    );
    expect(canvasVariants.compositions.clickToSwitch).toBe(true);
    expect(canvasVariants.compositions.autoCycleMs).toBeGreaterThanOrEqual(5000);
  });

  it("limita DPR, alterna desenhos e suaviza as transições", () => {
    expect(getCanvasRenderPixelRatio(3, false)).toBe(1.5);
    expect(getCanvasRenderPixelRatio(3, true)).toBe(1);
    expect(getCanvasRenderPixelRatio(1.25, false)).toBe(1.25);
    expect(getNextCanvasComposition(0)).toBe(1);
    expect(getNextCanvasComposition(2)).toBe(0);
    expect(easeCanvasTransition(0)).toBe(0);
    expect(easeCanvasTransition(0.5)).toBe(0.5);
    expect(easeCanvasTransition(1)).toBe(1);
  });
});

describe("páginas experimentais Canvas 2D", () => {
  it.each(canvasRoutes)("publica %s com a variante %s", (slug, variant) => {
    const pagePath = resolve("dist/experimentos", slug, "index.html");

    expect(existsSync(pagePath), "execute o build antes do teste").toBe(true);
    const html = readFileSync(pagePath, "utf8");

    expect(html).toContain("data-studio-canvas2d");
    expect(html).toContain('data-renderer="canvas2d"');
    expect(html).toContain(`data-geometry-variant="${variant}"`);
    expect(html).toContain("data-render-status");
    expect(html).toContain("Experimentos Canvas 2D");
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(html).toContain("/experimentos/canvas-fluxo/");
    expect(html).toContain("/experimentos/canvas-magnetico/");
    expect(html).toContain("/experimentos/canvas-composicoes/");
  });

  it("preserva a Home e as rotas WebGL existentes", () => {
    const homepage = readFileSync(resolve("dist/index.html"), "utf8");

    expect(homepage).not.toContain("data-studio-canvas2d");
    expect(homepage).not.toContain("Experimentos Canvas 2D");
    for (const slug of [
      "geometria-suave",
      "geometria-magnetica",
      "geometria-composicoes",
    ]) {
      expect(existsSync(resolve("dist/experimentos", slug, "index.html"))).toBe(
        true,
      );
    }
  });

  it("declara ciclo de vida, acessibilidade de movimento e contexto 2D", () => {
    const enginePath = resolve("src/features/canvas2d-hero/studio-canvas2d.ts");

    expect(existsSync(enginePath)).toBe(true);
    const engine = readFileSync(enginePath, "utf8");

    expect(engine).toContain('getContext("2d"');
    expect(engine).toContain("requestAnimationFrame");
    expect(engine).toContain("IntersectionObserver");
    expect(engine).toContain("prefers-reduced-motion");
    expect(engine).toContain("contextlost");
    expect(engine).toContain("contextrestored");
    expect(engine).not.toContain("three");
  });
});
