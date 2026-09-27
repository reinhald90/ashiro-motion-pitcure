'use client';

import {
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Image as ImageIcon,
  Square,
  Type,
} from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import type { Layer } from '@/types/layer';

export default function LayersPanel() {
  const layers = useEditorStore((s) => s.project.layers);
  const selectedId = useEditorStore((s) => s.project.selectedLayerId);
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const removeLayer = useEditorStore((s) => s.removeLayer);
  const toggleVisibility = useEditorStore((s) => s.toggleVisibility);
  const toggleLock = useEditorStore((s) => s.toggleLock);

  const reversed = [...layers].reverse();

  return (
    <aside
      className="flex shrink-0 flex-col border-l border-white/5 bg-ink-900"
      style={{ width: '260px' }}
    >
      <div className="editor-panel-header">
        <span>Layers</span>
        <span className="font-mono text-[10px] text-ink-500">
          {layers.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {reversed.length === 0 && (
          <p className="p-4 text-center text-xs text-ink-500">Belum ada layer</p>
        )}

        {reversed.map((layer) => (
          <LayerRow
            key={layer.id}
            layer={layer}
            selected={layer.id === selectedId}
            onSelect={() => selectLayer(layer.id)}
            onDelete={() => removeLayer(layer.id)}
            onToggleVisibility={() => toggleVisibility(layer.id)}
            onToggleLock={() => toggleLock(layer.id)}
          />
        ))}
      </div>
    </aside>
  );
}

function LayerRow({
  layer,
  selected,
  onSelect,
  onDelete,
  onToggleVisibility,
  onToggleLock,
}: {
  layer: Layer;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
}) {
  const Icon =
    layer.type === 'image'
      ? ImageIcon
      : layer.type === 'shape'
      ? Square
      : Type;

  return (
    <div
      onClick={onSelect}
      className={`group flex items-center gap-2 border-b border-white/5 px-3 py-2 cursor-pointer transition-colors ${
        selected ? 'bg-ashiro-500/15' : 'hover:bg-white/5'
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        className="text-ink-400 hover:text-white"
        title="Visibilitas"
      >
        {layer.visible ? (
          <Eye className="h-3.5 w-3.5" />
        ) : (
          <EyeOff className="h-3.5 w-3.5" />
        )}
      </button>

      <div className="flex h-7 w-7 items-center justify-center rounded bg-white/5">
        <Icon className="h-3.5 w-3.5 text-ink-300" />
      </div>

      <span className="flex-1 truncate text-xs text-white">{layer.name}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        className="text-ink-400 hover:text-white opacity-0 group-hover:opacity-100"
        title="Kunci"
      >
        {layer.locked ? (
          <Lock className="h-3.5 w-3.5" />
        ) : (
          <Unlock className="h-3.5 w-3.5" />
        )}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-ink-400 hover:text-red-400 opacity-0 group-hover:opacity-100"
        title="Hapus"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
