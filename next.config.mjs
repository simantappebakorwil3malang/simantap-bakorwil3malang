// next.config.mjs
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // PWA hanya aktif saat production (npm run build) agar tidak mengganggu saat coding
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Berlaku untuk semua rute di aplikasi
        source: "/(.*)",
        headers: [
          {
            // Mencegah web kamu dimasukkan ke dalam <iframe> oleh web jahat (Clickjacking)
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Mencegah browser menebak-nebak tipe file (MIME-sniffing)
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Referrer Policy yang ketat agar URL asal tidak bocor
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Memaksa browser selalu menggunakan HTTPS (HSTS)
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // Content Security Policy (CSP) dasar untuk mencegah eksekusi script asing (XSS)
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);