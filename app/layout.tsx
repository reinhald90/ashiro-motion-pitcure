import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

// ============================================
// Font
// ============================================
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// ============================================
// Metadata
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ashiro-motion-picture.vercel.app'
  ),
  title: {
    default: 'Ashiro Motion Picture — Motion Graphics & Video Editor',
    template: '%s | Ashiro Motion Picture',
  },
  description:
    'Editor motion graphics dan video berbasis web. Keyframe, efek, dan export MP4/GIF langsung dari browser.',
  applicationName: 'Ashiro Motion Picture',
  authors: [{ name: 'Ashiro Motion Picture' }],
  creator: 'Ashiro Motion Picture',
  publisher: 'Ashiro Motion Picture',
  keywords: [
    'motion graphics',
    'video editor',
    'web editor',
    'alight motion alternative',
    'keyframe animation',
    'video effect',
    'ashiro',
    'ashiro motion picture',
  ],
  category: 'Design Tools',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    siteName: 'Ashiro Motion Picture',
    title: 'Ashiro Motion Picture — Motion Graphics & Video Editor',
    description:
      'Editor motion graphics dan video berbasis web. Keyframe, efek, dan export MP4/GIF langsung dari browser.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ashiro Motion Picture',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Ashiro Motion Picture',
    description: 'Motion graphics & video editor di browser.',
    images: ['/og-image.png'],
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  // Manifest
  manifest: '/manifest.webmanifest',

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ============================================
// Viewport
// ============================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  colorScheme: 'dark',
};

// ============================================
// Root Layout
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink-950 font-sans text-white antialiased selection:bg-ashiro-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
