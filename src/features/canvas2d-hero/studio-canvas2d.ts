import {
  canvasVariants,
  easeCanvasTransition,
  getCanvasRenderPixelRatio,
  getNextCanvasComposition,
  type CanvasVariant,
  type CanvasVariantConfig,
} from "./canvas-config";

interface Point {
  x: number;
  y: number;
}

interface DrawingState {
  width: number;
  height: number;
  time: number;
  pointer: Point;
  pointerActive: boolean;
  config: CanvasVariantConfig;
}

interface CurvePoint {
  x: number;
  y: number;
}

const compositionNames = ["Curva Studio", "Fachada técnica", "Pulso de luz"];
const curvePoints: ReadonlyArray<CurvePoint> = [
  { x: -0.52, y: -0.66 },
  { x: -0.2, y: -0.82 },
  { x: 0.2, y: -0.64 },
  { x: 0.42, y: -0.34 },
  { x: 0.2, y: -0.08 },
  { x: -0.18, y: 0.02 },
  { x: -0.42, y: 0.3 },
  { x: -0.18, y: 0.61 },
  { x: 0.2, y: 0.73 },
  { x: 0.5, y: 0.52 },
];

function isCanvasVariant(value: string | undefined): value is CanvasVariant {
  return value === "soft" || value === "magnetic" || value === "compositions";
}

function rgba(red: number, green: number, blue: number, alpha: number): string {
  return `rgba(${red}, ${green}, ${blue}, ${Math.min(1, Math.max(0, alpha))})`;
}

function getGeometryMetrics(state: DrawingState): {
  center: Point;
  scale: number;
} {
  return {
    center: {
      x: state.width < 768 ? state.width * 0.52 : state.width * 0.4,
      y: state.height * 0.48,
    },
    scale: Math.min(state.width * 0.48, state.height * 0.72),
  };
}

function applyPointerField(
  point: Point,
  state: DrawingState,
  mode: CanvasVariant,
  index: number,
): Point {
  const drift = Math.sin(state.time * state.config.driftSpeed + index * 0.71);
  const result = {
    x: point.x + drift * 2.2,
    y: point.y + Math.cos(state.time * state.config.driftSpeed * 0.8 + index) * 1.8,
  };

  if (!state.pointerActive) return result;

  const radius = Math.min(state.width, state.height) * state.config.pointerRadius;
  const deltaX = result.x - state.pointer.x;
  const deltaY = result.y - state.pointer.y;
  const distance = Math.hypot(deltaX, deltaY);
  const influence = Math.max(0, 1 - distance / Math.max(radius, 1));

  if (mode === "magnetic") {
    const safeDistance = Math.max(distance, 1);
    const force = influence * influence * state.config.pointerStrength * radius * 0.3;
    result.x += (deltaX / safeDistance) * force;
    result.y += (deltaY / safeDistance) * force;
  } else {
    result.x += (state.pointer.x - result.x) * influence * state.config.pointerStrength * 0.055;
    result.y += (state.pointer.y - result.y) * influence * state.config.pointerStrength * 0.04;
  }

  return result;
}

function getCurveScreenPoints(
  state: DrawingState,
  mode: CanvasVariant,
  offset: number,
): Array<Point> {
  const { center, scale } = getGeometryMetrics(state);
  const rotation = Math.sin(state.time * 0.11) * 0.025;
  const sine = Math.sin(rotation);
  const cosine = Math.cos(rotation);

  return curvePoints.map((point, index) => {
    const localX = point.x * scale + offset * scale;
    const localY = point.y * scale + offset * scale * 0.24;
    const rotated = {
      x: center.x + localX * cosine - localY * sine,
      y: center.y + localX * sine + localY * cosine,
    };
    return applyPointerField(rotated, state, mode, index);
  });
}

