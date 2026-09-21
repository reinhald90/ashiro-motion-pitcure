// ============================================
// lib/effects/_base.ts
// Template + helper untuk efek Ashiro
// ============================================
// File ini BUKAN efek. Ini adalah:
//   1. Template copy-paste saat bikin efek baru
//   2. Helper yang dipakai semua efek
//   3. Re-export tipe biar import rapi
// ============================================

import type {
  EffectDefinition,
  EffectRenderContext,
  NumberParam,
  BooleanParam,
  SelectParam,
  ColorParam,
} from '@types/effect';

// ============================================
// Re-export tipe (biar efek lain import dari sini saja)
// ============================================
export type {
  EffectDefinition,
  EffectRenderContext,
  NumberParam,
  BooleanParam,
  SelectParam,
  ColorParam,
};

// ============================================
// Helper: bikin parameter (biar nulis efek ringkas)
// ============================================

export function number(
  label: string,
  defaultVal: number,
  min: number,
  max: number,
  options?: { step?: number; unit?: string; description?: string }
): NumberParam {
  return {
    type: 'number',
    label,
    default: defaultVal,
    min,
    max,
    step: options?.step ?? 1,
    unit: options?.unit,
    description: options?.description,
  };
}

export function bool(
  label: string,
  defaultVal: boolean,
  description?: string
): BooleanParam {
  return {
    type: 'boolean',
    label,
    default: defaultVal,
    description,
  };
}

export function select(
  label: string,
  defaultVal: string,
  options: Array<{ label: string; value: string }>,
  description?: string
): SelectParam {
  return {
    type: 'select',
    label,
    default: defaultVal,
    options,
    description,
  };
}

export function color(
  label: string,
  defaultVal: string,
  description?: string
): ColorParam {
  return {
    type: 'color',
    label,
    default: defaultVal,
    description,
  };
}

// ============================================
// Helper: render ke canvas sementara (scratch canvas)
// ============================================
// Berguna untuk efek yang butuh "bahan" sebelum di-draw ke ctx utama.
// ============================================

let scratchCanvas: HTMLCanvasElement | null = null;

export function getScratchCanvas(
  width: number,
  height: number
): HTMLCanvasElement {
  if (!scratchCanvas) {
    scratchCanvas = document.createElement('canvas');
  }
  scratchCanvas.width = width;
  scratchCanvas.height = height;
  return scratchCanvas;
}

// ============================================
// Helper: clear canvas
// ============================================
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);
}

// ============================================
// Helper: reset filter & state ctx
// ============================================
// Selalu panggil ini setelah selesai menggambar
// biar efek berikutnya tidak terpengaruh.
// ============================================

export function resetCtx(ctx: CanvasRenderingContext2D): void {
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

// ============================================
// Helper: ambil nilai param dengan aman
// ============================================

export function getNumber(
  ctx: EffectRenderContext,
  key: string,
  fallback = 0
): number {
  const v = ctx.params[key];
  return typeof v === 'number' ? v : fallback;
}

export function getBool(
  ctx: EffectRenderContext,
  key: string,
  fallback = false
): boolean {
  const v = ctx.params[key];
  return typeof v === 'boolean' ? v : fallback;
}

export function getString(
  ctx: EffectRenderContext,
  key: string,
  fallback = ''
): string {
  const v = ctx.params[key];
  return typeof v === 'string' ? v : fallback;
}

// ============================================
// Helper: clamp
// ============================================
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ============================================
// Helper: lerp (interpolasi linear)
// ============================================
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ============================================
// Helper: hex → rgba
// ============================================
export function hexToRgba(hex: string, alpha = 1): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// Helper: cek dukungan browser untuk efek
// ============================================
// Contoh: ctx.filter tidak didukung Safari versi lama.
// ============================================

let cachedSupportsFilter: boolean | null = null;

export function supportsCanvasFilter(): boolean {
  if (cachedSupportsFilter !== null) return cachedSupportsFilter;

  if (typeof document === 'undefined') return false;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    cachedSupportsFilter = false;
    return false;
  }

  // Coba set filter, cek apakah diterapkan
  ctx.filter = 'blur(2px)';
  cachedSupportsFilter = ctx.filter !== 'none';
  return cachedSupportsFilter;
}

// ============================================
// Template — copy-paste untuk efek baru
// ============================================
/*
import type { EffectDefinition } from '@effects/_base';
import { number, supportsCanvasFilter } from '@effects/_base';

const myEffect: EffectDefinition = {
  id: 'my-effect',
  name: 'My Effect',
  category: 'stylize',
  icon: '✨',
  description: 'Deskripsi singkat efek ini',

  params: {
    amount: number('Amount', 50, 0, 100, { unit: '%' }),
  },

  isSupported() {
    return supportsCanvasFilter();
  },

  apply({ ctx, source, width, height, params }) {
    // 1. Reset dulu biar bersih
    // 2. Terapkan efek
    // 3. Reset lagi (opsional, tapi disarankan)
    // Lihat contoh di lib/effects/color/brightness.ts
  },
};

export default myEffect;
*/

// ============================================
// Info: cara bikin efek baru
// ============================================
/*
LANGKAH-LANGKAH:

1. Buat file di lib/effects/<kategori>/<nama>.ts
   Contoh: lib/effects/color/brightness.ts

2. Copy template di atas, ubah:
   - id: kebab-case, unik
   - name: nama tampil
   - category: 'color' | 'blur' | 'distort' | 'stylize' | 'light' | 'transition'
   - icon: emoji
   - params: pakai helper number() / bool() / select() / color()
   - apply(): logic render

3. Daftarkan di lib/effects/_registry.ts:
   - import myEffect from './color/my-effect';
   - tambahkan ke array EFFECTS

4. UI panel efek auto-detect. Selesai.

ATURAN apply():

- Selalu gambar ke ctx (context tujuan)
- Ambil input dari source (canvas sumber)
- Jangan ubah source
- Reset ctx setelah selesai (pakai resetCtx)
- Kalau butuh canvas bantu, pakai getScratchCanvas()
- Jangan panggil apply() dari apply() efek lain — itu tugas renderer

CONTOH AMAN:

apply({ ctx, source, width, height, params }) {
  ctx.filter = `blur(${params.radius}px)`;
  ctx.drawImage(source, 0, 0, width, height);
  resetCtx(ctx);
}

CONTOH SALAH:

apply({ ctx, source }) {
  // ❌ lupa reset filter
  ctx.filter = `blur(10px)`;
  ctx.drawImage(source, 0, 0);
}
// Akibatnya: efek berikutnya kebawa blur
*/

export {};
