// ============================================
// postcss.config.js
// ============================================
// PostCSS memproses CSS saat build.
// Tailwind & Autoprefixer berjalan lewat PostCSS.
//
// Tanpa file ini:
//   - Tailwind tidak dikompilasi
//   - Build Vercel error:
//     "PostCSS plugin tailwindcss requires PostCSS 8"
//   - Web jadi tanpa styling sama sekali
// ============================================

module.exports = {
  plugins: {
    // Tailwind — generate utility class dari config
    tailwindcss: {},

    // Autoprefixer — tambah prefix vendor otomatis
    // Contoh: -webkit-, -moz-, -ms-
    autoprefixer: {},
  },
};
