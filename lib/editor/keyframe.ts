// ============================================
// lib/editor/keyframe.ts
// Logic animasi layer berdasarkan keyframe
// ============================================

import type { Layer } from '@/types/layer';
import type { LayerKeyframes } from '@/types/keyframe';
import { evaluateTrack } from '@/types/keyframe';

// ============================================
// Properti yang bisa dianimasikan
// ============================================
export const ANIMATABLE_PROPS = [
  'x',
  'y',
  'width',
  'height',
  'rotation',
  'scaleX',
  'scaleY',
  'opacity',
] as const;

export type AnimatableProp = (typeof ANIMATABLE_PROPS)[number];

export const PROP_LABELS: Record<AnimatableProp, string> = {
  x: 'Posisi X',
  y: 'Posisi Y',
  width: 'Lebar',
  height: 'Tinggi',
  rotation: 'Rotasi',
  scaleX: 'Skala X',
  scaleY: 'Skala Y',
  opacity: 'Opacity',
};

// ============================================
// Evaluasi layer pada waktu tertentu
// ============================================
// Kalau ada keyframe untuk properti tertentu → pakai hasil interpolasi.
// Kalau tidak → pakai nilai transform statis.
// ============================================
export function evaluateLayerAtTime(
  layer: Layer,
  time: number
): Layer['transform'] {
  const t = { ...layer.transform };
  const kfs = (layer.keyframes ?? {}) as LayerKeyframes;

  for (const prop of ANIMATABLE_PROPS) {
    const track = kfs[prop];
    if (!track || track.keyframes.length === 0) continue;

    const value = evaluateTrack(track, time);
    if (value !== null) {
      t[prop] = value;
    }
  }

  return t;
}

// ============================================
// Ambil nilai properti pada waktu tertentu (untuk UI)
// ============================================
export function getPropValueAtTime(
  layer: Layer,
  prop: AnimatableProp,
  time: number
): number {
  const kfs = (layer.keyframes ?? {}) as LayerKeyframes;
  const track = kfs[prop];

  if (track && track.keyframes.length > 0) {
    const v = evaluateTrack(track, time);
    if (v !== null) return v;
  }

  return layer.transform[prop];
}

// ============================================
// Cek layer punya keyframe di properti tertentu
// ============================================
export function hasKeyframes(layer: Layer, prop?: AnimatableProp): boolean {
  const kfs = (layer.keyframes ?? {}) as LayerKeyframes;
  if (prop) {
    const track = kfs[prop];
    return !!track && track.keyframes.length > 0;
  }
  return Object.values(kfs).some((t) => t.keyframes.length > 0);
}

// ============================================
// Total keyframe di 1 layer (untuk badge)
// ============================================
export function countKeyframes(layer: Layer): number {
  const kfs = (layer.keyframes ?? {}) as LayerKeyframes;
  return Object.values(kfs).reduce((sum, t) => sum + t.keyframes.length, 0);
}
