export type GeometryVariant = "soft" | "magnetic" | "compositions";

export interface GeometryVariantConfig {
  label: string;
  shortLabel: string;
  description: string;
  pointerStrength: number;
  pointerRadius: number;
  pointerDamping: number;
  rotationSpeed: number;
  clickToSwitch: boolean;
}

export const geometryVariants = {
  soft: {
    label: "Reação suave",
    shortLabel: "01 · Suave",
    description: "Inclinação amortecida e luz concentrada perto do cursor.",
    pointerStrength: 0.28,
    pointerRadius: 0.52,
    pointerDamping: 6.5,
    rotationSpeed: 0.055,
    clickToSwitch: false,
  },
  magnetic: {
    label: "Campo magnético",
    shortLabel: "02 · Magnética",
    description: "Os vértices cedem ao campo do cursor e retornam com elasticidade.",
    pointerStrength: 0.92,
    pointerRadius: 0.46,
    pointerDamping: 8.5,
    rotationSpeed: 0.045,
    clickToSwitch: false,
  },
  compositions: {
    label: "Composições",
    shortLabel: "03 · Composições",
    description: "Clique no fundo para alternar entre três assinaturas da Studio.",
    pointerStrength: 0.36,
    pointerRadius: 0.54,
    pointerDamping: 7,
    rotationSpeed: 0.04,
    clickToSwitch: true,
  },
} as const satisfies Record<GeometryVariant, GeometryVariantConfig>;

export function getRenderPixelRatio(
  devicePixelRatio: number,
  coarsePointer: boolean,
): number {
  const safeRatio = Number.isFinite(devicePixelRatio)
    ? Math.max(1, devicePixelRatio)
    : 1;

  return Math.min(safeRatio, coarsePointer ? 1 : 1.5);
}

export function getNextComposition(current: number): number {
  const normalized = ((Math.trunc(current) % 3) + 3) % 3;
  return (normalized + 1) % 3;
}
