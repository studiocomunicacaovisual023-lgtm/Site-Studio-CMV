import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  geometryVariants,
  getNextComposition,
  getRenderPixelRatio,
} from "../src/features/webgl-hero/geometry-config";
import { fragmentShaderSource } from "../src/features/webgl-hero/shaders";

const experimentRoutes = [
  ["geometria-suave", "soft"],
  ["geometria-magnetica", "magnetic"],
  ["geometria-composicoes", "compositions"],
] as const;

describe("configuração dos experimentos WebGL", () => {
  it("mantém as três variantes comparáveis e com intensidade crescente", () => {
    expect(Object.keys(geometryVariants)).toEqual([
      "soft",
      "magnetic",
      "compositions",
    ]);
    expect(geometryVariants.soft.pointerStrength).toBeLessThan(
      geometryVariants.magnetic.pointerStrength,
    );
    expect(geometryVariants.compositions.clickToSwitch).toBe(true);
  });

  it("limita resolução e alterna composições de forma determinística", () => {
    expect(getRenderPixelRatio(3, false)).toBe(1.5);
    expect(getRenderPixelRatio(3, true)).toBe(1);
    expect(getRenderPixelRatio(1.25, false)).toBe(1.25);
    expect(getNextComposition(0)).toBe(1);
    expect(getNextComposition(2)).toBe(0);
  });

  it("mantém compatibilidade WebGL1 e posiciona a geometria na área livre da hero", () => {
    expect(fragmentShaderSource).toContain("GL_FRAGMENT_PRECISION_HIGH");
    expect(fragmentShaderSource).toContain(
      "vec2 geometryCenter = vec2(-0.18, -0.02);",
    );
    expect(fragmentShaderSource).toContain("vec4(color * alpha, alpha)");
  });
});

describe("páginas experimentais WebGL", () => {
  it.each(experimentRoutes)("publica %s com o contrato da variante %s", (slug, variant) => {
    const pagePath = resolve("dist/experimentos", slug, "index.html");

    expect(existsSync(pagePath), "execute o build antes do teste").toBe(true);
    const html = readFileSync(pagePath, "utf8");

    expect(html).toContain("data-studio-webgl");
    expect(html).toContain(`data-geometry-variant=\"${variant}\"`);
    expect(html).toContain("data-webgl-status");
    expect(html).toContain("Comparar versões");
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(html).toContain("/experimentos/geometria-suave/");
    expect(html).toContain("/experimentos/geometria-magnetica/");
    expect(html).toContain("/experimentos/geometria-composicoes/");
  });

  it("mantém o experimento fora da Home atual", () => {
    const homepage = readFileSync(resolve("dist/index.html"), "utf8");

    expect(homepage).not.toContain("data-studio-webgl");
    expect(homepage).not.toContain("Comparar versões");
  });

  it("declara os mecanismos obrigatórios de robustez no motor", () => {
    const enginePath = resolve("src/features/webgl-hero/studio-webgl.ts");

    expect(existsSync(enginePath)).toBe(true);
    const engine = readFileSync(enginePath, "utf8");

    expect(engine).toContain("prefers-reduced-motion");
    expect(engine).toContain("IntersectionObserver");
    expect(engine).toContain("webglcontextlost");
    expect(engine).toContain("webglcontextrestored");
  });
});
