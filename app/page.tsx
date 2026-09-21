import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Layers,
  KeyRound,
  Music2,
  Zap,
  Download,
  Play,
  ArrowRight,
  Check,
  Smartphone,
  Monitor,
  Wand2,
  Film,
  Palette,
  Type,
} from 'lucide-react';

// ============================================
// Data
// ============================================
const FEATURES = [
  {
    icon: KeyRound,
    title: 'Keyframe Animation',
    description:
      'Atur gerakan, opacity, rotasi, dan scale dengan presisi frame-by-frame. Preset easing siap pakai.',
  },
  {
    icon: Wand2,
    title: 'Efek Real-time',
    description:
      'Blur, glow, chromatic, glitch, vignette — langsung kelihatan di preview tanpa nunggu render.',
  },
  {
    icon: Layers,
    title: 'Multi-Layer Timeline',
    description:
      'Susun video, gambar, teks, dan shape dalam layer tak terbatas. Drag & drop, atur urutan sesuka hati.',
  },
  {
    icon: Music2,
    title: 'Audio & Beat Sync',
    description:
      'Waveform interaktif. Sinkronkan animasi dengan musik. Deteksi beat otomatis.',
  },
  {
    icon: Zap,
    title: 'Export Cepat',
    description:
      'MP4, GIF, MP3, PNG, JPG. Semua di-render di browser, tanpa upload ke server.',
  },
  {
    icon: Palette,
    title: 'Preset & Style',
    description:
      'Simpan kombinasi efek jadi preset. Pakai ulang di project lain dengan sekali klik.',
  },
];

const GALLERY = [
  { title: 'Cinematic Intro', tag: 'Logo Reveal', gradient: 'from-ashiro-500 to-neon-500' },
  { title: 'Beat Drop Sync', tag: 'Reels', gradient: 'from-neon-500 to-ashiro-500' },
  { title: 'Neon Glow Text', tag: 'Typography', gradient: 'from-neon-500 to-purple-500' },
  { title: 'Product Showcase', tag: 'Commercial', gradient: 'from-blue-500 to-ashiro-500' },
  { title: 'Glitch Transition', tag: 'Effect Pack', gradient: 'from-red-500 to-neon-500' },
  { title: 'Lyric Video', tag: 'Music', gradient: 'from-emerald-500 to-ashiro-500' },
];

const STEPS = [
  {
    number: '01',
    title: 'Import',
    description: 'Tarik video, gambar, atau audio ke timeline. Format populer didukung.',
  },
  {
    number: '02',
    title: 'Edit',
    description: 'Tambah efek, atur keyframe, sinkronkan dengan musik.',
  },
  {
    number: '03',
    title: 'Export',
    description: 'Render dan download dalam MP4, GIF, atau format lain.',
  },
];

const PRICING = [
  {
    name: 'Free',
    price: 'Rp 0',
    period: 'selamanya',
    features: [
      'Semua fitur editor',
      'Export tanpa watermark',
      'Resolusi hingga 1080p',
      '5 project aktif',
      'Efek dasar lengkap',
    ],
    cta: 'Mulai Gratis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'Rp 49rb',
    period: 'per bulan',
    features: [
      'Semua fitur Free',
      'Export hingga 4K',
      'Project tak terbatas',
      'Efek premium',
      'Cloud storage 50GB',
      'Prioritas support',
    ],
    cta: 'Coba Pro',
    highlight: true,
  },
];

