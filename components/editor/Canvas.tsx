'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import LayerView from './LayerView';

export default function Canvas() {
  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.project.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const canvasAspect =
    project.settings.canvas.width / project.settings.canvas.height;

  // Hitung ukuran canvas berdasarkan ruang yang tersedia
  useEffect(() => {
    const updateSize = () => {
      const el = containerRef.current;
      if (!el) return;
      const pad = 16;
      const cw = el.clientWidth - pad * 2;
      const ch = el.clientHeight - pad * 2;
      if (cw <= 0 || ch <= 0) return;

      let w = cw;
      let h = w / canvasAspect;
      if (h > ch) {
        h = ch;
        w = h * canvasAspect;
      }
      setSize({ w, h });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [canvasAspect]);

  const getScale = useCallback(() => {
    if (size.w === 0) return { sx: 1, sy: 1 };
    return {
      sx: project.settings.canvas.width / size.w,
      sy: project.settings.canvas.height / size.h,
    };
  }, [size, project.settings.canvas.width, project.settings.canvas.height]);

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-canvas-grid"
      onPointerDown={() => selectLayer(null)}
    >
      {size.w > 0 && (
        <div
          className="relative shadow-2xl"
          style={{
            width: size.w,
            height: size.h,
            backgroundColor: project.settings.backgroundColor,
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {project.layers.map((layer) => (
            <LayerView
              key={layer.id}
              layer={layer}
              selected={layer.id === selectedLayerId}
              getScale={getScale}
            />
          ))}

          {project.layers.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="mb-2 text-3xl opacity-60">🎬</div>
              <p className="text-[10px] text-ink-500">
                Tambah foto atau shape dari panel bawah
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
