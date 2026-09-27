// ============================================
// types/layer.ts
// Tipe layer untuk editor Ashiro
// ============================================
// Semua elemen di canvas adalah "layer".
// Foto, shape, teks, video — semua punya kontrak sama.
// ============================================

// ============================================
// Jenis layer
// ============================================
export type LayerType =
  | 'image'
  | 'shape'
  | 'text'
  | 'video'
  | 'audio';

// ============================================
// Bentuk shape yang didukung
// ============================================
export type ShapeKind =
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'star'
  | 'line'
  | 'arrow';

// ============================================
// Transform — posisi & ukuran layer
// ============================================
export interface LayerTransform {
  /** Posisi X (pixel, dari kiri canvas) */
  x: number;
  /** Posisi Y (pixel, dari atas canvas) */
  y: number;
  /** Lebar layer (pixel) */
  width: number;
  /** Tinggi layer (pixel) */
  height: number;
  /** Rotasi (derajat, 0-360) */
  rotation: number;
  /** Skala horizontal (1 = normal) */
  scaleX: number;
  /** Skala vertikal (1 = normal) */
  scaleY: number;
  /** Opacity (0-1) */
  opacity: number;
}

// ============================================
// Base layer — properti umum semua layer
// ============================================
export interface BaseLayer {
  /** ID unik layer */
  id: string;
  /** Nama tampil di panel layer */
  name: string;
  /** Jenis layer */
  type: LayerType;
  /** Transform (posisi, ukuran, dll) */
  transform: LayerTransform;
  /** Terlihat atau disembunyikan */
  visible: boolean;
  /** Terkunci (tidak bisa diedit) */
  locked: boolean;
  /** Urutan render — kecil = belakang, besar = depan */
  order: number;
  /** Efek yang terpasang (dari sistem efek) */
  effects: LayerEffect[];
}

// ============================================
// Efek yang terpasang di layer
// ============================================
export interface LayerEffect {
  instanceId: string;
  effectId: string;
  params: Record<string, number | boolean | string>;
  enabled: boolean;
}

// ============================================
// Image Layer — foto/gambar
// ============================================
export interface ImageLayer extends BaseLayer {
  type: 'image';
  /** Data URL atau object URL dari file yang di-upload */
  src: string;
  /** Nama file asli */
  fileName: string;
  /** Ukuran file (byte) */
  fileSize: number;
  /** Tipe mime */
  mimeType: string;
}

// ============================================
// Shape Layer — bentuk geometri
// ============================================
export interface ShapeLayer extends BaseLayer {
  type: 'shape';
  /** Jenis bentuk */
  shape: ShapeKind;
  /** Warna isi (hex) */
  fill: string;
  /** Warna garis tepi (hex), null = tidak ada */
  stroke: string | null;
  /** Ketebalan garis tepi (pixel) */
  strokeWidth: number;
  /** Radius sudut (untuk rectangle) */
  borderRadius: number;
}

// ============================================
// Text Layer — tulisan
// ============================================
export interface TextLayer extends BaseLayer {
  type: 'text';
  /** Isi teks */
  text: string;
  /** Ukuran font (pixel) */
  fontSize: number;
  /** Nama font family */
  fontFamily: string;
  /** Berat font (400, 700, dll) */
  fontWeight: number;
  /** Warna teks (hex) */
  color: string;
  /** Perataan */
  align: 'left' | 'center' | 'right';
  /** Jarak antar baris */
  lineHeight: number;
}

// ============================================
// Video Layer — belum dipakai, siap untuk nanti
// ============================================
export interface VideoLayer extends BaseLayer {
  type: 'video';
  src: string;
  fileName: string;
  duration: number;
  muted: boolean;
}

// ============================================
// Audio Layer — belum dipakai, siap untuk nanti
// ============================================
export interface AudioLayer extends BaseLayer {
  type: 'audio';
  src: string;
  fileName: string;
  duration: number;
  volume: number;
}

// ============================================
// Union type — semua layer
// ============================================
export type Layer =
  | ImageLayer
  | ShapeLayer
  | TextLayer
  | VideoLayer
  | AudioLayer;

// ============================================
// Helper: default transform
// ============================================
export function createDefaultTransform(
  overrides?: Partial<LayerTransform>
): LayerTransform {
  return {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    ...overrides,
  };
}

// ============================================
// Type guards
// ============================================
export function isImageLayer(layer: Layer): layer is ImageLayer {
  return layer.type === 'image';
}

export function isShapeLayer(layer: Layer): layer is ShapeLayer {
  return layer.type === 'shape';
}

export function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.type === 'text';
}

export function isVideoLayer(layer: Layer): layer is VideoLayer {
  return layer.type === 'video';
}

export function isAudioLayer(layer: Layer): layer is AudioLayer {
  return layer.type === 'audio';
}
