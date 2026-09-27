import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  MessageCircle,
  Film,
  Clock,
  Mail,
  ExternalLink,
} from 'lucide-react';

// ============================================
// Metadata
// ============================================
export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi tim Ashiro Motion Picture lewat Telegram atau WhatsApp. Dapatkan update terbaru dan bantuan langsung.',
};

// ============================================
// Data — channel kontak
// ============================================
const CHANNELS = [
  {
    name: 'Telegram',
    handle: '@AzureLyount',
    description:
      'Chat langsung, tanya fitur, lapor bug, atau sekadar ngobrol soal motion graphics.',
    url: 'https://t.me/AzureLyount',
    icon: Send,
    color: 'from-sky-500 to-blue-600',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/50',
    cta: 'Buka Telegram',
  },
  {
    name: 'WhatsApp Channel',
    handle: 'Ashiro Motion Picture',
    description:
      'Update fitur baru, tips editing, dan rilis versi terbaru langsung ke WhatsApp kamu.',
    url: 'https://whatsapp.com/channel/0029VbDz1xsEQIau8FQEtF16',
    icon: MessageCircle,
    color: 'from-emerald-500 to-green-600',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'hover:border-emerald-500/50',
    cta: 'Ikuti Channel',
  },
];

// ============================================
// Page
// ============================================
export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <div className="bg-canvas-grid absolute inset-0 opacity-30" />

      {/* Glow orbs */}
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-ashiro-500/20 blur-[120px]" />
      <div className="absolute right-1/4 top-40 h-96 w-96 translate-x-1/2 rounded-full bg-neon-500/20 blur-[120px]" />

      {/* Navbar minimal */}
      <header className="glass-strong relative z-40">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ashiro">
              <Film className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold tracking-widest">
              ASHIRO
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="relative z-10 container-page py-20 md:py-28">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="badge mx-auto mb-6">
            <Mail className="h-3 w-3" />
            <span>Kontak</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Ngobrol dengan <span className="text-gradient">Ashiro</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-300">
            Punya pertanyaan, ide fitur, atau nemu bug? Hubungi kami lewat
            saluran di bawah. Kami biasanya balas dalam 1×24 jam.
          </p>
        </div>

        {/* Channel cards */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card group relative block overflow-hidden transition-all duration-300 ${channel.border}`}
              >
                {/* Gradient header strip */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${channel.color}`}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${channel.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${channel.accent}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">
                        {channel.name}
                      </h3>
                      <ExternalLink className="h-3.5 w-3.5 text-ink-500 transition-opacity group-hover:text-white" />
                    </div>
                    <p className={`mt-0.5 font-mono text-xs ${channel.accent}`}>
                      {channel.handle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">
                      {channel.description}
                    </p>

                    <div
                      className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${channel.accent}`}
                    >
                      {channel.cta}
                      <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Info tambahan */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ashiro-500/10">
                <Clock className="h-5 w-5 text-ashiro-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Waktu Respons
                </h3>
                <p className="mt-1 text-sm text-ink-400">
                  Kami aktif setiap hari, sekitar pukul{' '}
                  <span className="text-white">09:00 – 22:00 WIB</span>. Pesan
                  di luar jam itu tetap dibaca, tapi balasan mungkin agak
                  telat.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 glass rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neon-500/10">
                <Send className="h-5 w-5 text-neon-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Buat Apa Saja
                </h3>
                <p className="mt-1 text-sm text-ink-400">
                  Tanya fitur, lapor bug, kasih masukan, minta preset, atau
                  kolaborasi. Semua kami baca.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA balik */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm text-ink-400">
            Mau langsung coba editornya?
          </p>
          <Link
            href="/editor"
            className="btn btn-primary mt-4 !px-6 !py-3"
          >
            Buka Editor
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container-page text-center text-xs text-ink-500">
          © {new Date().getFullYear()} Ashiro Motion Picture. All rights
          reserved.
        </div>
      </footer>
    </main>
  );
}
