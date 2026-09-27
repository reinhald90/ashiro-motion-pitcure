// ============================================
// lib/effects/_registry.ts
// Registry semua efek Ashiro
// ============================================

import type {
  EffectDefinition,
  EffectCategory,
  EffectRegistry,
} from '@/types/effect';
import { EFFECT_CATEGORIES } from '@/types/effect';

// ============================================
// IMPORT EFEK
// ============================================
// Uncomment seiring efek dibuat.
// ============================================

// --- COLOR ---
// import brightness from './color/brightness';
// import contrast from './color/contrast';
// import saturate from './color/saturate';
// import grayscale from './color/grayscale';
// import sepia from './color/sepia';
// import invert from './color/invert';
// import hueRotate from './color/hue-rotate';

// --- BLUR ---
// import blur from './blur/blur';
// import gaussianBlur from './blur/gaussian';
// import motionBlur from './blur/motion-blur';

// --- DISTORT ---
// import pixelate from './distort/pixelate';
// import ripple from './distort/ripple';
// import twirl from './distort/twirl';

// --- STYLIZE ---
// import vignette from './stylize/vignette';
// import grain from './stylize/grain';
// import glitch from './stylize/glitch';
// import posterize from './stylize/posterize';

// --- LIGHT ---
// import glow from './light/glow';
// import bloom from './light/bloom';

// --- TRANSITION ---
// import fade from './transition/fade';
// import slide from './transition/slide';

// ============================================
// DAFTAR EFEK
// ============================================

export const EFFECTS: EffectDefinition[] = [
  // --- COLOR ---
  // brightness,
  // contrast,
  // saturate,
  // grayscale,
  // sepia,
  // invert,
  // hueRotate,

  // --- BLUR ---
  // blur,
  // gaussianBlur,
  // motionBlur,

  // --- DISTORT ---
  // pixelate,
  // ripple,
  // twirl,

  // --- STYLIZE ---
  // vignette,
  // grain,
  // glitch,
  // posterize,

  // --- LIGHT ---
  // glow,
  // bloom,

  // --- TRANSITION ---
  // fade,
  // slide,
];

// ============================================
// REGISTRY MAP (auto-generated)
// ============================================

export const EFFECT_REGISTRY: EffectRegistry = new Map(
  EFFECTS.map((effect) => [effect.id, effect])
);

// ============================================
// LOOKUP FUNCTIONS
// ============================================

export function getEffect(id: string): EffectDefinition | undefined {
  return EFFECT_REGISTRY.get(id);
}

export function getEffectsByCategory(
  category: EffectCategory
): EffectDefinition[] {
  return EFFECTS.filter((e) => e.category === category);
}

export function hasEffect(id: string): boolean {
  return EFFECT_REGISTRY.has(id);
}

export function getAllEffectIds(): string[] {
  return EFFECTS.map((e) => e.id);
}

export function getEffectCount(): number {
  return EFFECTS.length;
}

// ============================================
// GROUPING (untuk UI panel efek)
// ============================================

export interface EffectGroup {
  category: EffectCategory;
  label: string;
  effects: EffectDefinition[];
}

export function getEffectsGrouped(): EffectGroup[] {
  const categories = Object.keys(EFFECT_CATEGORIES) as EffectCategory[];

  return categories
    .map((category) => ({
      category,
      label: EFFECT_CATEGORIES[category],
      effects: getEffectsByCategory(category),
    }))
    .filter((group) => group.effects.length > 0);
}

// ============================================
// SEARCH
// ============================================

export function searchEffects(query: string): EffectDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return EFFECTS;

  return EFFECTS.filter((effect) => {
    return (
      effect.name.toLowerCase().includes(q) ||
      effect.id.toLowerCase().includes(q) ||
      effect.description?.toLowerCase().includes(q) ||
      EFFECT_CATEGORIES[effect.category].toLowerCase().includes(q)
    );
  });
}

// ============================================
// VALIDASI (dev only)
// ============================================

if (process.env.NODE_ENV === 'development') {
  const ids = new Set<string>();
  for (const effect of EFFECTS) {
    if (ids.has(effect.id)) {
      console.error(
        `[effects/_registry] Duplikat ID efek: "${effect.id}".`
      );
    }
    ids.add(effect.id);

    if (!/^[a-z0-9-]+$/.test(effect.id)) {
      console.warn(
        `[effects/_registry] ID efek tidak valid: "${effect.id}".`
      );
    }

    if (!effect.params || Object.keys(effect.params).length === 0) {
      console.warn(
        `[effects/_registry] Efek "${effect.id}" tidak punya parameter.`
      );
    }

    if (typeof effect.apply !== 'function') {
      console.error(
        `[effects/_registry] Efek "${effect.id}" tidak punya method apply().`
      );
    }
  }

  if (EFFECTS.length > 0) {
    console.info(
      `[effects/_registry] ${EFFECTS.length} efek terdaftar.`,
      getAllEffectIds().join(', ')
    );
  }
}
