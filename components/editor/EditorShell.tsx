'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ImagePlus, Square, Circle, Type, Play, Undo, Redo, Download } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import Canvas from './Canvas';
import LayersPanel from './LayersPanel';

export default function EditorShell() {
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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink-950 text-white">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Toolbar */}
      <header
        className="flex shrink-0 items-center justify-between border-b border-white/5 bg-ink-900 px-4"
        style={{ height: 'var(--toolbar-height)' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Ashiro"
              width={24}
              height={24}
              className="rounded object-cover"
            />
            <span className="font-display text-xs font-bold tracking-widest">
              ASHIRO
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <span className="text-xs text-ink-300">{project.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-ghost rounded p-2" title="Undo">
            <Undo className="h-4 w-4" />
          </button>
          <button className="btn-ghost rounded p-2" title="Redo">
            <Redo className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-ashiro-500 p-2 hover:bg-ashiro-600" title="Play">
            <Play className="h-4 w-4" />
          </button>
          <span className="ml-2 font-mono text-xs text-ink-400">
            00:00:00 / 00:00:10
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-primary !px-4 !py-1.5 !text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* Middle Row */}
      <div className="flex min-h-0 flex-1">
        <aside
          className="flex shrink-0 flex-col items-center gap-1 border-r border-white/5 bg-ink-900 py-3"
          style={{ width: 'var(--toolbar-left-width)' }}
        >
          <ToolButton
            icon={<ImagePlus className="h-4 w-4" />}
            label="Import Foto"
            onClick={handleImportClick}
          />
          <ToolButton
            icon={<Square className="h-4 w-4" />}
            label="Rectangle"
            onClick={() => addShapeLayer('rectangle')}
          />
          <ToolButton
            icon={<Circle className="h-4 w-4" />}
            label="Circle"
            onClick={() => addShapeLayer('circle')}
          />
          <ToolButton
            icon={<Type className="h-4 w-4" />}
            label="Text"
            onClick={() => addTextLayer()}
          />
        </aside>

        <Canvas />
        <LayersPanel />
      </div>

      {/* Timeline */}
      <section
        className="shrink-0 border-t border-white/5 bg-ink-900"
        style={{ height: 'var(--timeline-height)' }}
      >
        <div className="editor-panel-header">
          <span>Timeline</span>
          <span className="font-mono text-[10px] text-ink-500">
            {project.settings.fps} fps · {project.settings.duration}s
          </span>
        </div>

        <div className="flex h-[calc(100%-33px)]">
          <div className="w-40 shrink-0 border-r border-white/5 p-2">
            <p className="text-[10px] uppercase tracking-wider text-ink-500">
              Layers
            </p>
          </div>

          <div className="relative flex-1 overflow-x-auto p-2">
            <div className="mb-2 flex h-5 items-center gap-8 border-b border-white/5 pb-1 font-mono text-[10px] text-ink-500">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i}>{i}s</span>
              ))}
            </div>

            <div className="playhead" style={{ left: '0%' }} />

            <div className="space-y-1.5">
              {project.layers.slice(0, 3).map((layer) => (
                <div key={layer.id} className="flex items-center gap-2">
                  <div className="h-8 flex-1 rounded bg-white/[0.02] relative">
                    <div className="track-clip absolute left-0 top-0 h-full w-1/3" />
                  </div>
                </div>
              ))}
            </div>

            {project.layers.length === 0 && (
              <p className="mt-4 text-center text-[10px] text-ink-600">
                Timeline kosong
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-10 w-10 items-center justify-center rounded-md text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
      title={label}
    >
      {icon}
      <span className="pointer-events-none absolute left-12 z-30 whitespace-nowrap rounded bg-ink-800 px-2 py-1 text-[10px] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
        }
