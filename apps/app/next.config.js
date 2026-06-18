/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    externalDir: true,
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
