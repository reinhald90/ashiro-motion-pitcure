# Ashiro Motion Picture

> Motion graphics & video editor berbasis web. Keyframe, efek, dan export MP4/GIF langsung dari browser.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## ✨ Fitur

- 🎬 **Keyframe Animation** — atur gerakan, opacity, dan transformasi frame-by-frame
- ✨ **Efek Real-time** — blur, glow, chromatic, glitch, vignette, dan lainnya
- 🎞️ **Multi-Layer Timeline** — susun video, gambar, teks, dan shape tanpa batas
- 🎵 **Audio & Beat Sync** — sinkronkan animasi dengan musik
- 💾 **Export Multi-Format** — MP4, GIF, MP3, PNG, JPG
- 🚀 **100% di Browser** — tanpa install, tanpa upload ke server

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand + Immer |
| Ikon | Lucide React |
| Animasi | Framer Motion |
| Deploy | Vercel |

---

## 🚀 Mulai Cepat

### Prasyarat

- Node.js **>= 18.17.0**
- npm / pnpm / yarn

### Development

```bash
# Clone repo
git clone https://github.com/USERNAME/ashiro-motion-picture.git
cd ashiro-motion-picture

# Install dependency
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Build Production

```bash
npm run build
npm start
```

---

## 📁 Struktur Project

```
ashiro-motion-picture/
├── app/                    → Next.js App Router (routing)
├── components/             → Komponen UI
│   └── editor/             → Komponen editor
├── lib/                    → Logic non-UI
│   ├── editor/             → Logic editor
│   └── effects/            → Sistem efek (⭐ scalable)
├── hooks/                  → React hooks
├── stores/                 → Zustand stores
├── types/                  → TypeScript types
├── workers/                → Web Worker
└── public/                 → File statis
```

---

## 🎨 Sistem Efek

Semua efek ada di `lib/effects/`. Setiap efek **1 file**, ikut kontrak yang sama.

### Menambah Efek Baru

1. Buat file di `lib/effects/<kategori>/<nama>.ts`
2. Copy template dari `lib/effects/_base.ts`
3. Daftarkan di `lib/effects/_registry.ts`
4. UI panel otomatis mendeteksi

**Contoh:** `lib/effects/color/brightness.ts`

```ts
import { number, resetCtx } from '@effects/_base';
import type { EffectDefinition } from '@effects/_base';

const brightness: EffectDefinition = {
  id: 'brightness',
  name: 'Brightness',
  category: 'color',
  icon: '☀️',
  params: {
    amount: number('Brightness', 100, 0, 200, { unit: '%' }),
  },
  apply({ ctx, source, width, height, params }) {
    ctx.filter = `brightness(${params.amount}%)`;
    ctx.drawImage(source, 0, 0, width, height);
    resetCtx(ctx);
  },
};

export default brightness;
```

---

## 🌐 Deploy ke Vercel

### Cara 1 — Via Dashboard

1. Push repo ke GitHub
2. Buka [vercel.com/new](https://vercel.com/new)
3. Import repo `ashiro-motion-picture`
4. Framework: **Next.js** (auto-detect)
5. Klik **Deploy**
6. Selesai — dapat URL publik

### Cara 2 — Via CLI

```bash
npm i -g vercel
vercel
```

Setiap kali push ke `main`, Vercel otomatis redeploy.

---

## 📋 Roadmap

- [x] Fase 1 — Landing page + pondasi
- [ ] Fase 2 — Editor UI lengkap
- [ ] Fase 3 — Canvas drag & drop layer
- [ ] Fase 4 — Timeline + keyframe
- [ ] Fase 5 — Sistem efek lengkap
- [ ] Fase 6 — Auth + database
- [ ] Fase 7 — Export MP4/GIF
- [ ] Fase 8 — Audio & waveform

---

## 📄 Lisensi

UNLICENSED — All rights reserved.

© 2026 Ashiro Motion Picture
