/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const isUserPage = repo.toLowerCase().endsWith('.github.io');
const detectedBasePath = repo && !isUserPage ? `/${repo}` : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || detectedBasePath;

const nextConfig = {
  output: 'export',
  // Expone el basePath al código (cliente y servidor) para que lib/asset.ts
  // pueda anteponerlo a las rutas de /public. Sin esto, NEXT_PUBLIC_BASE_PATH
  // estaría vacío en el build de GitHub Actions aunque basePath sí se calcule.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
