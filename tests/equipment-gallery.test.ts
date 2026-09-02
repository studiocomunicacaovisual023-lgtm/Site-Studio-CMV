import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";
import { createGalleryController, EQUIPMENT_INTERVAL } from "../src/features/equipment-gallery/gallery-controller";

describe("rotação dos equipamentos", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); });

  it("preserva a primeira imagem e só inicia quando o card fica visível", () => {
    const gallery = createGalleryController(7, vi.fn());
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 2);
    expect(gallery.getState().index).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    gallery.setEnvironment({ visible: true });
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL - 1);
    expect(gallery.getState().index).toBe(0);
    vi.advanceTimersByTime(1);
    expect(gallery.getState().index).toBe(1);
    gallery.destroy();
  });

  it("passa pelas sete imagens e retorna à primeira sem acumular timers", () => {
    const gallery = createGalleryController(7, vi.fn());
    gallery.setEnvironment({ visible: true });
    for (let step = 1; step <= 14; step++) {
      vi.advanceTimersByTime(EQUIPMENT_INTERVAL);
      expect(gallery.getState().index).toBe(step % 7);
      expect(vi.getTimerCount()).toBe(1);
    }
    gallery.destroy();
  });

  it.each(["hovered", "pageHidden", "reducedMotion"] as const)("interrompe enquanto %s estiver ativo", (reason) => {
    const gallery = createGalleryController(7, vi.fn());
    gallery.setEnvironment({ visible: true });
    gallery.setEnvironment({ [reason]: true });
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 3);
    expect(gallery.getState().index).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    gallery.setEnvironment({ [reason]: false });
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL);
    expect(gallery.getState().index).toBe(1);
    gallery.destroy();
  });

  it("não avança fora da tela e retoma com um intervalo completo", () => {
    const gallery = createGalleryController(7, vi.fn());
    gallery.setEnvironment({ visible: true });
    vi.advanceTimersByTime(2000);
    gallery.setEnvironment({ visible: false });
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 4);
    gallery.setEnvironment({ visible: true });
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL - 1);
    expect(gallery.getState().index).toBe(0);
    vi.advanceTimersByTime(1);
    expect(gallery.getState().index).toBe(1);
    gallery.destroy();
  });

  it("mantém a seleção manual até o visitante retomar a apresentação", () => {
    const gallery = createGalleryController(7, vi.fn());
    gallery.setEnvironment({ visible: true });
    gallery.select(4);
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 3);
    gallery.setEnvironment({ hovered: true });
    gallery.setEnvironment({ hovered: false });
    expect(gallery.getState()).toMatchObject({ index: 4, paused: true, playing: false });
    gallery.toggle();
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL);
    expect(gallery.getState().index).toBe(5);
    gallery.pause();
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 2);
    expect(gallery.getState().index).toBe(5);
    gallery.destroy();
  });

  it("permite navegação circular manual mesmo com movimento reduzido", () => {
    const gallery = createGalleryController(7, vi.fn());
    gallery.setEnvironment({ visible: true, reducedMotion: true });
    gallery.select(-1);
    expect(gallery.getState().index).toBe(6);
    gallery.select(7);
    expect(gallery.getState().index).toBe(0);
    gallery.toggle();
    expect(vi.getTimerCount()).toBe(0);
    gallery.destroy();
  });

  it("cancela a rotação na desmontagem e não agenda timers para uma única imagem", () => {
    const onChange = vi.fn();
    const gallery = createGalleryController(7, onChange);
    gallery.setEnvironment({ visible: true });
    gallery.destroy();
    onChange.mockClear();
    vi.advanceTimersByTime(EQUIPMENT_INTERVAL * 3);
    expect(onChange).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    const single = createGalleryController(1, vi.fn());
    single.setEnvironment({ visible: true });
    expect(vi.getTimerCount()).toBe(0);
    single.destroy();
  });
});

