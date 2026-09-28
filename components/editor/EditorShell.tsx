'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Settings,
  Upload,
  Undo,
  Redo,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Maximize,
  ImagePlus,
  Square,
  Circle,
  Triangle,
  Star,
  Minus,
  Type,
  Plus,
  Clock,
  Layers as LayersIcon,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import type { ShapeKind } from '@/types/layer';
import Canvas from './Canvas';

type BottomTab = 'timeline' | 'add' | 'layers';
type AddSubTab = 'media' | 'shape' | 'text';

// ============================================
// EditorShell — mobile-first layout
// ============================================
export default function EditorShell() {
  const [activeTab, setActiveTab] = useState<BottomTab>('add');
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const project = useEditorStore((s) => s.project);
  const addImageLayer = useEditorStore((s) => s.addImageLayer);
  const addShapeLayer = useEditorStore((s) => s.addShapeLayer);
  const addTextLayer = useEditorStore((s) => s.addTextLayer);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const src = URL.createObjectURL(file);
        addImageLayer(file, src);
      }
    }
    e.target.value = '';
  };

  const handleImportClick = () => fileInputRef.current?.click();

  return (
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-ink-950 text-white">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* ============================================
          Top Bar
          ============================================ */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-ink-900 px-3">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-md text-ink-300 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Ashiro"
            width={20}
            height={20}
            className="rounded object-cover"
          />
          <span className="text-xs font-semibold">{project.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-ink-300 hover:bg-white/5 hover:text-white">
            <Settings className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-ink-300 hover:bg-white/5 hover:text-white">
            <Upload className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ============================================
          Canvas
          ============================================ */}
      <Canvas />

      {/* ============================================
          Playback Controls
          ============================================ */}
      <div className="flex h-12 shrink-0 items-center justify-around border-t border-white/5 bg-ink-900 px-2">
        <IconBtn icon={<Undo className="h-4 w-4" />} title="Undo" />
        <IconBtn icon={<Redo className="h-4 w-4" />} title="Redo" />
        <IconBtn icon={<SkipBack className="h-4 w-4" />} title="Prev" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" />
          )}
        </button>

        <IconBtn icon={<SkipForward className="h-4 w-4" />} title="Next" />
        <IconBtn
          icon={<Plus className="h-4 w-4" />}
          title="Tambah"
          onClick={() => setActiveTab('add')}
        />
        <IconBtn icon={<Maximize className="h-4 w-4" />} title="Fit" />
      </div>

      {/* ============================================
          Tab Bar
          ============================================ */}
      <div className="flex h-10 shrink-0 border-t border-white/5 bg-ink-900">
        <TabBtn
          active={activeTab === 'timeline'}
          onClick={() => setActiveTab('timeline')}
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Timeline"
        />
        <TabBtn
          active={activeTab === 'add'}
          onClick={() => setActiveTab('add')}
          icon={<Plus className="h-3.5 w-3.5" />}
          label="Tambah"
        />
        <TabBtn
          active={activeTab === 'layers'}
          onClick={() => setActiveTab('layers')}
          icon={<LayersIcon className="h-3.5 w-3.5" />}
          label="Layer"
        />
      </div>

      {/* ============================================
          Bottom Panel
          ============================================ */}
      <div
        className="shrink-0 border-t border-white/5 bg-ink-900"
        style={{ height: '28vh', minHeight: 160, maxHeight: 320 }}
      >
        {activeTab === 'timeline' && <TimelineTab />}
        {activeTab === 'add' && (
          <AddTab
            onImport={handleImportClick}
            onShape={addShapeLayer}
            onText={() => addTextLayer()}
          />
        )}
        {activeTab === 'layers' && <LayersTab />}
      </div>
    </div>
  );
}

// ============================================
// IconBtn
// ============================================
function IconBtn({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded-md text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
    >
      {icon}
    </button>
  );
}

// ============================================
// TabBtn
// ============================================
function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-b-2 border-ashiro-500 text-white'
          : 'border-b-2 border-transparent text-ink-400 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ============================================
