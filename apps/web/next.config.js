/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true
  },
  async rewrites() {
    return [
      {
        source: "/api/_mail-smoke/:path*",
        destination: "/api/mail-smoke/:path*"
      }
    ];
  }
};

export default nextConfig;
