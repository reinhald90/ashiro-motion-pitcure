// ============================================
// lib/effects/color/brightness.ts
// Efek: Brightness (Kecerahan)
// ============================================

import type { EffectDefinition } from '@effects/_base';
import { number, resetCtx, supportsCanvasFilter } from '@effects/_base';

const brightness: EffectDefinition = {
  id: 'brightness',
  name: 'Brightness',
  category: 'color',
  icon: '☀️',
  description: 'Atur tingkat kecerahan gambar atau video.',
  version: '1.0.0',

  params: {
    amount: number('Brightness', 100, 0, 200, {
      step: 1,
      unit: '%',
      description: '100% = normal. Di bawah 100% menggelap, di atas 100% mencerah.',
    }),
  },

  isSupported: supportsCanvasFilter,

  apply({ ctx, source, width, height, params }) {
    const amount = typeof params.amount === 'number' ? params.amount : 100;

    ctx.filter = `brightness(${amount}%)`;
    ctx.drawImage(source, 0, 0, width, height);
    resetCtx(ctx);
  },
};

export default brightness;