// ============================================
// Page
// ============================================
export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* ============================================
          Navbar
          ============================================ */}
      <header className="glass-strong fixed top-0 left-0 right-0 z-50">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ashiro">
              <Film className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold tracking-widest">
              ASHIRO
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <a href="#features" className="text-sm text-ink-300 hover:text-white">
                Fitur
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-sm text-ink-300 hover:text-white">
                Galeri
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-sm text-ink-300 hover:text-white">
                Harga
              </a>
            </li>
            <li>
              <a href="#how" className="text-sm text-ink-300 hover:text-white">
                Cara Pakai
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm text-ink-300 hover:text-white md:block"
            >
              Masuk
            </Link>
            <Link href="/editor" className="btn btn-primary">
              <Play className="h-3.5 w-3.5" />
              Buka Editor
            </Link>
          </div>
        </nav>
      </header>

      {/* ============================================
          Hero
          ============================================ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background grid */}
        <div className="bg-canvas-grid absolute inset-0 opacity-40" />

        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-ashiro-500/20 blur-[120px]" />
        <div className="absolute right-1/4 top-40 h-96 w-96 translate-x-1/2 rounded-full bg-neon-500/20 blur-[120px]" />

        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge mx-auto mb-6">
              <Sparkles className="h-3 w-3" />
              <span>Baru — Export MP4 di browser</span>
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Bikin Motion Graphics
              <br />
              <span className="text-gradient">di Mana Saja</span>
            </h1>

            <p className="mt-6 text-lg text-ink-300 md:text-xl">
              Ashiro Motion Picture adalah editor motion graphics dan video
              berbasis web. Keyframe, efek, dan export langsung dari browser —
              tanpa install.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/editor" className="btn btn-primary !px-6 !py-3 !text-base">
                <Play className="h-4 w-4" />
                Mulai Sekarang
              </Link>
              <a href="#gallery" className="btn btn-secondary !px-6 !py-3 !text-base">
                Lihat Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-6 text-xs text-ink-400">
              Gratis · Tanpa watermark · Tidak perlu kartu kredit
            </p>
          </div>

          {/* Editor preview mockup */}
          <div className="relative mt-20 md:mt-24">
            <div className="glass-strong mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* Fake toolbar */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <div className="ml-4 font-mono text-xs text-ink-400">
                  ashiro.app/editor
                </div>
              </div>

              {/* Fake editor */}
              <div className="grid grid-cols-12 gap-0 bg-ink-950">
                {/* Left toolbar */}
                <div className="col-span-1 border-r border-white/5 p-3">
                  <div className="space-y-3">
                    <div className="h-6 w-6 rounded bg-ashiro-500/30" />
                    <div className="h-6 w-6 rounded bg-white/5" />
                    <div className="h-6 w-6 rounded bg-white/5" />
                    <div className="h-6 w-6 rounded bg-white/5" />
                  </div>
                </div>

                {/* Canvas */}
                <div className="col-span-8 aspect-video bg-canvas-grid relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-2xl bg-gradient-ashiro p-1 shadow-glow">
                      <div className="rounded-xl bg-ink-950 px-8 py-6">
                        <div className="text-gradient font-display text-3xl font-bold">
                          ASHIRO
                        </div>
                        <div className="mt-2 font-mono text-xs text-ink-400">
                          frame 142 / 300
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Playhead */}
                  <div className="absolute left-1/2 top-0 h-full w-px bg-neon-500 shadow-glow-neon" />
                </div>

                {/* Right panel */}
                <div className="col-span-3 border-l border-white/5 p-3">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Properties
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded bg-white/5" />
                    <div className="h-8 rounded bg-white/5" />
                    <div className="h-8 rounded bg-white/5" />
                  </div>
                  <div className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Effects
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded ${
                          i === 2 ? 'bg-ashiro-500/40' : 'bg-white/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="col-span-12 border-t border-white/5 p-3">
                  <div className="space-y-1.5">
                    {[70, 45, 85, 30].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-12 font-mono text-[10px] text-ink-500">
                          0{i + 1}
                        </div>
                        <div className="relative h-6 flex-1 rounded bg-white/5">
                          <div
                            className="track-clip absolute left-0 top-0 h-full"
                            style={{ width: `${w}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glow under */}
            <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-ashiro-500/20 to-transparent blur-2xl" />
          </div>
        </div>
      </section>

      {/* ============================================
          Features
          ============================================ */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mx-auto mb-4">Fitur</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Semua yang kamu butuh
            </h2>
            <p className="mt-4 text-ink-300">
              Tanpa ribet, tanpa install. Semua fitur editing profesional di
              browser.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ashiro-500/10 text-ashiro-400 transition-colors group-hover:bg-ashiro-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          Gallery
          ============================================ */}
      <section id="gallery" className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mx-auto mb-4">Galeri</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Dibuat dengan Ashiro
            </h2>
            <p className="mt-4 text-ink-300">
              Contoh karya nyata dari komunitas. Semua dibuat 100% di browser.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item) => (
              <div
                key={item.title}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-white/5"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {item.tag}
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-white">
                    {item.title}
                  </div>
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Play className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          How It Works
          ============================================ */}
      <section id="how" className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mx-auto mb-4">Cara Pakai</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Tiga langkah saja
            </h2>
            <p className="mt-4 text-ink-300">
              Dari ide sampai export, semuanya di browser.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="font-mono text-6xl font-bold text-ashiro-500/20 md:text-7xl">
                  {step.number}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 text-ink-400">{step.description}</p>

                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-8 hidden h-6 w-6 text-ink-600 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          Pricing
          ============================================ */}
      <section id="pricing" className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mx-auto mb-4">Harga</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Gratis untuk mulai
            </h2>
            <p className="mt-4 text-ink-300">
              Upgrade kapan saja kalau butuh lebih.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.highlight
                    ? 'border-ashiro-500/50 shadow-glow'
                    : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-gradient-ashiro px-3 py-1 text-xs font-bold">
                      POPULER
                    </div>
                  </div>
                )}

                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-sm text-ink-400">/ {plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-ashiro-400" />
                      <span className="text-ink-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/editor"
                  className={`mt-8 flex w-full items-center justify-center gap-2 ${
                    plan.highlight ? 'btn btn-primary' : 'btn btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-ashiro-500/30 bg-gradient-to-br from-ashiro-950 via-ink-950 to-neon-950 p-12 text-center md:p-20">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-ashiro-500/30 blur-[100px]" />

            <div className="relative">
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Siap bikin sesuatu?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-300">
                Buka editor sekarang. Tidak perlu install, tidak perlu daftar.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/editor"
                  className="btn btn-primary !px-8 !py-3.5 !text-base"
                >
                  <Play className="h-4 w-4" />
                  Buka Editor
                </Link>
                <Link
                  href="/register"
                  className="btn btn-secondary !px-8 !py-3.5 !text-base"
                >
                  Daftar Gratis
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-400">
                <span className="flex items-center gap-2">
                  <Check className="h-3 w-3" /> Tanpa kartu kredit
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-3 w-3" /> Tanpa watermark
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-3 w-3" /> Export tanpa batas
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Footer
          ============================================ */}
      <footer className="border-t border-white/5 py-12">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ashiro">
                  <Film className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-sm font-bold tracking-widest">
                  ASHIRO
                </span>
              </Link>
              <p className="mt-4 text-sm text-ink-400">
                Motion graphics & video editor di browser.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold">Produk</h4>
              <ul className="mt-4 space-y-2 text-sm text-ink-400">
                <li><Link href="/editor" className="hover:text-white">Editor</Link></li>
                <li><a href="#features" className="hover:text-white">Fitur</a></li>
                <li><a href="#pricing" className="hover:text-white">Harga</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold">Sumber</h4>
              <ul className="mt-4 space-y-2 text-sm text-ink-400">
                <li><a href="/docs" className="hover:text-white">Dokumentasi</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/changelog" className="hover:text-white">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold">Perusahaan</h4>
              <ul className="mt-4 space-y-2 text-sm text-ink-400">
                <li><a href="/about" className="hover:text-white">Tentang</a></li>
                <li><a href="/contact" className="hover:text-white">Kontak</a></li>
                <li><a href="/privacy" className="hover:text-white">Privasi</a></li>
              </ul>
            </div>
          </div>

          <div className="divider mt-12" />

          <div className="flex flex-col items-center justify-between gap-4 text-xs text-ink-500 md:flex-row">
            <p>© {new Date().getFullYear()} Ashiro Motion Picture. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Monitor className="h-3 w-3" />
              <span>Made by Azure</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
