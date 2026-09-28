// ============================================
// types/keyframe.ts
// Sistem keyframe & animasi Ashiro
// ============================================
// Keyframe = nilai properti pada waktu tertentu.
// Antara 2 keyframe, nilai diinterpolasi (linear / easing).
// ============================================

// ============================================
// Easing / Curve
// ============================================
export type Easing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step';

export const EASING_LABELS: Record<Easing, string> = {
  linear: 'Linear',
  'ease-in': 'Ease In',
  'ease-out': 'Ease Out',
  'ease-in-out': 'Ease In-Out',
  step: 'Step (tanpa halus)',
};

// ============================================
// Keyframe
// ============================================
export interface Keyframe {
  /** Waktu dalam detik */
  time: number;
  /** Nilai properti saat ini */
  value: number;
  /** Cara transisi dari keyframe INI ke keyframe berikutnya */
  easing: Easing;
}

// ============================================
// Track = kumpulan keyframe untuk 1 properti
// ============================================
export interface KeyframeTrack {
  /** Properti yang dianimasikan (contoh: 'x', 'opacity', 'rotation') */
  property: string;
  /** Daftar keyframe, urut berdasarkan time */
  keyframes: Keyframe[];
}

// ============================================
// Kumpulan track per layer
// ============================================
export type LayerKeyframes = Record<string, KeyframeTrack>;

// ============================================
// Helper: buat keyframe
// ============================================
export function createKeyframe(
  time: number,
  value: number,
  easing: Easing = 'linear'
): Keyframe {
  return { time, value, easing };
}

// ============================================
// Easing function
// ============================================
export function applyEasing(t: number, easing: Easing): number {
  // t = progress 0..1
  switch (easing) {
    case 'linear':
      return t;
    case 'ease-in':
      return t * t;
    case 'ease-out':
      return t * (2 - t);
    case 'ease-in-out':
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    case 'step':
      return t < 1 ? 0 : 1;
    default:
      return t;
  }
}

// ============================================
// Interpolasi track
// ============================================
// Cari nilai properti pada `time` tertentu
// berdasarkan daftar keyframe.
// ============================================
export function evaluateTrack(track: KeyframeTrack, time: number): number | null {
  const kfs = track.keyframes;
  if (kfs.length === 0) return null;

  const first = kfs[0];
  const last = kfs[kfs.length - 1];
  if (!first || !last) return null;

  // Sebelum keyframe pertama
  if (time <= first.time) return first.value;

  // Setelah keyframe terakhir
  if (time >= last.time) return last.value;

  // Cari 2 keyframe yang mengapit `time`
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i];
    const b = kfs[i + 1];
    if (!a || !b) continue;

    if (time >= a.time && time <= b.time) {
      const span = b.time - a.time;
      if (span <= 0) return b.value;

      const rawT = (time - a.time) / span;
      const easedT = applyEasing(rawT, a.easing);
      return a.value + (b.value - a.value) * easedT;
    }
  }

  return last.value;
}

// ============================================
// Helper: urutkan & dedupe keyframe
// ============================================
export function sortKeyframes(kfs: Keyframe[]): Keyframe[] {
  const sorted = [...kfs].sort((a, b) => a.time - b.time);
  const out: Keyframe[] = [];
  for (const kf of sorted) {
    const last = out[out.length - 1];
    if (last && Math.abs(last.time - kf.time) < 0.001) {
      out[out.length - 1] = kf; // replace yang sama waktunya
    } else {
      out.push(kf);
    }
  }
  return out;
}

// ============================================
// Helper: cek keyframe ada di waktu tertentu
// ============================================
export function findKeyframeAt(
  track: KeyframeTrack,
  time: number,
  tolerance = 0.05
): Keyframe | null {
  for (const kf of track.keyframes) {
    if (Math.abs(kf.time - time) < tolerance) return kf;
  }
  return null;
}
