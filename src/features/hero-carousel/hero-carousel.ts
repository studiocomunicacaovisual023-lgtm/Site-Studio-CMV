import { createGalleryController, type GalleryState } from "../equipment-gallery/gallery-controller";

const TRANSITION_DURATION = 850;

export function initHeroCarousel(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-slide]"));
  const selectors = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-hero-select]"));
  const stage = root.querySelector<HTMLElement>("[data-hero-slides]");
  const controls = root.querySelector<HTMLElement>("[data-hero-controls]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-hero-toggle]");
  const counter = root.querySelector<HTMLElement>("[data-hero-index]");
  if (slides.length < 2 || !stage || !controls || !toggle || !counter) return () => {};

  let current = 0;
  let transitioning = false;
  let disposed = false;
  let imagesReady = false;
  let visible = false;
  let transitionTimer: ReturnType<typeof setTimeout> | undefined;

  const finishTransition = () => {
    clearTimeout(transitionTimer);
    transitionTimer = undefined;
    slides.forEach(slide => slide.classList.remove("is-exiting"));
    transitioning = false;
  };

  const render = (state: GalleryState) => {
    if (state.reducedMotion) finishTransition();
    if (state.index !== current) {
      finishTransition();
      if (!state.reducedMotion) {
        slides[current]?.classList.add("is-exiting");
        transitioning = true;
        transitionTimer = setTimeout(finishTransition, TRANSITION_DURATION + 100);
      }
      current = state.index;
    }
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === current);
      slide.setAttribute("aria-hidden", String(index !== current));
    });
    selectors.forEach((button, index) => {
      if (index === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    const autoplay = !state.paused && !state.reducedMotion;
    root.dataset.autoplay = String(autoplay);
    stage.setAttribute("aria-live", autoplay ? "off" : "polite");
    toggle.hidden = state.reducedMotion;
    toggle.setAttribute("aria-label", autoplay ? "Pausar apresentação" : "Retomar apresentação");
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  // Compartilha o controle de tempo, pausa e movimento reduzido da galeria existente.
  const controller = createGalleryController(slides.length, render);
  const events = new AbortController();
  const options = { signal: events.signal };
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncMotion = () => controller.setEnvironment({ reducedMotion: motion.matches });
  const syncVisibility = () => controller.setEnvironment({ pageHidden: document.hidden });
  syncMotion();
  syncVisibility();
  motion.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncVisibility, options);
  window.addEventListener("pagehide", () => controller.setEnvironment({ pageHidden: true }), options);
  window.addEventListener("pageshow", syncVisibility, options);
  root.addEventListener("pointerenter", event => {
    if (event.pointerType !== "touch") controller.setEnvironment({ hovered: true });
  }, options);
  root.addEventListener("pointerleave", () => controller.setEnvironment({ hovered: false }), options);
  root.addEventListener("focusin", event => {
    if (event.target !== toggle) controller.pause();
  }, options);
  root.addEventListener("transitionend", event => {
    if (event.propertyName === "transform" && event.target instanceof HTMLElement &&
      event.target.classList.contains("is-exiting")) finishTransition();
  }, options);
  toggle.addEventListener("click", () => controller.toggle(), options);
  selectors.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (!transitioning) controller.select(index);
    }, options);
  });
  root.addEventListener("keydown", event => {
    const next = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    if (transitioning) return;
    controller.select(next);
    selectors[controller.getState().index]?.focus();
  }, options);

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    controller.setEnvironment({ visible: visible && imagesReady });
  }, { threshold: 0.25 });
  observer.observe(root);

  // A rotação só começa depois que as duas imagens estiverem prontas, evitando quadros vazios.
  const images = Array.from(stage.querySelectorAll<HTMLImageElement>("img"));
  void Promise.all(images.map(image => image.decode())).then(() => {
    if (disposed) return;
    imagesReady = true;
    root.dataset.ready = "true";
    controls.hidden = false;
    controller.setEnvironment({ visible });
  }).catch(() => {
    // Se o segundo arquivo não carregar, a primeira foto continua visível.
  });

  return () => {
    disposed = true;
    controller.destroy();
    observer.disconnect();
    events.abort();
    motion.removeEventListener("change", syncMotion);
    finishTransition();
    controls.hidden = true;
    delete root.dataset.ready;
  };
}
