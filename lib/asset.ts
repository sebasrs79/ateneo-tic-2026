// Prefijo de la ruta base (basePath de Next.js).
// En local es '' y en GitHub Pages es '/ateneo-tic-2026'.
// Sirve para que las imágenes de /public funcionen en ambos lados:
// sin este prefijo el navegador las busca en sebasrs79.github.io/assets/...
// y dan 404, porque en realidad viven en sebasrs79.github.io/ateneo-tic-2026/assets/...
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
