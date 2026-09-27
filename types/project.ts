// ============================================
// types/project.ts
// Tipe project editor Ashiro
// ============================================

import type { Layer } from './layer';

// ============================================
// Ukuran canvas (preset + custom)
// ============================================
export interface CanvasSize {
  width: number;
  height: number;
}

export interface CanvasPreset extends CanvasSize {
  label: string;
}

export const CANVAS_PRESETS = {
  landscape: { label: 'Landscape 16:9', width: 1920, height: 1080 },
  portrait: { label: 'Portrait 9:16', width: 1080, height: 1920 },
  square: { label: 'Square 1:1', width: 1080, height: 1080 },
  hd: { label: 'HD 720p', width: 1280, height: 720 },
  fhd: { label: 'Full HD 1080p', width: 1920, height: 1080 },
  '4k': { label: '4K UHD', width: 3840, height: 2160 },
} satisfies Record<string, CanvasPreset>;

export type CanvasPresetKey = keyof typeof CANVAS_PRESETS;

/** Preset default yang dipakai project baru */
export const DEFAULT_CANVAS: CanvasPreset = CANVAS_PRESETS.landscape;

// ============================================
// Pengaturan project
// ============================================
export interface ProjectSettings {
  canvas: CanvasSize;
  backgroundColor: string;
  fps: number;
  duration: number;
}

// ============================================
// Project
// ============================================
export interface Project {
  id: string;
  name: string;
  settings: ProjectSettings;
  layers: Layer[];
  selectedLayerId: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Helper: project baru default
// ============================================
export function createDefaultProject(
  id: string,
  name = 'Untitled Project'
): Project {
  const now = new Date().toISOString();
  return {
    id,
    name,
    settings: {
      canvas: {
        width: DEFAULT_CANVAS.width,
        height: DEFAULT_CANVAS.height,
      },
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
