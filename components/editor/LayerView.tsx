'use client';

import { useRef } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import type { Layer, ImageLayer, ShapeLayer, TextLayer } from '@/types/layer';
import { isImageLayer, isShapeLayer, isTextLayer } from '@/types/layer';
import { evaluateLayerAtTime } from '@/lib/editor/keyframe';

type DragMode = 'move' | 'resize-br' | 'resize-tl';

interface Props {
  layer: Layer;
  selected: boolean;
  getScale: () => { sx: number; sy: number };
  displayScale: number;
}

export default function LayerView({
  layer,
  selected,
  getScale,
  displayScale,
}: Props) {
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const setLayerProp = useEditorStore((s) => s.setLayerProp);
  const playhead = useEditorStore((s) => s.playhead);

  const dragRef = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
    startW: number;
    startH: number;
    sx: number;
    sy: number;
  } | null>(null);

  // Evaluasi transform berdasarkan keyframe di playhead
  const t = evaluateLayerAtTime(layer, playhead);

  const s = displayScale || 1;
  const handleSize = Math.max(20, Math.round(22 / s));
  const outlineWidth = Math.max(2, Math.round(2 / s));

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
    cursor: layer.locked ? 'not-allowed' : 'move',
    touchAction: 'none',
    userSelect: 'none',
  };

  const handlePointerDown = (e: React.PointerEvent, mode: DragMode) => {
    if (layer.locked) return;
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    selectLayer(layer.id);

    const { sx, sy } = getScale();
    dragRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      startTx: t.x,
      startTy: t.y,
      startW: t.width,
      startH: t.height,
      sx,
      sy,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const ds = dragRef.current;
    if (!ds) return;
    const dx = (e.clientX - ds.startX) * ds.sx;
    const dy = (e.clientY - ds.startY) * ds.sy;

    if (ds.mode === 'move') {
      setLayerProp(layer.id, 'x', Math.round(ds.startTx + dx));
      setLayerProp(layer.id, 'y', Math.round(ds.startTy + dy));
    } else if (ds.mode === 'resize-br') {
      setLayerProp(layer.id, 'width', Math.max(10, Math.round(ds.startW + dx)));
      setLayerProp(layer.id, 'height', Math.max(10, Math.round(ds.startH + dy)));
    } else if (ds.mode === 'resize-tl') {
      const newW = Math.max(10, Math.round(ds.startW - dx));
      const newH = Math.max(10, Math.round(ds.startH - dy));
      setLayerProp(layer.id, 'x', Math.round(ds.startTx + (ds.startW - newW)));
      setLayerProp(layer.id, 'y', Math.round(ds.startTy + (ds.startH - newH)));
      setLayerProp(layer.id, 'width', newW);
      setLayerProp(layer.id, 'height', newH);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      style={style}
      onPointerDown={(e) => handlePointerDown(e, 'move')}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-layer-id={layer.id}
    >
      {isImageLayer(layer) && <ImageContent layer={layer} />}
      {isShapeLayer(layer) && <ShapeContent layer={layer} />}
      {isTextLayer(layer) && <TextContent layer={layer} />}

      {selected && (
        <>
          <div
            className="pointer-events-none absolute inset-0 border-neon-500"
            style={{ borderWidth: outlineWidth }}
          />
          <div
            onPointerDown={(e) => handlePointerDown(e, 'resize-tl')}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute rounded-full border-white bg-neon-500"
            style={{
              width: handleSize,
              height: handleSize,
              left: -handleSize / 2,
              top: -handleSize / 2,
              borderWidth: Math.max(2, outlineWidth),
              cursor: 'nwse-resize',
              touchAction: 'none',
            }}
          />
          <div
            onPointerDown={(e) => handlePointerDown(e, 'resize-br')}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute rounded-full border-white bg-neon-500"
            style={{
              width: handleSize,
              height: handleSize,
              right: -handleSize / 2,
              bottom: -handleSize / 2,
              borderWidth: Math.max(2, outlineWidth),
              cursor: 'nwse-resize',
              touchAction: 'none',
            }}
          />
        </>
      )}
    </div>
  );
}

function ImageContent({ layer }: { layer: ImageLayer }) {
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
        pointerEvents: 'none',
      }}
    />
  );
}

function ShapeContent({ layer }: { layer: ShapeLayer }) {
  const { shape, fill, stroke, strokeWidth, borderRadius } = layer;
  const base: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: fill,
    border: stroke ? `${strokeWidth}px solid ${stroke}` : 'none',
    pointerEvents: 'none',
  };
  if (shape === 'circle') return <div style={{ ...base, borderRadius: '50%' }} />;
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

function TextContent({ layer }: { layer: TextLayer }) {
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
