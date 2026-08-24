import {
  geometryVariants,
  getNextComposition,
  getRenderPixelRatio,
  type GeometryVariant,
} from "./geometry-config";
import { fragmentShaderSource, vertexShaderSource } from "./shaders";

interface ShaderUniforms {
  resolution: WebGLUniformLocation;
  mouse: WebGLUniformLocation;
  time: WebGLUniformLocation;
  pointerStrength: WebGLUniformLocation;
  pointerRadius: WebGLUniformLocation;
  rotationSpeed: WebGLUniformLocation;
  variant: WebGLUniformLocation;
  shapeFrom: WebGLUniformLocation;
  shapeTo: WebGLUniformLocation;
  transition: WebGLUniformLocation;
}

interface WebGLResources {
  program: WebGLProgram;
  vertexBuffer: WebGLBuffer;
  uniforms: ShaderUniforms;
}

const compositionNames = ["Curva Studio", "Planos de fachada", "Pulso de luz"];
const variantIndexes: Record<GeometryVariant, number> = {
  soft: 0,
  magnetic: 1,
  compositions: 2,
};

function isGeometryVariant(value: string | undefined): value is GeometryVariant {
  return value === "soft" || value === "magnetic" || value === "compositions";
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Não foi possível criar o shader WebGL.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const details = gl.getShaderInfoLog(shader) ?? "erro desconhecido";
    gl.deleteShader(shader);
    throw new Error(`Falha ao compilar shader WebGL: ${details}`);
  }

  return shader;
}

function getUniform(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
): WebGLUniformLocation {
  const location = gl.getUniformLocation(program, name);
  if (location === null) throw new Error(`Uniform WebGL ausente: ${name}`);
  return location;
}

function createResources(gl: WebGLRenderingContext): WebGLResources {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Não foi possível criar o programa WebGL.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, "a_position");
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {
    const details = gl.getProgramInfoLog(program) ?? "erro desconhecido";
    gl.deleteProgram(program);
    throw new Error(`Falha ao vincular programa WebGL: ${details}`);
  }

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    gl.deleteProgram(program);
    throw new Error("Não foi possível criar o buffer WebGL.");
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  return {
    program,
    vertexBuffer,
    uniforms: {
      resolution: getUniform(gl, program, "u_resolution"),
      mouse: getUniform(gl, program, "u_mouse"),
      time: getUniform(gl, program, "u_time"),
      pointerStrength: getUniform(gl, program, "u_pointerStrength"),
      pointerRadius: getUniform(gl, program, "u_pointerRadius"),
      rotationSpeed: getUniform(gl, program, "u_rotationSpeed"),
      variant: getUniform(gl, program, "u_variant"),
      shapeFrom: getUniform(gl, program, "u_shapeFrom"),
      shapeTo: getUniform(gl, program, "u_shapeTo"),
      transition: getUniform(gl, program, "u_transition"),
    },
  };
}

