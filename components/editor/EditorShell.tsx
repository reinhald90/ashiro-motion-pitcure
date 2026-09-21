'use client';

import { useEffect } from 'react';

// ============================================
// EditorShell — Kerangka layout editor
// ============================================
// Fase 1: cuma layout grid + placeholder.
// Nanti tiap zona diisi komponen sendiri:
//   - <TopToolbar />        → toolbar atas
//   - <LeftToolbar />       → tools (select, text, shape)
//   - <CanvasArea />        → preview video
//   - <PropertiesPanel />   → properties layer
//   - <Timeline />          → timeline bawah
// ============================================

export default function EditorShell() {
  // Cegah scroll body saat di editor
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink-950 text-white">
      {/* ============================================
          Top Toolbar
          ============================================ */}
      <header
        className="flex shrink-0 items-center justify-between border-b border-white/5 bg-ink-900 px-4"
        style={{ height: 'var(--toolbar-height)' }}
      >
        {/* Kiri — Logo + menu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-ashiro">
              <span className="font-display text-[10px] font-bold">A</span>
            </div>
            <span className="font-display text-xs font-bold tracking-widest">
              ASHIRO
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button className="btn-ghost rounded px-2 py-1 text-xs">
            Untitled Project
          </button>
        </div>

        {/* Tengah — Playback (placeholder) */}
        <div className="flex items-center gap-2">
          <button className="btn-ghost rounded p-2" title="Previous frame">
            ⏮
          </button>
          <button
            className="rounded-full bg-ashiro-500 p-2 hover:bg-ashiro-600"
            title="Play"
          >
            ▶
          </button>
          <button className="btn-ghost rounded p-2" title="Next frame">
            ⏭
          </button>
          <span className="ml-3 font-mono text-xs text-ink-400">
            00:00:00 / 00:00:10
          </span>
        </div>

        {/* Kanan — Actions */}
        <div className="flex items-center gap-2">
          <button className="btn-ghost rounded px-3 py-1.5 text-xs">
            Undo
          </button>
          <button className="btn-ghost rounded px-3 py-1.5 text-xs">
            Redo
          </button>
          <button className="btn btn-primary !px-4 !py-1.5 !text-xs">
            Export
          </button>
        </div>
      </header>

      {/* ============================================
          Middle Row — Sidebar, Canvas, Properties
          ============================================ */}
      <div className="flex min-h-0 flex-1">
        {/* --------------------------------------------
            Left Toolbar
            -------------------------------------------- */}
        <aside
          className="flex shrink-0 flex-col items-center gap-1 border-r border-white/5 bg-ink-900 py-3"
          style={{ width: 'var(--toolbar-left-width)' }}
        >
          <ToolButton icon="▣" label="Select" active />
          <ToolButton icon="T" label="Text" />
          <ToolButton icon="□" label="Shape" />
          <ToolButton icon="✎" label="Draw" />
          <ToolButton icon="✂" label="Crop" />

          <div className="my-2 h-px w-6 bg-white/10" />

          <ToolButton icon="⊞" label="Layers" />
          <ToolButton icon="✦" label="Effects" />
        </aside>

        {/* --------------------------------------------
            Canvas Area
            -------------------------------------------- */}
        <main className="relative flex min-w-0 flex-1 items-center justify-center bg-canvas-grid">
          {/* Placeholder canvas */}
          <div className="relative aspect-video w-[80%] max-w-3xl rounded-lg border border-white/10 bg-ink-950/60 backdrop-blur">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="mb-3 text-4xl">🎬</div>
              <p className="font-display text-sm font-semibold">
                Canvas Area
              </p>
              <p className="mt-1 text-xs text-ink-400">
                Import video atau gambar untuk mulai
              </p>
              <button className="btn btn-secondary mt-4 !px-4 !py-1.5 !text-xs">
                Import Media
              </button>
            </div>
          </div>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 right-4 rounded-md border border-white/5 bg-ink-900/80 px-2 py-1 font-mono text-[10px] text-ink-400 backdrop-blur">
            100%
          </div>
        </main>

        {/* --------------------------------------------
            Right Properties Panel
            -------------------------------------------- */}
        <aside
          className="flex shrink-0 flex-col border-l border-white/5 bg-ink-900"
          style={{ width: 'var(--properties-width)' }}
        >
          <div className="editor-panel-header">
            <span>Properties</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-center text-xs text-ink-500">
              Pilih layer untuk melihat properti
            </p>
          </div>
        </aside>
      </div>

      {/* ============================================
          Bottom — Timeline
          ============================================ */}
      <section
        className="shrink-0 border-t border-white/5 bg-ink-900"
        style={{ height: 'var(--timeline-height)' }}
      >
        <div className="editor-panel-header">
          <span>Timeline</span>
          <span className="font-mono text-[10px] text-ink-500">
            0 fps · 10s
          </span>
        </div>

        <div className="flex h-[calc(100%-33px)]">
          {/* Layer column */}
          <div className="w-40 shrink-0 border-r border-white/5 p-2">
            <p className="text-[10px] uppercase tracking-wider text-ink-500">
              Layers
            </p>
          </div>

          {/* Timeline tracks (placeholder) */}
          <div className="relative flex-1 overflow-x-auto p-2">
            {/* Ruler */}
            <div className="mb-2 flex h-5 items-center gap-8 border-b border-white/5 pb-1 font-mono text-[10px] text-ink-500">
              <span>0s</span>
              <span>1s</span>
              <span>2s</span>
              <span>3s</span>
              <span>4s</span>
              <span>5s</span>
              <span>6s</span>
              <span>7s</span>
              <span>8s</span>
              <span>9s</span>
              <span>10s</span>
            </div>

            {/* Playhead */}
            <div className="playhead" style={{ left: '0%' }} />

            {/* Track rows placeholder */}
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-8 flex-1 rounded bg-white/[0.02]" />
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[10px] text-ink-600">
              Timeline kosong — tambah layer untuk mulai
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// ToolButton — Helper komponen kecil
// ============================================
function ToolButton({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`group relative flex h-10 w-10 items-center justify-center rounded-md text-sm transition-colors ${
        active
          ? 'bg-ashiro-500/20 text-ashiro-400'
          : 'text-ink-400 hover:bg-white/5 hover:text-white'
      }`}
      title={label}
    >
      {icon}

      {/* Tooltip sederhana */}
      <span className="pointer-events-none absolute left-12 z-30 whitespace-nowrap rounded bg-ink-800 px-2 py-1 text-[10px] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}
