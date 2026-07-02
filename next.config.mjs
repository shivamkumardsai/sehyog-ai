/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['pdfjs-dist'],
}

export default nextConfig
