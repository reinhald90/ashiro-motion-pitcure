'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { Clapperboard } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import LayerView from './LayerView';

export default function Canvas() {
  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.project.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);

  const containerRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  const { width: cw, height: ch } = project.settings.canvas;
  const canvasAspect = cw / ch;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const pad = 20;
      const w = el.clientWidth - pad * 2;
      const h = el.clientHeight - pad * 2;
      if (w <= 0 || h <= 0) return;

      let dw = w;
      let dh = dw / canvasAspect;
      if (dh > h) {
        dh = h;
        dw = dh * canvasAspect;
      }
      setDisplaySize({ w: Math.round(dw), h: Math.round(dh) });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [canvasAspect]);

  const scale = displaySize.w > 0 ? displaySize.w / cw : 1;
  const getScale = useCallback(
    () => ({ sx: cw / (displaySize.w || cw), sy: ch / (displaySize.h || ch) }),
    [cw, ch, displaySize.w, displaySize.h]
  );

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-canvas-grid"
      onPointerDown={() => selectLayer(null)}
    >
      {displaySize.w > 0 && (
        <div
          style={{ width: displaySize.w, height: displaySize.h }}
          className="relative"
        >
          {/* Canvas logical — di-scale ke display */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: cw,
              height: ch,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              backgroundColor: project.settings.backgroundColor,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {project.layers.map((layer) => (
              <LayerView
                key={layer.id}
                layer={layer}
                selected={layer.id === selectedLayerId}
                getScale={getScale}
                displayScale={scale}
              />
            ))}

            {project.layers.length === 0 && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <Clapperboard
                  className="mb-4 text-ink-700"
                  style={{ width: cw * 0.06, height: cw * 0.06 }}
                  strokeWidth={1.5}
                />
                <p
                  className="text-ink-500"
                  style={{ fontSize: Math.max(16, cw * 0.018) }}
                >
                  Tambah foto atau bentuk dari panel bawah
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
                      }
