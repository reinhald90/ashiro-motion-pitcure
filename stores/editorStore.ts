import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type {
  Layer,
  ImageLayer,
  ShapeLayer,
  TextLayer,
  ShapeKind,
} from '@/types/layer';
import { createDefaultTransform } from '@/types/layer';
import type { Project } from '@/types/project';
import { createDefaultProject } from '@/types/project';
import type { Easing, Keyframe, KeyframeTrack } from '@/types/keyframe';
import { sortKeyframes, findKeyframeAt } from '@/types/keyframe';
import type { AnimatableProp } from '@/lib/editor/keyframe';

// ============================================
// Store
// ============================================
interface EditorState {
  project: Project;

  // Playback
  playhead: number; // detik
  isPlaying: boolean;

  // Project actions
  setProjectName: (name: string) => void;

  // Layer actions
  addImageLayer: (file: File, src: string) => string;
  addShapeLayer: (shape: ShapeKind) => string;
  addTextLayer: (text?: string) => string;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, changes: Partial<Layer>) => void;
  updateTransform: (id: string, changes: Partial<Layer['transform']>) => void;

  // Selection
  selectLayer: (id: string | null) => void;

  // Visibility & lock
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;

  // Order
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;

  // Playhead
  setPlayhead: (time: number) => void;
  setPlaying: (playing: boolean) => void;

  // Keyframe actions
  addKeyframe: (
    layerId: string,
    prop: AnimatableProp,
    time: number,
    value: number,
    easing?: Easing
  ) => void;
  removeKeyframe: (layerId: string, prop: AnimatableProp, time: number) => void;
  setKeyframeEasing: (
    layerId: string,
    prop: AnimatableProp,
    time: number,
    easing: Easing
  ) => void;
  clearKeyframes: (layerId: string, prop?: AnimatableProp) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  project: createDefaultProject('default'),
  playhead: 0,
  isPlaying: false,

  // ------------------------------------------
  setProjectName
  // ------------------------------------------
  setProjectName: (name) =>
    set((state) => ({
      project: { ...state.project, name, updatedAt: new Date().toISOString() },
    })),

  // ------------------------------------------
  addImageLayer
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
        width: 600,
        height: 400,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      keyframes: {},
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
  addShapeLayer
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
        x: 400,
        y: 300,
        width: 300,
        height: 300,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      keyframes: {},
      shape,
      fill: '#7c5cff',
      stroke: null,
      strokeWidth: 2,
      borderRadius: 16,
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
  addTextLayer
  // ------------------------------------------
  addTextLayer: (text = 'Teks Baru') => {
    const id = nanoid(8);
    const layer: TextLayer = {
      id,
      name: text,
      type: 'text',
      transform: createDefaultTransform({
        x: 400,
        y: 400,
        width: 600,
        height: 100,
      }),
      visible: true,
      locked: false,
      order: get().project.layers.length,
      effects: [],
      keyframes: {},
      text,
      fontSize: 64,
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
  removeLayer
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
  updateLayer
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
  updateTransform
  // ------------------------------------------
  updateTransform: (id, changes) =>
    set((state) => {
      const layers = state.project.layers.map((l) => {
        if (l.id !== id) return l;
        return {
          ...l,
          transform: { ...l.transform, ...changes },
        };
      });
      return {
        project: {
          ...state.project,
          layers,
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  // ------------------------------------------
  selectLayer
  // ------------------------------------------
  selectLayer: (id) =>
    set((state) => ({
      project: { ...state.project, selectedLayerId: id },
    })),

  // ------------------------------------------
  toggleVisibility
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

  // ------------------------------------------
  toggleLock
  // ------------------------------------------
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
  bringForward
  // ------------------------------------------
  bringForward: (id) =>
    set((state) => {
      const layers = [...state.project.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx < 0 || idx === layers.length - 1) return state;
      const cur = layers[idx];
      const next = layers[idx + 1];
      if (!cur || !next) return state;
      layers[idx] = next;
      layers[idx + 1] = cur;
      return {
        project: {
          ...state.project,
          layers: layers.map((l, i) => ({ ...l, order: i })),
        },
      };
    }),

  // ------------------------------------------
  sendBackward
  // ------------------------------------------
  sendBackward: (id) =>
    set((state) => {
      const layers = [...state.project.layers];
      const idx = layers.findIndex((l) => l.id === id);
      if (idx <= 0) return state;
      const cur = layers[idx];
      const prev = layers[idx - 1];
      if (!cur || !prev) return state;
      layers[idx] = prev;
      layers[idx - 1] = cur;
      return {
        project: {
          ...state.project,
          layers: layers.map((l, i) => ({ ...l, order: i })),
        },
      };
    }),

  // ------------------------------------------
  setPlayhead
  // ------------------------------------------
  setPlayhead: (time) => set({ playhead: Math.max(0, time) }),

  setPlaying: (playing) => set({ isPlaying: playing }),

  // ------------------------------------------
  addKeyframe
  // ------------------------------------------
  addKeyframe: (layerId, prop, time, value, easing = 'ease-in-out') =>
    set((state) => {
      const layers = state.project.layers.map((l) => {
        if (l.id !== layerId) return l;
        const kfs = { ...(l.keyframes ?? {}) };
        const track: KeyframeTrack = kfs[prop] ?? { property: prop, keyframes: [] };

        const existing = findKeyframeAt(track, time);
        let newKfs: Keyframe[];

        if (existing) {
          newKfs = track.keyframes.map((k) =>
            Math.abs(k.time - time) < 0.05 ? { ...k, value } : k
          );
        } else {
          newKfs = [...track.keyframes, { time, value, easing }];
        }

        kfs[prop] = { property: prop, keyframes: sortKeyframes(newKfs) };
        return { ...l, keyframes: kfs };
      });

      return {
        project: { ...state.project, layers, updatedAt: new Date().toISOString() },
      };
    }),

  // ------------------------------------------
  removeKeyframe
  // ------------------------------------------
  removeKeyframe: (layerId, prop, time) =>
    set((state) => {
      const layers = state.project.layers.map((l) => {
        if (l.id !== layerId) return l;
        const kfs = { ...(l.keyframes ?? {}) };
        const track = kfs[prop];
        if (!track) return l;

        const filtered = track.keyframes.filter(
          (k) => Math.abs(k.time - time) >= 0.05
        );

        if (filtered.length === 0) {
          delete kfs[prop];
        } else {
          kfs[prop] = { ...track, keyframes: filtered };
        }
        return { ...l, keyframes: kfs };
      });

      return { project: { ...state.project, layers } };
    }),

  // ------------------------------------------
  setKeyframeEasing
  // ------------------------------------------
  setKeyframeEasing: (layerId, prop, time, easing) =>
    set((state) => {
      const layers = state.project.layers.map((l) => {
        if (l.id !== layerId) return l;
        const kfs = { ...(l.keyframes ?? {}) };
        const track = kfs[prop];
        if (!track) return l;

        kfs[prop] = {
          ...track,
          keyframes: track.keyframes.map((k) =>
            Math.abs(k.time - time) < 0.05 ? { ...k, easing } : k
          ),
        };
        return { ...l, keyframes: kfs };
      });

      return { project: { ...state.project, layers } };
    }),

  // ------------------------------------------
  clearKeyframes
  // ------------------------------------------
  clearKeyframes: (layerId, prop) =>
    set((state) => {
      const layers = state.project.layers.map((l) => {
        if (l.id !== layerId) return l;
        if (prop) {
          const kfs = { ...(l.keyframes ?? {}) };
          delete kfs[prop];
          return { ...l, keyframes: kfs };
        }
        return { ...l, keyframes: {} };
      });
      return { project: { ...state.project, layers } };
    }),
}));
