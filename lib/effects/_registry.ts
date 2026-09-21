// ============================================
// lib/effects/_registry.ts
// Registry semua efek Ashiro
// ============================================
// Setiap efek baru WAJIB didaftarkan di sini.
// UI panel efek baca dari file ini.
// ============================================

import type {
  EffectDefinition,
  EffectCategory,
  EffectRegistry,
} from '@types/effect';
import { EFFECT_CATEGORIES } from '@types/effect';

// ============================================
// IMPORT EFEK
// ============================================
// Uncomment seiring efek dibuat.
// Setiap efek 1 file, 1 import.
//
// Format: import <namaEfek> from './<kategori>/<file>';
//
// Karena belum ada efek yang dibuat, semua di-comment dulu.
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
// Uncomment seiring import di atas.
// Urutan di sini menentukan urutan tampil di UI panel efek.
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
// Map id → definisi. Untuk lookup cepat.
// ============================================

export const EFFECT_REGISTRY: EffectRegistry = new Map(
  EFFECTS.map((effect) => [effect.id, effect])
);

// ============================================
// LOOKUP FUNCTIONS
// ============================================

/**
 * Ambil efek by ID.
 * @returns EffectDefinition atau undefined kalau tidak ada.
 */
export function getEffect(id: string): EffectDefinition | undefined {
  return EFFECT_REGISTRY.get(id);
}

/**
 * Ambil efek by kategori.
 */
export function getEffectsByCategory(
  category: EffectCategory
): EffectDefinition[] {
  return EFFECTS.filter((e) => e.category === category);
}

/**
 * Cek efek ada atau tidak.
 */
export function hasEffect(id: string): boolean {
  return EFFECT_REGISTRY.has(id);
}

/**
 * Semua ID efek yang terdaftar.
 */
export function getAllEffectIds(): string[] {
  return EFFECTS.map((e) => e.id);
}

/**
 * Total efek terdaftar.
 */
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

/**
 * Kelompokkan efek per kategori.
 * UI panel efek pakai ini untuk bikin tab/section.
 */
export function getEffectsGrouped(): EffectGroup[] {
  const categories = Object.keys(EFFECT_CATEGORIES) as EffectCategory[];

  return categories
    .map((category) => ({
      category,
      label: EFFECT_CATEGORIES[category],
      effects: getEffectsByCategory(category),
    }))
    .filter((group) => group.effects.length > 0); // skip kategori kosong
}

// ============================================
// SEARCH (untuk fitur search di panel efek)
// ============================================

/**
 * Cari efek berdasarkan nama/id/deskripsi.
 */
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
// Cek duplikat ID dan format ID saat development.
// Tidak jalan di production.
// ============================================

if (process.env.NODE_ENV === 'development') {
  const ids = new Set<string>();
  for (const effect of EFFECTS) {
    // Cek duplikat
    if (ids.has(effect.id)) {
      console.error(
        `[effects/_registry] Duplikat ID efek: "${effect.id}". Setiap efek harus punya ID unik.`
      );
    }
    ids.add(effect.id);

    // Cek format ID
    if (!/^[a-z0-9-]+$/.test(effect.id)) {
      console.warn(
        `[effects/_registry] ID efek tidak valid: "${effect.id}". Gunakan huruf kecil, angka, dan dash saja.`
      );
    }

    // Cek params kosong
    if (!effect.params || Object.keys(effect.params).length === 0) {
      console.warn(
        `[effects/_registry] Efek "${effect.id}" tidak punya parameter.`
      );
    }

    // Cek apply() ada
    if (typeof effect.apply !== 'function') {
      console.error(
        `[effects/_registry] Efek "${effect.id}" tidak punya method apply().`
      );
    }
  }

  // Info jumlah efek
  if (EFFECTS.length > 0) {
    console.info(
      `[effects/_registry] ${EFFECTS.length} efek terdaftar.`,
      getAllEffectIds().join(', ')
    );
  }
}
