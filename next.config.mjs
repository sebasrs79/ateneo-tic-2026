/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const isUserPage = repo.toLowerCase().endsWith('.github.io');
const detectedBasePath = repo && !isUserPage ? `/${repo}` : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || detectedBasePath;

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
