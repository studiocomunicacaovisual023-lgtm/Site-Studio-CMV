export type CanvasVariant = "soft" | "magnetic" | "compositions";

export interface CanvasVariantConfig {
  label: string;
  shortLabel: string;
  description: string;
  pointerStrength: number;
  pointerRadius: number;
  pointerDamping: number;
  driftSpeed: number;
  clickToSwitch: boolean;
  autoCycleMs: number;
}

export const canvasVariants = {
  soft: {
    label: "Fluxo caligráfico",
    shortLabel: "01 · Fluxo",
    description: "A curva da Studio respira e concentra luz perto do cursor.",
    pointerStrength: 0.22,
    pointerRadius: 0.34,
    pointerDamping: 6.5,
    driftSpeed: 0.28,
    clickToSwitch: false,
    autoCycleMs: 0,
  },
  magnetic: {
    label: "Malha elástica",
    shortLabel: "02 · Malha",
    description: "Planos de fachada cedem ao cursor e recompõem o desenho técnico.",
    pointerStrength: 0.78,
    pointerRadius: 0.3,
    pointerDamping: 8.5,
    driftSpeed: 0.22,
    clickToSwitch: false,
    autoCycleMs: 0,
  },
  compositions: {
    label: "Composições vivas",
    shortLabel: "03 · Vivas",
    description: "A cena alterna entre curva, fachada técnica e pulso de luz.",
    pointerStrength: 0.34,
    pointerRadius: 0.36,
    pointerDamping: 7,
    driftSpeed: 0.2,
    clickToSwitch: true,
    autoCycleMs: 6200,
  },
} as const satisfies Record<CanvasVariant, CanvasVariantConfig>;

export function getCanvasRenderPixelRatio(
  devicePixelRatio: number,
  coarsePointer: boolean,
): number {
  const safeRatio = Number.isFinite(devicePixelRatio)
    ? Math.max(1, devicePixelRatio)
    : 1;

  return Math.min(safeRatio, coarsePointer ? 1 : 1.5);
}

export function getNextCanvasComposition(current: number): number {
  const normalized = ((Math.trunc(current) % 3) + 3) % 3;
  return (normalized + 1) % 3;
}

export function easeCanvasTransition(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * clamped * (3 - 2 * clamped);
}
