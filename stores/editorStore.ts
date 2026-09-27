// ============================================
// stores/editorStore.ts
// State global editor (Zustand)
// ============================================

import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Layer, ImageLayer, ShapeLayer, TextLayer, ShapeKind } from '@/types/layer';
import { createDefaultTransform } from '@/types/layer';
import type { Project } from '@/types/project';
import { createDefaultProject } from '@/types/project';

// ============================================
// Store state
// ============================================
interface EditorState {
  project: Project;

  // Actions — project
  setProjectName: (name: string) => void;

  // Actions — layer
  addImageLayer: (file: File, src: string) => string;
  addShapeLayer: (shape: ShapeKind) => string;
  addTextLayer: (text?: string) => string;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, changes: Partial<Layer>) => void;
  updateTransform: (id: string, changes: Partial<Layer['transform']>) => void;

  // Actions — selection
  selectLayer: (id: string | null) => void;

  // Actions — visibility
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;

  // Actions — order
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
}

// ============================================
// Store
// ============================================
export const useEditorStore = create<EditorState>((set, get) => ({
  project: createDefaultProject('default'),

  setProjectName: (name) =>
    set((state) => ({
      project: { ...state.project, name, updatedAt: new Date().toISOString() },
    })),

  // ------------------------------------------
  // Tambah image layer
  // ------------------------------------------
  addImageLayer: (file, src) => {
    const id = nanoid(8);
    const layer: ImageLayer = {
      id,
      name: file.name,
      type: 'image',
      transform: createDefaultTransform({
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      src,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    };

    set((state) => ({
      project: {
        ...state.project,
        layers: [...state.project.layers, layer],
        selectedLayerId: id,
        updatedAt: new Date().toISOString(),
      },
    }));

    return id;
  },

  // ------------------------------------------
  // Tambah shape layer
  // ------------------------------------------
  addShapeLayer: (shape) => {
    const id = nanoid(8);
    const names: Record<ShapeKind, string> = {
      rectangle: 'Rectangle',
      circle: 'Circle',
      triangle: 'Triangle',
      star: 'Star',
      line: 'Line',
      arrow: 'Arrow',
    };

    const layer: ShapeLayer = {
      id,
      name: names[shape],
      type: 'shape',
      transform: createDefaultTransform({
        x: 200,
        y: 200,
        width: 200,
        height: 200,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      shape,
      fill: '#7c5cff',
      stroke: null,
      strokeWidth: 2,
      borderRadius: 12,
    };

    set((state) => ({
      project: {
        ...state.project,
        layers: [...state.project.layers, layer],
        selectedLayerId: id,
        updatedAt: new Date().toISOString(),
      },
    }));

    return id;
  },

  // ------------------------------------------
  // Tambah text layer
  // ------------------------------------------
  addTextLayer: (text = 'Teks Baru') => {
    const id = nanoid(8);
    const layer: TextLayer = {
      id,
      name: text,
      type: 'text',
      transform: createDefaultTransform({
        x: 200,
        y: 200,
        width: 400,
        height: 80,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      text,
      fontSize: 48,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      color: '#ffffff',
      align: 'center',
      lineHeight: 1.2,
    };

    set((state) => ({
      project: {
        ...state.project,
        layers: [...state.project.layers, layer],
        selectedLayerId: id,
        updatedAt: new Date().toISOString(),
      },
    }));

    return id;
  },

  // ------------------------------------------
  // Hapus layer
  // ------------------------------------------
  removeLayer: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        layers: state.project.layers.filter((l) => l.id !== id),
        selectedLayerId:
          state.project.selectedLayerId === id
            ? null
            : state.project.selectedLayerId,
        updatedAt: new Date().toISOString(),
      },
    })),

  // ------------------------------------------
  // Update layer (partial)
  // ------------------------------------------
  updateLayer: (id, changes) =>
    set((state) => ({
      project: {
        ...state.project,
        layers: state.project.layers.map((l) =>
          l.id === id ? ({ ...l, ...changes } as Layer) : l
        ),
        updatedAt: new Date().toISOString(),
      },
    })),

  // ------------------------------------------
  // Update transform
  // ------------------------------------------
  updateTransform: (id, changes) =>
    set((state) => ({
      project: {
        ...state.project,
        layers: state.project.layers.map((l) =>
          l.id === id
            ? { ...l, transform: { ...l.transform, ...changes } }
            : l
        ),
        updatedAt: new Date().toISOString(),
      },
    })),

  // ------------------------------------------
  // Selection
  // ------------------------------------------
  selectLayer: (id) =>
    set((state) => ({
      project: { ...state.project, selectedLayerId: id },
    })),

  // ------------------------------------------
  // Visibility & lock
  // ------------------------------------------
  toggleVisibility: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        layers: state.project.layers.map((l) =>
          l.id === id ? { ...l, visible: !l.visible } : l
        ),
      },
    })),

  toggleLock: (id) =>
    set((state) => ({
      project: {
        ...state.project,
        layers: state.project.layers.map((l) =>
          l.id === id ? { ...l, locked: !l.locked } : l
        ),
      },
    })),

  // ------------------------------------------
  // Order (naik/turun posisi render)
  // ------------------------------------------
  bringForward: (id) =>
    set((state) => {
      const layers = [...state.project.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx < 0 || idx === layers.length - 1) return state;

      const current = layers[idx];
      const next = layers[idx + 1];
      if (!current || !next) return state;

      layers[idx] = next;
      layers[idx + 1] = current;

      return {
        project: {
          ...state.project,
          layers: layers.map((l, i) => ({ ...l, order: i })),
        },
      };
    }),

  sendBackward: (id) =>
    set((state) => {
      const layers = [...state.project.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx <= 0) return state;

      const current = layers[idx];
      const prev = layers[idx - 1];
      if (!current || !prev) return state;

      layers[idx] = prev;
      layers[idx - 1] = current;

      return {
        project: {
          ...state.project,
          layers: layers.map((l, i) => ({ ...l, order: i })),
        },
      };
    }),
}));