function traceSmoothPath(
  context: CanvasRenderingContext2D,
  points: ReadonlyArray<Point>,
): void {
  const first = points[0];
  if (!first || points.length < 2) return;

  context.beginPath();
  context.moveTo(first.x, first.y);

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    if (!current || !next) continue;
    context.quadraticCurveTo(
      current.x,
      current.y,
      (current.x + next.x) * 0.5,
      (current.y + next.y) * 0.5,
    );
  }

  const last = points.at(-1);
  if (last) context.lineTo(last.x, last.y);
}

function strokeSmoothPath(
  context: CanvasRenderingContext2D,
  points: ReadonlyArray<Point>,
  alpha: number,
  intensity: number,
): void {
  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  traceSmoothPath(context, points);
  context.lineWidth = 9;
  context.strokeStyle = rgba(8, 120, 249, alpha * 0.08 * intensity);
  context.stroke();

  traceSmoothPath(context, points);
  context.lineWidth = 3.2;
  context.strokeStyle = rgba(42, 157, 255, alpha * 0.62 * intensity);
  context.stroke();

  traceSmoothPath(context, points);
  context.lineWidth = 1;
  context.strokeStyle = rgba(150, 218, 255, alpha * 0.74 * intensity);
  context.stroke();
  context.restore();
}

function drawNodes(
  context: CanvasRenderingContext2D,
  points: ReadonlyArray<Point>,
  indexes: ReadonlyArray<number>,
  alpha: number,
): void {
  context.save();
  context.fillStyle = rgba(42, 157, 255, alpha * 0.16);
  context.beginPath();
  for (const index of indexes) {
    const point = points[index];
    if (!point) continue;
    context.moveTo(point.x + 8, point.y);
    context.arc(point.x, point.y, 8, 0, Math.PI * 2);
  }
  context.fill();

  context.fillStyle = rgba(191, 231, 255, alpha * 0.92);
  context.beginPath();
  for (const index of indexes) {
    const point = points[index];
    if (!point) continue;
    context.moveTo(point.x + 2.2, point.y);
    context.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
  }
  context.fill();
  context.restore();
}

function drawStudioCurve(
  context: CanvasRenderingContext2D,
  state: DrawingState,
  alpha: number,
  mode: CanvasVariant = "soft",
): void {
  const primary = getCurveScreenPoints(state, mode, 0);
  const ribbon = getCurveScreenPoints(state, mode, -0.055);
  strokeSmoothPath(context, primary, alpha, 1);
  strokeSmoothPath(context, ribbon, alpha * 0.58, 0.64);
  drawNodes(context, primary, [0, 3, 5, 7, 9], alpha);
}

function getFacadeGrid(state: DrawingState, mode: CanvasVariant): Array<Array<Point>> {
  const { center, scale } = getGeometryMetrics(state);
  const rows: Array<Array<Point>> = [];

  for (let row = 0; row < 5; row += 1) {
    const points: Array<Point> = [];
    for (let column = 0; column < 6; column += 1) {
      const horizontal = column / 5;
      const vertical = row / 4;
      const point = {
        x: center.x + (-0.73 + horizontal * 1.43 + vertical * 0.12) * scale,
        y: center.y + (-0.63 + vertical * 1.24 + horizontal * 0.1) * scale,
      };
      points.push(applyPointerField(point, state, mode, row * 6 + column));
    }
    rows.push(points);
  }

  return rows;
}

function traceFacadeLines(
  context: CanvasRenderingContext2D,
  grid: ReadonlyArray<ReadonlyArray<Point>>,
): void {
  context.beginPath();
  for (const row of grid) {
    const first = row[0];
    if (!first) continue;
    context.moveTo(first.x, first.y);
    for (let column = 1; column < row.length; column += 1) {
      const point = row[column];
      if (point) context.lineTo(point.x, point.y);
    }
  }

  const columns = grid[0]?.length ?? 0;
  for (let column = 0; column < columns; column += 1) {
    const first = grid[0]?.[column];
    if (!first) continue;
    context.moveTo(first.x, first.y);
    for (let row = 1; row < grid.length; row += 1) {
      const point = grid[row]?.[column];
      if (point) context.lineTo(point.x, point.y);
    }
  }
}

