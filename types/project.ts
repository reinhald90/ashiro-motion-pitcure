// ============================================
// types/project.ts
// Tipe project editor Ashiro
// ============================================
// Satu project = satu sesi editing.
// Berisi layers, pengaturan canvas, dan metadata.
// ============================================

import type { Layer } from './layer';

// ============================================
// Ukuran canvas (preset + custom)
// ============================================
export interface CanvasSize {
  width: number;
  height: number;
}

export const CANVAS_PRESETS: Record<string, CanvasSize & { label: string }> = {
  landscape: { label: 'Landscape 16:9', width: 1920, height: 1080 },
  portrait: { label: 'Portrait 9:16', width: 1080, height: 1920 },
  square: { label: 'Square 1:1', width: 1080, height: 1080 },
  hd: { label: 'HD 720p', width: 1280, height: 720 },
  fhd: { label: 'Full HD 1080p', width: 1920, height: 1080 },
  '4k': { label: '4K UHD', width: 3840, height: 2160 },
};

// ============================================
// Pengaturan project
// ============================================
export interface ProjectSettings {
  /** Ukuran canvas */
  canvas: CanvasSize;
  /** Warna background canvas (hex) */
  backgroundColor: string;
  /** Frame rate (fps) */
  fps: number;
  /** Durasi project (detik) */
  duration: number;
}

// ============================================
// Project
// ============================================
export interface Project {
  /** ID unik project */
  id: string;
  /** Nama project */
  name: string;
  /** Pengaturan project */
  settings: ProjectSettings;
  /** Daftar layer di canvas */
  layers: Layer[];
  /** ID layer yang sedang dipilih */
  selectedLayerId: string | null;
  /** Timestamp dibuat (ISO) */
  createdAt: string;
  /** Timestamp terakhir diubah (ISO) */
  updatedAt: string;
}

// ============================================
// Helper: project baru default
// ============================================
export function createDefaultProject(id: string, name = 'Untitled Project'): Project {
  const now = new Date().toISOString();
  return {
    id,
    name,
    settings: {
      canvas: CANVAS_PRESETS['landscape'],
      backgroundColor: '#0a0a0f',
      fps: 30,
      duration: 10,
    },
    layers: [],
    selectedLayerId: null,
    createdAt: now,
    updatedAt: now,
  };
}