// TimelineTab
// ============================================
function TimelineTab() {
  const project = useEditorStore((s) => s.project);
  const layers = project.layers;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/5 px-3">
        <span className="text-[10px] uppercase tracking-wider text-ink-500">
          Timeline
        </span>
        <span className="font-mono text-[10px] text-ink-500">
          {project.settings.fps} fps · {project.settings.duration}s
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Kolom nama layer */}
        <div className="w-20 shrink-0 space-y-1 overflow-y-auto border-r border-white/5 p-1.5">
          {layers.map((l) => (
            <div
              key={l.id}
              className="flex h-6 items-center truncate rounded bg-white/5 px-1.5 text-[9px] text-ink-300"
            >
              {l.name}
            </div>
          ))}
          {layers.length === 0 && (
            <p className="px-1 text-center text-[9px] text-ink-600">—</p>
          )}
        </div>

        {/* Track */}
        <div className="relative flex-1 overflow-x-auto">
          <div className="min-w-[600px] px-2">
            <div className="flex h-5 items-center gap-10 border-b border-white/5 pb-1 font-mono text-[9px] text-ink-500">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i}>{i}s</span>
              ))}
            </div>

            <div
              className="playhead"
              style={{ left: '0%', top: '20px' }}
            />

            <div className="space-y-1 pt-2">
              {layers.map((l) => (
                <div
                  key={l.id}
                  className="relative h-6 rounded bg-white/[0.02]"
                >
                  <div className="track-clip absolute left-0 top-0 h-full w-1/3" />
                </div>
              ))}
            </div>

            {layers.length === 0 && (
              <p className="mt-4 text-center text-[10px] text-ink-600">
                Timeline kosong — tambah layer untuk mulai
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AddTab
// ============================================
function AddTab({
  onImport,
  onShape,
  onText,
}: {
  onImport: () => void;
  onShape: (kind: ShapeKind) => void;
  onText: () => void;
}) {
  const [subTab, setSubTab] = useState<AddSubTab>('shape');

  return (
    <div className="flex h-full flex-col">
      {/* Sub-tabs */}
      <div className="flex h-10 shrink-0 items-center border-b border-white/5">
        <SubTab
          active={subTab === 'media'}
          onClick={() => setSubTab('media')}
          icon={<ImagePlus className="h-4 w-4" />}
          label="Media"
        />
        <SubTab
          active={subTab === 'shape'}
          onClick={() => setSubTab('shape')}
          icon={<Square className="h-4 w-4" />}
          label="Bentuk"
        />
        <SubTab
          active={subTab === 'text'}
          onClick={() => setSubTab('text')}
          icon={<Type className="h-4 w-4" />}
          label="Teks"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {subTab === 'media' && (
          <button
            onClick={onImport}
            className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-white/10 text-xs text-ink-400 transition-colors hover:border-ashiro-500 hover:text-white"
          >
            <div className="text-center">
              <ImagePlus className="mx-auto mb-2 h-6 w-6" />
              Pilih foto dari galeri
            </div>
          </button>
        )}

        {subTab === 'shape' && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {SHAPES.map(({ kind, label, icon }) => (
              <button
                key={kind}
                onClick={() => onShape(kind)}
                className="flex aspect-square items-center justify-center rounded-lg bg-white/5 text-ink-300 transition-colors hover:bg-ashiro-500/20 hover:text-white"
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>
        )}

        {subTab === 'text' && (
          <button
            onClick={onText}
            className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-white/10 text-xs text-ink-400 transition-colors hover:border-ashiro-500 hover:text-white"
          >
            <div className="text-center">
              <Type className="mx-auto mb-2 h-6 w-6" />
              Tambah teks
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

function SubTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 text-xs transition-colors ${
        active
          ? 'border-b-2 border-ashiro-500 text-white'
          : 'border-b-2 border-transparent text-ink-400 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Daftar shape yang tersedia
const SHAPES: { kind: ShapeKind; label: string; icon: React.ReactNode }[] = [
  { kind: 'rectangle', label: 'Rectangle', icon: <Square className="h-5 w-5" /> },
  { kind: 'circle', label: 'Circle', icon: <Circle className="h-5 w-5" /> },
  { kind: 'triangle', label: 'Triangle', icon: <Triangle className="h-5 w-5" /> },
  { kind: 'star', label: 'Star', icon: <Star className="h-5 w-5" /> },
  { kind: 'line', label: 'Line', icon: <Minus className="h-5 w-5" /> },
];

// ============================================
// LayersTab
// ============================================
function LayersTab() {
  const layers = useEditorStore((s) => s.project.layers);
  const selectedId = useEditorStore((s) => s.project.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const removeLayer = useEditorStore((s) => s.removeLayer);
  const toggleVisibility = useEditorStore((s) => s.toggleVisibility);

  const reversed = [...layers].reverse();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/5 px-3">
        <span className="text-[10px] uppercase tracking-wider text-ink-500">
          Layers
        </span>
        <span className="font-mono text-[10px] text-ink-500">
          {layers.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {reversed.length === 0 && (
          <p className="p-4 text-center text-xs text-ink-500">
            Belum ada layer
          </p>
        )}

        {reversed.map((layer) => (
          <div
            key={layer.id}
            onClick={() => selectLayer(layer.id)}
            className={`flex items-center gap-2 border-b border-white/5 px-3 py-2.5 transition-colors ${
              layer.id === selectedId ? 'bg-ashiro-500/15' : ''
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(layer.id);
              }}
              className="text-ink-400 hover:text-white"
            >
              {layer.visible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>

            <span className="flex-1 truncate text-xs text-white">
              {layer.name}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeLayer(layer.id);
              }}
              className="text-ink-400 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
              }
