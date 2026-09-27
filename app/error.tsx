'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error ke console (nanti bisa kirim ke Sentry)
    console.error('[Ashiro Error]', error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6">
      {/* Background grid */}
      <div className="bg-canvas-grid absolute inset-0 opacity-40" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>

        {/* Pesan */}
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Terjadi Kesalahan
        </h1>
        <p className="mt-4 text-ink-400">
          Maaf, ada yang tidak berjalan semestinya. Coba muat ulang halaman
          atau kembali ke beranda.
        </p>

        {/* Info error (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-left">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-red-400">
              Development Error
            </p>
            <p className="break-all font-mono text-xs text-red-300">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="mt-2 font-mono text-[10px] text-red-400/60">
                digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Tombol */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="btn btn-primary !px-6 !py-3"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </button>
          <Link href="/" className="btn btn-secondary !px-6 !py-3">
            <Home className="h-4 w-4" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
