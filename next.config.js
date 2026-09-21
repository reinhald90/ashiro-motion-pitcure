/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // React & Rendering
  // ============================================
  reactStrictMode: true,
  swcMinify: true,

  // ============================================
  // Image Optimization
  // ============================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================
  // Headers (keamanan + WebAssembly untuk ffmpeg.wasm)
  // ============================================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Wajib untuk ffmpeg.wasm & WebCodecs nanti
      {
        source: '/editor/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },

  // ============================================
  // Redirect
  // ============================================
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/dashboard',
        permanent: false,
      },
      {
        source: '/signin',
        destination: '/login',
        permanent: false,
      },
    ];
  },

  // ============================================
  // Webpack customization
  // ============================================
  webpack: (config, { isServer }) => {
    // Dukung import file .wgsl (WebGL shader) nanti
    config.module.rules.push({
      test: /\.(wgsl|glsl|vert|frag)$/,
      type: 'asset/source',
    });

    // Fallback untuk modul Node di browser (ffmpeg.wasm)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // ============================================
  // Eksperimental
  // ============================================
  experimental: {
    // Web Worker langsung dari folder workers/
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // ============================================
  // Output
  // ============================================
  poweredByHeader: false,
  compress: true,

  // ============================================
  // Environment variables (client-side exposure)
  // ============================================
  env: {
    NEXT_PUBLIC_APP_NAME: 'Ashiro Motion Picture',
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
  },
};

module.exports = nextConfig;