describe("galeria de equipamentos integrada", () => {
  const html = () => readFileSync(resolve("dist/index.html"), "utf8");

  it("mantém a Mimaki inicial e acrescenta os seis equipamentos solicitados", () => {
    const gallery = html().match(/<equipment-gallery\b[\s\S]*?<\/equipment-gallery>/)?.[0] ?? "";
    expect(gallery).not.toBe("");
    const slides = [...gallery.matchAll(/<figure\b[^>]*data-equipment-slide[\s\S]*?<\/figure>/g)].map((match) => match[0]);
    expect(slides).toHaveLength(7);
    expect(slides[0]).toContain("studio-impressora");
    expect(slides[0]).toContain('aria-hidden="false"');
    for (const [index, title] of ["Router CNC", "Plotter de grande formato", "Impressora de alta resolução", "Máquina de corte a laser", "Gravação a laser em metal", "Impressora Konica"].entries()) {
      expect(slides[index + 1]).toContain(title);
      expect(slides[index + 1]).toContain("Imagem ilustrativa");
      expect(slides[index + 1]).toContain('aria-hidden="true"');
    }
    expect(gallery.match(/data-equipment-select=/g)).toHaveLength(7);
    expect(gallery).toContain('aria-label="Pausar apresentação"');
    expect(gallery).toContain('aria-roledescription="carrossel"');
    expect(gallery).not.toContain("Acervo Studio");
  });

  it("oferece controles progressivos, pausa e limpeza dos eventos sem biblioteca adicional", () => {
    const component = readFileSync(resolve("src/components/ui/EquipmentGallery.astro"), "utf8");
    const behavior = readFileSync(resolve("src/features/equipment-gallery/equipment-gallery.ts"), "utf8");
    expect(component).toContain("data-equipment-controls hidden");
    expect(component).toContain("object-fit: contain");
    expect(component).toContain("prefers-reduced-motion: reduce");
    expect(component).toContain("disconnectedCallback");
    expect(behavior).toContain("IntersectionObserver");
    expect(behavior).toContain("visibilitychange");
    expect(behavior).toContain("pointerenter");
    expect(behavior).toContain("focusin");
    expect(behavior).toContain("ArrowLeft");
    expect(behavior).toContain("ArrowRight");
    expect(behavior).toContain("events.abort()");
    expect(behavior).toContain("controller.destroy()");
  });

  it("amplia o card no desktop e preserva uma composição própria no celular", () => {
    const about = readFileSync(resolve("src/components/sections/About.astro"), "utf8");
    const gallery = readFileSync(resolve("src/components/ui/EquipmentGallery.astro"), "utf8");
    expect(about).toContain("grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr)");
    expect(about).toContain("gap: clamp(3rem, 6vw, 6rem)");
    expect(about).toContain("min-height: 39rem");
    expect(about).toContain("inset: 0 10% 8% 0");
    expect(about).toContain("inset: 0 8% 10% 0");
    expect(about).toContain("min-height: min(34rem, 125vw)");
    expect(about).toMatch(/\.detail-image\s*\{[^}]*width: 28%;[^}]*height: 25%;/);
    expect(gallery).toContain("inset: 4.25rem 0.3rem 6.25rem");
    expect(gallery).not.toContain("inset: 5.8rem");
    // A imagem usa a altura explícita do bloco, sem uma linha de grid intrínseca
    // que possa crescer sobre a legenda e os controles.
    const imageBox = gallery.match(/\.equipment-image\s*\{([^}]+)\}/)?.[1] ?? "";
    expect(imageBox).not.toContain("display: grid");
    expect(gallery).toContain("object-fit: contain");

    for (const viewport of [1024, 1280, 1440, 1920]) {
      const gutter = Math.min(48, Math.max(20, viewport * 0.04));
      const container = Math.min(1312, viewport - 2 * gutter);
      const previousWidth = (container - Math.min(128, Math.max(48, viewport * 0.08))) * 0.46 * 0.89;
      const currentWidth = (container - Math.min(96, Math.max(48, viewport * 0.06))) * 0.52 * 0.9;
      expect(currentWidth / previousWidth).toBeGreaterThanOrEqual(1.15);
      expect(currentWidth / previousWidth).toBeLessThanOrEqual(1.2);
    }
  });

  it("coloca a pausa discreta junto às bolinhas sem botão branco no topo", () => {
    const source = readFileSync(resolve("src/components/ui/EquipmentGallery.astro"), "utf8");
    const controls = html().match(/<div\b[^>]*data-equipment-controls[\s\S]*?<\/equipment-gallery>/)?.[0] ?? "";
    expect(controls.indexOf("data-equipment-toggle")).toBeGreaterThan(controls.indexOf("equipment-pagination"));
    expect(controls).toContain('aria-label="Pausar apresentação"');
    const toggleStyle = source.match(/\.playback-control\s*\{([^}]+)\}/)?.[1] ?? "";
    expect(toggleStyle).toContain("background: transparent");
    expect(toggleStyle).toContain("border: 0");
    expect(toggleStyle).not.toContain("position: absolute");
    expect(toggleStyle).not.toContain("border-radius: 50%");
    expect(source).toMatch(/\.equipment-controls\s*\{[^}]*bottom: 0\.4rem;[^}]*display: flex;/);
    expect(source).toContain("button:focus-visible");
  });

  it("usa seis imagens distintas de alta resolução com a mesma proporção", async () => {
    const names = ["router-cnc", "large-format-plotter", "high-resolution-printer", "laser-cutting", "metal-engraving", "konica-press"];
    const hashes = new Set<string>();
    for (const name of names) {
      const path = resolve(`src/assets/generated/equipment/equipment-${name}.png`);
      const { width = 0, height = 0 } = await sharp(path).metadata();
      expect(width).toBeGreaterThanOrEqual(1400);
      expect(width / height).toBeCloseTo(4 / 3, 2);
      hashes.add(readFileSync(path).toString("base64"));
    }
    expect(hashes.size).toBe(6);
  });
});
