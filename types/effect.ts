// ============================================
// types/effect.ts
// Tipe untuk sistem efek Ashiro Motion Picture
// ============================================
// Semua efek WAJIB ikut kontrak ini.
// UI panel efek, registry, dan renderer baca dari sini.
// ============================================

// ============================================
// Kategori Efek
// ============================================
export type EffectCategory =
  | 'color'      // brightness, contrast, saturate, dll
  | 'blur'       // blur, gaussian, motion blur
  | 'distort'    // pixelate, ripple, twirl
  | 'stylize'    // vignette, grain, glitch
  | 'light'      // glow, bloom, flare
  | 'transition'; // fade, slide, zoom

export const EFFECT_CATEGORIES: Record<EffectCategory, string> = {
  color: 'Warna',
  blur: 'Blur',
  distort: 'Distorsi',
  stylize: 'Stylize',
  light: 'Cahaya',
  transition: 'Transisi',
};

// ============================================
// Parameter Efek
// ============================================
// Setiap efek punya daftar parameter.
// UI slider/input auto-generate dari sini.
// ============================================

export interface EffectParamBase {
  label: string;
  description?: string;
}

export interface NumberParam extends EffectParamBase {
  type: 'number';
  default: number;
  min: number;
  max: number;
  step?: number;
  unit?: string; // '%', 'px', '°', dll
}

export interface BooleanParam extends EffectParamBase {
  type: 'boolean';
  default: boolean;
}

export interface SelectParam extends EffectParamBase {
  type: 'select';
  default: string;
  options: Array<{ label: string; value: string }>;
}

export interface ColorParam extends EffectParamBase {
  type: 'color';
  default: string; // hex: '#ffffff'
}

export type EffectParam =
  | NumberParam
  | BooleanParam
  | SelectParam
  | ColorParam;

// Nilai parameter saat runtime
export type EffectParamValue = number | boolean | string;

// Kumpulan nilai parameter untuk satu efek
export type EffectParamValues = Record<string, EffectParamValue>;

// ============================================
// Context Renderer
// ============================================
// Data yang diteruskan ke setiap efek saat apply.
// ============================================

export interface EffectRenderContext {
  /** Canvas 2D context tujuan */
  ctx: CanvasRenderingContext2D;

  /** Canvas sumber (input) */
  source: HTMLCanvasElement;

  /** Lebar canvas dalam pixel */
  width: number;

  /** Tinggi canvas dalam pixel */
  height: number;

  /** Waktu saat ini dalam detik (untuk animasi) */
  time: number;

  /** Frame saat ini */
  frame: number;

  /** Total frame */
  totalFrames: number;

  /** Frame rate */
  fps: number;

  /** Nilai parameter efek ini */
  params: EffectParamValues;
}

// ============================================
// Definisi Efek
// ============================================
// Kontrak utama. Setiap file efek export object ini.
// ============================================

export interface EffectDefinition {
  /** ID unik, huruf kecil, pakai dash. Contoh: 'hue-rotate' */
  id: string;

  /** Nama tampil. Contoh: 'Hue Rotate' */
  name: string;

  /** Kategori efek */
  category: EffectCategory;

  /** Deskripsi singkat untuk tooltip */
  description?: string;

  /** Emoji atau nama ikon (lucide) */
  icon: string;

  /** Versi efek — naikkan kalau ada perubahan breaking */
  version?: string;

  /** Parameter efek. Key = nama param. */
  params: Record<string, EffectParam>;

  /** Terapkan efek ke canvas */
  apply(context: EffectRenderContext): void;

  /** (Opsional) Cek apakah efek didukung browser ini */
  isSupported?: () => boolean;
}

// ============================================
// Instance Efek di Project
// ============================================
// Satu efek yang sudah ditambahkan user ke layer.
// Berbeda dari EffectDefinition: ini punya nilai spesifik.
// ============================================

export interface EffectInstance {
  /** ID unik instance (bukan ID efek) */
  instanceId: string;

  /** ID efek dari registry */
  effectId: string;

  /** Nilai parameter yang dipilih user */
  params: EffectParamValues;

  /** Aktif atau di-bypass */
  enabled: boolean;

  /** Urutan render — kecil = duluan */
  order: number;

  /** (Opsional) Nama custom dari user */
  customName?: string;
}

// ============================================
// Preset Efek
// ============================================
// Kombinasi efek siap pakai. User bisa simpan & pakai ulang.
// ============================================

export interface EffectPreset {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;

  /** Daftar efek dalam preset */
  effects: Omit<EffectInstance, 'instanceId'>[];
}

// ============================================
// Registry Types
// ============================================

export type EffectRegistry = Map<string, EffectDefinition>;

// ============================================
// Helper: buat default values dari params
// ============================================
export function getDefaultParams(
  params: Record<string, EffectParam>
): EffectParamValues {
  const values: EffectParamValues = {};
  for (const [key, param] of Object.entries(params)) {
    values[key] = param.default;
  }
  return values;
}

// ============================================
// Type guard
// ============================================
export function isNumberParam(p: EffectParam): p is NumberParam {
  return p.type === 'number';
}

export function isBooleanParam(p: EffectParam): p is BooleanParam {
  return p.type === 'boolean';
}

export function isSelectParam(p: EffectParam): p is SelectParam {
  return p.type === 'select';
}

export function isColorParam(p: EffectParam): p is ColorParam {
  return p.type === 'color';
}
