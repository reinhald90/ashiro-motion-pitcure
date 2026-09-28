/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

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
      {
        source: '/editor/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },

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

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(wgsl|glsl|vert|frag)$/,
      type: 'asset/source',
    });

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

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  poweredByHeader: false,
  compress: true,

  env: {
    NEXT_PUBLIC_APP_NAME: 'Ashiro Motion Picture',
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
  },
};

module.exports = nextConfig;
