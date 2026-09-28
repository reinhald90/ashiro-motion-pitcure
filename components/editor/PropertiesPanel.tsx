'use client';

import { Diamond } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import type { Layer } from '@/types/layer';
import { findKeyframeAt } from '@/types/keyframe';
import {
  ANIMATABLE_PROPS,
  PROP_LABELS,
  getPropValueAtTime,
  type AnimatableProp,
} from '@/lib/editor/keyframe';

export default function PropertiesPanel() {
  const selectedId = useEditorStore((s) => s.project.selectedLayerId);
  const layer = useEditorStore((s) =>
    s.project.layers.find((l) => l.id === s.project.selectedLayerId)
  );

  if (!layer || !selectedId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-xs text-ink-500">Pilih layer untuk edit properti</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/5 px-3">
        <span className="truncate text-xs font-medium text-white">
          {layer.name}
        </span>
        <span className="font-mono text-[10px] uppercase text-ink-500">
          {layer.type}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Transform section */}
        <Section title="Transform">
          {ANIMATABLE_PROPS.filter((p) =>
            ['x', 'y', 'width', 'height', 'rotation'].includes(p)
          ).map((prop) => (
            <PropRow key={prop} layer={layer} prop={prop} step={1} min={-5000} max={5000} />
          ))}
        </Section>

        {/* Scale & opacity */}
        <Section title="Skala & Opacity">
          <PropRow layer={layer} prop="scaleX" step={0.05} min={0} max={5} slider />
          <PropRow layer={layer} prop="scaleY" step={0.05} min={0} max={5} slider />
          <PropRow layer={layer} prop="opacity" step={0.05} min={0} max={1} slider />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/5">
      <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
        {title}
      </div>
      <div className="px-2 pb-2">{children}</div>
    </div>
  );
}

function PropRow({
  layer,
  prop,
  step = 1,
  min = 0,
  max = 1000,
  slider = false,
}: {
  layer: Layer;
  prop: AnimatableProp;
  step?: number;
  min?: number;
  max?: number;
  slider?: boolean;
}) {
  const playhead = useEditorStore((s) => s.playhead);
  const setLayerProp = useEditorStore((s) => s.setLayerProp);
  const addKeyframe = useEditorStore((s) => s.addKeyframe);
  const removeKeyframe = useEditorStore((s) => s.removeKeyframe);

  const value = getPropValueAtTime(layer, prop, playhead);
  const track = layer.keyframes?.[prop];
  const hasAnyKf = !!track && track.keyframes.length > 0;
  const hasKfHere = track ? !!findKeyframeAt(track, playhead) : false;

  const onToggleKf = () => {
    if (hasKfHere) {
      removeKeyframe(layer.id, prop, playhead);
    } else {
      addKeyframe(layer.id, prop, playhead, value);
    }
  };

  const displayValue =
    prop === 'opacity' || prop === 'scaleX' || prop === 'scaleY'
      ? value.toFixed(2)
      : Math.round(value);

  return (
    <div className="flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-white/[0.03]">
      <span className="w-16 shrink-0 text-[10px] text-ink-400">
        {PROP_LABELS[prop]}
      </span>

      {slider ? (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setLayerProp(layer.id, prop, parseFloat(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-ashiro-500"
        />
      ) : (
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={Math.round(value)}
          onChange={(e) => setLayerProp(layer.id, prop, parseFloat(e.target.value) || 0)}
          className="h-6 w-16 rounded bg-white/5 px-2 text-right font-mono text-[11px] text-white outline-none focus:bg-white/10"
        />
      )}

      <span className="w-12 shrink-0 text-right font-mono text-[10px] text-ink-500">
        {displayValue}
      </span>

      <button
        onClick={onToggleKf}
        title={hasKfHere ? 'Hapus keyframe' : 'Tambah keyframe'}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors ${
          hasKfHere
            ? 'text-neon-500'
            : hasAnyKf
            ? 'text-ashiro-400'
            : 'text-ink-500 hover:text-ink-300'
        }`}
      >
        <Diamond
          className="h-3 w-3"
          fill={hasKfHere ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
}
