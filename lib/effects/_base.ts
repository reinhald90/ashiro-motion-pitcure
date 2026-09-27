
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
} from '@/types/effect';

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

  ctx.filter = 'blur(2px)';
  cachedSupportsFilter = ctx.filter !== 'none';
  return cachedSupportsFilter;
}

export {};
