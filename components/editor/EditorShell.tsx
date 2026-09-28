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

      {/* Top Bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 bg-ink-900 px-2">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Ashiro"
            width={22}
            height={22}
            className="rounded object-cover"
          />
          <span className="text-xs font-semibold text-ink-200">
            {project.name}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-white/5 hover:text-white">
            <Settings className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-white/5 hover:text-white">
            <Upload className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Canvas */}
      <Canvas />

      {/* Playback */}
      <div className="flex h-12 shrink-0 items-center justify-between border-t border-white/5 bg-ink-900 px-2">
        <div className="flex items-center gap-0.5">
          <IconBtn icon={<Undo className="h-4 w-4" />} title="Undo" />
          <IconBtn icon={<Redo className="h-4 w-4" />} title="Redo" />
        </div>

        <div className="flex items-center gap-1">
          <IconBtn icon={<SkipBack className="h-4 w-4" />} title="Prev" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-ashiro text-white shadow-glow transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            )}
          </button>
          <IconBtn icon={<SkipForward className="h-4 w-4" />} title="Next" />
        </div>

        <div className="flex items-center gap-0.5">
          <IconBtn
            icon={<Plus className="h-4 w-4" />}
            title="Tambah"
            onClick={() => setActiveTab('add')}
          />
          <IconBtn icon={<Maximize className="h-4 w-4" />} title="Fit" />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex h-11 shrink-0 border-t border-white/5 bg-ink-900">
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

      {/* Bottom Panel */}
      <div
        className="shrink-0 border-t border-white/5 bg-ink-900"
        style={{ height: '28vh', minHeight: 170, maxHeight: 320 }}
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
      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
    >
      {icon}
    </button>
  );
}

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
      className={`relative flex flex-1 items-center justify-center gap-2 text-xs font-medium transition-colors ${
        active ? 'text-white' : 'text-ink-500 hover:text-ink-200'
      }`}
    >
      {icon}
      {label}
      {active && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-t-full bg-ashiro-500" />
      )}
    </button>
  );
}

function TimelineTab() {
  const project = useEditorStore((s) => s.project);
  const layers = project.layers;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/5 px-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">
          Timeline
        </span>
        <span className="font-mono text-[10px] text-ink-500">
          {project.settings.fps} fps · {project.settings.duration}s
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
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

        <div className="relative flex-1 overflow-x-auto">
          <div className="min-w-[600px] px-2">
            <div className="flex h-5 items-center gap-10 border-b border-white/5 pb-1 font-mono text-[9px] text-ink-500">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i}>{i}s</span>
              ))}
            </div>

            <div className="playhead" style={{ left: '0%', top: '20px' }} />

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
                Timeline kosong
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex h-10 shrink-0 items-center border-b border-white/5 px-2">
        <SubTab
          active={subTab === 'media'}
          onClick={() => setSubTab('media')}
          icon={<ImagePlus className="h-3.5 w-3.5" />}
          label="Media"
        />
        <SubTab
          active={subTab === 'shape'}
          onClick={() => setSubTab('shape')}
          icon={<Square className="h-3.5 w-3.5" />}
          label="Bentuk"
        />
        <SubTab
          active={subTab === 'text'}
          onClick={() => setSubTab('text')}
          icon={<Type className="h-3.5 w-3.5" />}
          label="Teks"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {subTab === 'media' && (
          <button
            onClick={onImport}
            className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-white/10 text-ink-400 transition-colors hover:border-ashiro-500/50 hover:bg-ashiro-500/5 hover:text-white"
          >
            <div className="text-center">
              <ImagePlus className="mx-auto mb-2 h-6 w-6" />
              <p className="text-xs font-medium">Pilih dari galeri</p>
              <p className="mt-1 text-[10px] text-ink-500">
                JPG, PNG, WEBP
              </p>
            </div>
          </button>
        )}

        {subTab === 'shape' && (
          <div className="grid grid-cols-5 gap-2">
            {SHAPES.map(({ kind, label, icon }) => (
              <button
                key={kind}
                onClick={() => onShape(kind)}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl bg-white/[0.04] text-ink-300 transition-all hover:bg-ashiro-500/15 hover:text-white active:scale-95"
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
            className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-white/10 text-ink-400 transition-colors hover:border-ashiro-500/50 hover:bg-ashiro-500/5 hover:text-white"
          >
            <div className="text-center">
              <Type className="mx-auto mb-2 h-6 w-6" />
              <p className="text-xs font-medium">Tambah teks</p>
              <p className="mt-1 text-[10px] text-ink-500">
                Ketik apa saja
              </p>
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
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-white/5 text-white'
          : 'text-ink-500 hover:text-ink-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

const SHAPES: { kind: ShapeKind; label: string; icon: React.ReactNode }[] = [
  { kind: 'rectangle', label: 'Rectangle', icon: <Square className="h-5 w-5" /> },
  { kind: 'circle', label: 'Circle', icon: <Circle className="h-5 w-5" /> },
  { kind: 'triangle', label: 'Triangle', icon: <Triangle className="h-5 w-5" /> },
  { kind: 'star', label: 'Star', icon: <Star className="h-5 w-5" /> },
  { kind: 'line', label: 'Line', icon: <Minus className="h-5 w-5" /> },
];

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
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">
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
              layer.id === selectedId ? 'bg-ashiro-500/10' : ''
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