function drawFacadeGrid(
  context: CanvasRenderingContext2D,
  state: DrawingState,
  alpha: number,
  mode: CanvasVariant = "magnetic",
): void {
  const grid = getFacadeGrid(state, mode);
  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  traceFacadeLines(context, grid);
  context.lineWidth = 7;
  context.strokeStyle = rgba(8, 120, 249, alpha * 0.07);
  context.stroke();

  traceFacadeLines(context, grid);
  context.lineWidth = 1.2;
  context.strokeStyle = rgba(42, 157, 255, alpha * 0.45);
  context.stroke();

  const corners = [grid[0]?.[0], grid[0]?.[5], grid[4]?.[0], grid[4]?.[5]].filter(
    (point): point is Point => point !== undefined,
  );
  drawNodes(context, corners, [0, 1, 2, 3], alpha * 0.86);
  context.restore();
}

function drawLightPulse(
  context: CanvasRenderingContext2D,
  state: DrawingState,
  alpha: number,
): void {
  const { center, scale } = getGeometryMetrics(state);
  const pulse = 1 + Math.sin(state.time * 0.8) * 0.035;
  const radii = [scale * 0.26 * pulse, scale * 0.5 * pulse];

  context.save();
  context.lineCap = "round";
  context.strokeStyle = rgba(42, 157, 255, alpha * 0.42);
  context.lineWidth = 1.4;
  context.beginPath();
  for (const radius of radii) {
    context.moveTo(center.x + radius, center.y);
    context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  }
  context.stroke();

  context.beginPath();
  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2 + state.time * 0.035;
    context.moveTo(center.x, center.y);
    context.lineTo(
      center.x + Math.cos(angle) * scale * 0.64,
      center.y + Math.sin(angle) * scale * 0.64,
    );
  }
  context.strokeStyle = rgba(100, 186, 255, alpha * 0.5);
  context.stroke();

  const glow = context.createRadialGradient(
    center.x,
    center.y,
    0,
    center.x,
    center.y,
    scale * 0.18,
  );
  glow.addColorStop(0, rgba(100, 186, 255, alpha * 0.34));
  glow.addColorStop(1, rgba(8, 120, 249, 0));
  context.fillStyle = glow;
  context.beginPath();
  context.arc(center.x, center.y, scale * 0.18, 0, Math.PI * 2);
  context.fill();
  drawNodes(context, [center], [0], alpha);
  context.restore();
}

function drawPointerLight(
  context: CanvasRenderingContext2D,
  state: DrawingState,
): void {
  if (!state.pointerActive) return;
  const radius = Math.min(state.width, state.height) * state.config.pointerRadius * 0.62;
  const gradient = context.createRadialGradient(
    state.pointer.x,
    state.pointer.y,
    0,
    state.pointer.x,
    state.pointer.y,
    radius,
  );
  gradient.addColorStop(0, rgba(100, 186, 255, 0.13));
  gradient.addColorStop(0.34, rgba(8, 120, 249, 0.05));
  gradient.addColorStop(1, rgba(8, 120, 249, 0));
  context.fillStyle = gradient;
  context.fillRect(
    state.pointer.x - radius,
    state.pointer.y - radius,
    radius * 2,
    radius * 2,
  );
}

function drawComposition(
  context: CanvasRenderingContext2D,
  state: DrawingState,
  shape: number,
  alpha: number,
): void {
  if (shape === 0) drawStudioCurve(context, state, alpha, "soft");
  else if (shape === 1) drawFacadeGrid(context, state, alpha, "soft");
  else drawLightPulse(context, state, alpha);
}

