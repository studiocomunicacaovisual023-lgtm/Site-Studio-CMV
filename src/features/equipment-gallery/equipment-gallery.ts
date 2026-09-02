import { createGalleryController, type GalleryState } from "./gallery-controller";

export function initEquipmentGallery(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-equipment-slide]"));
  const selectors = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-equipment-select]"));
  const stage = root.querySelector<HTMLElement>("[data-equipment-stage]");
  const controls = root.querySelector<HTMLElement>("[data-equipment-controls]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-equipment-toggle]");
  const counter = root.querySelector<HTMLElement>("[data-equipment-counter]");
  if (!slides.length || !stage || !controls || !toggle || !counter) return () => {};

  const render = (state: GalleryState) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === state.index);
      slide.setAttribute("aria-hidden", String(index !== state.index));
    });
    selectors.forEach((button, index) => {
      if (index === state.index) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    const autoplay = !state.paused && !state.reducedMotion;
    root.dataset.autoplay = String(autoplay);
    stage.setAttribute("aria-live", autoplay ? "off" : "polite");
    toggle.hidden = state.reducedMotion;
    toggle.setAttribute("aria-label", autoplay ? "Pausar apresentação" : "Retomar apresentação");
    counter.textContent = `${String(state.index + 1).padStart(2, "0")} / ${String(state.count).padStart(2, "0")}`;
  };

  const controller = createGalleryController(slides.length, render);
  const events = new AbortController();
  const options = { signal: events.signal };
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncMotion = () => controller.setEnvironment({ reducedMotion: motionQuery.matches });
  const syncVisibility = () => controller.setEnvironment({ pageHidden: document.hidden });
  syncMotion();
  syncVisibility();
  motionQuery.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncVisibility, options);
  window.addEventListener("pagehide", () => controller.setEnvironment({ pageHidden: true }), options);
  window.addEventListener("pageshow", syncVisibility, options);
  root.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") controller.setEnvironment({ hovered: true });
  }, options);
  root.addEventListener("pointerleave", () => controller.setEnvironment({ hovered: false }), options);
  // Os seletores interrompem a rotação; o botão de pausa executa sua própria ação.
  root.addEventListener("focusin", (event) => {
    if (event.target !== toggle) controller.pause();
  }, options);
  toggle.addEventListener("click", () => controller.toggle(), options);
  selectors.forEach((button, index) => {
    button.addEventListener("click", () => controller.select(index), options);
  });
  root.addEventListener("keydown", (event) => {
    const current = controller.getState().index;
    const target = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    controller.select(target);
    selectors[controller.getState().index]?.focus();
  }, options);

  const observer = typeof IntersectionObserver === "undefined" ? undefined : new IntersectionObserver(
    ([entry]) => controller.setEnvironment({ visible: Boolean(entry?.isIntersecting) }),
    { threshold: 0.25 },
  );
  if (observer) observer.observe(root);
  else controller.setEnvironment({ visible: true });
  controls.hidden = slides.length < 2;
  root.dataset.ready = "true";

  return () => {
    controller.destroy();
    observer?.disconnect();
    events.abort();
    motionQuery.removeEventListener("change", syncMotion);
    controls.hidden = true;
    delete root.dataset.ready;
  };
}