function initializeCanvas(canvas: HTMLCanvasElement): () => void {
  const root = canvas.closest<HTMLElement>("[data-render-root]");
  if (!root) return () => undefined;

  const rawVariant = canvas.dataset.geometryVariant;
  if (!isGeometryVariant(rawVariant)) return () => undefined;

  const config = geometryVariants[rawVariant];
  const status = root.querySelector<HTMLElement>("[data-render-status]");
  const compositionName = root.querySelector<HTMLElement>("[data-composition-name]");
  const compositionControl = root.querySelector<HTMLButtonElement>(
    "[data-composition-control]",
  );
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
  });

  let resources: WebGLResources | null = null;
  let animationFrame = 0;
  let visible = true;
  let destroyed = false;
  let reducedMotion = reducedMotionQuery.matches;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let shapeFrom = 0;
  let shapeTo = 0;
  let shapeTransition = 1;
  let lastFrameTime = performance.now();
  const startTime = lastFrameTime;

  const setStatus = (message: string): void => {
    if (status) status.textContent = message;
  };

  const markFallback = (message: string): void => {
    root.dataset.renderState = "fallback";
    root.dataset.webglState = "fallback";
    setStatus(message);
  };

  if (!gl) {
    markFallback("WebGL indisponível · fundo estático");
    return () => undefined;
  }

  const resize = (): void => {
    const bounds = canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return;

    const pixelRatio = getRenderPixelRatio(
      window.devicePixelRatio,
      coarsePointerQuery.matches,
    );
    const width = Math.max(1, Math.round(bounds.width * pixelRatio));
    const height = Math.max(1, Math.round(bounds.height * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const draw = (time: number): void => {
    if (!resources || gl.isContextLost()) return;

    const elapsed = Math.max(0, (time - startTime) / 1000);
    const delta = Math.min(Math.max((time - lastFrameTime) / 1000, 0), 0.05);
    lastFrameTime = time;

    if (coarsePointerQuery.matches && !reducedMotion) {
      targetMouseX = Math.sin(elapsed * 0.24) * 0.24;
      targetMouseY = Math.cos(elapsed * 0.19) * 0.16;
    }

    const damping = 1 - Math.exp(-config.pointerDamping * delta);
    currentMouseX += (targetMouseX - currentMouseX) * damping;
    currentMouseY += (targetMouseY - currentMouseY) * damping;

    if (shapeTransition < 1) {
      shapeTransition = Math.min(1, shapeTransition + delta / 0.72);
    }

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(resources.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, resources.vertexBuffer);
    gl.uniform2f(resources.uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(resources.uniforms.mouse, currentMouseX, currentMouseY);
    gl.uniform1f(resources.uniforms.time, reducedMotion ? 0 : elapsed);
    gl.uniform1f(resources.uniforms.pointerStrength, config.pointerStrength);
    gl.uniform1f(resources.uniforms.pointerRadius, config.pointerRadius);
    gl.uniform1f(resources.uniforms.rotationSpeed, config.rotationSpeed);
    gl.uniform1i(resources.uniforms.variant, variantIndexes[rawVariant]);
    gl.uniform1i(resources.uniforms.shapeFrom, shapeFrom);
    gl.uniform1i(resources.uniforms.shapeTo, shapeTo);
    gl.uniform1f(resources.uniforms.transition, shapeTransition);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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

  const setReady = (): void => {
    root.dataset.renderState = "ready";
    root.dataset.webglState = "ready";
    setStatus(
      config.clickToSwitch
        ? "WebGL ativo · clique no fundo"
        : "WebGL ativo · mova o cursor",
    );
  };

  const setup = (): void => {
    try {
      resources = createResources(gl);
      resize();
      setReady();
      draw(performance.now());
      start();
    } catch (error) {
      resources = null;
      markFallback("Falha no WebGL · fundo estático");
      console.error(error);
    }
  };

  const handlePointerMove = (event: PointerEvent): void => {
    if (coarsePointerQuery.matches || reducedMotion) return;
    const bounds = root.getBoundingClientRect();
    targetMouseX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    targetMouseY = (1 - (event.clientY - bounds.top) / bounds.height) * 2 - 1;
  };

  const handlePointerLeave = (): void => {
    targetMouseX = 0;
    targetMouseY = 0;
  };

  const switchComposition = (): void => {
    if (!config.clickToSwitch || reducedMotion) return;
    shapeFrom = shapeTo;
    shapeTo = getNextComposition(shapeTo);
    shapeTransition = 0;
    if (compositionName) {
      compositionName.textContent = compositionNames[shapeTo] ?? "Curva Studio";
    }
    start();
  };

  const handleBackgroundClick = (event: MouseEvent): void => {
    if (!config.clickToSwitch) return;
    if (event.target instanceof Element && event.target.closest("a, button")) return;
    switchComposition();
  };

  const handleVisibilityChange = (): void => {
    if (document.hidden) stop();
    else start();
  };

  const handleMotionPreference = (event: MediaQueryListEvent): void => {
    reducedMotion = event.matches;
    if (reducedMotion) {
      stop();
      targetMouseX = 0;
      targetMouseY = 0;
      currentMouseX = 0;
      currentMouseY = 0;
      draw(startTime);
    } else {
      start();
    }
  };

  const handleContextLost = (event: Event): void => {
    event.preventDefault();
    stop();
    resources = null;
    markFallback("Contexto WebGL perdido · fundo estático");
  };

  const handleContextRestored = (): void => {
    root.dataset.renderState = "loading";
    root.dataset.webglState = "loading";
    setStatus("Restaurando WebGL…");
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
  compositionControl?.addEventListener("click", switchComposition);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  reducedMotionQuery.addEventListener("change", handleMotionPreference);
  canvas.addEventListener("webglcontextlost", handleContextLost);
  canvas.addEventListener("webglcontextrestored", handleContextRestored);
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
    compositionControl?.removeEventListener("click", switchComposition);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.removeEventListener("change", handleMotionPreference);
    canvas.removeEventListener("webglcontextlost", handleContextLost);
    canvas.removeEventListener("webglcontextrestored", handleContextRestored);

    if (resources && !gl.isContextLost()) {
      gl.deleteBuffer(resources.vertexBuffer);
      gl.deleteProgram(resources.program);
    }
    resources = null;
  };
}

export function initializeStudioWebGL(
  scope: ParentNode = document,
): () => void {
  const cleanups = Array.from(
    scope.querySelectorAll<HTMLCanvasElement>("[data-studio-webgl]"),
    initializeCanvas,
  );

  return (): void => cleanups.forEach((cleanup) => cleanup());
}