function initializeCanvas(canvas: HTMLCanvasElement): () => void {
  const root = canvas.closest<HTMLElement>("[data-render-root]");
  if (!root) return () => undefined;

  const rawVariant = canvas.dataset.geometryVariant;
  if (!isCanvasVariant(rawVariant)) return () => undefined;

  const config = canvasVariants[rawVariant];
  const status = root.querySelector<HTMLElement>("[data-render-status]");
  const compositionName = root.querySelector<HTMLElement>("[data-composition-name]");
  const compositionControl = root.querySelector<HTMLButtonElement>(
    "[data-composition-control]",
  );
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const context = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
  });

  let animationFrame = 0;
  let visible = true;
  let destroyed = false;
  let contextAvailable = context !== null;
  let reducedMotion = reducedMotionQuery.matches;
  let pointerActive = false;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let shapeFrom = 0;
  let shapeTo = 0;
  let shapeTransition = 1;
  let lastFrameTime = performance.now();
  let lastCompositionSwitch = lastFrameTime;
  let viewWidth = 1;
  let viewHeight = 1;
  let pixelRatio = 1;
  const startTime = lastFrameTime;

  const setStatus = (message: string): void => {
    if (status) status.textContent = message;
  };

  const markFallback = (message: string): void => {
    root.dataset.renderState = "fallback";
    setStatus(message);
  };

  if (!context) {
    markFallback("Canvas 2D indisponível · fundo estático");
    return () => undefined;
  }

  const resize = (): void => {
    const bounds = canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return;

    pixelRatio = getCanvasRenderPixelRatio(
      window.devicePixelRatio,
      coarsePointerQuery.matches,
    );
    viewWidth = bounds.width;
    viewHeight = bounds.height;
    const width = Math.max(1, Math.round(viewWidth * pixelRatio));
    const height = Math.max(1, Math.round(viewHeight * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const switchComposition = (time = performance.now()): void => {
    if (!config.clickToSwitch || reducedMotion) return;
    shapeFrom = shapeTo;
    shapeTo = getNextCanvasComposition(shapeTo);
    shapeTransition = 0;
    lastCompositionSwitch = time;
    if (compositionName) {
      compositionName.textContent = compositionNames[shapeTo] ?? "Curva Studio";
    }
  };

  const draw = (time: number): void => {
    if (!contextAvailable || context.isContextLost()) return;

    const elapsed = Math.max(0, (time - startTime) / 1000);
    const delta = Math.min(Math.max((time - lastFrameTime) / 1000, 0), 0.05);
    lastFrameTime = time;

    if (coarsePointerQuery.matches && !reducedMotion) {
      pointerActive = true;
      targetMouseX = Math.sin(elapsed * 0.22) * 0.28;
      targetMouseY = Math.cos(elapsed * 0.18) * 0.2;
    }

    const damping = 1 - Math.exp(-config.pointerDamping * delta);
    currentMouseX += (targetMouseX - currentMouseX) * damping;
    currentMouseY += (targetMouseY - currentMouseY) * damping;

    if (shapeTransition < 1) {
      shapeTransition = Math.min(1, shapeTransition + delta / 0.78);
    }
    if (
      config.autoCycleMs > 0 &&
      !reducedMotion &&
      time - lastCompositionSwitch >= config.autoCycleMs
    ) {
      switchComposition(time);
    }

    context.save();
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, viewWidth, viewHeight);
    context.globalCompositeOperation = "lighter";

    const state: DrawingState = {
      width: viewWidth,
      height: viewHeight,
      time: reducedMotion ? 0 : elapsed,
      pointer: {
        x: ((currentMouseX + 1) * 0.5) * viewWidth,
        y: ((1 - currentMouseY) * 0.5) * viewHeight,
      },
      pointerActive,
      config,
    };

    drawPointerLight(context, state);
    if (rawVariant === "soft") {
      drawStudioCurve(context, state, 0.96, "soft");
      drawFacadeGrid(context, state, 0.2, "soft");
    } else if (rawVariant === "magnetic") {
      drawFacadeGrid(context, state, 0.94, "magnetic");
      drawStudioCurve(context, state, 0.26, "magnetic");
    } else {
      const transition = easeCanvasTransition(shapeTransition);
      drawComposition(context, state, shapeFrom, 1 - transition);
      drawComposition(context, state, shapeTo, transition);
    }
    context.restore();
  };

  const stop = (): void => {
    if (!animationFrame) return;
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  };

  const tick = (time: number): void => {
    animationFrame = 0;
    if (destroyed || !visible || document.hidden || reducedMotion) return;
    draw(time);
    animationFrame = requestAnimationFrame(tick);
  };

  const start = (): void => {
    if (destroyed || animationFrame || !visible || document.hidden || reducedMotion) return;
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(tick);
  };

  const setup = (): void => {
    try {
      contextAvailable = true;
      resize();
      root.dataset.renderState = "ready";
      setStatus(
        config.clickToSwitch
          ? "Canvas 2D ativo · clique no fundo"
          : "Canvas 2D ativo · mova o cursor",
      );
      draw(performance.now());
      start();
    } catch (error) {
      contextAvailable = false;
      markFallback("Falha no Canvas 2D · fundo estático");
      console.error(error);
    }
  };

  const handlePointerMove = (event: PointerEvent): void => {
    if (coarsePointerQuery.matches || reducedMotion) return;
    const bounds = root.getBoundingClientRect();
    pointerActive = true;
    targetMouseX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    targetMouseY = (1 - (event.clientY - bounds.top) / bounds.height) * 2 - 1;
  };

  const handlePointerLeave = (): void => {
    pointerActive = false;
    targetMouseX = 0;
    targetMouseY = 0;
  };

  const handleBackgroundClick = (event: MouseEvent): void => {
    if (!config.clickToSwitch) return;
    if (event.target instanceof Element && event.target.closest("a, button")) return;
    switchComposition();
    start();
  };

  const handleControlClick = (): void => {
    switchComposition();
    start();
  };

  const handleVisibilityChange = (): void => {
    if (document.hidden) stop();
    else start();
  };

  const handleMotionPreference = (event: MediaQueryListEvent): void => {
    reducedMotion = event.matches;
    if (reducedMotion) {
      stop();
      pointerActive = false;
      targetMouseX = 0;
      targetMouseY = 0;
      currentMouseX = 0;
      currentMouseY = 0;
      draw(startTime);
    } else {
      lastCompositionSwitch = performance.now();
      start();
    }
  };

  const handleContextLost = (event: Event): void => {
    event.preventDefault();
    contextAvailable = false;
    stop();
    markFallback("Contexto Canvas 2D perdido · fundo estático");
  };

  const handleContextRestored = (): void => {
    root.dataset.renderState = "loading";
    setStatus("Restaurando Canvas 2D…");
    setup();
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    },
    { threshold: 0.02 },
  );
  const resizeObserver = new ResizeObserver(resize);

  root.addEventListener("pointermove", handlePointerMove, { passive: true });
  root.addEventListener("pointerleave", handlePointerLeave);
  root.addEventListener("click", handleBackgroundClick);
  compositionControl?.addEventListener("click", handleControlClick);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  reducedMotionQuery.addEventListener("change", handleMotionPreference);
  canvas.addEventListener("contextlost", handleContextLost);
  canvas.addEventListener("contextrestored", handleContextRestored);
  visibilityObserver.observe(root);
  resizeObserver.observe(canvas);
  setup();

  return (): void => {
    destroyed = true;
    stop();
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    root.removeEventListener("pointermove", handlePointerMove);
    root.removeEventListener("pointerleave", handlePointerLeave);
    root.removeEventListener("click", handleBackgroundClick);
    compositionControl?.removeEventListener("click", handleControlClick);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.removeEventListener("change", handleMotionPreference);
    canvas.removeEventListener("contextlost", handleContextLost);
    canvas.removeEventListener("contextrestored", handleContextRestored);
  };
}

export function initializeStudioCanvas2D(
  scope: ParentNode = document,
): () => void {
  const cleanups = Array.from(
    scope.querySelectorAll<HTMLCanvasElement>("[data-studio-canvas2d]"),
    initializeCanvas,
  );

  return (): void => cleanups.forEach((cleanup) => cleanup());
}
