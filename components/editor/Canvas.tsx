'use client';

import { useEditorStore } from '@/stores/editorStore';
import type { Layer, ImageLayer, ShapeLayer, TextLayer } from '@/types/layer';
import { isImageLayer, isShapeLayer, isTextLayer } from '@/types/layer';

// ============================================
// Canvas — area preview yang menampilkan semua layer
// ============================================
export default function Canvas() {
  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.project.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);

  const canvasAspect =
    project.settings.canvas.width / project.settings.canvas.height;

  return (
    <main className="relative flex min-w-0 flex-1 items-center justify-center bg-canvas-grid overflow-hidden">
      <div
        className="relative bg-ink-950 shadow-2xl"
        style={{
          width: '80%',
          maxWidth: '1000px',
          aspectRatio: canvasAspect,
          backgroundColor: project.settings.backgroundColor,
        }}
        onClick={() => selectLayer(null)}
      >
        {project.layers.map((layer) => (
          <LayerView
            key={layer.id}
            layer={layer}
            selected={layer.id === selectedLayerId}
          />
        ))}

        {project.layers.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="mb-3 text-4xl">🎬</div>
            <p className="font-display text-sm font-semibold text-white">
              Canvas Kosong
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Import foto atau tambah shape untuk mulai
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 rounded-md border border-white/5 bg-ink-900/80 px-2 py-1 font-mono text-[10px] text-ink-400 backdrop-blur">
        100%
      </div>
    </main>
  );
}

// ============================================
// LayerView — render 1 layer
// ============================================
function LayerView({ layer, selected }: { layer: Layer; selected: boolean }) {
  const t = layer.transform;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: t.x,
    top: t.y,
    width: t.width,
    height: t.height,
    opacity: t.opacity,
    transform: `rotate(${t.rotation}deg) scale(${t.scaleX}, ${t.scaleY})`,
    transformOrigin: 'center center',
    display: layer.visible ? 'block' : 'none',
    outline: selected ? '2px solid #ff5cc8' : 'none',
    outlineOffset: '0px',
    cursor: layer.locked ? 'not-allowed' : 'move',
  };

  return (
    <div style={style} data-layer-id={layer.id}>
      {isImageLayer(layer) && <ImageLayerView layer={layer} />}
      {isShapeLayer(layer) && <ShapeLayerView layer={layer} />}
      {isTextLayer(layer) && <TextLayerView layer={layer} />}
    </div>
  );
}

function ImageLayerView({ layer }: { layer: ImageLayer }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={layer.src}
      alt={layer.name}
      draggable={false}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}

function ShapeLayerView({ layer }: { layer: ShapeLayer }) {
  const { shape, fill, stroke, strokeWidth, borderRadius } = layer;
  const base: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: fill,
    border: stroke ? `${strokeWidth}px solid ${stroke}` : 'none',
    pointerEvents: 'none',
  };

  if (shape === 'circle') {
    return <div style={{ ...base, borderRadius: '50%' }} />;
  }

  if (shape === 'triangle') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: fill,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (shape === 'star') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: fill,
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (shape === 'line') {
    return (
      <div
        style={{
          width: '100%',
          height: strokeWidth || 4,
          background: fill,
          marginTop: '50%',
          pointerEvents: 'none',
        }}
      />
    );
  }

  return <div style={{ ...base, borderRadius }} />;
}

function TextLayerView({ layer }: { layer: TextLayer }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          layer.align === 'center'
            ? 'center'
            : layer.align === 'right'
            ? 'flex-end'
            : 'flex-start',
        color: layer.color,
        fontSize: layer.fontSize,
        fontWeight: layer.fontWeight,
        fontFamily: layer.fontFamily,
        lineHeight: layer.lineHeight,
        textAlign: layer.align,
        pointerEvents: 'none',
        whiteSpace: 'pre-wrap',
      }}
    >
      {layer.text}
    </div>
  );
}
