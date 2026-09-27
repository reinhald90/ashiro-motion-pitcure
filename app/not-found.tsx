import Link from 'next/link';
import { Home, ArrowLeft, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6">
      {/* Background grid */}
      <div className="bg-canvas-grid absolute inset-0 opacity-40" />

      {/* Glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-ashiro-500/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-neon-500/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ashiro">
            <Film className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-sm font-bold tracking-widest">
            ASHIRO
          </span>
        </Link>

        {/* 404 besar */}
        <div className="font-display text-[120px] font-bold leading-none tracking-tight md:text-[180px]">
          <span className="text-gradient">404</span>
        </div>

        {/* Pesan */}
        <h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-ink-400">
          Halaman yang kamu cari mungkin sudah dipindah, dihapus, atau
          tidak pernah ada.
        </p>

        {/* Tombol */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary !px-6 !py-3">
            <Home className="h-4 w-4" />
            Ke Beranda
          </Link>
          <Link href="/editor" className="btn btn-secondary !px-6 !py-3">
            <ArrowLeft className="h-4 w-4" />
            Buka Editor
          </Link>
        </div>

        {/* Hint */}
        <p className="mt-12 font-mono text-xs text-ink-600">
          error_code: 404 · not_found
        </p>
      </div>
    </main>
  );
}
